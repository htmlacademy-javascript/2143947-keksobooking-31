import {renderOffer} from './render-offers.js';

const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const ZOOM = 10;
export const MAX_POINTS_SHOWN = 10;

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

const mainPinIcon = L.icon({
  iconUrl: iconConfig[0].url,
  iconSize: [iconConfig[0].width, iconConfig[0].height],
  iconAnchor: [iconConfig[0].anchorX, iconConfig[0].anchorY],
});

const mainPinMarker = L.marker(startCoordinate, {
  draggable: true,
  icon: mainPinIcon,
});

let map;
let markerGroup;
let createMarker;

export const renderMap = (enableForm, address, points) => {
  map = L.map('map-canvas')
    .on('load', () => {
      enableForm();
    })
    .setView(cityCenter, ZOOM);

  L.tileLayer(TILE_LAYER, {
    attribution: COPYRIGHT
  }).addTo(map);

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

  markerGroup = L.layerGroup().addTo(map);

  createMarker = (point) => {
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
      .bindPopup(renderOffer(point));
  };

  // Отображение стартовых точек

  points.slice(0, MAX_POINTS_SHOWN).forEach((point) => {
    createMarker(point);
  });
};

// Сброс маркера на начальную точкку

export const resetMarker = (address) => {
  mainPinMarker.setLatLng(startCoordinate);
  address.value = `${Object.values(startCoordinate)[0].toFixed(5)}, ${Object.values(startCoordinate)[1].toFixed(5)}`;
};

// Закрытие карточки объявления

export const closePopupCard = () => {
  map.closePopup();
};

export const refreshMarkers = (points) => {
  markerGroup.clearLayers();
  points.slice(0, MAX_POINTS_SHOWN).forEach((point) => {
    createMarker(point);
  });
};
