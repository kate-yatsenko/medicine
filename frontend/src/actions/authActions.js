import {
  TOGGLE_AUTH_MODAL_VISIBLE,
  UPDATE_USER_INFO,
  LOGOUT_USER,
  CHANGE_STEP,
  TOGGLE_UPDATE_VISIBLE,
  UPDATE_PROFILE_DATA,
  REMOVE_PROFILE_DATA
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

export const updateProfileData = (data) => {
  return {
    type: UPDATE_PROFILE_DATA,
    data
  }
};

export const removeProfileData = () => {
  return {
    type: REMOVE_PROFILE_DATA,
  }
};