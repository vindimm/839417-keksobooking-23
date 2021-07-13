const filterForm = document.querySelector('.map__filters');

const DEFAULT_FILTER_VALUES = {
  type: 'any',
  price: 'any',
  rooms: 'any',
  guests: 'any',
  featuresWifi: false,
  featuresDishwasher: false,
  featuresParking: false,
  featuresWasher: false,
  featuresElevator: false,
  featuresConditioner: false,
};

const currentFilterValues = DEFAULT_FILTER_VALUES;

const getFilterValues = () => {
  // console.log(filterForm.querySelector('#housing-type option[value = flat]').selected);

  currentFilterValues.type = filterForm.querySelector('#housing-type').value;
  currentFilterValues.price = filterForm.querySelector('#housing-price').value;
  currentFilterValues.rooms = filterForm.querySelector('#housing-rooms').value;
  currentFilterValues.guests = filterForm.querySelector('#housing-guests').value;
  currentFilterValues.featuresWifi = filterForm.querySelector('#filter-wifi').checked;
  currentFilterValues.featuresDishwasher = filterForm.querySelector('#filter-dishwasher').checked;
  currentFilterValues.featuresParking = filterForm.querySelector('#filter-parking').checked;
  currentFilterValues.featuresWasher = filterForm.querySelector('#filter-washer').checked;
  currentFilterValues.featuresElevator = filterForm.querySelector('#filter-elevator').checked;
  currentFilterValues.featuresConditioner = filterForm.querySelector('#filter-conditioner').checked;
};


// const getAdvertRank = (advert) => {
//   let rank = 0;
//   console.log(advert);
// };

const onFilterFormChange = (cb) => {
  filterForm.addEventListener('change', () => {
    getFilterValues();
    cb();
  });
};

export {onFilterFormChange, currentFilterValues};
