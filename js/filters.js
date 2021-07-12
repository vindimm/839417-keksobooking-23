
const filterForm = document.querySelector('.map__filters');

const onFilterFormChange = (cb) => {
  filterForm.addEventListener('change', () => {
    console.log('FORZA ITALY!!!!!!');
    cb();
  });
};

export {onFilterFormChange};
