import axios from 'axios';

const api = axios.create({
  baseURL: 'https://teckstockbackend.herokuapp.com/',
  
});

export default api;