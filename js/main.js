import {deactivateForms} from './form.js';
import {setAdvertFormSubmit} from './form.js';
import {resetAdvertForm} from './form.js';
import {resetFilterForm} from './form.js';
import {resetMainPinMarker} from './generate-map.js';
import './link-backend.js';

const refreshPage = () => {
  resetAdvertForm();
  resetFilterForm();
  resetMainPinMarker();
};
deactivateForms();
setAdvertFormSubmit(refreshPage);
