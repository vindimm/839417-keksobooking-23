import {INITIAL_MAIN_PIN_MARKER_LAT, INITIAL_MAIN_PIN_MARKER_LNG, resetMainPinMarker} from './generate-map.js';
import {showAlertMessage} from './popup-messages.js';
import {sendData} from './link-backend.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;
const MIN_BUNGALOW_PRICE = 0;
const MIN_FLAT_PRICE = 1000;
const MIN_HOTEL_PRICE = 3000;
const MIN_HOUSE_PRICE = 5000;
const MIN_PALACE_PRICE = 10000;
const ROOM_NUMBER_OPTION_1 = 1;
const ROOM_NUMBER_OPTION_2 = 2;
const ROOM_NUMBER_OPTION_3 = 3;
const ROOM_NUMBER_OPTION_4 = 100;

let minPriceValue = 1000;

const advertForm = document.querySelector('.ad-form');
const advertFieldsets = advertForm.querySelectorAll('fieldset');
const filterForm = document.querySelector('.map__filters');
const filterFieldsets = filterForm.querySelectorAll('fieldset');
const filterSelects = filterForm.querySelectorAll('select');
const advertFormTitleInput = advertForm.querySelector('#title');
const advertFormPriceInput = advertForm.querySelector('#price');
const advertFormHousingType = advertForm.querySelector('#type');
const advertFormRoomNumber = advertForm.querySelector('#room_number');
const advertFormCapacity = advertForm.querySelector('#capacity');
const advertFormCapacityOptions = advertFormCapacity.querySelectorAll('option');
const advertFormTimeIn = advertForm.querySelector('#timein');
const advertFormTimeOut = advertForm.querySelector('#timeout');
const advertFormAddress = advertForm.querySelector('#address');
const advertFormFeatures = advertForm.querySelectorAll('input');
const advertFormDescription = advertForm.querySelector('#description');
const filterFormHousingSelects = filterForm.querySelectorAll('select');
const filterFormHousingFeatures = filterForm.querySelectorAll('input');
const advertFormResetButton = advertForm.querySelector('.ad-form__reset');

const deactivateForms = () => {
  advertForm.classList.add('ad-form--disabled');
  filterForm.classList.add('map__filters--disabled');
  advertFieldsets.forEach((element) => {
    element.disabled = true;
  });
  filterFieldsets.forEach((element) => {
    element.disabled = true;
  });
  filterSelects.forEach((element) => {
    element.disabled = true;
  });
};

const activateForms = () => {
  advertForm.classList.remove('ad-form--disabled');
  filterForm.classList.remove('map__filters--disabled');
  advertFieldsets.forEach((element) => {
    element.disabled = false;
  });
  filterFieldsets.forEach((element) => {
    element.disabled = false;
  });
  filterSelects.forEach((element) => {
    element.disabled = false;
  });
};

const resetAdvertForm = () => {
  advertFormTitleInput.value = '';
  advertFormPriceInput.value = '';
  advertFormPriceInput.placeholder = MIN_FLAT_PRICE.toString();
  advertFormPriceInput.min = MIN_FLAT_PRICE;
  minPriceValue = MIN_FLAT_PRICE;
  advertFormHousingType.value = 'flat';
  advertFormRoomNumber.value = 1;
  advertFormCapacity.value = 1;
  advertFormTimeIn.value = '12:00';
  advertFormTimeOut.value = '12:00';
  advertFormAddress.value = `${INITIAL_MAIN_PIN_MARKER_LAT}, ${INITIAL_MAIN_PIN_MARKER_LNG}`;
  advertFormDescription.value = '';
  advertFormFeatures.forEach((checkbox) => checkbox.checked = false);
};

const resetFilterForm = () => {
  filterFormHousingSelects.forEach((select) => select.value = 'any');
  filterFormHousingFeatures.forEach((checkbox) => checkbox.checked = false);
};

const setAdvertFormSubmit = (onSuccess) => {
  advertForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => showAlertMessage('Не удалось отправить форму. Попробуйте ещё раз'),
      new FormData(evt.target),
    );
  });
};

