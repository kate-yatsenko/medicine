import { SET_MEDCARD_DATA } from "../constants/patientConstants";

export const initialState = {
  medcardData: [],
  testId: 3,
};

const patientState = (state = initialState, action) => {
  switch (action.type) {
    case SET_MEDCARD_DATA:
      return { ...state, medcardData: action.medcardData };
    default:
      return state
  }
};

export default patientState