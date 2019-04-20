import axios from 'axios';

export const getDoctorMedcardData = (id, params) =>
  axios.get(`/users/${id}/entries`, { params })
    .then(response => response.data);

export const updateMedcardItem = (userId, entryId, data) =>
  axios.post(`/users/${userId}/entries/${entryId}`, { ...data })
    .then(response => response.data);

export const createMedcardItem = (userId, data) =>
  axios.post(`/users/${userId}/entries`, { ...data })
    .then(response => response.data);

export const getTypes = () =>
  axios.get(`/etypes/`)
    .then(response => response.data);

export const searchUsers = (id, params) =>
  axios.get(`/users/${id}/search`, { params })
    .then(response => response.data);


