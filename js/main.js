import {deactivateForms, resetAdvertForm, resetFilterForm, setAdvertFormSubmit} from './form.js';
import {resetMainPinMarker, renderMap} from './generate-map.js';
import {getData} from './api.js';
import {showAlertMessage} from './popup-messages.js';
// import {onFilterFormChange} from '/.filters.js';

const refreshPage = () => {
  resetAdvertForm();
  resetFilterForm();
  resetMainPinMarker();
};

deactivateForms();

getData(
  (adverts) => renderMap(adverts),
  () => showAlertMessage('Упс... Данные не загрузились'),
);

setAdvertFormSubmit(refreshPage);

// onFilterFormChange();
