import {showAlert} from './util.js';
import {renderOffer} from './render-offers.js';
import {disableForm, enableForm, addressField, submitOffer} from './form.js';
import {disableMapFilters, enableMapFilters, filterHousing} from './map-filters.js';
import {renderMap, markerGroup, createMarker, MAX_POINTS_SHOWN} from './map.js';
import {getData, sendData} from './api.js';
import {showUploadSuccess, showUploadError} from './messages.js';
import {listenImgUpload} from './upload-images.js';

disableForm();
disableMapFilters();
await getData()
  .then((offers) => {
    enableMapFilters();
    renderMap(enableForm, addressField, offers, renderOffer);
    filterHousing(markerGroup, offers, createMarker, MAX_POINTS_SHOWN);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

submitOffer(sendData, showUploadSuccess, showUploadError);
listenImgUpload();
