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

const SEARCH_PLACE_TYPES = [
  'hospital',
  'doctor',
  'pharmacy',
  'dentist',
  'physiotherapist',
];
const SEARCH_PLACE_NAMES = [
  'клиника',
  'больница',
  'врач',
];
// for aditional check received by name places
const CHECK_PLACE_TYPES = [
  ...SEARCH_PLACE_TYPES,
  'health',
];


export function searchPlaces(placesService, location, radius) {
  const searchRequests = [
    ...SEARCH_PLACE_TYPES.map(type => {
      return _searchNearbyPlaces(placesService, {location, radius, type});
    }),
    ...SEARCH_PLACE_NAMES.map(name => {
      return _searchNearbyPlaces(placesService, {location, radius, name});
    })
  ];
  return Promise.all(searchRequests)
    .then((results) => {
      const exceededMaxPlacesNumber = results.some((result) => result.length === 60);
      let places = results.reduce((places, result) => places.concat(result));
      let unicPlaceIds = [];
      places = places.filter((place) => {
        if (!place.types.some((type) => CHECK_PLACE_TYPES.includes(type))) {
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
