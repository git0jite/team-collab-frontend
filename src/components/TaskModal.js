import React, { useState } from 'react';
import API from '../api/api';

function TaskModal({ boardId, onClose, onTaskCreated }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'To Do',
    assignedTo: '',
    dueDate: '',
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    await API.post(`/boards/${boardId}/tasks`, form);
    onTaskCreated();
    onClose();
  };

  return (
    <div style={{ background: '#000000aa', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
      <div style={{ background: '#fff', margin: '10% auto', padding: 20, width: 400 }}>
        <h3>Create Task</h3>
        {['title', 'description', 'assignedTo', 'dueDate'].map(field => (
          <input
            key={field}
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field}
            style={{ display: 'block', marginBottom: '10px', width: '100%' }}
          />
        ))}
        <select name="priority" value={form.priority} onChange={handleChange}>
          <option>Low</option><option>Medium</option><option>High</option>
        </select>
        <select name="status" value={form.status} onChange={handleChange}>
          <option>To Do</option><option>In Progress</option><option>Done</option>
        </select>
        <br /><br />
        <button onClick={handleSubmit}>Create</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default TaskModal;
