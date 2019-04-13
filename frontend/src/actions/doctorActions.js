import { TOGGLE_EDIT_TABLE_MODAL, SET_EDIT_ROW } from "../constants/doctorConstants";

export const toggleEditTableModal = () => {
  return {
    type: TOGGLE_EDIT_TABLE_MODAL
  }
};
export const setEditRow = (record) => {
  return {
    type: SET_EDIT_ROW,
    record
  }
};