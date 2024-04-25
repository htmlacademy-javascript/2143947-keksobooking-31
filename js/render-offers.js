import {offersDescriptions} from './get-offers.js';

export const offersList = document.querySelector('.map__canvas');
const offerTemplate = document.querySelector('#card').content.querySelector('.popup');

const checkElementText = (element, cardElement, elementText) => {
  if (elementText === undefined) {
    elementText = element;
  }
  if (element !== undefined || element !== '') {
    cardElement.textContent = elementText;
  } else {
    offerTemplate.removeChild(cardElement);
  }
};

export const renderOffer = () => {
  const offerFragment = document.createDocumentFragment();
  const offerElement = offerTemplate.cloneNode(true);
  const offerElementTitle = offerElement.querySelector('.popup__title');
  const offerElementAddress = offerElement.querySelector('.popup__text--address');
  const offerElementPrice = offerElement.querySelector('.popup__text--price');
  const offerElementType = offerElement.querySelector('.popup__type');
  const offerElementCapacity = offerElement.querySelector('.popup__text--capacity');
  const offerElementTime = offerElement.querySelector('.popup__text--time');
  const offerElementFeatures = offerElement.querySelector('.popup__features');
  const offerElementDescription = offerElement.querySelector('.popup__description');
  const offerElementPhotos = offerElement.querySelector('.popup__photos');
  const offerElementPhoto = offerElement.querySelector('.popup__photos img');
  const offerElementPhotosList = offerElement.querySelectorAll('.popup__photos img');
  const offerElementAvatar = offerElement.querySelector('.popup__avatar');

  checkElementText(offersDescriptions[1].offer.title, offerElementTitle);
  checkElementText(offersDescriptions[1].offer.address, offerElementAddress);
  checkElementText(offersDescriptions[1].offer.price, offerElementPrice, `${offersDescriptions[1].offer.price} ₽/ночь`);
  checkElementText(offersDescriptions[1].offer.type, offerElementType);

  if (offersDescriptions[1].offer.rooms !== undefined || offersDescriptions[1].offer.rooms !== '' || offersDescriptions[1].offer.guests !== undefined || offersDescriptions[1].offer.guests !== '') {
    offerElementCapacity.textContent = `${offersDescriptions[1].offer.rooms} комнаты для ${offersDescriptions[1].offer.guests} гостей`;
  } else {
    offerTemplate.removeChild(offerElementCapacity);
  }

  if (offersDescriptions[1].offer.checkin !== undefined || offersDescriptions[1].offer.checkin !== '' || offersDescriptions[1].offer.checkout !== undefined || offersDescriptions[1].offer.checkout !== '') {
    offerElementTime.textContent = `Заезд после ${offersDescriptions[1].offer.checkin}, выезд до ${offersDescriptions[1].offer.checkout}`;
  } else {
    offerTemplate.removeChild(offerElementTime);
  }

  checkElementText(offersDescriptions[1].offer.features, offerElementFeatures); // Нужно вынести в отдельную функцию!!!
  checkElementText(offersDescriptions[1].offer.description, offerElementDescription);

  if (offersDescriptions[1].offer.photos.length !== 0) {
    for (let i = 0; i < offersDescriptions[1].offer.photos.length; i++) {
      const imgElement = offerElementPhoto.cloneNode(true);
      imgElement.src = offersDescriptions[1].offer.photos[i];
      offerElementPhotos.appendChild(imgElement);
    }
    offerElementPhotos.removeChild(offerElementPhotosList[0]);
  } else {
    offerElementPhotos.removeChild(offerElementPhotosList[0]);
  }

  if (offersDescriptions[1].author.avatar !== undefined || offersDescriptions[1].author.avatar !== '') {
    offerElementAvatar.src = offersDescriptions[1].author.avatar;
  } else {
    offerTemplate.removeChild(offerElementAvatar);
  }

  offerFragment.appendChild(offerElement);
  offersList.appendChild(offerFragment);
};

