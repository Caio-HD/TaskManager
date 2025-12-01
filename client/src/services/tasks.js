import api from './auth';

export const taskService = {
  async getAll() {
    const response = await api.get('/tasks');
    return response.data.data.tasks;
  },

  async getById(id) {
    const response = await api.get(`/tasks/${id}`);
    return response.data.data.task;
  },

  async create(title, description) {
    const response = await api.post('/tasks', { title, description });
    return response.data.data.task;
  },

  async update(id, updates) {
    const response = await api.put(`/tasks/${id}`, updates);
    return response.data.data.task;
  },

  async delete(id) {
    await api.delete(`/tasks/${id}`);
  }
};

