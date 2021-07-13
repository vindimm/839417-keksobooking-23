// мы получаем от сервера массив объектов similarAdverts. Это список похожих объявлений.
// в этом модуле создадим функцию renderAdvertsMarkup(similarAdverts),
// которая будет создавать HTML-разметку на основе массива данных.
// экспортируем renderAdvertsMarkup() в generate-map.js

const createFeaturesList = (list, items, advert) => {
  items.forEach((item) => {
    item.remove();
  });
  // проверка на существование features, так как в некоторых объявлениях массив features не существует и равен undefined
  if (advert.offer.features) {
    advert.offer.features.forEach((item) => {
      const newFeature = document.createElement('li');
      newFeature.classList.add('popup__feature');
      newFeature.classList.add(`popup__feature--${item}`);
      list.appendChild(newFeature);
    });
  }
};

const createPhotosList = (list, item, advert) => {
  item.remove();
  // проверка на существование photos, так как в некоторых объявлениях массив photos не существует и равен undefined.
  if (advert.offer.photos) {
    advert.offer.photos.map((imgSrc) => {
      const newPhoto = item.cloneNode(true);
      newPhoto.src = imgSrc;
      list.append(newPhoto);
    });
  }
};

const hideEmptyTag = (tag) => {
  if (tag.textContent === '') {
    tag.classList.add('visually-hidden');
  }
};

const renderNewAdvertMarkup = (advert) => {
  const templateFragment = document.querySelector('#card').content;
  const template = templateFragment.querySelector('.popup');
  const element = template.cloneNode(true);
  const popupTitle = element.querySelector('.popup__title');
  const popupAddress = element.querySelector('.popup__text--address');
  const popupPrice = element.querySelector('.popup__text--price');
  const popupType = element.querySelector('.popup__type');
  const popupCapacity = element.querySelector('.popup__text--capacity');
  const popupTime = element.querySelector('.popup__text--time');
  const popupDescription = element.querySelector('.popup__description');
  const popupAvatar = element.querySelector('.popup__avatar');
  const popupFeatureList = element.querySelector('.popup__features');
  const popupFeatureItems = element.querySelectorAll('.popup__feature');
  const popupPhotosList = element.querySelector('.popup__photos');
  const popupPhotoItem = element.querySelector('.popup__photo');

  popupTitle.textContent = advert.offer.title;
  hideEmptyTag(popupTitle);
  popupAddress.textContent = advert.offer.address;
  hideEmptyTag(popupAddress);
  popupPrice.textContent = `${advert.offer.price} ₽/ночь`;
  hideEmptyTag(popupPrice);
  popupCapacity.textContent =`${advert.offer.rooms} комнаты для ${advert.offer.guests} гостей`;
  hideEmptyTag(popupCapacity);
  popupTime.textContent = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`;
  hideEmptyTag(popupTime);
  popupDescription.textContent = advert.offer.description;
  hideEmptyTag(popupDescription);
  popupAvatar.src = advert.author.avatar;
  popupAvatar.onerror = () => popupAvatar.classList.add('visually-hidden');
  switch (advert.offer.type) {
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
      popupType.textContent = advert.offer.type;
  }
  hideEmptyTag(popupType);
  createFeaturesList(popupFeatureList, popupFeatureItems, advert);
  createPhotosList(popupPhotosList, popupPhotoItem, advert);

  return element;
};

const renderAdvertsMarkup = (similarAdverts) => {
  const fragment = document.createDocumentFragment();
  similarAdverts.forEach((item) => {
    const newAdvertMarkup = renderNewAdvertMarkup(item);
    fragment.appendChild(newAdvertMarkup);
  });
  return fragment;
};

export {renderAdvertsMarkup, renderNewAdvertMarkup};
