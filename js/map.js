const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const ZOOM = 10;
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

export const mapRender = (onLoad, address, points, renderPopup) => {
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
      .bindPopup(renderPopup(point));
  };

  points.forEach((point) => {
    createMarker(point);
  });

  // markerGroup.clearLayers();
};

