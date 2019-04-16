import {
  INIT_MAP_SERVICES, 
  START_SEARCH_POSITION, 
  START_SEARCH_PLACES, 
  END_SEARCH_POSITION, 
  END_SEARCH_PLACES, 
  SET_PLACES_FILTER, 
  SELECT_PLACE
} from '../constants/mapConstants';
import {createAction} from 'redux-actions';
import {getAdressFromPosition, searchMedicPlaces} from '../api/google-api';

export const initMapServices = createAction(INIT_MAP_SERVICES);
export const startSearchPosition = createAction(START_SEARCH_POSITION, () => 'Встановлення місцезнаходження');
export const startSearchPlaces = createAction(START_SEARCH_PLACES, () => 'Пошук медичних закладів');
export const endSearchPosition = createAction(END_SEARCH_POSITION);
export const endSearchPlaces = createAction(END_SEARCH_PLACES);
export const setPlacesFilter = createAction(SET_PLACES_FILTER);
export const selectPlace = createAction(SELECT_PLACE);

export const getLocation = (geocoderService, placesService) => {
  return (dispatch, getState) => {
    dispatch(startSearchPosition);
    let alerts = [];
    let errors = [];
    const radius = getState().mapState.search.radius;
    const getPosition = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position)=>{
          const {coords: {latitude: lat, longitude: lng}} = position;
          resolve({lat, lng});
        }, 
        (error)=>{
          reject(error);
        }, 
        {timeout: 10000})
    });
    getPosition
      .then((position) => {
        getAdressFromPosition(geocoderService, position)
          .then((adress)=> {
            dispatch(endSearchPosition({position, adress}));
          })
          .catch((error) => {
            alerts.push(`Не взалось визначити адресу для поточного місцезнаходження.<br/>${error}`);
            dispatch(endSearchPosition({position}));
          })
          .finally(() => {
            dispatch(searchPlaces({placesService, position, radius, alerts, errors}));
          });
      })
      .catch((error) => {
        debugger;
        const position = {lat: 49.44444, lng: 32.05972};
        errors.push(`Помилка при визначенні місцезнаходження. Вкажіть своє місцецзаходження.<br/>${error.message}`);
        dispatch(endSearchPosition({position}));
        dispatch(searchPlaces({placesService, position, radius, alerts, errors}));
      })

  }
}

export const searchPlaces = ({placesService, position, radius, alerts: getPositionAlerts = [], errors: getPositionErrors = []}) => {
  return (dispatch) => {
    dispatch(startSearchPlaces());
    searchMedicPlaces(placesService, position, radius)
      .then(({places, alerts, errors}) => {
        alerts = alerts.map((alert) => {
          if (alert === 'OVER_QUERY_LIMIT') {
            return `Отримані не повні дані пошуку. Можливо велике навантаження на сервіс. Спробуйте пізніше.
            ${alert}`;
          }
          if (alert === 'OVER_PLACES_LIMIT') {
            return `Можливо отримані не повні дані пошуку. Зменьшіть радіус пошуку.<br/>${alert}`;
          }
        });
        errors = errors.map((error) => {
            return `Помилка пошуку.<br/>${error}`;
        });
        alerts = alerts.concat(getPositionAlerts);
        errors = errors.concat(getPositionErrors);
        dispatch(endSearchPlaces({places, alerts, errors}));
      })
  }
}
