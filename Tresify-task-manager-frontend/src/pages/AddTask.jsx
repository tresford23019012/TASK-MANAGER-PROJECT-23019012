import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addTask } from '../services/tasks';

function AddTask() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'School',
    priority: 'Medium',
    dueDate: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = '⚠️ Title is required';
    if (!form.description.trim()) newErrors.description = '⚠️ Description is required';
    if (!form.dueDate) newErrors.dueDate = '⚠️ Due date is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    addTask(form);
    navigate('/list');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Add New Task</h1>
      <p style={styles.muted}>Fill in the details below to create a new task</p>

      <div style={styles.form}>

        {/* Title */}
        <div style={styles.field}>
          <label style={styles.label}>Task Title</label>
          <input
            type="text"
            name="title"
            placeholder="e.g. Study for exam"
            value={form.title}
            onChange={handleChange}
            style={{
              ...styles.input,
              borderColor: errors.title ? '#ff6b6b' : '#7C83D4',
            }}
          />
          {errors.title && <p style={styles.error}>{errors.title}</p>}
        </div>

        {/* Description */}
        <div style={styles.field}>
          <label style={styles.label}>Description</label>
          <textarea
            name="description"
            placeholder="e.g. Cover chapters 1-4 and practice past papers"
            value={form.description}
            onChange={handleChange}
            rows={4}
            style={{
              ...styles.input,
              resize: 'vertical',
              borderColor: errors.description ? '#ff6b6b' : '#7C83D4',
            }}
          />
          {errors.description && <p style={styles.error}>{errors.description}</p>}
        </div>

        {/* Category */}
        <div style={styles.field}>
          <label style={styles.label}>Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="School">📚 School</option>
            <option value="Gym">🏋️ Gym</option>
            <option value="Personal">👤 Personal</option>
          </select>
        </div>

        {/* Priority */}
        <div style={styles.field}>
          <label style={styles.label}>Priority</label>
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="High">🔴 High</option>
            <option value="Medium">🟡 Medium</option>
            <option value="Low">🟢 Low</option>
          </select>
        </div>

        {/* Due Date */}
        <div style={styles.field}>
          <label style={styles.label}>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            style={{
              ...styles.input,
              borderColor: errors.dueDate ? '#ff6b6b' : '#7C83D4',
            }}
          />
          {errors.dueDate && <p style={styles.error}>{errors.dueDate}</p>}
        </div>

        {/* Buttons */}
        <div style={styles.buttons}>
          <button onClick={handleSubmit} style={styles.submitBtn}>
            ➕ Add Task
          </button>
          <button onClick={() => navigate('/list')} style={styles.cancelBtn}>
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '600px',
    margin: '0 auto',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '0.3rem',
  },
  muted: {
    color: '#8892b0',
    marginBottom: '2rem',
  },
  form: {
    backgroundColor: '#16213e',
    borderRadius: '12px',
    padding: '2rem',
    border: '1px solid #2a2a5a',
  },
  field: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#a0a8f0',
    fontWeight: '500',
    fontSize: '0.95rem',
  },
  input: {
    width: '100%',
    padding: '0.8rem 1rem',
    borderRadius: '8px',
    border: '1px solid #7C83D4',
    backgroundColor: '#1a1a2e',
    color: '#ffffff',
    fontSize: '1rem',
    outline: 'none',
    fontFamily: 'Segoe UI, sans-serif',
  },
  error: {
    color: '#ff6b6b',
    fontSize: '0.85rem',
    marginTop: '0.4rem',
  },
  buttons: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem',
  },
  submitBtn: {
    backgroundColor: '#7C83D4',
    color: '#fff',
    padding: '0.8rem 2rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    flex: 1,
  },
  cancelBtn: {
    backgroundColor: 'transparent',
    color: '#8892b0',
    padding: '0.8rem 2rem',
    borderRadius: '8px',
    fontSize: '1rem',
    border: '1px solid #8892b0',
    cursor: 'pointer',
  },
};

export default AddTask;