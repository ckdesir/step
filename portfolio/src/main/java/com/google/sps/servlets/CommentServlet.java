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
public class CommentServlet extends HttpServlet {
  
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    List<Comment> listOfComments = getComments(request.getParameter("comment-sort"),
        Integer.parseInt(request.getParameter("max-number-display")));
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
   * @param {String} commentSortType - represents which property of the entity to
   *    to sort off of (either the date the comment was made or the length of comment)
   *    and the direction to sort (ascending or descending).
   * @param {int} maxNumberDisplay - how many comments to display on the board
   */
  private List<Comment> getComments(String commentSortType, int maxNumberDisplay) {
    List<Comment> comments = new ArrayList<>();
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    Query query = getCommentQuery(Comment.SortType.valueOf(commentSortType));
    PreparedQuery results = datastore.prepare(query);
    // Limits the number of entities returned by the result as an iterable.
    for (Entity commentEntity : results.asIterable(
        FetchOptions.Builder.withLimit(maxNumberDisplay))) {
          comments.add(Comment.fromEntity(commentEntity));
    }
    return comments;
  }

  /**
   * Returns a new query restricted by client-side input.
   * @param {Comment.SortType} commentSortType - represents which property of the entity to
   *    to sort off of (either the date the comment was made or the length of comment)
   *    and the direction to sort (ascending or descending).
   */
    private Query getCommentQuery(Comment.SortType commentSortType) {
    switch (commentSortType) {
      case BY_TIME_ASC:
        return new Query("Comment").addSort("timeOfComment", Query.SortDirection.ASCENDING);
      case BY_COMMENT_LENGTH_DESC:
        return new Query("Comment").addSort("lengthOfComment", Query.SortDirection.DESCENDING);
      case BY_COMMENT_LENGTH_ASC:
        return new Query("Comment").addSort("lengthOfComment", Query.SortDirection.ASCENDING);
      default:
        return new Query("Comment").addSort("timeOfComment", Query.SortDirection.DESCENDING);
    }
  }
}
