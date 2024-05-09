const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const ZOOM = 10;
const MAX_POINTS_SHOWN = 10;
const HOUSING_PRICE_LOW = 10000;
const HOUSING_PRICE_HIGH = 50000;

const iconConfig = [
  {
    url: './img/main-pin.svg',
    width: 52,
    height: 52,
    anchorX: 26,
    anchorY: 52,
  },
  {
    url: './img/pin.svg',
    width: 40,
    height: 40,
    anchorX: 20,
    anchorY: 40,
  }
];

const cityCenter = {
  lat: 35.6895,
  lng: 139.69171,
};
const startCoordinate = {
  lat: 35.6895,
  lng: 139.69171,
};

export let resetMarker;
export let closePopupCard;
export let filterHousingFeatures;

export const renderMap = (onLoad, address, points, renderPopup) => {
  const map = L.map('map-canvas')
    .on('load', () => {
      onLoad();
    })
    .setView(cityCenter, ZOOM);

  L.tileLayer(TILE_LAYER, {
    attribution: COPYRIGHT
  }).addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: iconConfig[0].url,
    iconSize: [iconConfig[0].width, iconConfig[0].height],
    iconAnchor: [iconConfig[0].anchorX, iconConfig[0].anchorY],
  });

  const mainPinMarker = L.marker(startCoordinate, {
    draggable: true,
    icon: mainPinIcon,
  });

  mainPinMarker.addTo(map);

  address.value = `${Object.values(startCoordinate)[0].toFixed(5)}, ${Object.values(startCoordinate)[1].toFixed(5)}`;

  mainPinMarker.on('moveend', (evt) => {
    address.value = `${Object.values(evt.target.getLatLng())[0].toFixed(5)}, ${Object.values(evt.target.getLatLng())[1].toFixed(5)}`;
  });

  const icon = L.icon({
    iconUrl: iconConfig[1].url,
    iconSize: [iconConfig[1].width, iconConfig[1].height],
    iconAnchor: [iconConfig[1].anchorX, iconConfig[1].anchorY],
  });

  const markerGroup = L.layerGroup().addTo(map);

  const createMarker = (point) => {
    const lat = point.location.lat;
    const lng = point.location.lng;
    const marker = L.marker({
      lat,
      lng,
    },
    {
      icon,
    },);

    marker
      .addTo(markerGroup)
      .bindPopup(renderPopup(point))
      .on('click', (evt) => {
        evt.target.openPopup();
      });

    closePopupCard = () => {
      marker.closePopup(point);
    };
  };

  // Отображение стартовых точек

  points.slice(0, MAX_POINTS_SHOWN).forEach((point) => {
    createMarker(point);
  });

  // Фильтрация по типу жилья

  const housingTypeSelector = document.querySelector('#housing-type');
  const housingPriceSelector = document.querySelector('#housing-price');
  const housingRoomsSelector = document.querySelector('#housing-rooms');
  const housingGuestsSelector = document.querySelector('#housing-guests');
  const housingFeaturesSelector = document.querySelectorAll('.map__checkbox');

  housingTypeSelector.addEventListener('change', () => {
    markerGroup.clearLayers();
    const filteredPoints = points.filter((point) => point.offer.type === housingTypeSelector.value);
    if (housingTypeSelector.value !== 'any') {
      filteredPoints.slice(0, MAX_POINTS_SHOWN).forEach((point) => {
        createMarker(point);
      });
    } else {
      points.slice(0, MAX_POINTS_SHOWN).forEach((point) => {
        createMarker(point);
      });
    }
  });

  housingPriceSelector.addEventListener('change', () => {
    markerGroup.clearLayers();
    const filteredPoints = points.filter((point) => {
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
    if (housingPriceSelector.value !== 'any') {
      filteredPoints.slice(0, MAX_POINTS_SHOWN).forEach((point) => {
        createMarker(point);
      });
    } else {
      points.slice(0, MAX_POINTS_SHOWN).forEach((point) => {
        createMarker(point);
      });
    }
  });

  housingRoomsSelector.addEventListener('change', () => {
    markerGroup.clearLayers();
    const filteredPoints = points.filter((point) => point.offer.rooms === parseInt(housingRoomsSelector.value, 10));
    if (housingRoomsSelector.value !== 'any') {
      filteredPoints.slice(0, MAX_POINTS_SHOWN).forEach((point) => {
        createMarker(point);
      });
    } else {
      points.slice(0, MAX_POINTS_SHOWN).forEach((point) => {
        createMarker(point);
      });
    }
  });

  housingGuestsSelector.addEventListener('change', () => {
    markerGroup.clearLayers();
    const filteredPoints = points.filter((point) => point.offer.guests === parseInt(housingGuestsSelector.value, 10));
    if (housingGuestsSelector.value !== 'any') {
      filteredPoints.slice(0, MAX_POINTS_SHOWN).forEach((point) => {
        createMarker(point);
      });
    } else {
      points.slice(0, MAX_POINTS_SHOWN).forEach((point) => {
        createMarker(point);
      });
    }
  });

  filterHousingFeatures = () => {
    const checkedFeaturesList = [];
    housingFeaturesSelector.forEach((feature) => {
      feature.addEventListener('change', () => {
        if (feature.checked) {
          checkedFeaturesList.push(feature.value);
        }
      });
    });
    const filteredPointsByFeatures = points.filter((point) => {
      const pointFeatures = point.offer.features;
      return checkedFeaturesList.every((checkedFeature) => pointFeatures.includes(checkedFeature));
    });
    filteredPointsByFeatures.slice(0, MAX_POINTS_SHOWN).forEach((point) => {
      createMarker(point);
    });
  };

  resetMarker = () => {
    mainPinMarker.setLatLng(startCoordinate);
    address.value = `${Object.values(startCoordinate)[0].toFixed(5)}, ${Object.values(startCoordinate)[1].toFixed(5)}`;
  };
};

