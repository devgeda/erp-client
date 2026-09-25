import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (error.response && (status === 401 || status === 403)) {
      localStorage.removeItem('token');
      window.location.href = '/log-in';
      return new Promise(() => {});
    }

    if (error.response && (!status || status >= 500)) {
      return Promise.reject({
        type: 'ERROR_SISTEMA',
        message: error.response?.data?.message,
      });
    }

    return Promise.reject({
      type: 'ERROR_NEGOCIO',
      status: status,
      message: error.response?.data?.message || 'Verifique os dados enviados.',
    });
  }
);
