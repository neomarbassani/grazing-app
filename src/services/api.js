import axios from 'axios';

const api = axios.create({
  baseURL: 'https://grazing-api.herokuapp.com',
  //baseURL: 'http://192.168.100.102:4000',
});

export default api;
