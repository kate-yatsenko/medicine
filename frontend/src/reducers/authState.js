import { TOGGLE_AUTH_MODAL_VISIBLE } from '../constants';

export const initialState = {
  showAuthModal: false,
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