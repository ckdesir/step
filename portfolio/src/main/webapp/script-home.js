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

let map;

/* Editable marker that displays when a user clicks in the map. */
let editMarker;

/*
 * This waits until the webpage loads and then it calls the anonymous function, which calls main.
 */
window.onload = function() { main(); }

/* 
 * function main() initializes the slideshows and the interactive elements on the website.
 */
function main() {
    initMap();
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

function initMap() {
  // A custom color scheme of the map + basic properties for initialization
  // (like initial center of map + zoom level)
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
  const markerLocations = [
    {
      name: 'Collegetown Bagels',
      location: new google.maps.LatLng(42.442262, -76.484958),
      content: 'One of my favorite places to break my fast in the' +
          ' mornings, highly recommend!'
    },
    {
      name: 'Cozumel, Mexico',
      location: new google.maps.LatLng(20.4230, -86.9223),
      content: 'Went here for the one and only cruise I have ever been' +
          ' on, I don\'t recommend cruises for the faint of heart.'
    },
    {
      name: 'Haiti',
      location: new google.maps.LatLng(18.9712, -72.2852),
      content: 'The land of my peoples 😃'
    },
    {
      name: 'Bermuda Triangle',
      location: new google.maps.LatLng(25.52, -70.35),
      content: 'Spooky!'
    },
    {
      name: 'Delaware',
      location: new google.maps.LatLng(39.1852, -75.5244),
      content: 'Also known as the first state, and that\'s all ' +
          'it is known for!'
    },
    {
      name: 'Anaheim, CA',
      location: new google.maps.LatLng(33.8366, -117.9143),
      content: 'Went here for a \"field trip\" once; Disney is pretty ' +
          'cool + In-N-Out is overrated'
    },
    {
      name: 'Kansas City, MO',
      location: new google.maps.LatLng(39.0997, -94.5786),
      content: 'Another \"field trip\", the food and vibes here were ' +
          'amazing'
    },
  ];
  // Constructs the polygon outlining the Bermuda Triangle
  const bermudaTriangle = new google.maps.Polygon({
    paths: [
      { lat: 25.774, lng: -80.190 },
      { lat: 18.466, lng: -66.118 },
      { lat: 32.321, lng: -64.757 },
      { lat: 25.774, lng: -80.190 }
    ],
    strokeColor: '#b31b1b',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillOpacity: 0.0
  });

  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  markerLocations.forEach(function (place) {
    createMarkerForDisplay(
        place.location, place.content, 'red', place.name);
  });
  // When the user clicks in the map, show a marker with a text box the user can
  // edit.
  map.addListener('click', (event) => {
    createMarkerForEdit(event.latLng.lat(), event.latLng.lng());
  });
  bermudaTriangle.setMap(map);
  fetchMarkers();
}

/** Fetches markers from the backend and adds them to the map. */
function fetchMarkers() {
  fetch('/markers').then(response => response.json()).then((markers) => {
    markers.forEach(
      (marker) => {
        createMarkerForDisplay(new google.maps.LatLng(marker.lat, marker.lng),
            marker.content, 'blue');
      });
  });
}

/** Creates a marker that shows a read-only info window when clicked.
 * @param {object} location - location of marker
 * @param {string} content - content for infoWindow
 * @param {string} color - color of marker
 * @param {string} name - name of marker
 */
function createMarkerForDisplay(location, content, color, name = 'Visitor') {
  const marker =
    new google.maps.Marker(
      {
        position: location,
        map: map,
        icon: { 
          url: 'http://maps.google.com/mapfiles/ms/icons/' + color + '-dot.png'
        }
      }
    );
  const infoWindow = new google.maps.InfoWindow({ content: content });
  marker.addListener('click', () => {
    infoWindow.close();
    infoWindow.open(map, marker);
  });
}

/** Creates a blue marker that shows a textbox the user can edit. */
function createMarkerForEdit(lat, lng) {
  // If we're already showing an editable marker, then remove it.
  if (editMarker) {
    editMarker.setMap(null);
  }
  editMarker =
    new google.maps.Marker(
      {
        position: { lat: lat, lng: lng },
        map: map,
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        }
      }
    );
  const infoWindow =
      new google.maps.InfoWindow({ content: buildInfoWindowInput(lat, lng) });
  // When the user closes the editable info window, remove the marker.
  google.maps.event.addListener(infoWindow, 'closeclick', () => {
    editMarker.setMap(null);
  });
  infoWindow.open(map, editMarker);
}

/**
 * Builds and returns HTML elements that show an editable textbox and a submit
 * button.
 */
function buildInfoWindowInput(lat, lng) {
  const textBox = document.createElement('textarea');
  const button = document.createElement('button');
  button.appendChild(document.createTextNode('Submit'));

  button.onclick = () => {
    saveMarker(lat, lng, textBox.value);
    createMarkerForDisplay(new google.maps.LatLng(lat,lng), 
        textBox.value, 'blue');
    editMarker.setMap(null);
  };

  const containerDiv = document.createElement('div');
  containerDiv.appendChild(textBox);
  containerDiv.appendChild(document.createElement('br'));
  containerDiv.appendChild(button);

  return containerDiv;
}

/** Sends a marker to the backend for saving. */
function saveMarker(lat, lng, content) {
  const params = new URLSearchParams();
  params.append('lat', lat);
  params.append('lng', lng);
  params.append('content', content);

  fetch('/markers', { method: 'POST', body: params });
}
