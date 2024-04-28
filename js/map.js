import {enableMapFilters} from './map-filters.js';

const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const ZOOM = 10;
const cityCenter = {
  lat: 35.6895,
  lng: 139.69171,
};

export const mapRender = () => {
  const map = L.map('map-canvas')
    .on('load', () => {
      console.log('Карта инициализирована');
      enableMapFilters();
    })
    .setView(cityCenter, ZOOM);

  L.tileLayer(TILE_LAYER, {
    attribution: COPYRIGHT
  }).addTo(map);
};

