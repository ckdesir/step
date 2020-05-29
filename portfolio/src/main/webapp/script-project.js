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

var /** number */ slideIndexManualProject = 1;
manualSlideShowForProject(slideIndexManualProject);

/**
 * Increments/decrements the slide currently being showcased on the
 * project and switches to a new slide. 
 * @param {number} whichButtonClick
 */
function switchSlides(whichButtonClick) {
  manualSlideShowForProject(slideIndexManualProject += whichButtonClick);
}

/**
 * Based on the current index of the slideshow and which button was clicked,
 * this function correctly shows the required slideshow and hides those not
 * needed. 
 * @param {number} whichSlideToShow
 */
function manualSlideShowForProject(whichSlideToShow) {
  var /** ?HTMLCollection */ projectSlides =
      document.getElementsByClassName("project-slides");
  var /** ?number */ projectSlidesIndex;
  if (whichSlideToShow > projectSlides.length) {
    slideIndexManualProject = 1;
  }
  if (whichSlideToShow < 1) {
    slideIndexManualProject = projectSlides.length;
  }
  for (projectSlidesIndex = 0;
      projectSlidesIndex < projectSlides.length; projectSlidesIndex++) {
    projectSlides[projectSlidesIndex].style.display = 'none';  
  }
  projectSlides[slideIndexManualProject-1].style.display = 'block';  
}
