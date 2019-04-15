import {INIT_MAP_SERVICES, SEARCH_PLACES, SET_PLACES_FILTER, SELECT_PLACE} from '../constants/mapConstants'
import {createActions} from 'redux-actions';

// export const initMapServices = (map, placesService) => {
//   return {
//     type: MAP_INIT_MAP_SERVICES,
//     payload: {
//       map,
//       placesService,
//     },
//   }
// }
// export const searchPlaces = (settings) => {
//   return {
//     type: MAP_SEARCH_PLACES,
//     payload: settings,
//   }
// }
// export const setFilter = (settings) => {
//   return {
//     type: MAP_SET_FILTER,
//     payload: settings,
//   }
// }

const mapActions = createActions(
  {
    INIT_MAP_SERVICES: (map, placesService) => ({map, placesService}),
  },
  SEARCH_PLACES,
  SET_PLACES_FILTER
);

export default mapActions;
