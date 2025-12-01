import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = ({ tasks, onToggleComplete, onDelete, onUpdate, loading }) => {
  if (loading) {
    return (
      <div className="task-list">
        <div className="loading-message">Loading tasks...</div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="task-list">
        <div className="empty-message">No tasks yet. Create your first task!</div>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default TaskList;

