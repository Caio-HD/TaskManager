import React, { useState } from 'react';
import './TaskItem.css';

const TaskItem = ({ task, onToggleComplete, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');

  const handleSave = async () => {
    const result = await onUpdate(task.id, { title, description });
    if (result.success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setTitle(task.title);
    setDescription(task.description || '');
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="task-item editing">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="task-edit-title"
          placeholder="Task title"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="task-edit-description"
          placeholder="Task description (optional)"
        />
        <div className="task-actions">
          <button onClick={handleSave} className="btn-save">Save</button>
          <button onClick={handleCancel} className="btn-cancel">Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id, task.completed)}
          className="task-checkbox"
        />
        <div className="task-text">
          <h3 className="task-title">{task.title}</h3>
          {task.description && (
            <p className="task-description">{task.description}</p>
          )}
        </div>
      </div>
      <div className="task-actions">
        <button onClick={() => setIsEditing(true)} className="btn-edit">
          Edit
        </button>
        <button onClick={() => onDelete(task.id)} className="btn-delete">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;

