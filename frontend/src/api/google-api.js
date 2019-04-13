import {MAP_SEARCH_PLACE_TYPES, MAP_SEARCH_PLACE_NAMES, MAP_CHECK_PLACE_TYPES} from '../constants'

function _searchNearbyPlaces(placesService,  searchRequest) {
  return new Promise((resolve, reject) => {
      let places = [];
      placesService.nearbySearch(searchRequest, (results, status, pagination) => {
          if (status === 'OK' || status === 'ZERO_RESULTS') {
            places = places.concat(results);
            if (pagination.hasNextPage) {
              pagination.nextPage();
            } else {
              resolve(places);
            }
          } else {
            reject(status);
          }
      })
  })
}

export function searchPlaces(placesService, location, radius) {
  const searchRequests = [
    ...MAP_SEARCH_PLACE_TYPES.map(type => {
      return _searchNearbyPlaces(placesService, {location, radius, type});
    }),
    ...MAP_SEARCH_PLACE_NAMES.map(name => {
      return _searchNearbyPlaces(placesService, {location, radius, name});
    })
  ];
  return Promise.all(searchRequests)
    .then((results) => {
      const exceededMaxPlacesNumber = results.some((result) => result.length === 60);
      let places = results.reduce((places, result) => places.concat(result));
      let unicPlaceIds = [];
      places = places.filter((place) => {
        if (!place.types.some((type) => MAP_CHECK_PLACE_TYPES.includes(type))) {
          return false;
        }
        if (unicPlaceIds.includes(place.place_id)) {
          return false;
        }
        unicPlaceIds.push(place.place_id);
        return true;
      });
    return {places, exceededMaxPlacesNumber};
  });
}
