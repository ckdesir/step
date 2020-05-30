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

/** The SlideShow class maintains the slideshows on the website. */
class SlideShow {
  /**
   * Operates on an instance of SlideShow.
   * @param {?HTMLCollection} collectionOfSlides Holds a collection of slides
   *     from the webpage, defined by a class tag.
   */
  constructor(collectionOfSlides) {
    /** @private {?HTMLCollection} */
    this.slides_ = collectionOfSlides;

    /** @private {number} */
    this.slideIndex_ = 0;

    /** @private @const {number} */
    this.SLIDE_LENGTH_ = collectionOfSlides.length;

    /** @private @const {number} 4 seconds in miliseconds */
    this.TIME_BEFORE_SWITCH_ = 4000;

    /** @private @const {number} represents one increment of a slide */
    this.SINGLE_INCREMENT_ = 1;

    this.hideAll_();
  }

  /** 
   * Hides all the slides on the page initially.
   * @private
   */
  hideAll_() {
    let /** number */ currentIndex;
    for (currentIndex = 0; currentIndex < this.SLIDE_LENGTH_; currentIndex++) {
      this.slides_[currentIndex].style.display = 'none';  
    }
  }

  /**
   * Based on the current index of the slideshow this function correctly
   * shows the required slideshow by changing it's display to block,
   * and hides the slide previously displayed by changing it's display to none.
   * @param {number} incrementIndex
   */
  showSlide(incrementIndex) {
    this.slides_[this.slideIndex_].style.display = 'none';
    this.slideIndex_ += incrementIndex
    this.slideIndex_ %= this.SLIDE_LENGTH_;
    this.slides_[this.slideIndex_].style.display = 'block';
  }

  /**
   * Automatically changes the slides for the blog every 4 seconds.
   */
  automaticSlideShow() {
    this.showSlide(this.SINGLE_INCREMENT_);
    /**
     * Calls automaticSlideShow() again after 4 seconds.
     */
    setTimeout(() => {
      this.automaticSlideShow()
    },this.TIME_BEFORE_SWITCH_); 
  }

}