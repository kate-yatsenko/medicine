import axios from 'axios';

export const getDoctorMedcardData = (id) =>
  axios.get(`/users/${id}/entries`)
    .then(response => response.data);
