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

/*
 * This waits until the webpage loads and then it calls the anonymous function, which calls main.
 */
window.onload = function() { main(); }

/* 
 * function main() initializes the slideshows and the interactive elements on the website.
 */
function main() {
    const /** ?HTMLCollection */ slideShowGallery =
        new SlideShow(document.getElementsByClassName('gallery-slides'));
    const /** ?HTMLCollection */ slideShowBlog  =
        new SlideShow(document.getElementsByClassName('blog-slides'));

    slideShowBlog.setToAutomaticallyChangeSlides();

    document.getElementById('switch-slides-left').onclick =
        function adjustBackOne() {
          slideShowGallery.adjustSlideManual(ADJUST_BACK); 
    }
    document.getElementById('switch-slides-right').onclick =
        function adjustForwardOne() {
          slideShowGallery.adjustSlideManual(ADJUST_FORWARD); 
    }
    // Fetches the pre-made comment list from the servlet and makes 
    // a list for each comment.
    fetch('/comments').then(response => response.json()).then((comments) => {
      const /** ?HTMLCollection */commentContainer =
            document.getElementById('comments-container');
      comments.forEach(function(comment) {
          commentContainer.appendChild(createListElement(comment));
      });
    });
    initMap();
}

/*
 * @return the <li> element containing text passed in.
 * @param {string} text is what is put into the <li>
 */
function createListElement(text) {
  const liElement = document.createElement('li');
  liElement.innerText = text;
  return liElement;
}

/*
 * Creates a map using the Google Maps API.
 */
function initMap() {
  // The callback function is attached to the 'window', called 
  // on by the callback of the mapScript below by one of its URL parameters.
  window.createMap = function() {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 9
    });
  };
  const mapScript = document.createElement('script');
  mapScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBI_pU_plN3tOYv6h0SohPZ7qWBWafJgvs&callback=createMap';
  mapScript.defer = true;
  mapScript.async = true;
  document.head.appendChild(mapScript);
}
