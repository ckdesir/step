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
 * The query string holds information about which way to sort
 * the comments and how many comments to display
 * @type {String}
 */
let queryString;

/*
 * This waits until the webpage loads and then it calls the
 * anonymous function, which calls main.
 */
window.onload = function() { main(); }

/* 
 * function main() initializes the slideshows and the interactive
 * elements on the website.
 */
function main() {
    initializeSlideshows();
    updateComments();
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
          slideShowGallery.adjustSlideManual(ADJUST_BACK); 
        };
  document.getElementById('switch-slides-right').onclick =
        function adjustForwardOne() {
          slideShowGallery.adjustSlideManual(ADJUST_FORWARD); 
        };
}

/** 
 * function populateComments() populates the comment board on the webpage.
 */
function populateComments() {
<<<<<<< HEAD
  fetch(queryString).then(response => response.json()).then(
        (comments) => {
          const /** ?HTMLCollection */commentContainer =
              document.getElementById('comments-container');
<<<<<<< HEAD
=======
          // commentContainer is set to empty just in-case one is repopulating
          // comments, prevents duplicates.
          commentContainer.innerHTML = '';
>>>>>>> Adds queryString changes to script-home and servlet
=======
  fetch("/comments", { body: updateComments() }).then(response => response.json()).then(
        (comments) => {
          const /** ?HTMLCollection */commentContainer =
              document.getElementById('comments-container');
          // commentContainer is set to empty just in-case one is repopulating
          // comments, prevents duplicates.
          commentContainer.innerHTML = '';
>>>>>>> Adds queryString changes to script-home and servlet
          comments.forEach(function(comment) {
              commentContainer.appendChild(makeDiv(comment));          
            });
        }
    );
}

/*
 * @return the <div> element containing all the elements of a comment
 *    like the name, date made, and what was said.
 * @param {JSONObject} comment is the JSONObject that is
 *    meant to be turned into a comment
 */
function makeDiv(comment){
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
  divOfComment.style.border='3px solid #b31b1b';
  divOfComment.style.margin='15px 0 15px';
  divOfComment.style.padding='10px';
  return divOfComment;
}

/**
<<<<<<< HEAD
 * Repopulates the comments by first updating the query string 
 * based on the max-number-display and sort-comments select,
=======
 * Updates the query string based on the max-number-display
 * and sort-comments select.
>>>>>>> Adds queryString changes to script-home and servlet
 */
function updateComments() {
    const /** string */ maxNumberDropdown =
        document.getElementById('max-number-display').value;
    // Each select value is stored as a JSON, to allow for more than one value
    // to be used, the code below just parses the sort-comments select element 
    // and gets the two values of the JSON
    const /** string */entityProperty = 
        JSON.parse(document.getElementById('sort-comments'
            ).value)['entityProperty'];
    const /** string */sortDirection = 
        JSON.parse(document.getElementById('sort-comments'
            ).value)['sortDirection'];
<<<<<<< HEAD
    queryString = '/comments?max-number-display='+maxNumberDropdown+'&sort-direction='+
        sortDirection+'&entity-property='+entityProperty;
    // Re-fetches comments
    populateComments();
}

/**
 * Deletes all the comments from the servlet.
 */
function deleteComments() {
  const /** object */ deleteInit = { method: 'POST' };
  const /** Request */ deleteRequest = new Request('/delete-data', deleteInit);
  fetch(deleteRequest).then(populateComments());
}
=======
  const params = new URLSearchParams();
  params.append('lat', lat);
  params.append('lng', lng);
  params.append('content', content);
  return params;
}

>>>>>>> Adds queryString changes to script-home and servlet
