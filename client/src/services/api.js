import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: attach auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('studyzen_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: handle token expiration or 401 unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If unauthorized and not already on auth page, can clear stale tokens
      const isAuthRoute =
        window.location.pathname === '/login' ||
        window.location.pathname === '/register';
      if (!isAuthRoute) {
        localStorage.removeItem('studyzen_token');
        localStorage.removeItem('studyzen_user');
      }
    }
    return Promise.reject(error);
  }
);

export default api;

