const form = document.querySelector('.ad-form');
const formElements = form.querySelectorAll('.ad-form__element');

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

const pristine = new Pristine (form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__element--invalid',
}, false);


// Валидация заголовка

function validateTitle(value) {
  if (value.length >= 30 && value.length <= 100) {
    return true;
  }
  return false;
}

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

function validatePrice(value) {
  if (value > 100000) {
    priceErrorMessage = 'Не более 100 000 руб.';
    return false;
  }

  if (value.length && parseInt(value, 10) < minPriceAmount[typeField.value]) {
    priceErrorMessage = `Минимальная цена ${minPriceAmount[typeField.value]} руб.`;
    return false;
  }

  return true;
}

pristine.addValidator(
  priceField,
  validatePrice,
  () => priceErrorMessage,
);

function onTypeChange () {
  priceField.placeholder = minPriceAmount[this.value];
  pristine.validate(priceField);
}

typeField.addEventListener('change', onTypeChange);

// Валидация соответствия количества комнат количеству гостей

const roomsBookingOptions = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0'],
};

function validateRoomsBooking () {
  return roomsBookingOptions[roomsField.value].includes(guestsField.value);
}

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

// const unblockSubmitButton = () => {
//   submitButton.disabled = false;
//   submitButton.textContent = SubmitButtonText.IDLE;
// };

// Отправка формы

const submitOffer = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      destroyPristine();
    }
  });
};

submitOffer();

// Отключение pristine

function destroyPristine() {
  pristine.reset();
  pristine.destroy();
}

