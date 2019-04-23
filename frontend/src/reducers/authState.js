import {
  TOGGLE_AUTH_MODAL_VISIBLE,
  UPDATE_USER_INFO,
  LOGOUT_USER,
  CHANGE_STEP,
  TOGGLE_UPDATE_VISIBLE,
  UPDATE_PROFILE_DATA,
  REMOVE_PROFILE_DATA
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
  step: 0,
  updateProfileData: {
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    birth: "",
  }
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
    case UPDATE_PROFILE_DATA:
      return { ...state, updateProfileData: {
          ...state.updateProfileData,
          ...action.data
      }};
    case REMOVE_PROFILE_DATA:
      return { ...state, updateProfileData: initialState.updateProfileData };
    default:
      return state
  }
};

export default authState