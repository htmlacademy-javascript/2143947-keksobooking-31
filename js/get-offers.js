import * as data from './data.js';
import {getRandomArrayElement, getRandomFloat, getRandomInteger, shuffleArray, randomNumberArray} from './util.js';

const randomNumbersArray = shuffleArray(randomNumberArray(1, data.OFFERS_COUNT));
const randomAvatarIndexArray = [];

for (let i = 0; i < randomNumbersArray.length; i++) {
  if (randomNumbersArray[i] < 10) {
    randomAvatarIndexArray.push(`0${randomNumbersArray[i].toString()}`);
  } else {
    randomAvatarIndexArray.push(randomNumbersArray[i].toString());
  }
}

const getRandomTitle = () => getRandomArrayElement(data.TITLES);
const getRandomLat = () => getRandomFloat(data.LAT_RANGE[0], data.LAT_RANGE[1]).toFixed(5);
const getRandomLng = () => getRandomFloat(data.LNG_RANGE[0], data.LNG_RANGE[1]).toFixed(5);
const getRandomPrice = () => getRandomInteger(data.PRICE_RANGE[0], data.PRICE_RANGE[1]);
const getRandomType = () => getRandomArrayElement(Object.values(data.Types));
const getRandomRooms = () => getRandomInteger(data.ROOMS_RANGE[0], data.ROOMS_RANGE[1]);
const getRandomGuests = () => getRandomInteger(data.GUESTS_RANGE[0], data.GUESTS_RANGE[1]);
const getRandomCheckTime = () => getRandomArrayElement(data.CHECK_TIME);
const getFeatures = () => shuffleArray(data.FEATURES.slice(0, getRandomInteger(1, data.FEATURES.length)));
const getRandomDescription = () => getRandomArrayElement(data.DESCRIPTIONS);
const getPhotos = () => shuffleArray(data.PHOTOS.slice(0, getRandomInteger(1, data.PHOTOS.length)));

const getOffers = (avatar, title, lat, lng, price, type, rooms, guests, checkTime, features, description, photos) => {
  const offers = [];

  for (let i = 0; i < data.OFFERS_COUNT; i++) {
    const randomLat = lat();
    const randomLng = lng();

    offers.push({
      author: {
        avatar: `img/avatars/user${avatar[i]}.png`,
      },
      offer: {
        title: title(),
        address: `${randomLat}, ${randomLng}`,
        price: price(),
        type: type(),
        rooms: rooms(),
        guests: guests(),
        checkin: checkTime(),
        checkout: checkTime(),
        features: features(),
        description: description(),
        photos: photos(),
      },
      location: {
        lat: randomLat,
        lng: randomLng,
      },
    });
  }

  return offers;
};

export const offersDescriptions = getOffers(
  randomAvatarIndexArray,
  getRandomTitle,
  getRandomLat,
  getRandomLng,
  getRandomPrice,
  getRandomType,
  getRandomRooms,
  getRandomGuests,
  getRandomCheckTime,
  getFeatures,
  getRandomDescription,
  getPhotos
);
