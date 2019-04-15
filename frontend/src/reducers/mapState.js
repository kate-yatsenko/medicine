import {combineReducers} from 'redux';
import {INIT_MAP_SERVICES, SEARCH_PLACES, SET_PLACES_FILTER} from '../constants/mapConstants';

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
const defaultFilter = {
  types: ['hospital', 'doctor'],
  name: '',
};

const gmaps  = (state = defaultGmaps, action) => {
  switch (action.type) {
    case INIT_MAP_SERVICES:
      return {...state, ...action.payload};
    default:
      return state;
  }
};
const search  = (state = defaultSearch, action) => {
  switch (action.type) {
    case SEARCH_PLACES:
      const {exceededMaxPlacesNumber} = action.payload;
      return {...state, exceededMaxPlacesNumber};
    default:
      return state;
  }
};
const places  = (state = [], action) => {
  switch (action.type) {
    case SEARCH_PLACES:
      return action.payload.places;
    default:
      return state;
  }
};
const filter  = (state = defaultFilter, action) => {
  switch (action.type) {
    case SET_PLACES_FILTER:
      return state;
    default:
      return state;
  }
};

const mapState = combineReducers({
  gmaps,
  search,
  places,
  filter,
});

export default mapState;
