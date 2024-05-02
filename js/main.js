import {renderOffer} from './render-offers.js';
import {/*disableForm,*/ addressField, submitOffer} from './form.js';
import {disableMapFilters, enableMapFilters} from './map-filters.js';
import {renderMap} from './map.js';
import {getData} from './api.js';

// disableForm();
disableMapFilters();
await getData()
  .then((offers) => {
    renderMap(enableMapFilters, addressField, offers, renderOffer);
  });
// .catch(
//   (err) => {
//     showAlert(err.message);
//   }
// );

submitOffer();
