import {throttle} from './util.js';

const RERENDER_DELAY = 5000;

const Price = {
  'any': {min: 0, max: 100000},
  'low': {min: 0, max: 10000},
  'middle': {min: 10000, max: 50000},
  'high': {min: 50000, max: 100000},
};

const mapFilters = document.querySelector('.map__filters');
const mapFiltersElements = mapFilters.querySelectorAll('.map__filter');
const mapFeatures = mapFilters.querySelector('.map__features');
const housingTypeSelector = document.querySelector('#housing-type');
const housingPriceSelector = document.querySelector('#housing-price');
const housingRoomsSelector = document.querySelector('#housing-rooms');
const housingGuestsSelector = document.querySelector('#housing-guests');

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

let checkedFeatures;

// const filterFeatures = (point) => {
//   checkedFeatures.every((feature) => point.offer.features?.includes(feature));
// };

const listenFilters = (points) => points
  .filter((point) => housingTypeSelector[0].selected || point.offer?.type === housingTypeSelector.value)
  .filter((point) => housingPriceSelector[0].selected || point.offer?.price <= Price[housingPriceSelector.value].max && point.offer?.price >= Price[housingPriceSelector.value].min)
  .filter((point) => housingRoomsSelector[0].selected || point.offer?.rooms === Number(housingRoomsSelector.value))
  .filter((point) => housingGuestsSelector[0].selected || point.offer?.guests === Number(housingGuestsSelector.value))
  // .filter((point) => filterFeatures(point))
  .filter((point) => checkedFeatures.every((feature) => point.offer.features?.includes(feature)));

const refreshMarkers = (markerGroup, points, createMarker, pointsShown) => {
  markerGroup.clearLayers();
  points.slice(0, pointsShown).forEach((point) => {
    createMarker(point);
  });
};

export let resetFilters;

// Фильтрация по типу жилья

export const filterHousing = (markerGroup, points, createMarker, pointsShown) => {
  mapFilters.addEventListener('change', () => {
    checkedFeatures = Array.from(mapFilters.querySelectorAll('.map__checkbox:checked'), (input) => input.value);
    throttle(refreshMarkers(markerGroup, listenFilters(points), createMarker, pointsShown), RERENDER_DELAY);
  });

  // Сброс фильтров

  resetFilters = () => {
    mapFilters.reset();
    markerGroup.clearLayers();
    points.slice(0, pointsShown).forEach((point) => {
      createMarker(point);
    });
  };
};
