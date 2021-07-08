import {renderMap, setAdvertAddress} from './generate-map.js';
import {renderAdvertsMarkup} from './generate-offers.js';

fetch('https://23.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((adverts) => {
    const advertsMarkup = renderAdvertsMarkup(adverts);
    renderMap(adverts, advertsMarkup);
    setAdvertAddress(adverts);
  });
