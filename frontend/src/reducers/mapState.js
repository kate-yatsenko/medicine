import {combineReducers} from 'redux';

import placesSearchResult from '../data/placesSearchResult'

const defaultGmaps = {
  map: null,
  placesService: null,
};
const defaultSearch = {
  position: {lat: 49.44444, lng: 32.05972},
  radius: 500,
  adress: 'бульвар Шевченка, 185, Черкаси',
};
const defaultFilter = {
  types: ['hospital', 'doctor'],
  name: '',
};
// TODO: убрать после отладки без интернета
const defaultPlaces = placesSearchResult;

const gmaps  = (state = defaultGmaps, action) => {
  switch (action.type) {
    default:
      return state
  }
};
const search  = (state = defaultSearch, action) => {
  switch (action.type) {
    default:
      return state
  }
};
const places  = (state = defaultPlaces, action) => {
  switch (action.type) {
    default:
      return state
  }
};
const filter  = (state = defaultFilter, action) => {
  switch (action.type) {
    default:
      return state
  }
};

const mapState = combineReducers({
  gmaps,
  search,
  places,
  filter,
});

export default mapState
