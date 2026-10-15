import axios from 'axios';

interface ErrorResponseDTO {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}

export interface AppError {
  intent: 'error' | 'warning' | 'info';
  message: string;
}

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
  (error: ErrorResponseDTO) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data.message;

      if (status === 401 || status === 403) {
        localStorage.removeItem('token');
        window.location.href = '/log-in';
        return new Promise(() => {});
      }

      if (status === 400) {
        return Promise.reject({
          intent: 'warning',
          message: message || 'Verifique os dados enviados.',
        } as AppError);
      }

      if (!status || status >= 500) {
        return Promise.reject({
          intent: 'warning',
          message: message || 'Verifique os dados enviados.',
        } as AppError);
      }

      return Promise.reject(error.response?.data);
    }
  }
);
