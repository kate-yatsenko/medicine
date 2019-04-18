import {
  INIT_MAP_SERVICES, 
  START_SEARCH_POSITION, 
  START_SEARCH_PLACES, 
  END_SEARCH_POSITION, 
  END_SEARCH_PLACES, 
  SELECT_PLACE,
} from '../constants/mapConstants';
import {combineReducers} from 'redux';
import {handleAction, handleActions, combineActions} from 'redux-actions';

const gmaps = handleActions(
  {
    [INIT_MAP_SERVICES]: (state, action) => ({...state, ...action.payload}),
    [combineActions(START_SEARCH_POSITION, START_SEARCH_PLACES)]: (state, action) => ({
      ...state, 
      loadingMessage: action.payload.loadingMessage,
    }),
    [combineActions(END_SEARCH_POSITION, END_SEARCH_PLACES)]: (state, action) => ({
      ...state, 
      loadingMessage: null,
    }),
  },
  {
    map: null,
    placesService: null,
    geocoderService: null,
    loadingMessage: null,
  }
);

const search = handleActions(
  {
    [combineActions(START_SEARCH_POSITION, START_SEARCH_PLACES)]: (state, action) => ({
      ...state, alerts: [], errors: [], radius: action.payload.radius, searchType: action.payload.searchType
    }),
    END_SEARCH_POSITION: (state, action) => {
      return {...state, ...action.payload}
    },
    END_SEARCH_PLACES: (state, action) => {
      const {alerts, errors} = action.payload;
      return {
        ...state, alerts, errors
      }
    },
  },
  {
    position: null,
    adress: null,
    radius: 500,
    searchType: 'MAIN',
    alerts: [],
    errors: [],
  }
);

// TODO: ? add filtered & active pleces instead of filter reducer
const places = handleActions(
  {
    [END_SEARCH_PLACES]: (state, action) => ({...state, placesArray: action.payload.places, activePlaceId: null}),
    [SELECT_PLACE]: (state, action) => ({...state, activePlaceId: action.payload}),
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
