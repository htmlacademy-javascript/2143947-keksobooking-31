import {isEscapeKey} from './util.js';

// Открытие и закрытие окна ошибки загрузки изображения

export const uploadError = document.querySelector('#error').content.querySelector('.error');
const errorButton = uploadError.querySelector('.error__button');
const uploadSuccess = document.querySelector('#success').content.querySelector('.success');

export const showUploadError = () => {
  document.body.append(uploadError);

  document.addEventListener('keydown', onDocumentKeydown);
  errorButton.addEventListener('click', closeUploadError);
  uploadError.addEventListener('click', onWindowClick);
};

function closeUploadError () {
  document.body.removeChild(uploadError);

  document.removeEventListener('keydown', onDocumentKeydown);
  errorButton.removeEventListener('click', closeUploadError);
  uploadError.removeEventListener('click', onWindowClick);
}

// Открытие и закрытие окна успешной загрузки изображения

export const showUploadSuccess = () => {
  document.body.append(uploadSuccess);

  document.addEventListener('keydown', onDocumentKeydown);
  uploadSuccess.addEventListener('click', onWindowClick);
};

function closeUploadSuccess () {
  document.body.removeChild(uploadSuccess);

  document.removeEventListener('keydown', onDocumentKeydown);
  uploadSuccess.removeEventListener('click', onWindowClick);
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.querySelector('.error')) {
      closeUploadError();
    }
    if (document.querySelector('.success')) {
      closeUploadSuccess();
    }
  }
}

function onWindowClick(evt) {
  if (!evt.target.closest('.body')) {
    if (document.querySelector('.error')) {
      closeUploadError();
    }
    if (document.querySelector('.success')) {
      closeUploadSuccess();
    }
  }
}
