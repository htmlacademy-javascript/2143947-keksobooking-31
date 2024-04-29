import {offersDescriptions} from './get-offers.js';
import {renderOffer} from './render-offers.js';
import {/*disableForm,*/ addressField} from './form.js';
import {disableMapFilters, enableMapFilters} from './map-filters.js';
import {mapRender} from './map.js';

// disableForm();
disableMapFilters();
mapRender(enableMapFilters, addressField, offersDescriptions, renderOffer);
