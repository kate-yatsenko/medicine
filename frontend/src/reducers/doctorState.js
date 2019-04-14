import { TOGGLE_EDIT_TABLE_MODAL, SET_EDIT_ROW, SET_MEDCARD_DATA } from "../constants/doctorConstants";

export const initialState = {
  showEditModal: false,
  editRow: null,
  medcardData: [],
  testId: 2,
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
    case SET_MEDCARD_DATA:
      return { ...state, medcardData: action.medcardData };
    default:
      return state
  }
};

export default doctorState