import {similarAdverts} from './data.js';

const createFeaturesList = (list, items, indexOfAdvert) => {
  items.forEach((item) => {
    item.remove();
  });
  similarAdverts[indexOfAdvert].offer.features.forEach((item) => {
    const newFeature = document.createElement('li');
    newFeature.classList.add('popup__feature');
    newFeature.classList.add(`popup__feature--${item}`);
    list.appendChild(newFeature);
  });
};

const createPhotosList = (list, item, indexOfAdvert) => {
  item.remove();
  similarAdverts[indexOfAdvert].offer.photos.map((imgSrc) => {
    const newPhoto = item.cloneNode(true);
    newPhoto.src = imgSrc;
    list.append(newPhoto);
  });
};

const createNewAdvert = (indexAdvert) => {
  const templateFragment = document.querySelector('#card').content;
  const template = templateFragment.querySelector('.popup');
  const element = template.cloneNode(true);
  const popupTitle = element.querySelector('.popup__title');
  const popupAddress = element.querySelector('.popup__text--address');
  const popupPrice = element.querySelector('.popup__text--price');
  const popupType = element.querySelector('.popup__type');
  const popupCapacity = element.querySelector('.popup__text--capacity');
  const popupTime = element.querySelector('.popup__text--time');
  const popupDescription = element.querySelectorAll('.popup__description');
  const popupAvatar = element.querySelector('.popup__avatar');
  const popupFeatureList = element.querySelector('.popup__features');
  const popupFeatureItems = element.querySelectorAll('.popup__feature');
  const popupPhotosList = element.querySelector('.popup__photos');
  const popupPhotoItem = element.querySelector('.popup__photo');

  popupTitle.textContent = similarAdverts[indexAdvert].offer.title;
  popupAddress.textContent = similarAdverts[indexAdvert].offer.address;
  popupPrice.textContent = `${similarAdverts[indexAdvert].offer.price} ₽/ночь`;
  popupType.textContent = similarAdverts[indexAdvert].offer.type;
  popupCapacity.textContent =`${similarAdverts[indexAdvert].offer.rooms} комнаты для ${similarAdverts[indexAdvert].offer.guests} гостей`;
  popupTime.textContent = `Заезд после ${similarAdverts[indexAdvert].offer.checkin}, выезд до ${similarAdverts[indexAdvert].offer.checkout}`;
  popupDescription.textContent = similarAdverts[indexAdvert].offer.description;
  popupAvatar.src = similarAdverts[indexAdvert].author.avatar;
  switch (similarAdverts[indexAdvert].offer.type) {
    case 'flat':
      popupType.textContent = 'Квартира';
      break;
    case 'bungalow':
      popupType.textContent = 'Бунгало';
      break;
    case 'house':
      popupType.textContent = 'Дом';
      break;
    case 'palace':
      popupType.textContent = 'Дворец';
      break;
    case 'hotel':
      popupType.textContent = 'Отель';
      break;
    default:
      popupType.textContent = similarAdverts[indexAdvert].offer.type;
  }
  createFeaturesList(popupFeatureList, popupFeatureItems, indexAdvert);
  createPhotosList(popupPhotosList, popupPhotoItem, indexAdvert);

  return element;
};

// создание 10 объявлений
const fragment = document.createDocumentFragment();
for (let i = 0; i < similarAdverts.length; i++) {
  const newAdvert = createNewAdvert(i);
  fragment.appendChild(newAdvert);
}
const tenAdverts = fragment;


// создание 1 объявления
const oneAdvert = createNewAdvert(0);

export {oneAdvert};
export {tenAdverts};