advertFormTitleInput.addEventListener('input', () => {
  const valueLength = advertFormTitleInput.value.length;
  if (valueLength < MIN_TITLE_LENGTH) {
    advertFormTitleInput.setCustomValidity(`Нужно еще ${MIN_TITLE_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    advertFormTitleInput.setCustomValidity(`Удалите лишние ${valueLength - MAX_TITLE_LENGTH} симв.`);
  } else {
    advertFormTitleInput.setCustomValidity('');
  }
  advertFormTitleInput.reportValidity();
});

advertFormPriceInput.addEventListener('input', () => {
  const valuePrice = advertFormPriceInput.value;
  if (valuePrice > MAX_PRICE_VALUE) {
    advertFormPriceInput.setCustomValidity(`Слишком большая цена. Максимальная цена равна ${MAX_PRICE_VALUE} руб.`);
  } else if (valuePrice < minPriceValue) {
    advertFormPriceInput.setCustomValidity(`Минимальная цена для этого жилья равна ${minPriceValue} руб.`);
  } else {
    advertFormPriceInput.setCustomValidity('');
  }
  advertFormPriceInput.reportValidity();
});

advertFormHousingType.addEventListener('change', () => {
  switch (advertFormHousingType.value) {
    case 'bungalow':
      advertFormPriceInput.placeholder = MIN_BUNGALOW_PRICE.toString();
      advertFormPriceInput.min = MIN_BUNGALOW_PRICE;
      minPriceValue = MIN_BUNGALOW_PRICE;
      break;
    case 'flat':
      advertFormPriceInput.placeholder = MIN_FLAT_PRICE.toString();
      advertFormPriceInput.min = MIN_FLAT_PRICE;
      minPriceValue = MIN_FLAT_PRICE;
      break;
    case 'hotel':
      advertFormPriceInput.placeholder = MIN_HOTEL_PRICE.toString();
      advertFormPriceInput.min = MIN_HOTEL_PRICE;
      minPriceValue = MIN_HOTEL_PRICE;
      break;
    case 'house':
      advertFormPriceInput.placeholder = MIN_HOUSE_PRICE.toString();
      advertFormPriceInput.min = MIN_HOUSE_PRICE;
      minPriceValue = MIN_HOUSE_PRICE;
      break;
    case 'palace':
      advertFormPriceInput.placeholder = MIN_PALACE_PRICE.toString();
      advertFormPriceInput.min = MIN_PALACE_PRICE;
      minPriceValue = MIN_PALACE_PRICE;
      break;
  }
});

advertFormRoomNumber.addEventListener('change', () => {
  if (advertFormRoomNumber.value === ROOM_NUMBER_OPTION_1.toString()) {
    advertFormCapacityOptions[0].disabled = true;
    advertFormCapacityOptions[1].disabled = true;
    advertFormCapacityOptions[2].disabled = false;
    advertFormCapacityOptions[3].disabled = true;
    advertFormCapacityOptions[2].selected = true;
  } else if (advertFormRoomNumber.value === ROOM_NUMBER_OPTION_2.toString()) {
    advertFormCapacityOptions[0].disabled = true;
    advertFormCapacityOptions[1].disabled = false;
    advertFormCapacityOptions[2].disabled = false;
    advertFormCapacityOptions[3].disabled = true;
    advertFormCapacityOptions[1].selected = true;
  } else if (advertFormRoomNumber.value === ROOM_NUMBER_OPTION_3.toString()) {
    advertFormCapacityOptions[0].disabled = false;
    advertFormCapacityOptions[1].disabled = false;
    advertFormCapacityOptions[2].disabled = false;
    advertFormCapacityOptions[3].disabled = true;
    advertFormCapacityOptions[0].selected = true;
  } else if (advertFormRoomNumber.value === ROOM_NUMBER_OPTION_4.toString()) {
    advertFormCapacityOptions[0].disabled = true;
    advertFormCapacityOptions[1].disabled = true;
    advertFormCapacityOptions[2].disabled = true;
    advertFormCapacityOptions[3].disabled = false;
    advertFormCapacityOptions[3].selected = true;
  }
});

advertFormTimeIn.addEventListener('change', () => {
  advertFormTimeOut.value = advertFormTimeIn.value;
});

advertFormTimeOut.addEventListener('change', () => {
  advertFormTimeIn.value = advertFormTimeOut.value;
});

advertFormResetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetMainPinMarker();
  resetAdvertForm();
  resetFilterForm();
});

export {deactivateForms};
export {activateForms};
export {setAdvertFormSubmit};
export {resetAdvertForm};
export {resetFilterForm};
