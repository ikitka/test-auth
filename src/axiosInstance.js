// src/axiosInstance.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://django-auth-vyq7.onrender.com/api',
});

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');
      try {
        const { data } = await axios.post('https://django-auth-vyq7.onrender.com/api/token/refresh/', { refresh: refreshToken });
        localStorage.setItem('access_token', data.access);
        instance.defaults.headers['Authorization'] = `Bearer ${data.access}`;
        return instance(originalRequest);
      } catch (e) {
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;