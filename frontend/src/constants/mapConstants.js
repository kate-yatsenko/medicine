export const INIT_MAP_SERVICES = 'INIT_MAP_SERVICES';
export const START_SEARCH_POSITION = 'START_SEARCH_POSITION';
export const END_SEARCH_POSITION = 'END_SEARCH_POSITION';
export const START_SEARCH_PLACES = 'START_SEARCH_PLACES';
export const END_SEARCH_PLACES = 'END_SEARCH_PLACES';
export const SET_PLACES_FILTER = 'SET_PLACES_FILTER';
export const SELECT_PLACE = 'SELECT_PLACE';
export const SEARCH_PLACE_TYPES = [
  'hospital',
  'doctor',
  'dentist',
  'pharmacy',
];
export const HOSPITAL_NAMES= [
  'лікарня',
  'стоматологія',
  'стоматологія',
  'аптека',
]
export const DOCTOR_NAMES = [
  'клініка',
  'поліклініка',
  'лікар',
];
export const SEARCH_PLACE_NAMES = [
  ...HOSPITAL_NAMES,
  ...DOCTOR_NAMES,
];
export const CHECK_PLACE_TYPES = [
  // ...SEARCH_PLACE_TYPES,
  'hospital',
  'doctor',
  'dentist',
  'pharmacy',

  'health',
];

export const SEARCH_CONDITIONS = {
  MEDIC: {
    NAMES: [
      'лікарня',
      'клініка',
    ],
    TYPES: [
      'hospital',
      'doctor',
    ],
    CHECK_TYPES: [
      'hospital',
      'doctor',
      'health',
    ],
    EXCLUDE_TYPES: [
      'dentist',
    ]
  },
  DENTIST: {
    NAMES: ['стоматологія'],
    TYPES: ['dentist'],
    CHECK_TYPES: [
      'dentist',
      'health',
    ],
  },
  PHARMACY: {
    NAMES: ['аптека'],
    TYPES: ['pharmacy'],
    CHECK_TYPES: [
      'pharmacy',
      'health',
    ],
  },
}
