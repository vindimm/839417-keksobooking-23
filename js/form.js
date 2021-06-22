const advertForm = document.querySelector('.ad-form');
const advertFieldsets = advertForm.querySelectorAll('fieldset');
const filterForm = document.querySelector('.map__filters');
const filterFieldsets = filterForm.querySelectorAll('fieldset');
const filterSelects = filterForm.querySelectorAll('select');

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

export {deactivateForms};
export {activateForms};
