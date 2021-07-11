import {activateForms} from './form.js';
import {renderAdvertsMarkup} from './generate-offers.js';

const INITIAL_MAIN_PIN_MARKER_LAT = 35.67005;
const INITIAL_MAIN_PIN_MARKER_LNG = 139.75005;

let mainPinMarkerLat = INITIAL_MAIN_PIN_MARKER_LAT;
let mainPinMarkerLng = INITIAL_MAIN_PIN_MARKER_LNG;

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: INITIAL_MAIN_PIN_MARKER_LAT,
    lng: INITIAL_MAIN_PIN_MARKER_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const renderMap = (similarAdverts) => {
  const advertsMarkup = renderAdvertsMarkup(similarAdverts);

  const map = L.map('map-canvas')
    .on('load', () => {
      activateForms();
    })
    .setView({
      lat: INITIAL_MAIN_PIN_MARKER_LAT,
      lng: INITIAL_MAIN_PIN_MARKER_LNG,
    }, 12.5);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  similarAdverts.forEach(({location}, index) => {
    const {lat, lng} = location;
    const icon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });
    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon,
      },
    );
    marker
      .addTo(map)
      .bindPopup(advertsMarkup.children[index]);
  });

  mainPinMarker.addTo(map);
  document.querySelector('#address').value = `${mainPinMarkerLat.toFixed(5)}, ${mainPinMarkerLng.toFixed(5)}`;

  mainPinMarker.on('moveend', (evt) => {
    mainPinMarkerLat = Number(evt.target.getLatLng().lat.toFixed(5));
    mainPinMarkerLng = Number(evt.target.getLatLng().lng.toFixed(5));
    document.querySelector('#address').value = `${mainPinMarkerLat}, ${mainPinMarkerLng}`;
  });
};

const resetMainPinMarker = () => {
  mainPinMarker.setLatLng({
    lat: INITIAL_MAIN_PIN_MARKER_LAT,
    lng: INITIAL_MAIN_PIN_MARKER_LNG,
  });
};

export {renderMap};
export {resetMainPinMarker};
export {INITIAL_MAIN_PIN_MARKER_LAT};
export {INITIAL_MAIN_PIN_MARKER_LNG};
