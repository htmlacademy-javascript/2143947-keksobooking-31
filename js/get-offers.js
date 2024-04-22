import * as data from './data.js';
import * as util from './util.js';

const randomNumbersArray = util.shuffleArray(util.randomNumberArray(1, data.OFFERS_COUNT));
export const randomAvatarIndexArray = [];

for (let i = 0; i < randomNumbersArray.length; i++) {
  if (randomNumbersArray[i] < 10) {
    randomAvatarIndexArray.push(`0${randomNumbersArray[i].toString()}`);
  } else {
    randomAvatarIndexArray.push(randomNumbersArray[i].toString());
  }
}

export const getRandomTitle = () => util.getRandomArrayElement(data.TITLES);
export const getRandomLat = () => util.getRandomFloat(data.LAT_RANGE[0], data.LAT_RANGE[1]).toFixed(5);
export const getRandomLng = () => util.getRandomFloat(data.LNG_RANGE[0], data.LNG_RANGE[1]).toFixed(5);
export const getRandomPrice = () => util.getRandomInteger(data.PRICE_RANGE[0], data.PRICE_RANGE[1]);
export const getRandomType = () => util.getRandomArrayElement(Object.values(data.Types));
export const getRandomRooms = () => util.getRandomInteger(data.ROOMS_RANGE[0], data.ROOMS_RANGE[1]);
export const getRandomGuests = () => util.getRandomInteger(data.GUESTS_RANGE[0], data.GUESTS_RANGE[1]);
export const getRandomCheckTime = () => util.getRandomArrayElement(data.CHECK_TIME);
export const getFeatures = () => util.shuffleArray(data.FEATURES.slice(0, util.getRandomInteger(1, data.FEATURES.length)));
export const getRandomDescription = () => util.getRandomArrayElement(data.DESCRIPTIONS);
export const getPhotos = () => util.shuffleArray(data.PHOTOS.slice(0, util.getRandomInteger(1, data.PHOTOS.length)));

export const getOffers = (avatar, title, lat, lng, price, type, rooms, guests, checkTime, features, description, photos) => {
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
