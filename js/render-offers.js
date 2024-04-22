import * as offers from './get-offers.js';

export const offersList = document.querySelector('.map__canvas');
const offerTemplate = document.querySelector('#card').content.querySelector('.popup');

export const offersDescriptions = offers.getOffers(
  offers.randomAvatarIndexArray,
  offers.getRandomTitle,
  offers.getRandomLat,
  offers.getRandomLng,
  offers.getRandomPrice,
  offers.getRandomType,
  offers.getRandomRooms,
  offers.getRandomGuests,
  offers.getRandomCheckTime,
  offers.getFeatures,
  offers.getRandomDescription,
  offers.getPhotos
);

// const checkElement = (element, cardElement, contentType) => {
//   if (element !== undefined || element !== '') {
//     cardElement.contentType = element;
//   } else {
//     offerTemplate.removeChild(cardElement);
//   }
// };

const offerFragment = document.createDocumentFragment();

const offerElement = offerTemplate.cloneNode(true);
if (offersDescriptions[1].offer.title !== undefined || offersDescriptions[1].offer.title !== '') {
  offerElement.querySelector('.popup__title').textContent = offersDescriptions[1].offer.title;
} else {
  offerTemplate.removeChild(offerElement.querySelector('.popup__title'));
}
if (offersDescriptions[1].offer.address !== undefined || offersDescriptions[1].offer.address !== '') {
  offerElement.querySelector('.popup__text--address').textContent = offersDescriptions[1].offer.address;
} else {
  offerTemplate.removeChild(offerElement.querySelector('.popup__text--address'));
}
if (offersDescriptions[1].offer.price !== undefined || offersDescriptions[1].offer.price !== '') {
  offerElement.querySelector('.popup__text--price').textContent = `${offersDescriptions[1].offer.price} ₽/ночь`;
} else {
  offerTemplate.removeChild(offerElement.querySelector('.popup__text--price'));
}
if (offersDescriptions[1].offer.type !== undefined || offersDescriptions[1].offer.type !== '') {
  offerElement.querySelector('.popup__type').textContent = offersDescriptions[1].offer.type;
} else {
  offerTemplate.removeChild(offerElement.querySelector('.popup__type'));
}
if (offersDescriptions[1].offer.rooms !== undefined || offersDescriptions[1].offer.rooms !== '') {
  offerElement.querySelector('.popup__text--capacity').textContent = `${offersDescriptions[1].offer.rooms} комнаты для ${offersDescriptions[1].offer.guests} гостей`;
} else {
  offerTemplate.removeChild(offerElement.querySelector('.popup__text--capacity'));
}
if (offersDescriptions[1].offer.checkin !== undefined || offersDescriptions[1].offer.checkin !== '') {
  offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${offersDescriptions[1].offer.checkin}, выезд до ${offersDescriptions[1].offer.checkout}`;
} else {
  offerTemplate.removeChild(offerElement.querySelector('.popup__text--time'));
}
if (offersDescriptions[1].offer.features !== undefined || offersDescriptions[1].offer.features !== '') {
  offerElement.querySelector('.popup__features').textContent = offersDescriptions[1].offer.features;
} else {
  offerTemplate.removeChild(offerElement.querySelector('.popup__features'));
}
if (offersDescriptions[1].offer.description !== undefined || offersDescriptions[1].offer.description !== '') {
  offerElement.querySelector('.popup__description').textContent = offersDescriptions[1].offer.description;
} else {
  offerTemplate.removeChild(offerElement.querySelector('.popup__description'));
}
if (offersDescriptions[1].offer.photos.length !== 0) {
  for (let i = 0; i < offersDescriptions[1].offer.photos.length; i++) {
    const imgElement = offerElement.querySelector('.popup__photos img').cloneNode(true);
    imgElement.src = offersDescriptions[1].offer.photos[i];
    offerElement.querySelector('.popup__photos').appendChild(imgElement);
  }
  offerElement.querySelector('.popup__photos').removeChild(offerElement.querySelectorAll('.popup__photos img')[0]);
} else {
  offerElement.querySelector('.popup__photos').removeChild(offerElement.querySelectorAll('.popup__photos img')[0]);
}
if (offersDescriptions[1].author.avatar !== undefined || offersDescriptions[1].author.avatar !== '') {
  offerElement.querySelector('.popup__avatar').src = offersDescriptions[1].author.avatar;
} else {
  offerTemplate.removeChild(offerElement.querySelector('.popup__avatar'));
}

offerFragment.appendChild(offerElement);
offersList.appendChild(offerFragment);
