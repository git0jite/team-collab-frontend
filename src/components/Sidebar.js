import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { Link } from 'react-router-dom';

function Sidebar() {
  const [boards, setBoards] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    API.get('/boards').then(res => setBoards(res.data));
  }, []);

  const createBoard = () => {
    if (name.trim()) {
      API.post('/boards', { name }).then(res => {
        setBoards([...boards, res.data]);
        setName('');
      });
    }
  };

  return (
    <div style={{ width: '250px', padding: '1rem', borderRight: '1px solid #ccc' }}>
      <h3>Boards</h3>
      {boards.map(board => (
        <div key={board._id}>
          <Link to={`/boards/${board._id}`}>{board.name}</Link>
        </div>
      ))}
      <input
        type="text"
        placeholder="New board"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={createBoard}>Create</button>
    </div>
  );
}

export default Sidebar;
