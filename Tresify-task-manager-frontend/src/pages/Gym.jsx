import { useState } from 'react';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const exampleGymSchedule = {
  Monday: {
    focus: 'Chest & Triceps',
    exercises: ['Bench Press 4x10', 'Incline Dumbbell 3x12', 'Tricep Dips 3x15', 'Cable Pushdowns 3x12'],
    time: '6:00 AM',
    color: '#7C83D4',
  },
  Tuesday: {
    focus: 'Back & Biceps',
    exercises: ['Deadlifts 4x8', 'Pull Ups 3x10', 'Barbell Rows 3x12', 'Bicep Curls 3x15'],
    time: '6:00 AM',
    color: '#4ecca3',
  },
  Wednesday: {
    focus: 'Rest Day 😴',
    exercises: ['Light stretching', 'Walking 30 mins'],
    time: 'Anytime',
    color: '#8892b0',
  },
  Thursday: {
    focus: 'Legs & Shoulders',
    exercises: ['Squats 4x10', 'Leg Press 3x12', 'Shoulder Press 3x12', 'Lateral Raises 3x15'],
    time: '6:00 AM',
    color: '#f0a500',
  },
  Friday: {
    focus: 'Full Body',
    exercises: ['Deadlifts 3x8', 'Bench Press 3x10', 'Pull Ups 3x10', 'Planks 3x60s'],
    time: '6:00 AM',
    color: '#ff6b6b',
  },
  Saturday: {
    focus: 'Cardio Day',
    exercises: ['Running 5km', 'Jump Rope 15 mins', 'Cycling 20 mins'],
    time: '8:00 AM',
    color: '#a0a8f0',
  },
  Sunday: {
    focus: 'Rest Day 😴',
    exercises: ['Yoga 30 mins', 'Light stretching'],
    time: 'Anytime',
    color: '#8892b0',
  },
};

function Gym() {
  const [schedule, setSchedule] = useState(exampleGymSchedule);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ focus: '', time: '', exercises: '', color: '#7C83D4' });
  const [editing, setEditing] = useState(false);

  const handleEdit = (day) => {
    const entry = schedule[day];
    setForm({
      focus: entry.focus,
      time: entry.time,
      exercises: entry.exercises.join('\n'),
      color: entry.color,
    });
    setSelected(day);
    setEditing(true);
  };

  const handleSave = () => {
    if (!form.focus.trim()) return;
    setSchedule({
      ...schedule,
      [selected]: {
        focus: form.focus,
        time: form.time,
        exercises: form.exercises.split('\n').filter(e => e.trim()),
        color: form.color,
      },
    });
    setSelected(null);
    setEditing(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🏋️ Gym Schedule</h1>
      <p style={styles.muted}>Your weekly workout plan. Click edit to customize any day.</p>

      {/* Weekly Grid */}
      <div style={styles.grid}>
        {days.map(day => {
          const entry = schedule[day];
          return (
            <div key={day} style={{
              ...styles.card,
              borderTop: `4px solid ${entry.color}`,
            }}>
              {/* Day Header */}
              <div style={styles.cardHeader}>
                <h3 style={styles.dayName}>{day}</h3>
                <span style={styles.time}>⏰ {entry.time}</span>
              </div>

              {/* Focus */}
              <p style={{ ...styles.focus, color: entry.color }}>
                {entry.focus}
              </p>

              {/* Exercises */}
              <ul style={styles.exerciseList}>
                {entry.exercises.map((ex, i) => (
                  <li key={i} style={styles.exercise}>
                    • {ex}
                  </li>
                ))}
              </ul>

              {/* Edit Button */}
              <button
                onClick={() => handleEdit(day)}
                style={styles.editBtn}
              >
                ✏️ Edit
              </button>
            </div>
          );
        })}
      </div>

      {/* Edit Modal */}
      {editing && selected && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h3 style={styles.modalTitle}>Edit {selected}</h3>

            <label style={styles.label}>Focus / Muscle Group</label>
            <input
              type="text"
              value={form.focus}
              onChange={(e) => setForm({ ...form, focus: e.target.value })}
              style={styles.input}
              placeholder="e.g. Chest & Triceps"
            />

            <label style={styles.label}>Time</label>
            <input
              type="text"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              style={styles.input}
              placeholder="e.g. 6:00 AM"
            />

            <label style={styles.label}>Exercises (one per line)</label>
            <textarea
              value={form.exercises}
              onChange={(e) => setForm({ ...form, exercises: e.target.value })}
              rows={5}
              style={{ ...styles.input, resize: 'vertical' }}
              placeholder={'Bench Press 4x10\nIncline Dumbbell 3x12'}
            />

            <div style={styles.colorRow}>
              <label style={styles.label}>Card Color:</label>
              <input
                type="color"
                value={form.color}
                onChange={(e) => setForm({ ...form, color: e.target.value })}
                style={styles.colorPicker}
              />
            </div>

            <div style={styles.modalBtns}>
              <button onClick={handleSave} style={styles.saveBtn}>💾 Save</button>
              <button onClick={() => { setSelected(null); setEditing(false); }} style={styles.cancelBtn}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1100px',
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    backgroundColor: '#16213e',
    borderRadius: '12px',
    padding: '1.5rem',
    border: '1px solid #2a2a5a',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.8rem',
  },
  dayName: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  time: {
    fontSize: '0.8rem',
    color: '#8892b0',
  },
  focus: {
    fontWeight: 'bold',
    fontSize: '0.95rem',
    marginBottom: '1rem',
  },
  exerciseList: {
    listStyle: 'none',
    padding: 0,
    marginBottom: '1rem',
  },
  exercise: {
    color: '#8892b0',
    fontSize: '0.85rem',
    marginBottom: '0.3rem',
  },
  editBtn: {
    backgroundColor: 'transparent',
    color: '#7C83D4',
    border: '1px solid #7C83D4',
    padding: '0.4rem 1rem',
    borderRadius: '6px',
    fontSize: '0.85rem',
    cursor: 'pointer',
    width: '100%',
  },
  overlay: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100%', height: '100%',
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  modal: {
    backgroundColor: '#16213e',
    borderRadius: '12px',
    padding: '2rem',
    width: '90%',
    maxWidth: '450px',
    border: '1px solid #7C83D4',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
  modalTitle: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    color: '#ffffff',
  },
  label: {
    display: 'block',
    color: '#a0a8f0',
    fontSize: '0.9rem',
    marginBottom: '0.4rem',
  },
  input: {
    width: '100%',
    padding: '0.8rem',
    borderRadius: '8px',
    border: '1px solid #7C83D4',
    backgroundColor: '#1a1a2e',
    color: '#ffffff',
    fontSize: '0.95rem',
    outline: 'none',
    marginBottom: '1rem',
    fontFamily: 'Segoe UI, sans-serif',
  },
  colorRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  colorPicker: {
    width: '40px',
    height: '30px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: 'transparent',
  },
  modalBtns: {
    display: 'flex',
    gap: '1rem',
  },
  saveBtn: {
    flex: 1,
    backgroundColor: '#7C83D4',
    color: '#fff',
    padding: '0.7rem',
    borderRadius: '8px',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: 'transparent',
    color: '#8892b0',
    padding: '0.7rem',
    borderRadius: '8px',
    border: '1px solid #8892b0',
    cursor: 'pointer',
  },
};

export default Gym;