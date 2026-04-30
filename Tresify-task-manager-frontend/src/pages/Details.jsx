import { useParams, useNavigate } from 'react-router-dom';
import { getTaskById, deleteTask, toggleComplete } from '../services/tasks';

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = getTaskById(id);

  if (!task) {
    return (
      <div style={styles.notFound}>
        <h2>😕 Task not found</h2>
        <button onClick={() => navigate('/list')} style={styles.backBtn}>
          Go Back to Tasks
        </button>
      </div>
    );
  }

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

  const handleDelete = () => {
    deleteTask(task.id);
    navigate('/list');
  };

  const handleComplete = () => {
    toggleComplete(task.id);
    navigate('/list');
  };

  return (
    <div style={styles.container}>

      {/* Back Button */}
      <button onClick={() => navigate('/list')} style={styles.backBtn}>
        ← Back to Tasks
      </button>

      {/* Task Card */}
      <div style={{
        ...styles.card,
        borderTop: `4px solid ${priorityColors[task.priority]}`,
      }}>

        {/* Top Row */}
        <div style={styles.topRow}>
          <span style={styles.category}>
            {categoryIcons[task.category]} {task.category}
          </span>
          <span style={{
            ...styles.priority,
            color: priorityColors[task.priority],
            border: `1px solid ${priorityColors[task.priority]}`,
          }}>
            {task.priority} Priority
          </span>
        </div>

        {/* Title */}
        <h1 style={{
          ...styles.title,
          textDecoration: task.completed ? 'line-through' : 'none',
          opacity: task.completed ? 0.6 : 1,
        }}>
          {task.title}
        </h1>

        {/* Status Badge */}
        <span style={{
          ...styles.status,
          backgroundColor: task.completed ? '#4ecca3' : '#7C83D4',
        }}>
          {task.completed ? '✅ Completed' : '🔄 In Progress'}
        </span>

        {/* Divider */}
        <hr style={styles.divider} />

        {/* Description */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>📝 Description</h3>
          <p style={styles.description}>{task.description}</p>
        </div>

        {/* Due Date */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>📅 Due Date</h3>
          <p style={styles.value}>📅 {task.dueDate}</p>
        </div>

        {/* Divider */}
        <hr style={styles.divider} />

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
            {task.completed ? '↩ Mark Incomplete' : '✅ Mark Complete'}
          </button>

          <button
            onClick={handleDelete}
            style={{ ...styles.btn, backgroundColor: '#ff6b6b', color: '#fff' }}
          >
            🗑 Delete Task
          </button>
        </div>

      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '700px',
    margin: '0 auto',
  },
  notFound: {
    textAlign: 'center',
    padding: '4rem',
    color: '#8892b0',
  },
  backBtn: {
    backgroundColor: 'transparent',
    color: '#7C83D4',
    border: '1px solid #7C83D4',
    padding: '0.5rem 1.2rem',
    borderRadius: '8px',
    fontSize: '0.9rem',
    cursor: 'pointer',
    marginBottom: '1.5rem',
  },
  card: {
    backgroundColor: '#16213e',
    borderRadius: '12px',
    padding: '2rem',
    border: '1px solid #2a2a5a',
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  category: {
    fontSize: '0.9rem',
    color: '#8892b0',
    backgroundColor: '#1a1a2e',
    padding: '0.3rem 0.8rem',
    borderRadius: '20px',
  },
  priority: {
    fontSize: '0.85rem',
    fontWeight: 'bold',
    padding: '0.3rem 0.8rem',
    borderRadius: '20px',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: '1rem',
  },
  status: {
    display: 'inline-block',
    padding: '0.3rem 1rem',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: '1.5rem',
  },
  divider: {
    border: 'none',
    borderTop: '1px solid #2a2a5a',
    margin: '1.5rem 0',
  },
  section: {
    marginBottom: '1.5rem',
  },
  sectionTitle: {
    fontSize: '0.95rem',
    color: '#a0a8f0',
    marginBottom: '0.5rem',
  },
  description: {
    color: '#8892b0',
    lineHeight: '1.7',
    fontSize: '1rem',
  },
  value: {
    color: '#ffffff',
    fontSize: '1rem',
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  btn: {
    padding: '0.7rem 1.5rem',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    flex: 1,
  },
};

export default Details;