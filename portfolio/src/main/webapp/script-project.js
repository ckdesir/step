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
 * This waits until the webpage loads and then it calls the
 * anonymous function, which calls main.
 */
window.onload = function() { main(); }

/* 
 * function main() initializes the slideshows and 
 * the interactive elements on the projects webpage.
 */
function main() {
    const /** ?HTMLCollection */ slideshowProjects =
      new SlideShow(document.getElementsByClassName('project-slides'));

    document.getElementById('switch-slides-left').onclick =
        function adjustBackOne() {
          slideshowProjects.adjustSlideManual(ADJUST_BACK); 
    };
    document.getElementById('switch-slides-right').onclick =
        function adjustForwardOne() {
          slideshowProjects.adjustSlideManual(ADJUST_FORWARD); 
    };
}
