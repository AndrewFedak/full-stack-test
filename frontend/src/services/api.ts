import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: any;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';

      return Promise.reject({
        message: 'Unauthorized. Redirecting to login.',
        status: 401,
      } as ApiError);
    }

    const apiError: ApiError = {
      message: error.response?.data?.message || error.message || 'Unknown error',
      status: error.response?.status,
      code: error.response?.data?.code,
      details: error.response?.data,
    };

    return Promise.reject(apiError);
  }
);

export default api;
