import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  (response) => {
    return response;
  },
  (error) => {
    const navigate = useNavigate();

    if (error.response && error.response.status === 403) {
      localStorage.removeItem('token');
      navigate('/log-in');
    }
    return Promise.reject(error);
  }
);
