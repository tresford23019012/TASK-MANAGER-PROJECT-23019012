import { Link } from 'react-router-dom';
import { toggleComplete, deleteTask } from '../services/tasks';

function TaskCard({ task, onUpdate }) {
  const priorityColors = {
    High: '#ff6b6b',
    Medium: '#f0a500',
    Low: '#4ecca3',
  };

  const categoryIcons = {
    School: '📚',
    Gym: '🏋️',
    Personal: '👤',
  };

  const handleComplete = () => {
    toggleComplete(task.id);
    onUpdate();
  };

  const handleDelete = () => {
    deleteTask(task.id);
    onUpdate();
  };

  return (
    <div style={{
      ...styles.card,
      opacity: task.completed ? 0.6 : 1,
      borderLeft: `4px solid ${priorityColors[task.priority]}`,
    }}>

      {/* Top Row */}
      <div style={styles.topRow}>
        <span style={styles.category}>
          {categoryIcons[task.category]} {task.category}
        </span>
        <span style={{
          ...styles.priority,
          color: priorityColors[task.priority],
        }}>
          {task.priority}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        ...styles.title,
        textDecoration: task.completed ? 'line-through' : 'none',
      }}>
        {task.title}
      </h3>

      {/* Description */}
      <p style={styles.description}>{task.description}</p>

      {/* Due Date */}
      <p style={styles.dueDate}>📅 Due: {task.dueDate}</p>

      {/* Action Buttons */}
      <div style={styles.actions}>
        <button
          onClick={handleComplete}
          style={{
            ...styles.btn,
            backgroundColor: task.completed ? '#8892b0' : '#4ecca3',
            color: '#1a1a2e',
          }}
        >
          {task.completed ? '↩ Undo' : '✅ Complete'}
        </button>

        <Link to={`/details/${task.id}`}>
          <button style={{ ...styles.btn, backgroundColor: '#7C83D4', color: '#fff' }}>
            👁 View
          </button>
        </Link>

        <button
          onClick={handleDelete}
          style={{ ...styles.btn, backgroundColor: '#ff6b6b', color: '#fff' }}
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#16213e',
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '1rem',
    border: '1px solid #2a2a5a',
    transition: 'all 0.2s ease',
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.8rem',
  },
  category: {
    fontSize: '0.85rem',
    color: '#8892b0',
    backgroundColor: '#1a1a2e',
    padding: '0.3rem 0.8rem',
    borderRadius: '20px',
  },
  priority: {
    fontSize: '0.85rem',
    fontWeight: 'bold',
  },
  title: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: '#ffffff',
  },
  description: {
    fontSize: '0.9rem',
    color: '#8892b0',
    marginBottom: '0.8rem',
    lineHeight: '1.5',
  },
  dueDate: {
    fontSize: '0.85rem',
    color: '#7C83D4',
    marginBottom: '1rem',
  },
  actions: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
  },
  btn: {
    padding: '0.4rem 1rem',
    borderRadius: '6px',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
  },
};

export default TaskCard;