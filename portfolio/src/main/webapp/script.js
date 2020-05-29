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

var /** number */ slideIndexManual = 1;
var /** number */ slideIndexAutomatic = 1;
manualSlideShowForGallery(slideIndexManual);
automaticSlideShowForBlog();

/**
 * Increments/decrements the slide currently being showcased on the
 * gallery and switches to a new slide. 
 * @param {number} whichButtonClick
 */
function switchSlides(whichButtonClick) {
  manualSlideShowForGallery(slideIndexManual += whichButtonClick);
}

/**
 * Based on the current index of the slideshow and which button was clicked,
 * this function correctly shows the required slideshow and hides those not
 * needed. 
 * @param {number} whichSlideToShow
 */
function manualSlideShowForGallery(whichSlideToShow) {
  var /** ?HTMLCollection */ gallerySlides =
      document.getElementsByClassName("gallery-slides");
  var /** ?number */ gallerySlidesIndex;
  if (whichSlideToShow > gallerySlides.length) {
    slideIndexManual = 1;
  }
  if (whichSlideToShow < 1) {
    slideIndexManual = gallerySlides.length;
  }
  for (gallerySlidesIndex = 0;
      gallerySlidesIndex < gallerySlides.length; gallerySlidesIndex++) {
    gallerySlides[gallerySlidesIndex].style.display = 'none';  
  }
  gallerySlides[slideIndexManual-1].style.display = 'block';  
}

/**
 * Automatically changes the slides for the blog every 4 seconds.
 */
function automaticSlideShowForBlog() {
  var /** ?HTMLCollection */ blogSlides =
      document.getElementsByClassName("blog-slides");
  var /** ?number */ blogSlidesIndex;
  for (blogSlidesIndex = 0;
      blogSlidesIndex < blogSlides.length;  blogSlidesIndex++) {
    blogSlides[blogSlidesIndex].style.display = "none";
  }
  slideIndexAutomatic++;
  if (slideIndexAutomatic > blogSlides.length) {
    slideIndexAutomatic = 1;
  }
  blogSlides[slideIndexAutomatic-1].style.display = "block";
  setTimeout(automaticSlideShowForBlog, 4000); 
}
