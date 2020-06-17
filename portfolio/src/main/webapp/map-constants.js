/** 
 * A custom color scheme of the map + basic properties for initialization
 * (like initial center of map + zoom level).
 * @type {object}
 */
const MAP_OPTIONS = {
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

/**
 * Includes some markers about my favorite spots.
 * @type {object}
 */
const MARKERS = [
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

/**
 * Outlines the polygon surrounding the Bermuda Triangle.
 * @type {object}
 */
const BERMUDA_TRIANGLE = new google.maps.Polygon({
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

export { MAP_OPTIONS, MARKERS, BERMUDA_TRIANGLE };
