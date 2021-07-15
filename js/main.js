import {deactivateForms, resetAdvertForm, resetFilterForm, setAdvertFormSubmit} from './form.js';
import {resetMainPinMarker, renderMap, renderMarkers, resetMap} from './map.js';
import {getData} from './api.js';
import {showAlertMessage} from './popup-messages.js';
import {onFilterFormChange} from './filters.js';
import {debounce} from './utils/debounce.js';
import {resetPhotos} from './upload-foto.js';

const RERENDER_DELAY = 500;

deactivateForms();

getData(
  (adverts) => {
    renderMap(adverts);
    renderMarkers(adverts);
    onFilterFormChange(debounce(
      () => renderMarkers(adverts),
      RERENDER_DELAY,
    ));
  },
  () => showAlertMessage('Упс... Данные не загрузились'),
);

setAdvertFormSubmit(() => {
  resetAdvertForm();
  resetFilterForm();
  resetMap();
  resetMainPinMarker();
  resetPhotos();
});
