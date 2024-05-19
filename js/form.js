import {resetMarker, closePopupCard, refreshMarkers} from './map.js';
import {resetFilters} from './map-filters.js';

const TITLE_LENGTH_MIN = 30;
const TITLE_LENGTH_MAX = 100;
const PRICE_MIN = 0;
const PRICE_MAX = 100000;
const PRICE_START_VALUE = 0;

const form = document.querySelector('.ad-form');
const formElements = form.querySelectorAll('.ad-form__element');
const sliderElement = form.querySelector('.ad-form__slider');

export const disableForm = () => {
  form.classList.add('ad-form--disabled');
  formElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
};

export const enableForm = () => {
  form.classList.remove('ad-form--disabled');
  formElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
};

const titleField = form.querySelector('#title');
const priceField = form.querySelector('#price');
const roomsField = form.querySelector('#room_number');
const guestsField = form.querySelector('#capacity');
const typeField = form.querySelector('#type');
const timeInField = form.querySelector('#timein');
const timeOutField = form.querySelector('#timeout');
export const addressField = form.querySelector('#address');
const submitButton = form.querySelector('.ad-form__submit');
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};
export const resetButton = form.querySelector('.ad-form__reset');

const pristine = new Pristine (form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
},);

// Валидация заголовка

const validateTitle = (value) => (value.length >= TITLE_LENGTH_MIN && value.length <= TITLE_LENGTH_MAX);

pristine.addValidator(
  titleField,
  validateTitle,
  'Длина заголовка должна быть не более 100 и не менее 30 символов',
);

// Валидация цены

const minPriceAmount = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

let priceErrorMessage = '';

const validatePrice = (value) => {
  if (value > PRICE_MAX) {
    priceErrorMessage = `Не более ${PRICE_MAX} руб.`;
    return false;
  }

  if (value.length && parseInt(value, 10) < minPriceAmount[typeField.value]) {
    priceErrorMessage = `Минимальная цена ${minPriceAmount[typeField.value]} руб.`;
    return false;
  }

  return true;
};

pristine.addValidator(
  priceField,
  validatePrice,
  () => priceErrorMessage,
);

const onTypeChange = () => {
  priceField.placeholder = minPriceAmount[typeField.value];
  pristine.validate(priceField);
};

typeField.addEventListener('change', onTypeChange);

// Валидация соответствия количества комнат количеству гостей

const roomsBookingOptions = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0'],
};

const validateRoomsBooking = () => roomsBookingOptions[roomsField.value].includes(guestsField.value);

pristine.addValidator(
  roomsField,
  validateRoomsBooking,
  'Измените количество комнат',
);

pristine.addValidator(
  guestsField,
  validateRoomsBooking,
  'Измените количество гостей',
);

// Валидация времени заезда и выезда

timeInField.addEventListener('change', () => {
  timeOutField.value = timeInField.value;
});

timeOutField.addEventListener('change', () => {
  timeInField.value = timeOutField.value;
});

// Блокировка кнопки отправки формы

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

// Слайдер

noUiSlider.create(sliderElement, {
  start: PRICE_START_VALUE,
  connect: [true, false],
  range: {
    'min': PRICE_MIN,
    'max': PRICE_MAX,
  },
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
  step: 1,
});

sliderElement.noUiSlider.on('slide', () => {
  priceField.value = sliderElement.noUiSlider.get();
});

priceField.addEventListener('change', () => {
  sliderElement.noUiSlider.set(priceField.value);
});

const resetPriceSlider = () => {
  sliderElement.noUiSlider.set(PRICE_START_VALUE);
};

// Очистка формы

const resetForm = () => {
  form.reset();
  resetPriceSlider();
  resetMarker(addressField);
  resetFilters(refreshMarkers);
  closePopupCard();
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
  pristine.reset();
});

// Отправка формы

export const submitOffer = (data, onSuccess, onError) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      data(new FormData(evt.target))
        .then(() =>{
          onSuccess();
          resetForm();
        })
        .catch(() => {
          onError();
        })
        .finally(() => {
          unblockSubmitButton();
          pristine.reset();
        });
    }
  });
};
