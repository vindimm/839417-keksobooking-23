import {isEscEvent} from './utils.js';

const ALERT_SHOW_TIME = 5000;

const hideSuccessMessage = () => {
  document.querySelector('.success').remove();
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onSuccessPopupEscKeydown);
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('click', onSuccessPopupMouseClick);
};

const onSuccessPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    hideSuccessMessage();
  }
};

const onSuccessPopupMouseClick = (evt) => {
  evt.preventDefault();
  hideSuccessMessage();
};

const showAlertMessage = (message) => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '20px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const showSuccessMessage = () => {
  const templateFragment = document.querySelector('#success').content;
  const template = templateFragment.querySelector('.success');
  const successMessage = template.cloneNode(true);
  document.querySelector('body').appendChild(successMessage);
  document.addEventListener('click', onSuccessPopupMouseClick);
  document.addEventListener('keydown', onSuccessPopupEscKeydown);
};

export {showAlertMessage, hideSuccessMessage, showSuccessMessage};
