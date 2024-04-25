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

const mapFilters = document.querySelector('.map__filters');
const mapFiltersElements = mapFilters.querySelectorAll('.map__filter');
const mapFeatures = mapFilters.querySelector('.map__features');

export const disableMapFilters = () => {
  mapFilters.classList.add('map__filters--disabled');
  mapFiltersElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
  mapFeatures.setAttribute('disabled', 'disabled');
};


export const enableMapFilters = () => {
  mapFilters.classList.remove('map__filters--disabled');
  mapFiltersElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
  mapFeatures.removeAttribute('disabled');
};
