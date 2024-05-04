import {isEscapeKey} from './util.js';

// Открытие и закрытие окна ошибки загрузки изображения

export const uploadError = document.querySelector('#error').content.querySelector('.error');
const errorButton = uploadError.querySelector('.error__button');

export const showUploadError = () => {
  document.body.append(uploadError);

  document.addEventListener('keydown', onDocumentKeydownCloseError);
  errorButton.addEventListener('click', closeUploadError);
  uploadError.addEventListener('click', onWindowClickCloseError);
};

function closeUploadError () {
  document.body.removeChild(uploadError);

  document.removeEventListener('keydown', onDocumentKeydownCloseError);
  errorButton.removeEventListener('click', closeUploadError);
  uploadError.removeEventListener('click', onWindowClickCloseError);
}

function onDocumentKeydownCloseError(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadError();
  }
}

function onWindowClickCloseError(evt) {
  if (!evt.target.closest('.body')) {
    closeUploadError();
  }
}

// Открытие и закрытие окна успешной загрузки изображения

const uploadSuccess = document.querySelector('#success').content.querySelector('.success');

export const showUploadSuccess = () => {
  document.body.append(uploadSuccess);

  document.addEventListener('keydown', onDocumentKeydownCloseSuccess);
  uploadSuccess.addEventListener('click', onWindowClickCloseSuccess);
};

function closeUploadSuccess () {
  document.body.removeChild(uploadSuccess);

  document.removeEventListener('keydown', onDocumentKeydownCloseSuccess);
  uploadSuccess.removeEventListener('click', onWindowClickCloseSuccess);
}

function onDocumentKeydownCloseSuccess(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadSuccess();
  }
}
function onWindowClickCloseSuccess(evt) {
  if (!evt.target.closest('.body')) {
    closeUploadSuccess();
  }
}
