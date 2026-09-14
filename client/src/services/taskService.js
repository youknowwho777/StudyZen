import api from './api';

export const taskService = {
  // Get all tasks with optional filters (status, priority, category, search, sort)
  async getTasks(params = {}) {
    const response = await api.get('/tasks', { params });
    return response.data;
  },

  // Get single task by ID
  async getTask(id) {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  // Create new task
  async createTask(taskData) {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  // Update existing task
  async updateTask(id, taskData) {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  // Delete task
  async deleteTask(id) {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },

  // Get productivity metrics & analytics (Phase 4)
  async getTaskStats() {
    const response = await api.get('/tasks/stats');
    return response.data;
  },
};
