import axios from 'axios';

export const getDoctorMedcardData = (id, params, headers) =>
  axios.get(`/users/${id}/entries`, { params, headers })
    .then(response => response.data);

export const updateMedcardItem = (userId, entryId, data, headers) =>
  axios.post(`/users/${userId}/entries/${entryId}`, data, { headers })
    .then(response => response.data);

export const createMedcardItem = (userId, data, headers) =>
  axios.post(`/users/${userId}/entries`, data, { headers })
    .then(response => response.data);

export const getTypes = (headers) =>
  axios.get(`/etypes/`, { headers })
    .then(response => response.data);

export const searchUsers = (id, params, headers) =>
  axios.get(`/users/${id}/search`, { params, headers })
    .then(response => response.data);

export const authUser = (idToken) =>
  axios.post(`/auth`, { idToken })
    .then(response => response.data);

export const fillInPersonalData = (id, data, headers) =>
  axios.post(`/users/${id}`, data, { headers })
    .then(response => response.data);

export const getPersonalData = (id, headers) =>
  axios.get(`/users/${id}`, { headers })
    .then(response => response.data);


