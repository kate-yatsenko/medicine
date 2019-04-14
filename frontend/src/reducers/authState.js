import { TOGGLE_AUTH_MODAL_VISIBLE } from '../constants/authConstants';

export const initialState = {
  showAuthModal: false,
  userId: null,
  userRole: null
};

const authState = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_AUTH_MODAL_VISIBLE:
      return {...state, showAuthModal: !state.showAuthModal}
    default:
      return state
  }
};

export default authState