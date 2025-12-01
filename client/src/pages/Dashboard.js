import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTasks } from '../hooks/useTasks';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import Layout from '../components/Layout';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const {
    tasks,
    loading,
    error: tasksError,
    createTask,
    updateTask,
    deleteTask,
    toggleComplete
  } = useTasks();

  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState('');

  const handleCreateTask = async (title, description) => {
    setActionLoading(true);
    setActionError('');
    const result = await createTask(title, description);
    setActionLoading(false);
    return result;
  };

  const handleUpdateTask = async (id, updates) => {
    setActionLoading(true);
    setActionError('');
    const result = await updateTask(id, updates);
    setActionLoading(false);
    if (!result.success) {
      setActionError(result.error);
    }
    return result;
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setActionLoading(true);
      setActionError('');
      const result = await deleteTask(id);
      setActionLoading(false);
      if (!result.success) {
        setActionError(result.error);
      }
      return result;
    }
    return { success: false };
  };

  const handleToggleComplete = async (id, completed) => {
    setActionLoading(true);
    const result = await toggleComplete(id, completed);
    setActionLoading(false);
    return result;
  };

  return (
    <Layout>
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Welcome, {user?.email}</h1>
          <p className="dashboard-subtitle">Manage your tasks efficiently</p>
        </div>

        {(tasksError || actionError) && (
          <div className="error-banner">
            {tasksError || actionError}
          </div>
        )}

        <TaskForm onSubmit={handleCreateTask} loading={actionLoading} />

        <div className="tasks-section">
          <h2>Your Tasks ({tasks.length})</h2>
          <TaskList
            tasks={tasks}
            loading={loading}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDeleteTask}
            onUpdate={handleUpdateTask}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

