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
export const startSearchPosition = createAction(START_SEARCH_POSITION, () => ({
  gmaps: {messages: {loading: 'Встановлення місцезнаходження', alerts: [], errors: []}},
}));
export const startSearchPlaces = createAction(START_SEARCH_PLACES, ({radius, type}) => ({
  search: {radius, type},
  gmaps: {messages: {loading: 'Пошук медичних закладів', alerts: [], errors: []}},
}));
export const endSearchPosition = createAction(END_SEARCH_POSITION, ({position, adress, alerts=[], errors=[]}) => ({
  search: {position, adress},
  gmaps: {messages: {loading: null}, alerts, errors},
}));
export const endSearchPlaces = createAction(END_SEARCH_PLACES, ({places, alerts, errors, zoom}) => ({
  places: {placesArray: places, activePlaceId: null},
  gmaps: {messages: {alerts, errors, loading: null}, zoom},
}));
export const selectPlace = createAction(SELECT_PLACE, ({activePlaceId, zoom}) => ({
  places: {activePlaceId},
  gmaps: {zoom},
}));

export const getLocation = (geocoderService, placesService) => {
  return (dispatch, getState) => {
    dispatch(startSearchPosition());
    debugger;
    let alerts = [];
    let errors = [];
    const {radius, type, position} = getState().mapState.search;
    if (navigator.geolocation) {
      const getPosition = new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const {coords: {latitude: lat, longitude: lng}} = position;
            resolve({lat, lng});
          }, 
          (error) => {
            reject(error);
          }, 
          {timeout: 5000}
        )
      });
      getPosition
        .then((position) => {
          debugger;
          getAdressFromPosition(geocoderService, position)
            .then((adress)=> {
              debugger;
              dispatch(endSearchPosition({position, adress}));
            })
            .catch((error) => {
              debugger;
              alerts.push(`Не взалось визначити адресу для поточного місцезнаходження.`);
              dispatch(endSearchPosition({position, alerts}));
            })
            .finally(() => {
              if (!getState().mapState.places.placesArray.length) {
                debugger;
                dispatch(searchPlaces({placesService, position, radius, alerts, errors, type}));
                return;
              }
            });
        })
        .catch((error) => {
          debugger;
          errors.push(`Помилка при визначенні місцезнаходження. Вкажіть своє місцецзаходження.`);
          dispatch(endSearchPosition({position, errors}));
          if (!getState().mapState.places.placesArray.length) {
            debugger;
            dispatch(searchPlaces({placesService, position, radius, alerts, errors, type}));
          }
          return;
        })
    } else {
      errors.push(`Помилка при визначенні місцезнаходження. Вкажіть своє місцецзаходження.`);
      debugger;
      dispatch(endSearchPosition({position, errors}));
      if (!getState().mapState.places.placesArray.length) {
        debugger;
        dispatch(searchPlaces({placesService, position, radius, alerts, errors, type}));
      } 
    } 
  }
}

export const searchPlaces = ({placesService, position, radius, alerts=[], errors=[], type='MAIN'}) => {
  return (dispatch) => {
    dispatch(startSearchPlaces({radius, type}));
    debugger;
    searchMedicPlaces(placesService, position, radius, type)
      .then(({places, alerts: searchAlerts, errors: searchErrors}) => {
        debugger;
        searchAlerts = searchAlerts.map((alert) => {
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
        searchErrors = searchErrors.map((error) => {
            return `Помилка пошуку.`;
        });
        alerts = alerts.concat(searchAlerts);
        errors = errors.concat(searchErrors);
        let zoom = 16;
        zoom = radius > 200 ? 15 : zoom;
        zoom = radius > 400 ? 14 : zoom;
        zoom = radius > 1200 ? 13 : zoom;
        zoom = radius > 3500 ? 12 : zoom;
        debugger;
        dispatch(endSearchPlaces({places, alerts, errors, zoom}));
      })
  }
}
