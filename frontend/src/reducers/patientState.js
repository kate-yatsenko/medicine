import { SET_PAGE, TOGGLE_TABLE_LOADING, SET_MEDCARD_DATA } from "../constants/patientConstants";

export const initialState = {
  medcardData: [],
  loading: false,
  testId: 3,
  page: 1,
  total: 0,
};

const patientState = (state = initialState, action) => {
  switch (action.type) {
    case SET_MEDCARD_DATA:
      return { ...state, ...action };
    case TOGGLE_TABLE_LOADING:
      return { ...state, loading: !state.loading };
    case SET_PAGE:
      return { ...state, ...action };
    default:
      return state
  }
};

export default patientState