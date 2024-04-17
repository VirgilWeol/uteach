import axios from 'axios';

const api = axios.create({
  // baseURL: '34.126.90.234:3000/'
  baseURL: 'http://localhost:5000/'
});

export default api;
