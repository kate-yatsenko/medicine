import { SET_MEDCARD_DATA } from "../constants/patientConstants";

export const setMedcardData = (medcardData) => {
  return {
    type: SET_MEDCARD_DATA,
    medcardData
  }
};