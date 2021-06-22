import {oneAdvert} from './generate-offers.js';
import {tenAdverts} from './generate-offers.js';
import {deactivateForms, activateForms} from './form.js';

const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(oneAdvert);
deactivateForms();
activateForms();

tenAdverts;
