// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import java.util.ArrayList;
import java.util.List;
import java.io.IOException;
import java.util.Date;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.gson.Gson;
import com.google.sps.data.Comment;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;

/** Servlet that returns some data refrencing comments for the webpage. */
@WebServlet("/comments")
public class DataServlet extends HttpServlet {
  
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    List<Comment> listOfComments = getComments(request.getParameter("max-number-display"),
        request.getParameter("sort-direction"), request.getParameter("entity-property"));
    // Changes the list of Comments into a JSON
    Gson gson = new Gson();
    String json = gson.toJson(listOfComments);
    response.setContentType("application/json;");
    response.getWriter().println(json);
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    String name = request.getParameter("name");
    String commentString = Jsoup.clean(request.getParameter("comment-string"), Whitelist.basic());
    datastore.put(Comment.toEntity(new Comment(new Date(), name, commentString)));
    response.sendRedirect("/index.html");
  }

  /** 
   * Fetches comments from Datastore.
   * @return a list containing all the comments stored in the servlet
   * @param {string} maxNumberDisplay - how many comments to display on the board
   * @param {string} sortDirection - which direction to sort: ascending or descending.
   * @param {string} entityProperty - represents which property of the entity
   *   to sort off of (either the date the comment was made or the length of comment)
   */
  private List<Comment> getComments(String maxNumberDisplay, String sortDirection,
      String entityProperty) {
        List<Comment> comments = new ArrayList<>();
        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

        Query.SortDirection sortDirectionQuery = sortDirection.equals("descending")
            ? SortDirection.DESCENDING : SortDirection.ASCENDING; 
        Query query = new Query("Comment");
        query.addSort(entityProperty, sortDirectionQuery);

        PreparedQuery results = datastore.prepare(query);
        for (Entity commentEntity : results.asIterable(
            FetchOptions.Builder.withLimit(Integer.parseInt(maxNumberDisplay)))) {
              comments.add(Comment.fromEntity(commentEntity));
            }
        return comments;
    }
}
