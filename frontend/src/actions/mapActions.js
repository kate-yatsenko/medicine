import {
  INIT_MAP_SERVICES, 
  START_SEARCH_POSITION, 
  START_SEARCH_PLACES, 
  END_SEARCH_POSITION, 
  END_SEARCH_PLACES, 
  SELECT_PLACE
} from '../constants/mapConstants';
import {createAction} from 'redux-actions';
import {getAdressFromPosition, searchMedicPlaces} from '../api/google-api';

export const initMapServices = createAction(INIT_MAP_SERVICES);
export const startSearchPosition = createAction(START_SEARCH_POSITION, (payload) => ({
  ...payload,
  loadingMessage: 'Встановлення місцезнаходження'
}));
export const startSearchPlaces = createAction(START_SEARCH_PLACES, (payload) => ({
  ...payload,
  loadingMessage: 'Пошук медичних закладів'
}));
export const endSearchPosition = createAction(END_SEARCH_POSITION);
export const endSearchPlaces = createAction(END_SEARCH_PLACES);
export const selectPlace = createAction(SELECT_PLACE);

export const getLocation = (geocoderService, placesService) => {
  return (dispatch, getState) => {
    dispatch(startSearchPosition);
    let alerts = [];
    let errors = [];
    const radius = getState().mapState.search.radius;
    const getPosition = new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const {coords: {latitude: lat, longitude: lng}} = position;
            resolve({lat, lng});
          }, 
          (error) => {
            reject(error);
          }, 
          {timeout: 10000}
        )
      } else {
        reject('UNDEFINED_GEOLOCATION');
      }
    });
    getPosition
      .then((position) => {
        getAdressFromPosition(geocoderService, position)
          .then((adress)=> {
            dispatch(endSearchPosition({position, adress}));
          })
          .catch((error) => {
            alerts.push(`Не взалось визначити адресу для поточного місцезнаходження.`);
            dispatch(endSearchPosition({position}));
          })
          .finally(() => {
            if (!getState().mapState.places.placesArray.length) {
              dispatch(searchPlaces({placesService, position, radius, alerts, errors}));
            }
          });
      })
      .catch((error) => {
        const position = {lat: 49.44444, lng: 32.05972};
        errors.push(`Помилка при визначенні місцезнаходження. Вкажіть своє місцецзаходження.`);
        dispatch(endSearchPosition({position}));
        if (!getState().mapState.places.placesArray.length) {
          dispatch(searchPlaces({placesService, position, radius, alerts, errors}));
        }
      })
  }
}

export const searchPlaces = ({placesService, position, radius, positionAlerts=[], positionErrors=[], searchType='MAIN'}) => {
  return (dispatch) => {
    dispatch(startSearchPlaces({radius, searchType}));
    if (!position) {
      position = {lat: 49.44444, lng: 32.05972};
      dispatch(endSearchPosition({position}));
      positionErrors = [`Помилка при визначенні місцезнаходження. Вкажіть своє місцецзаходження.`];
    }
    searchMedicPlaces(placesService, position, radius, searchType)
      .then(({places, alerts, errors}) => {
        alerts = alerts.map((alert) => {
          if (alert === 'OVER_QUERY_LIMIT') {
            return `Отримані не повні дані пошуку. Можливо велике навантаження на сервіс. Спробуйте пізніше, або зменшіть радіус пошуку.`;
          }
          if (alert === 'OVER_PLACES_LIMIT') {
            return `Можливо отримані не повні дані пошуку. Зменьшіть радіус пошуку.`;
          }
          if (alert === 'ZERO_RESULTS') {
            return `Об'эктів не знайдено.`;
          }
          return `Помилка пошуку.`;
        });
        errors = errors.map((error) => {
            return `Помилка пошуку.`;
        });
        alerts = alerts.concat(positionAlerts);
        errors = errors.concat(positionErrors);
        dispatch(endSearchPlaces({places, alerts, errors}));
      })
  }
}
