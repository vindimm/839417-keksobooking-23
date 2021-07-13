import {activateForms} from './form.js';
import {renderNewAdvertMarkup} from './generate-offers.js';
import {currentFilterValues} from './filters.js';

const AMOUNT_ADVERTS = 10;
const INITIAL_MAP_VIEW_SCALE = 12.5;
const INITIAL_MAIN_PIN_MARKER_LAT = 35.67005;
const INITIAL_MAIN_PIN_MARKER_LNG = 139.75005;

let mainPinMarkerLat = INITIAL_MAIN_PIN_MARKER_LAT;
let mainPinMarkerLng = INITIAL_MAIN_PIN_MARKER_LNG;
let map;
let markerGroup;

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

const renderMap = () => {
  map = L.map('map-canvas')
    .on('load', () => {
      activateForms();
    })
    .setView({
      lat: INITIAL_MAIN_PIN_MARKER_LAT,
      lng: INITIAL_MAIN_PIN_MARKER_LNG,
    }, INITIAL_MAP_VIEW_SCALE);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainPinMarker.addTo(map);
  markerGroup = L.layerGroup().addTo(map);
  document.querySelector('#address').value = `${INITIAL_MAIN_PIN_MARKER_LAT}, ${INITIAL_MAIN_PIN_MARKER_LNG}`;
};

const renderMainPinMarker = () => {
  const mainMarker = L.marker(
    {
      INITIAL_MAIN_PIN_MARKER_LAT,
      INITIAL_MAIN_PIN_MARKER_LNG,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainMarker.addTo(map);
};

const resetMainPinMarker = () => {
  mainPinMarker.setLatLng({
    lat: INITIAL_MAIN_PIN_MARKER_LAT,
    lng: INITIAL_MAIN_PIN_MARKER_LNG,
  });
};

const resetMap = () => {
  map.setView({
    lat: INITIAL_MAIN_PIN_MARKER_LAT,
    lng: INITIAL_MAIN_PIN_MARKER_LNG,
  }, INITIAL_MAP_VIEW_SCALE);
};

const renderMarker = (advert) => {
  const advertMarkup = renderNewAdvertMarkup(advert);
  const {lat, lng} = advert.location;
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
    .addTo(markerGroup)
    .bindPopup(
      advertMarkup,
      {
        keepInView: true,
      },
    );
};

const renderMarkers = (adverts) => {
  markerGroup.clearLayers();

  // console.log(adverts);

  const advertsModified = adverts.slice();

  advertsModified.forEach((advert) => {
    if (advert.offer.price < 10000) {
      advert.offer.priceCategory = 'low';
    } else if (advert.offer.price < 50000) {
      advert.offer.priceCategory = 'middle';
    } else {
      advert.offer.priceCategory = 'high';
    }
    // некоторые объекты с сервера приходят без массива features
    if (advert.offer.features === undefined) {
      advert.offer.features = [];
    }
  });

  const filteredAdverts = advertsModified
    .slice()
    .filter((advert) => advert.offer.type === currentFilterValues.type || currentFilterValues.type === 'any')
    .filter((advert) => advert.offer.priceCategory === currentFilterValues.price || currentFilterValues.price === 'any')
    .filter((advert) => advert.offer.rooms === Number(currentFilterValues.rooms) || currentFilterValues.rooms === 'any')
    .filter((advert) => advert.offer.guests === Number(currentFilterValues.guests) || currentFilterValues.guests === 'any')
    .filter((advert) => (advert.offer.features.includes('wifi') && currentFilterValues.featuresWifi === true) || currentFilterValues.featuresWifi === false)
    .filter((advert) => (advert.offer.features.includes('dishwasher') && currentFilterValues.featuresDishwasher === true) || currentFilterValues.featuresDishwasher === false)
    .filter((advert) => (advert.offer.features.includes('parking') && currentFilterValues.featuresParking === true) || currentFilterValues.featuresParking === false)
    .filter((advert) => (advert.offer.features.includes('washer') && currentFilterValues.featuresWasher === true) || currentFilterValues.featuresWasher === false)
    .filter((advert) => (advert.offer.features.includes('elevator') && currentFilterValues.featuresElevator === true) || currentFilterValues.featuresElevator === false)
    .filter((advert) => (advert.offer.features.includes('conditioner') && currentFilterValues.featuresConditioner === true) || currentFilterValues.featuresConditioner === false)
    .slice(0, AMOUNT_ADVERTS);

  filteredAdverts.forEach((advert) => {
    renderMarker(advert);
  });
};

mainPinMarker.on('moveend', (evt) => {
  mainPinMarkerLat = Number(evt.target.getLatLng().lat.toFixed(5));
  mainPinMarkerLng = Number(evt.target.getLatLng().lng.toFixed(5));
  document.querySelector('#address').value = `${mainPinMarkerLat}, ${mainPinMarkerLng}`;
});

export {resetMainPinMarker, resetMap, renderMarkers, renderMainPinMarker};
export {renderMap};
export {INITIAL_MAIN_PIN_MARKER_LAT};
export {INITIAL_MAIN_PIN_MARKER_LNG};
