import React from 'react';
import API from '../api/api';

function TaskCard({ task, fetchTasks }) {
  const handleDelete = async () => {
    await API.delete(`/tasks/${task._id}`);
    fetchTasks();
  };

  return (
    <div style={{ border: '1px solid #ccc', marginBottom: '1rem', padding: '10px' }}>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <p><b>Priority:</b> {task.priority}</p>
      <p><b>Assigned to:</b> {task.assignedTo}</p>
      <p><b>Due:</b> {task.dueDate?.split('T')[0]}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default TaskCard;
