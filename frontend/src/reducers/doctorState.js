import {
  TOGGLE_TABLE_MODAL,
  SET_EDIT_ROW,
  SET_MEDCARD_DATA,
  TOGGLE_TABLE_LOADING,
  UPDATE_MEDCARD_TABLE,
  CREATE_MEDCARD_TABLE_ITEM,
  SET_PAGE
} from "../constants/doctorConstants";

export const initialState = {
  showModal: false,
  editRow: null,
  actionType: null,
  medcardData: [],
  page: 1,
  total: 0,
  testId: 2,
  loading: false,
};

const doctorState = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_TABLE_MODAL:
      if (state.showModal) {
        return { ...state, showModal: !state.showModal, editRow: null };
      }
      return { ...state, showModal: !state.showModal };
    case SET_EDIT_ROW:
      return { ...state, ...action };
    case SET_MEDCARD_DATA:
      return { ...state, ...action };
    case TOGGLE_TABLE_LOADING:
      return { ...state, loading: !state.loading };
    case UPDATE_MEDCARD_TABLE:
      const newMedcardData = [...state.medcardData];
      const index = newMedcardData.indexOf(newMedcardData.find(item => item.id === action.item.id));
      if (index >= 0) {
        newMedcardData[index] = action.item;
        return { ...state, medcardData: newMedcardData };
      }
      return state;
    case CREATE_MEDCARD_TABLE_ITEM:
      return { ...state, medcardData: [action.item, ...state.medcardData], total: state.total + 1 };
    case SET_PAGE:
      return { ...state, ...action };
    default:
      return state
  }
};

export default doctorState