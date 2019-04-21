import {
  TOGGLE_TABLE_MODAL,
  SET_EDIT_ROW,
  SET_MEDCARD_DATA,
  TOGGLE_TABLE_LOADING,
  UPDATE_MEDCARD_TABLE,
  CREATE_MEDCARD_TABLE_ITEM,
  SET_PAGE
} from "../constants/doctorConstants";

export const toggleTableModal = () => {
  return {
    type: TOGGLE_TABLE_MODAL
  }
};

export const toggleTableLoading = () => {
  return {
    type: TOGGLE_TABLE_LOADING
  }
};

export const setEditRow = (editRow, actionType) => {
  return {
    type: SET_EDIT_ROW,
    editRow,
    actionType
  }
};

export const setMedcardData = (medcardData, total) => {
  return {
    type: SET_MEDCARD_DATA,
    medcardData,
    total
  }
};

export const updateMedcardTable = (item) => {
  return {
    type: UPDATE_MEDCARD_TABLE,
    item
  }
};

export const createMedcardTableItem = (item) => {
  return {
    type: CREATE_MEDCARD_TABLE_ITEM,
    item
  }
};

export const setPage = (page) => {
  return {
    type: SET_PAGE,
    page
  }
};