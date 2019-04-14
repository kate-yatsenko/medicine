import axios from 'axios';

export const getDoctorMedcardData = (id) =>
  axios.get(`/users/${id}/entries`)
    .then(response => response.data);

export const updateMedcardItem = (userId, entryId, data) =>
  axios.post(`/users/${userId}/entries/${entryId}`, { ...data })
    .then(response => response.data);

export const createMedcardItem = (userId, data) =>
  axios.post(`/users/${userId}/entries`, { ...data })
    .then(response => response.data);



