import {MAP_INIT_MAP_SERVICES, MAP_SEARCH_PLACES, MAP_SET_FILTER, MAP_SELECT_PLACE} from '../constants'

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
export const setFilter = (settings) => {
  return {
    type: MAP_SET_FILTER,
    payload: settings,
  }
}
