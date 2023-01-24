import axios from 'axios';

import { BACKEND_PATH } from 'config';

const baseURL = BACKEND_PATH;

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    Authorization:
      typeof window !== 'undefined'
        ? 'Bearer ' + localStorage.getItem('access')
        : null
        ? 'Bearer ' + typeof window !== 'undefined'
          ? 'Bearer ' + localStorage.getItem('access')
          : null
        : null,
    'Content-Type': 'application/json',
    accept: 'application/json'
  }
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },

  async function (error) {
    const originalRequest = error.config;

    if (typeof error.response === 'undefined') {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && originalRequest.url === baseURL + '/api/v1/login/refresh') {
      window.location.href = '/login/';
      return Promise.reject(error);
    }

    if (error.response.data.code === 'token_not_valid' && error.response.status === 401 && error.response.statusText === 'Unauthorized') {
      const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refresh') : null;

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);
        console.log(tokenParts.exp);

        if (tokenParts.exp > now) {
          return axiosInstance
            .post('/api/v1/login/refresh', { refresh: refreshToken })
            .then((response) => {
              localStorage.setItem('access', response.data.access);
              localStorage.setItem('refresh', response.data.refresh);

              axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + response.data.access;
              originalRequest.headers['Authorization'] = 'Bearer ' + response.data.access;

              return axiosInstance(originalRequest);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log('Refresh token is expired', tokenParts.exp, now);
          window.location.href = '/login/';
        }
      } else {
        console.log('Refresh token not available.');
        window.location.href = '/login/';
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

export default axiosInstance;
