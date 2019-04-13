import { TOGGLE_EDIT_TABLE_MODAL, SET_EDIT_ROW } from "../constants/doctorConstants";

export const initialState = {
  showEditModal: false,
  editRow: null
};

const doctorState = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_EDIT_TABLE_MODAL:
      if (state.showEditModal) {
        return { ...state, showEditModal: !state.showEditModal, editRow: null };
      }
      return { ...state, showEditModal: !state.showEditModal };
    case SET_EDIT_ROW:
      return { ...state, editRow: action.record };
    default:
      return state
  }
};

export default doctorState