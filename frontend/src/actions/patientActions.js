import { SET_MEDCARD_DATA, TOGGLE_TABLE_LOADING, SET_PAGE } from "../constants/patientConstants";

export const setMedcardData = (medcardData, total) => {
  return {
    type: SET_MEDCARD_DATA,
    medcardData,
    total
  }
};

export const toggleTableLoading = () => {
  return {
    type: TOGGLE_TABLE_LOADING
  }
};

export const setPage = (page) => {
  return {
    type: SET_PAGE,
    page
  }
};