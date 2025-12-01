import React, { useState } from 'react';
import './TaskForm.css';

const TaskForm = ({ onSubmit, loading }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Task title is required');
      return;
    }

    const result = await onSubmit(title.trim(), description.trim());
    if (result.success) {
      setTitle('');
      setDescription('');
    } else {
      setError(result.error || 'Failed to create task');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      {error && <div className="form-error">{error}</div>}
      <div className="form-row">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="task-input"
          disabled={loading}
          maxLength={255}
        />
        <button type="submit" className="btn-add" disabled={loading || !title.trim()}>
          {loading ? 'Adding...' : 'Add Task'}
        </button>
      </div>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task description (optional)"
        className="task-textarea"
        disabled={loading}
      />
    </form>
  );
};

export default TaskForm;

