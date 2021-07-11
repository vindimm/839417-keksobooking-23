import {deactivateForms, resetAdvertForm, resetFilterForm, setAdvertFormSubmit} from './form.js';
import {resetMainPinMarker, renderMap} from './generate-map.js';
import {getData} from './link-backend.js';

const refreshPage = () => {
  resetAdvertForm();
  resetFilterForm();
  resetMainPinMarker();
};

deactivateForms();

getData((adverts) => {
  renderMap(adverts);
});

setAdvertFormSubmit(refreshPage);
