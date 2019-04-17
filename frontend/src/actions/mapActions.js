import {MAP_INIT_MAP_SERVICES, MAP_SEARCH_PLACES, MAP_SET_FILTER, MAP_SELECT_PLACE, CHANGE_FILTER_BY_NAME, CHANGE_FILTER_BY_CATEGORY} from '../constants'

export const initMapServices = (map, placesService) => {
  return {
    type: MAP_INIT_MAP_SERVICES,
    payload: {
      map,
      placesService,
    },
  }
}
export const searchPlaces = (settings) => {
  return {
    type: MAP_SEARCH_PLACES,
    payload: settings,
  }
}
export const filterByCategoryChange = type=> ({
    type: CHANGE_FILTER_BY_CATEGORY,
    payload: type,
});

export const filterByNameChange = filter => ({
  type: CHANGE_FILTER_BY_NAME,
  payload: filter,
});
