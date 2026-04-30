import { useState } from 'react';
import TaskCard from '../components/Taskcard';
import { tasks } from '../services/tasks';

function List() {
  const [taskList, setTaskList] = useState(tasks);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', 'School', 'Gym', 'Personal'];

  const handleUpdate = () => {
    setTaskList([...tasks]);
  };

  const filtered = taskList.filter(task => {
    const matchCategory = filter === 'All' || task.category === filter;
    const matchSearch = task.title.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>My Tasks</h1>
      <p style={styles.muted}>{taskList.length} total tasks</p>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="🔍 Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      {/* Filter Buttons */}
      <div style={styles.filters}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              ...styles.filterBtn,
              backgroundColor: filter === cat ? '#7C83D4' : '#16213e',
              color: filter === cat ? '#fff' : '#8892b0',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Task List */}
      {filtered.length === 0 ? (
        <div style={styles.empty}>
          <p>😕 No tasks found</p>
        </div>
      ) : (
        filtered.map(task => (
          <TaskCard key={task.id} task={task} onUpdate={handleUpdate} />
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '0.3rem',
  },
  muted: {
    color: '#8892b0',
    marginBottom: '1.5rem',
  },
  search: {
    width: '100%',
    padding: '0.8rem 1rem',
    borderRadius: '8px',
    border: '1px solid #7C83D4',
    backgroundColor: '#16213e',
    color: '#ffffff',
    fontSize: '1rem',
    marginBottom: '1rem',
    outline: 'none',
  },
  filters: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
  },
  filterBtn: {
    padding: '0.4rem 1.2rem',
    borderRadius: '20px',
    border: '1px solid #7C83D4',
    fontSize: '0.9rem',
    cursor: 'pointer',
    fontWeight: '500',
  },
  empty: {
    textAlign: 'center',
    color: '#8892b0',
    padding: '3rem',
    fontSize: '1.1rem',
  },
};

export default List;