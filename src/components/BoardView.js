import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/api';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function BoardView() {
  const { boardId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchTasks = () => {
  API.get(`/boards/${boardId}/tasks`, {
    params: searchQuery ? { search: searchQuery } : {},
  }).then(res => setTasks(res.data));
};

  useEffect(() => {
    fetchTasks();
  }, [boardId]);

  const groupedTasks = {
    'To Do': [],
    'In Progress': [],
    'Done': [],
  };

  tasks.forEach(task => groupedTasks[task.status].push(task));

  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    const draggedTask = tasks.find(t => t._id === draggableId);

    if (draggedTask.status !== destination.droppableId) {
      await API.put(`/tasks/${draggableId}`, { ...draggedTask, status: destination.droppableId });
      fetchTasks();
    }
  };

  return (
    <div style={{ padding: '1rem', width: '100%' }}>
      <h2>Board</h2>
      <button onClick={() => setShowModal(true)}>+ Add Task</button>

            <div style={{ margin: '1rem 0' }}>
      <input
        type="text"
        placeholder="Search tasks by title"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && fetchTasks()}
        style={{ width: '300px', padding: '5px' }}
      />
      <button onClick={fetchTasks} style={{ marginLeft: '10px' }}>Search</button>
    </div>


      <DragDropContext onDragEnd={handleDragEnd}>
        <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
          {['To Do', 'In Progress', 'Done'].map(status => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{ flex: 1, minHeight: '200px', border: '1px solid #ccc', padding: '10px' }}
                >
                  <h4>{status}</h4>
                  {groupedTasks[status].map((task, index) => (
                    <Draggable draggableId={task._id} index={index} key={task._id}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard task={task} fetchTasks={fetchTasks} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {showModal && (
        <TaskModal boardId={boardId} onClose={() => setShowModal(false)} onTaskCreated={fetchTasks} />
      )}
    </div>
  );
}

export default BoardView;
