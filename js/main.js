import {showAlert} from './util.js';
import {renderOffer} from './render-offers.js';
import {/*disableForm,*/ addressField, submitOffer, resetButton} from './form.js';
import {disableMapFilters, enableMapFilters} from './map-filters.js';
import {renderMap, filterHousingFeatures} from './map.js';
import {getData, sendData} from './api.js';
import {showUploadSuccess, showUploadError} from './messages.js';

// disableForm();
disableMapFilters();
await getData()
  .then((offers) => {
    renderMap(enableMapFilters, addressField, offers, renderOffer, resetButton);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

submitOffer(sendData, showUploadSuccess, showUploadError);
filterHousingFeatures();
