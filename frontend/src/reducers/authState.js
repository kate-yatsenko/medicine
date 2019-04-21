import {
  TOGGLE_AUTH_MODAL_VISIBLE,
  UPDATE_USER_INFO,
  LOGOUT_USER,
  CHANGE_STEP,
  TOGGLE_UPDATE_VISIBLE
} from '../constants/authConstants';

export const initialState = {
  showAuthModal: false,
  showUpdateModal: false,
  userId: localStorage.getItem('userId') ? Number(localStorage.getItem('userId')) : null,
  userRole: localStorage.getItem('userRole') ? Number(localStorage.getItem('userRole')) : null,
  userName: localStorage.getItem('userName') ? localStorage.getItem('userName') : null,
  userEmail: localStorage.getItem('userEmail') ? localStorage.getItem('userEmail') : null,
  token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
  isProfileComplete: localStorage.getItem('isProfileComplete') ? localStorage.getItem('isProfileComplete') : null,
  step: 0
};

const authState = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_AUTH_MODAL_VISIBLE:
      return { ...state, showAuthModal: !state.showAuthModal };
    case TOGGLE_UPDATE_VISIBLE:
      return { ...state, showUpdateModal: !state.showUpdateModal };
    case UPDATE_USER_INFO:
      return { ...state, ...action.userInfo };
    case LOGOUT_USER:
      localStorage.clear();
      return {
        ...state,
        userId: null,
        userRole: null,
        userName: null,
        userEmail: null,
        token: null,
        isProfileComplete: null,
        step: 0
      };
    case CHANGE_STEP:
      return { ...state, step: action.step };
    default:
      return state
  }
};

export default authState