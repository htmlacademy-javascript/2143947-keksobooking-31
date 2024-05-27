const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const avatar = document.querySelector('.ad-form-header__input');
const uploadedAvatarPreview = document.querySelector('.ad-form-header__preview');
const photo = document.querySelector('.ad-form__input');
const uploadedPhotoPreview = document.querySelector('.ad-form__photo');

uploadedPhotoPreview.style.overflow = 'hidden';

const uploadImg = (img, imgPreview) => {
  const loadedImg = img.files[0];
  const fileName = loadedImg.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  imgPreview.querySelector('img').src = '';

  if (matches) {
    imgPreview.querySelector('img').src = URL.createObjectURL(loadedImg);
  }
};

const createImgContainer = () => {
  const imgContainer = document.createElement('img');

  imgContainer.style.width = '100%';
  imgContainer.style.height = 'auto';
  imgContainer.src = '';
  imgContainer.alt = 'Фотография жилья';

  uploadedPhotoPreview.append(imgContainer);
};

export const listenImgUpload = () => {
  avatar.addEventListener('change', () => {
    uploadImg(avatar, uploadedAvatarPreview);
  });
  photo.addEventListener('change', () => {
    createImgContainer();
    uploadImg(photo, uploadedPhotoPreview);
  });
};
