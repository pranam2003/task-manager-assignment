import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { fetchTasks, createTask, updateTask, deleteTask } from './services/api';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './index.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      setError('Failed to connect to the server. Is the backend running?');
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (title) => {
    try {
      const newTask = await createTask(title);
      setTasks([...tasks, newTask]);
      toast.success('Task created');
    } catch (err) {
      toast.error('Failed to create task');
      throw err;
    }
  };

  const handleToggleCompleted = async (id, currentStatus) => {
    try {
      const updatedTask = await updateTask(id, { completed: !currentStatus });
      setTasks(tasks.map(t => t.id === id ? updatedTask : t));
    } catch (err) {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
      toast.success('Task deleted');
    } catch (err) {
      toast.error('Failed to delete task');
    }
  };

  const handleEditTitle = async (id, newTitle) => {
    try {
      const updatedTask = await updateTask(id, { title: newTitle });
      setTasks(tasks.map(t => t.id === id ? updatedTask : t));
      toast.success('Task updated');
    } catch (err) {
      toast.error('Failed to update title');
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="app-container">
      <Toaster position="top-right"
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#f8fafc',
            border: '1px solid rgba(255,255,255,0.1)'
          }
        }}
      />

      <header className="app-header">
        <h1 className="app-title">TaskFlow</h1>
        <p className="app-subtitle">Organize your day with ease.</p>
      </header>

      <TaskForm onAdd={handleAddTask} />

      <div className="filters">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      {error ? (
        <div className="empty-state">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p style={{ color: 'var(--danger-color)' }}>{error}</p>
          <button className="btn btn-primary" onClick={loadTasks}>Retry</button>
        </div>
      ) : loading ? (
        <div className="loading-spinner"></div>
      ) : (
        <TaskList
          tasks={filteredTasks}
          onToggle={handleToggleCompleted}
          onDelete={handleDeleteTask}
          onEdit={handleEditTitle}
        />
      )}
    </div>
  );
}

export default App;
