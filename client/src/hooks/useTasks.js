import { useState, useEffect } from 'react';
import { taskService } from '../services/tasks';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async (title, description) => {
    try {
      const newTask = await taskService.create(title, description);
      setTasks([newTask, ...tasks]);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || 'Failed to create task'
      };
    }
  };

  const updateTask = async (id, updates) => {
    try {
      const updatedTask = await taskService.update(id, updates);
      setTasks(tasks.map(task => task.id === id ? updatedTask : task));
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || 'Failed to update task'
      };
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskService.delete(id);
      setTasks(tasks.filter(task => task.id !== id));
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || 'Failed to delete task'
      };
    }
  };

  const toggleComplete = async (id, completed) => {
    return await updateTask(id, { completed: !completed });
  };

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    toggleComplete,
    refreshTasks: fetchTasks
  };
};

