import {
  TOGGLE_TABLE_MODAL,
  SET_EDIT_ROW,
  SET_MEDCARD_DATA,
  TOGGLE_TABLE_LOADING,
  UPDATE_MEDCARD_TABLE,
  CREATE_MEDCARD_TABLE_ITEM
} from "../constants/doctorConstants";

export const initialState = {
  showModal: false,
  editRow: null,
  actionType: null,
  medcardData: [],
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
      return { ...state, medcardData: action.medcardData };
    case TOGGLE_TABLE_LOADING:
      return { ...state, loading: !state.loading };
    case UPDATE_MEDCARD_TABLE:
      const newMedcardData = [...state.medcardData];
      const index = newMedcardData.indexOf(newMedcardData.find(item => item.id === action.item.id));
      if (index) {
        newMedcardData[index] = action.item;
        return { ...state, medcardData: newMedcardData };
      }
      return state;
    case CREATE_MEDCARD_TABLE_ITEM:
      return { ...state, medcardData: [action.item, ...state.medcardData] };
    default:
      return state
  }
};

export default doctorState