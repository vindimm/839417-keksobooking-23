const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;

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
      advertFormPriceInput.placeholder = '0';
      advertFormPriceInput.min = 0;
      minPriceValue = 0;
      break;
    case 'flat':
      advertFormPriceInput.placeholder = '1000';
      advertFormPriceInput.min = 1000;
      minPriceValue = 1000;
      break;
    case 'hotel':
      advertFormPriceInput.placeholder = '3000';
      advertFormPriceInput.min = 3000;
      minPriceValue = 3000;
      break;
    case 'house':
      advertFormPriceInput.placeholder = '5000';
      advertFormPriceInput.min = 5000;
      minPriceValue = 5000;
      break;
    case 'palace':
      advertFormPriceInput.placeholder = '10000';
      advertFormPriceInput.min = 10000;
      minPriceValue = 10000;
      break;
    default:
      advertFormPriceInput.placeholder = '1000';
      advertFormPriceInput.min = 1000;
      minPriceValue = 1000;
      break;
  }
});

advertFormRoomNumber.addEventListener('change', () => {
  if (advertFormRoomNumber.value === '1') {
    advertFormCapacityOptions[0].disabled = true;
    advertFormCapacityOptions[1].disabled = true;
    advertFormCapacityOptions[2].disabled = false;
    advertFormCapacityOptions[3].disabled = true;
    advertFormCapacityOptions[2].selected = true;
  } else if (advertFormRoomNumber.value === '2') {
    advertFormCapacityOptions[0].disabled = true;
    advertFormCapacityOptions[1].disabled = false;
    advertFormCapacityOptions[2].disabled = false;
    advertFormCapacityOptions[3].disabled = true;
    advertFormCapacityOptions[1].selected = true;
  } else if (advertFormRoomNumber.value === '3') {
    advertFormCapacityOptions[0].disabled = false;
    advertFormCapacityOptions[1].disabled = false;
    advertFormCapacityOptions[2].disabled = false;
    advertFormCapacityOptions[3].disabled = true;
    advertFormCapacityOptions[0].selected = true;
  } else if (advertFormRoomNumber.value === '100') {
    advertFormCapacityOptions[0].disabled = true;
    advertFormCapacityOptions[1].disabled = true;
    advertFormCapacityOptions[2].disabled = true;
    advertFormCapacityOptions[3].disabled = false;
    advertFormCapacityOptions[3].selected = true;
  }
});

export {deactivateForms};
export {activateForms};
