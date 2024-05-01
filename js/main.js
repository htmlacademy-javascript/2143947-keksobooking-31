// import {offersDescriptions} from './get-offers.js';
import {renderOffer} from './render-offers.js';
import {/*disableForm,*/ addressField, submitOffer} from './form.js';
import {disableMapFilters, enableMapFilters} from './map-filters.js';
import {renderMap} from './map.js';
import {getData} from './api.js';

let offersDescriptions;
// disableForm();
disableMapFilters();
await getData()
  .then((offers) => {
    offersDescriptions = offers;
  });
// .catch(
//   (err) => {
//     showAlert(err.message);
//   }
// );

// console.log(offersDescriptions);
renderMap(enableMapFilters, addressField, offersDescriptions, renderOffer);
submitOffer();
