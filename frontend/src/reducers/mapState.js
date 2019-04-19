import {
  INIT_MAP_SERVICES, 
  START_SEARCH_POSITION, 
  START_SEARCH_PLACES, 
  END_SEARCH_POSITION, 
  END_SEARCH_PLACES, 
  SELECT_PLACE,
} from '../constants/mapConstants';
import {combineReducers} from 'redux';
import {handleActions, combineActions} from 'redux-actions';

const gmaps = handleActions(
  {
    [INIT_MAP_SERVICES]: (state, action) => ({...state, ...action.payload}),
    [combineActions(
      START_SEARCH_POSITION,
      START_SEARCH_PLACES,
      END_SEARCH_POSITION,
      END_SEARCH_PLACES,
      SELECT_PLACE
    )]: (state, action) => ({
      ...state, 
      ...action.payload.gmaps,
    }),
  },
  {
    map: null,
    placesService: null,
    geocoderService: null,
    zoom: 15,
    messages: {
      loading: null,
      alerts: [],
      errors: [],
    }
  }
);
const search = handleActions(
  {
    [combineActions(
      START_SEARCH_POSITION,
      START_SEARCH_PLACES,
      END_SEARCH_POSITION
    )]: (state, action) => ({
      ...state, 
      ...action.payload.search,
    }),
  },
  {
    position: {lat: 49.44444, lng: 32.05972},
    adress: 'Черкаси',
    radius: 500,
    type: 'MEDIC',
  }
);
const places = handleActions(
  { 
    [combineActions(
      END_SEARCH_PLACES,
      SELECT_PLACE
    )]: (state, action) => ({
      ...state, 
      ...action.payload.places,
    }),
  },
  {
    placesArray: [],
    activePlaceId: null,
  }
);

const mapState = combineReducers({
  gmaps,
  search,
  places,
});

export default mapState;
