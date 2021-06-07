const AVATAR_MIN_INDEX = 1;
const AVATAR_MAX_INDEX = 8;
const PRICE_MIN = 1;
const PRICE_MAX = 1000000;
const ROOMS_MIN = 1;
const ROOMS_MAX = 100;
const GUESTS_MIN = 1;
const GUESTS_MAX = 1000;
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const LOCATION_LAT_MIN = 35.65000;
const LOCATION_LAT_MAX = 35.70000;
const LOCATION_LNG_MIN = 139.70000;
const LOCATION_LNG_MAX = 139.80000;
const SIMILAR_ADVERTS_COUNT = 10;

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomPositiveFloat = (a, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return result.toFixed(digits);
};

getRandomPositiveInteger();
getRandomPositiveFloat();

const getRandomArrayElement = (elements) => elements[_.random(0, elements.length - 1)];

const getRandomItems = (elements) => {
  const resultItems = [];
  elements.forEach((item) => {
    const coin = _.random(0, 1);
    if (coin === 1) {
      resultItems.push(item);
    }
  });
  return resultItems;
};

const createAuthor = () => (
  {
    avatar: `img/avatars/user0${_.random(AVATAR_MIN_INDEX, AVATAR_MAX_INDEX)}.png`,
  }
);

const createOffer = () => (
  {
    title: 'Лучшее предложение на рынке',
    address: `${_.random(LOCATION_LAT_MIN, LOCATION_LAT_MAX)}, ${_.random(LOCATION_LNG_MIN, LOCATION_LNG_MAX)}`,
    price: _.random(PRICE_MIN, PRICE_MAX),
    type: getRandomArrayElement(TYPES),
    rooms: _.random(ROOMS_MIN, ROOMS_MAX),
    guests: _.random(GUESTS_MIN, GUESTS_MAX),
    checkin: getRandomArrayElement(TIMES),
    checkout: getRandomArrayElement(TIMES),
    features: getRandomItems(FEATURES),
    description: 'Очень удобное и уютное жилье',
    photos: getRandomItems(PHOTOS),
  }
);

const createLocation = () => (
  {
    lat: getRandomPositiveFloat(LOCATION_LAT_MIN, LOCATION_LAT_MAX, 5),
    lng: getRandomPositiveFloat(LOCATION_LNG_MIN, LOCATION_LNG_MAX, 5),
  }
);

const createAdverts = () => {
  const createOneAdvert = () => {
    const author = createAuthor();
    const offer = createOffer();
    const location = createLocation();
    return {
      author,
      offer,
      location,
    };
  };
  return createOneAdvert();
};

const similarAdverts = new Array(SIMILAR_ADVERTS_COUNT).fill(null).map(() => createAdverts());
similarAdverts;
