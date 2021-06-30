import {activateForms} from './form.js';
// Данные в виде массива JS-объектов
import {similarAdverts} from './data.js';
// Данные в виде document-fragment с HTML-разметкой внутри
import {tenAdverts} from './generate-offers.js';

const INITIAL_MAIN_PIN_MARKER_LAT = 35.68950;
const INITIAL_MAIN_PIN_MARKER_LNG = 139.77500;

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

const getCoordinatsFromOffer = (offer) => {
  const lat = Number.parseFloat(offer.address.split(' ')[0]);
  const lng = Number.parseFloat(offer.address.split(' ')[1]);
  return [lat, lng];
};

const renderMap = () => {
  const map = L.map('map-canvas')
    .on('load', () => {
      activateForms();
    })
    .setView({
      lat: INITIAL_MAIN_PIN_MARKER_LAT,
      lng: INITIAL_MAIN_PIN_MARKER_LNG,
    }, 12);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  similarAdverts.forEach(({offer}, index) => {
    const [lat, lng] = getCoordinatsFromOffer(offer);
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
      .bindPopup(tenAdverts.children[index]);
  });

  mainPinMarker.addTo(map);
  document.querySelector('#address').value = `${mainPinMarkerLat.toFixed(5)}, ${mainPinMarkerLng.toFixed(5)}`;
};

const setAdvertAddress = () => {
  mainPinMarker.on('moveend', (evt) => {
    mainPinMarkerLat = Number(evt.target.getLatLng().lat.toFixed(5));
    mainPinMarkerLng = evt.target.getLatLng().lng.toFixed(5);
    document.querySelector('#address').value = `${mainPinMarkerLat}, ${mainPinMarkerLng}`;
  });
};

export{renderMap, setAdvertAddress};
