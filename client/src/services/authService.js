import api from './api';

export const authService = {
  // Register user
  async register(userData) {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Login user
  async login(credentials) {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Get current logged-in user profile
  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // API health check (Phase 0)
  async checkHealth() {
    const response = await api.get('/health');
    return response.data;
  },
};

