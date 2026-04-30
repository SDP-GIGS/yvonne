import axios from 'axios';

const baseURL = window.location.hostname === "localhost" 
  ? "http://127.0.0.1:8000" 
  : "https://yvonne.tagooledavid.com";

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const authTokens = localStorage.getItem('authTokens');
    if (authTokens) {
      const { access } = JSON.parse(authTokens);
      config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authAPI = {
  login: (credentials) => api.post('/api/token/login/', credentials),
  register: (userData) => api.post('/api/users/users/', userData),
  getProfile: () => api.get('/api/users/users/me/'),
};

export const studentAPI = {
  getDashboard: () => api.get('/api/student/dashboard/'),
  getLogs: () => api.get('/api/logs/'),
  submitLog: (logData) => api.post('/api/logs/', logData),
  getPlacements: () => api.get('/api/placements/'),
};

export const supervisorAPI = {
  getDashboard: () => api.get('/api/supervisor/dashboard/'),
  getStudents: () => api.get('/api/users/students/'),
  reviewLog: (logId, reviewData) => api.post(`/api/logs/${logId}/review/`, reviewData),
};

export const adminAPI = {
  getStats: () => api.get('/api/admin/stats/'),
  getUsers: () => api.get('/api/users/'),
  assignPlacement: (data) => api.post('/api/placements/', data),
};

export default api;
