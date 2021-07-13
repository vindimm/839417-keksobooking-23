import {deactivateForms, resetAdvertForm, resetFilterForm, setAdvertFormSubmit} from './form.js';
import {resetMainPinMarker, renderMap, renderMarkers} from './map.js';
import {getData} from './api.js';
import {showAlertMessage} from './popup-messages.js';
import {onFilterFormChange} from './filters.js';

const refreshPage = () => {
  resetAdvertForm();
  resetFilterForm();
  resetMainPinMarker();
};

deactivateForms();

getData(
  (adverts) => {
    renderMap(adverts);
    renderMarkers(adverts);
    onFilterFormChange(() => renderMarkers(adverts));
  },
  () => showAlertMessage('Упс... Данные не загрузились'),
);

setAdvertFormSubmit(refreshPage);
