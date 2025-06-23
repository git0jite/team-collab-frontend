import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import BoardView from './components/BoardView';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <Routes>
          <Route path="/boards/:boardId" element={<BoardView />} />
          <Route path="/" element={<div>Select a board</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
