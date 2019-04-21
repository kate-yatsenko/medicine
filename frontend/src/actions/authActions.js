import {
  TOGGLE_AUTH_MODAL_VISIBLE,
  UPDATE_USER_INFO,
  LOGOUT_USER,
  CHANGE_STEP,
  TOGGLE_UPDATE_VISIBLE
} from '../constants/authConstants';

export const toggleAuthModalVisible = () => {
  return {
    type: TOGGLE_AUTH_MODAL_VISIBLE
  }
};

export const toggleUpdateModalVisible = () => {
  return {
    type: TOGGLE_UPDATE_VISIBLE
  }
};

export const updateUserInfo = (userInfo) => {
  return {
    type: UPDATE_USER_INFO,
    userInfo
  }
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  }
};

export const changeStep = (step) => {
  return {
    type: CHANGE_STEP,
    step
  }
};