export const INIT_MAP_SERVICES = 'INIT_MAP_SERVICES';
export const SEARCH_PLACES = 'SEARCH_PLACES';
export const SET_PLACES_FILTER = 'SET_PLACES_FILTER';
export const SELECT_PLACE = 'SELECT_PLACE';
export const SEARCH_PLACE_TYPES = [
  'hospital',
  'doctor',
  'dentist',
  'pharmacy',
];
export const HOSPITAL_NAMES= [
  'больница',
  'лікарня',
]
export const DOCTOR_NAMES = [
  'клиника',
  'клініка',
  'врач',
  'лікар',
];
export const SEARCH_PLACE_NAMES = [
  HOSPITAL_NAMES[0],
  ...DOCTOR_NAMES,
];
export const CHECK_PLACE_TYPES = [
  ...SEARCH_PLACE_TYPES,
  'health',
];
