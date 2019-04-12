import {MAP_SEARCH_PLACES, MAP_SET_FILTER, MAP_SELECT_PLACE} from '../constants'

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
export const selectPlace = (place) => {
  return {
    type: MAP_SELECT_PLACE,
    payload: place,
  }
}