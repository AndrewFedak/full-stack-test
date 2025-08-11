import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

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

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
}

export interface Project {
  id: number;
  owner: string;
  name: string;
  url: string;
  stars: number;
  forks: number;
  issues: number;
  createdAt: number;
  userId: number;
}

export interface AddProjectData {
  repoPath: string;
}

// Auth API
export const authAPI = {
  login: (data: LoginData) => api.post('/auth/login', data),
  register: (data: RegisterData) => api.post('/auth/register', data),
};

// Projects API
export const projectsAPI = {
  list: () => api.get<Project[]>('/projects'),
  add: (data: AddProjectData) => api.post<Project>('/projects', data),
  update: (id: number, data: AddProjectData) => api.put<Project>(`/projects/${id}`, data),
  delete: (id: number) => api.delete(`/projects/${id}`),
};

export default api;
