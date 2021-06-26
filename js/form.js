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
let minPriceValue = 1000;

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

export {deactivateForms};
export {activateForms};
