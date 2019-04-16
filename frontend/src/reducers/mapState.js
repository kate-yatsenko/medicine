import {
  INIT_MAP_SERVICES, 
  START_SEARCH_POSITION, 
  START_SEARCH_PLACES, 
  END_SEARCH_POSITION, 
  END_SEARCH_PLACES, 
  SET_PLACES_FILTER, 
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
    END_SEARCH_POSITION: (state, action) => {
      return {...state, ...action.payload}
    },
    END_SEARCH_PLACES: (state, action) => {
      const {alerts, errors} = action.payload;
      return {
        ...state, alerts, errors
        // alerts: [...state.alerts, ...alerts], 
        // errors: [...state.errors, ...errors],
      }
    },
  },
  {
    position: null,
    // position: {lat: 49.44444, lng: 32.05972},
    radius: 500,
    adress: null,
    // adress: 'бульвар Шевченка, 185, Черкаси',
    alerts: [],
    errors: [],
  }
);

// TODO: ? add filtered & active pleces instead of filter reducer
const places = handleAction(
  END_SEARCH_PLACES, (state, action) => (action.payload.places),
  []
);

// TODO: ? remove filter to component state
const filter = handleAction(
  SET_PLACES_FILTER, (state, action) => ({...state, ...action.payload}),
  {
    types: ['hospital', 'doctor'],
    name: '',
  }
);

const mapState = combineReducers({
  gmaps,
  search,
  places,
  filter,
});

export default mapState;
