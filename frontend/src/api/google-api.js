import {SEARCH_PLACE_TYPES, SEARCH_PLACE_NAMES, CHECK_PLACE_TYPES, HOSPITAL_NAMES, DOCTOR_NAMES} from '../constants/mapConstants'

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
    for (const name of HOSPITAL_NAMES) {
      if (this.name.includes(name)) {
        return 'hospital';
      }
    }
    for (const name of DOCTOR_NAMES) {
      if (this.name.includes(name)) {
        return 'doctor';
      }
    }
    for (const type of CHECK_PLACE_TYPES) {
      if (this.tags.includes(type)) {
        return type;
      }
    }
  }
}

const _searchNearbyPlaces = (placesService,  searchRequest) => {
  return new Promise((resolve, reject) => {
    let placeResults = [];
    placesService.nearbySearch(searchRequest, (results, status, pagination) => {
      switch (status) {
        case 'OK':
        case 'ZERO_RESULTS':
        case 'NOT_FOUND':
          placeResults = placeResults.concat(results);
          if (pagination.hasNextPage) {
            pagination.nextPage();
            console.log(status);
            console.log({searchRequest});
          } else {
            console.log(status);
            console.log(searchRequest);
            console.log(placeResults);
            resolve({placeResults});
          }
          break;
        case 'OVER_QUERY_LIMIT':
          console.log(status);
          console.log(searchRequest);
          resolve({placeResults, alert: status});
          break;
        case 'INVALID_REQUEST':
        case 'REQUEST_DENIED':
        case 'UNKNOWN_ERROR':
          resolve({placeResults, error: status});
          break;
        default:
          resolve({placeResults, error: 'UNKNOWN_ERROR'});
      }
    })
  })
}

export function searchMedicPlaces(placesService, location, radius) {
  const searchRequests = [
    ...SEARCH_PLACE_TYPES.map(type => {
      return _searchNearbyPlaces(placesService, {location, radius, type});
    }),
    ...SEARCH_PLACE_NAMES.map(name => {
      return _searchNearbyPlaces(placesService, {location, radius, name});
    })
  ];
  return Promise.all(searchRequests)
    .then((responseResults) => {
      let unicPlaceIds = [];
      let results = responseResults.reduce((results, {placeResults, alert, error}, ) => {
        results.placeResults = results.placeResults.concat(placeResults);
        if (placeResults.some((result) => result.length === 60)) {
          results.alerts.add('OVER_PLACES_LIMIT');
        }
        if (alert) {
          results.alerts.add(alert);
        }
        if (error) {
          results.alerts.add(error);
        }
        return results;
      }, {placeResults: [], alerts: new Set(), errors: new Set()});
      const places = results.placeResults.reduce((places, placeResult) => {
        if (!placeResult.types.some((type) => CHECK_PLACE_TYPES.includes(type))) {
          return places;
        }
        if (unicPlaceIds.includes(placeResult.place_id)) {
          return places;
        }
        unicPlaceIds.push(placeResult.place_id);
        places.push(new Place(placeResult));
        return places;
      }, []);
      const alerts = [...results.alerts];
      const errors = [...results.errors];
      return {places, alerts, errors};
  })
}

export function getAdressFromPosition(geocoderService, position) {
  return new Promise((resolve, reject) => {
    geocoderService.geocode({location: position}, (result, status)=> {
      if (status === 'OK') {
        const adress = result[0].formatted_address;
        resolve(adress);
      }
      reject(status);
    });
  });
}
