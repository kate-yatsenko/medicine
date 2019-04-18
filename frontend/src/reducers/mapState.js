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
    [combineActions(START_SEARCH_POSITION, START_SEARCH_PLACES, END_SEARCH_POSITION, END_SEARCH_PLACES)]: (state, action) => ({
      ...state, 
      ...action.payload.gmaps,
    }),
    // TODO: 
    // [SELECT_PLACE]: (state, action) => ({
    //   ...state, 
    //   messages: {...state.messageges, loadind: action.payload.messages.loading},
    //   zoom: action.payload.zoom,
    // }),
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
    [combineActions(START_SEARCH_POSITION, START_SEARCH_PLACES, END_SEARCH_POSITION)]: (state, action) => {
      return ({
      ...state, 
      ...action.payload.search,
    })},
  },
  {
    position: {lat: 49.44444, lng: 32.05972},
    adress: 'Черкаси',
    radius: 500,
    type: 'MAIN',
  }
);

// TODO: ? add filtered & active pleces instead of filter reducer
const places = handleActions(
  {
    [END_SEARCH_PLACES]: (state, action) => {
      debugger;
      return ({...state, ...action.payload.places});},
    [SELECT_PLACE]: (state, action) => ({...state, activePlaceId: action.payload.activePlaceId}),
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
