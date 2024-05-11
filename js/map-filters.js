import {debounce} from './util.js';

const HOUSING_PRICE_LOW = 10000;
const HOUSING_PRICE_HIGH = 50000;
const RERENDER_DELAY = 5000;

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

export let resetFilters;

// Фильтрация по типу жилья

export const filterHousing = (markerGroup, points, createMarker, pointsShown) => {
  mapFilters.addEventListener('change', () => {
    const listenFilters = () => {
      // Фильтрация по типу жилья

      const filteredTypePoints = points.filter((point) =>{
        markerGroup.clearLayers();
        if (housingTypeSelector.value !== 'any') {
          return point.offer.type === housingTypeSelector.value;
        }
        return points;
      });

      filteredTypePoints.slice(0, pointsShown).forEach((point) => {
        createMarker(point);
      });

      // Фильтрация по цене жилья

      const filteredPricePoints = filteredTypePoints.filter((point) => {
        markerGroup.clearLayers();
        if (housingPriceSelector.value === 'any') {
          return filteredTypePoints;
        }
        if (housingPriceSelector.value === 'middle') {
          return point.offer.price >= HOUSING_PRICE_LOW && point.offer.price <= HOUSING_PRICE_HIGH;
        }
        if (housingPriceSelector.value === 'low') {
          return point.offer.price < HOUSING_PRICE_LOW;
        }
        if (housingPriceSelector.value === 'high') {
          return point.offer.price > HOUSING_PRICE_HIGH;
        }
      });

      filteredPricePoints.slice(0, pointsShown).forEach((point) => {
        createMarker(point);
      });

      // Фильтрация по количеству комнат

      const filteredRoomsPoints = filteredPricePoints.filter((point) => {
        markerGroup.clearLayers();
        if (housingRoomsSelector.value !== 'any') {
          return point.offer.rooms === parseInt(housingRoomsSelector.value, 10);
        }

        return filteredPricePoints;
      });

      filteredRoomsPoints.slice(0, pointsShown).forEach((point) => {
        createMarker(point);
      });

      // Фильтрация по количеству гостей

      const filteredGuestsPoints = filteredRoomsPoints.filter((point) => {
        markerGroup.clearLayers();
        if (housingGuestsSelector.value !== 'any') {
          return point.offer.guests === parseInt(housingGuestsSelector.value, 10);
        }

        return filteredRoomsPoints;
      });

      filteredGuestsPoints.slice(0, pointsShown).forEach((point) => {
        createMarker(point);
      });

      // Фильтрация по удобствам

      const checkedFeatures = Array.from(mapFilters.querySelectorAll('.map__checkbox:checked'), (input) => input.value);
      const filteredFeaturesPoints = filteredGuestsPoints.filter((point) => {
        markerGroup.clearLayers();
        if (point.offer.features) {
          return checkedFeatures.every((feature) => point.offer.features.includes(feature));
        }
        return filteredGuestsPoints;
      });

      filteredFeaturesPoints.slice(0, pointsShown).forEach((point) => {
        createMarker(point);
      });
    };

    const debounceFunc = debounce(() => listenFilters(), RERENDER_DELAY);
    debounceFunc();
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

