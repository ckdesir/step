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
  const mapScript = document.createElement('script');
  mapScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBI_pU_plN3tOYv6h0SohPZ7qWBWafJgvs&callback=createMap';
  mapScript.defer = true;
  mapScript.async = true;
  // The callback function is attached to the 'window', called 
  // on by the callback of the mapScript above. 
  window.createMap = function() {
    const mapOptions = {
      center: { lat: 37.422, lng: -122.084 },
      zoom: 9,
      styles: [
        {
          "featureType": "road",
          "stylers": [
            {
              "color": "#b31b1b"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#c0c0c0"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#b31b1b"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#c0c0c0"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#b31b1b"
            }
          ]
        }
      ]
    };
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
    const markerLocations = [
      {
        name: 'Collegetown Bagels', 
        location: new google.maps.LatLng(42.442262, -76.484958),
        information: 'One of my favorite places to break my fast in the' +
          ' mornings, highly recommend!'
      },
      {
        name: 'Cozumel, Mexico',
        location: new google.maps.LatLng(20.4230, -86.9223),
        information: 'Went here for the one and only cruise I have ever been' +
          ' on, I don\'t recommend cruises for the faint of heart.'
      },
      {
        name: 'Haiti',
        location: new google.maps.LatLng(18.9712, -72.2852),
        information: 'The land of my peoples 😃'
      },
      {
        name: 'Bermuda',
        location: new google.maps.LatLng(32.3078, -64.7505),
        information: 'Spooky!'
      },
      {
        name: 'Delaware',
        location: new google.maps.LatLng(39.1852, -75.5244),
        information: 'Also known as the first state, and that\'s all ' +
          'it has going for it'
      },
      {
        name: 'Anaheim, CA',
        location: new google.maps.LatLng(33.8366, -117.9143),
        information: 'Went here for a \"field trip\" once; Disney is pretty ' +
          'cool + In-N-Out is overrated'
      },
      {
        name: 'Kansas City, MO',
        location: new google.maps.LatLng(39.0997, -94.5786),
        information: 'Another \"field trip\", the food and vibes here were ' +
          'amazing'
      },
    ]
    markerLocations.forEach(function (place) {
      createMarker(map, place.location, place.name, place.information);
    });
  };
  document.head.appendChild(mapScript);
}

/**
 * Creates a simple marker with a name and a info window with click listener
 * @param {object} map 
 * @param {pbject} location
 * @param {string} name
 * @param {string} information 
 */
function createMarker(map, location, name, information) {
  const marker = new google.maps.Marker({
    position: location,
    map: map,
    title: name
  });
  const infoWindow = new google.maps.InfoWindow();
  google.maps.event.addListener(marker, 'click', (function (marker, information, infoWindow) {
    return function () {
      infoWindow.close()
      infoWindow.setContent(information);
      infoWindow.open(map,marker);
    }
  })(marker, information, infoWindow)); 
}
