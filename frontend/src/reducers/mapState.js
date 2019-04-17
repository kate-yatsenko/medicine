import {combineReducers} from 'redux';
import {MAP_INIT_MAP_SERVICES, MAP_SEARCH_PLACES, MAP_SET_FILTER, CHANGE_FILTER_BY_NAME, CHANGE_FILTER_BY_CATEGORY} from '../constants';

import placesSearchResult from '../data/placesSearchResult'

const defaultGmaps = {
  map: null,
  placesService: null,
};
const defaultSearch = {
  position: {lat: 49.44444, lng: 32.05972},
  radius: 500,
  adress: 'бульвар Шевченка, 185, Черкаси',
  exceededMaxPlacesNumber: false,
};
const defaultFilterTypes = ['hospital', 'doctor'];

// TODO: убрать после отладки без интернета
const defaultPlaces = []; //placesSearchResult;

const gmaps  = (state = defaultGmaps, action) => {
  switch (action.type) {
    case MAP_INIT_MAP_SERVICES:
      return {...state, ...action.payload};
    default:
      return state;
  }
};
const search  = (state = defaultSearch, action) => {
  switch (action.type) {
    case MAP_SEARCH_PLACES:
      const {exceededMaxPlacesNumber} = action.payload;
      return {...state, exceededMaxPlacesNumber};
    default:
      return state;
  }
};
const places  = (state = defaultPlaces, action) => {
  switch (action.type) {
    case MAP_SEARCH_PLACES:
      return action.payload.places;
    default:
      return state;
  }
};

function filterByName(state = '', { type, payload }) {
  switch (type) {
    case CHANGE_FILTER_BY_NAME:
      return payload;

    default:
      return state;
  }
};

const filterByCategory  = (state = defaultFilterTypes, action) => {
  switch (action.type) {
    case MAP_SET_FILTER:
      return state;
    case CHANGE_FILTER_BY_CATEGORY:
    return state.indexOf(action.payload) !== 1 ? [...state, action.payload]: state.filter(item => item !== action.payload);

    default:
    return state;
      
  }
};
const mapState = combineReducers({
  gmaps,
  search,
  places,
  filterByName,
  filterByCategory
});

export default mapState;
