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

/**
 * Adjusts the SlideShow forward by one.
 * @type {number}
 */
const ADJUST_FORWARD = 1;

/**
 * Adjusts the SlideShow back one.
 * @type {number}
 */
const ADJUST_BACK = -1;

/**
 * Represents the map on the main webpage
 */
let map;

import * as mapConstants from './map-constants.js';

/**
 * This waits until the webpage loads and then it calls the
 * anonymous function, which calls main.
 */
window.onload = function() { main(); }

/**
 * function main() initializes the slideshows and the interactive
 * elements on the website.
 */
function main() {
    initializeSlideshows();
    populateComments();
    initMap();
}

/** 
 * function initializeSlideshows() initializes the blog
 * slideshow and the gallery slideshow.
 */
function initializeSlideshows() {
  const /** ?HTMLCollection */ slideshowGallery =
      new SlideShow(document.getElementsByClassName('gallery-slides'));
  const /** ?HTMLCollection */ slideshowBlog  =
      new SlideShow(document.getElementsByClassName('blog-slides'));
  slideshowBlog.setToAutomaticallyChangeSlides();

  document.getElementById('switch-slides-left').onclick =
        function adjustBackOne() {
          slideshowGallery.adjustSlideManual(ADJUST_BACK); 
        };
  document.getElementById('switch-slides-right').onclick =
        function adjustForwardOne() {
          slideshowGallery.adjustSlideManual(ADJUST_FORWARD); 
        };
}

/** 
 * function populateComments() populates the comment board on the webpage.
 */
function populateComments() {
  fetch(buildUpdateCommentsURL()).then(response => response.json()).then(
        (comments) => {
          const /** ?HTMLCollection */commentContainer =
              document.getElementById('comments-container');
          // commentContainer is set to empty just in-case one is repopulating
          // comments, prevents duplicates.
          commentContainer.innerHTML = '';
          comments.forEach(function(comment) {
            commentContainer.appendChild(buildCommentDiv(comment));          
          });
        }
    );
}

/**
 * @return the <div> element containing all the elements of a comment
 *    like the name, date made, and what was said.
 * @param {JSONObject} comment is the JSONObject that is
 *    meant to be turned into a comment
 */
function buildCommentDiv(comment) {
  let /** string */author =
      comment.name ? comment.name : 'Anonymous';
  const /** ?HTMLCollection */ nameOfCommenter =
      document.createElement('h3');
  nameOfCommenter.innerHTML = author;
  const /** ?HTMLCollection */ dateOfComment =
      document.createElement('h4');
  dateOfComment.innerHTML =
      'Date Posted: ' + comment.timeOfComment;
  const /** ?HTMLCollection */ commentString =
      document.createElement('p');
  commentString.innerHTML = comment.commentString;
  // Adds the individual elements to a single div
  const /** ?HTMLCollection */ divOfComment =
      document.createElement('div');
  divOfComment.appendChild(nameOfCommenter);
  divOfComment.appendChild(dateOfComment);
  divOfComment.appendChild(commentString);
  divOfComment.className = 'comment-div'
  return divOfComment;
}

/**
 * Returns the URL to the servlet and pdates the query
 * string based on the max-number-display and sort-comments select.
 */
function buildUpdateCommentsURL() {
  const /** string */ maxNumberDisplay =
      document.getElementById('max-number-display').value;
  const /** string */ commentSort = 
      document.getElementById('comment-sort').value;
  // Since the url of the request is read-only, a new url is made and 
  // is modified by adding parameters
  const commentsURL = new URL(new Request('/comments').url);
  commentsURL.searchParams.append('max-number-display', maxNumberDisplay);
  commentsURL.searchParams.append('comment-sort', commentSort);
  return commentsURL;
}

/**
 * Deletes all the comments from the servlet.
 */
function deleteComments() {
  const /** Request */ deleteRequest = new Request('/delete-comments', {
      method: 'POST'
    });
  fetch(deleteRequest).then(populateComments());
}
  
/**
 * Creates a map using the Google Maps API.
 */
function initMap() {
  map = new google.maps.Map(document.getElementById('map'),
      mapConstants.MAP_OPTIONS);
  mapConstants.MARKERS.forEach(function (place) {
    createMarkerForDisplay(place.location, place.content, place.name);
  });
  mapConstants.BERMUDA_TRIANGLE.setMap(map);
}

/** 
 * Creates a marker that shows a read-only info window when clicked.
 * @param {object} location - location of marker
 * @param {string} content - content for infoWindow
 * @param {string} name - name of marker
 */
function createMarkerForDisplay(location, content, name) {
  const marker =
    new google.maps.Marker(
      {
        position: location,
        map: map,
        title: name
      }
    );
  const infoWindow = new google.maps.InfoWindow({ content: content });
  marker.addListener('click', () => {
    infoWindow.open(map, marker);
  });
}
