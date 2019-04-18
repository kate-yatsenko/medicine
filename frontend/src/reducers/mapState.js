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
      loadingMessage: action.payload,
    }),
    [combineActions(END_SEARCH_POSITION, END_SEARCH_PLACES)]: (state, action) => ({
      ...state, 
      loadingMessage: [],
    }),
  },
  {
    map: null,
    placesService: null,
    geocoderService: null,
    loadingMessage: [],
  }
);

const search = handleActions(
  {
    [combineActions(START_SEARCH_POSITION, START_SEARCH_PLACES)]: (state, action) => ({
      ...state, alerts: [], errors: []
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
    radius: 500,
    adress: null,
    alerts: [],
    errors: [],
  }
);

// TODO: ? add filtered & active pleces instead of filter reducer
const places = handleActions(
  {
    [END_SEARCH_PLACES]: (state, action) => ({...state, placesArray: action.payload.places}),
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
