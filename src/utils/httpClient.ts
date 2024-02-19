import axios from 'axios';
import Cookies from 'universal-cookie';

const httpClient = axios.create({
  baseURL: 'http://localhost:3000',
});

// Add a request interceptor
httpClient.interceptors.request.use(function (config) {

  if (config.url?.startsWith('user') || config.url?.startsWith('admin')) {
    const cookies = new Cookies();
    const token = cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  if (config.url?.startsWith('provider')) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  // console.log('config', config.url)
  return config;

}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
httpClient.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export default httpClient;