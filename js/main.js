import {showAlert, throttle} from './util.js';
import {disableForm, enableForm, addressField, submitOffer} from './form.js';
import {disableMapFilters, enableMapFilters, filterHousing} from './map-filters.js';
import {renderMap} from './map.js';
import {getData, sendData} from './api.js';
import {showUploadSuccess, showUploadError} from './messages.js';
import {listenImgUpload} from './upload-images.js';

disableForm();
disableMapFilters();
await getData()
  .then((offers) => {
    enableMapFilters();
    renderMap(enableForm, addressField, offers);
    filterHousing(offers, throttle);
    submitOffer(sendData, showUploadSuccess, showUploadError);
    listenImgUpload();
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );
