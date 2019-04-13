import {MAP_SEARCH_PLACE_TYPES, MAP_SEARCH_PLACE_NAMES, MAP_CHECK_PLACE_TYPES} from '../constants'

class Place {
  constructor(placeResult) {
    const {place_id, geometry, name, vicinity, types, rating, user_ratings_total} = placeResult;
    this.placeId = place_id;
    this.location = geometry.location;
    this.name = name;
    this.adress = vicinity;
    this.tags = types;
    this.type = this.getType();
    this.rating = {
      value: rating,
      users: user_ratings_total,
    };
  }
  getType() {
    for (const type of MAP_CHECK_PLACE_TYPES) {
      if (this.tags.includes(type)) {
        return type;
      }
    }
  }
}

function _searchNearbyPlaces(placesService,  searchRequest) {
  return new Promise((resolve, reject) => {
      let placeResults = [];
      placesService.nearbySearch(searchRequest, (results, status, pagination) => {
          if (status === 'OK' || status === 'ZERO_RESULTS') {
            placeResults = placeResults.concat(results);
            if (pagination.hasNextPage) {
              pagination.nextPage();
            } else {
              resolve(placeResults);
            }
          } else {
            reject(status);
          }
      })
  })
}

export function searchMedicPlaces(placesService, location, radius) {
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
      let placeResults = results.reduce((placeResults, result) => placeResults.concat(result));
      let unicPlaceIds = [];
      placeResults = placeResults.filter((placeResult) => {
        if (!placeResult.types.some((type) => MAP_CHECK_PLACE_TYPES.includes(type))) {
          return false;
        }
        if (unicPlaceIds.includes(placeResult.place_id)) {
          return false;
        }
        unicPlaceIds.push(placeResult.place_id);
        return true;
      });
      const places = placeResults.map(placeResult => {
        return new Place(placeResult);
      });
      return {places, exceededMaxPlacesNumber};
  });
}
