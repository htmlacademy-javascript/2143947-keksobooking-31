const offerTemplate = document.querySelector('#card').content.querySelector('.popup');

const translateType = (type) => {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    case 'hotel':
      return 'Отель';
    default:
      return type;
  }
};

const checkElementText = (element, cardElement, elementText) => {
  if (elementText === undefined) {
    elementText = element;
  }
  if (element) {
    cardElement.textContent = elementText;
  } else {
    offerTemplate.removeChild(cardElement);
  }
};

export const renderOffer = (offers) => {
  const {author, offer} = offers;
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

  checkElementText(offer.title, offerElementTitle);
  checkElementText(offer.address, offerElementAddress);
  checkElementText(offer.price, offerElementPrice, `${offer.price} ₽/ночь`);
  checkElementText(translateType(offer.type), offerElementType);

  offerElementCapacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  offerElementTime.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  if (offer.features) {
    offerElementFeatures.innerHTML = '';
    for (let i = 0; i < offer.features.length; i++) {
      const featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature', `popup__feature--${offer.features[i]}`);
      offerElementFeatures.appendChild(featureElement);
    }
  } else {
    offerTemplate.removeChild(offerElementFeatures);
  }

  checkElementText(offer.description, offerElementDescription);

  if (offer.photos.length) {
    for (let i = 0; i < offer.photos.length; i++) {
      const imgElement = offerElementPhoto.cloneNode(true);
      imgElement.src = offer.photos[i];
      offerElementPhotos.appendChild(imgElement);
    }
  }

  offerElementPhotos.removeChild(offerElementPhotosList[0]);

  if (author.avatar) {
    offerElementAvatar.src = author.avatar;
  } else {
    offerTemplate.removeChild(offerElementAvatar);
  }

  return offerElement;
};

