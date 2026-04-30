import { useState } from 'react';

const hours = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
  '4:00 PM', '5:00 PM', '6:00 PM'
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const exampleSchedule = {
  'Monday-8:00 AM': { subject: 'Information Management', color: '#7C83D4' },
  'Monday-10:00 AM': { subject: 'Geme', color: '#4ecca3' },
  'Tuesday-9:00 AM': { subject: 'Web Development', color: '#f0a500' },
  'Wednesday-8:00 AM': { subject: 'Operating systems', color: '#7C83D4' },
  'Wednesday-2:00 PM': { subject: 'Computer Networks', color: '#ff6b6b' },
  'Thursday-11:00 AM': { subject: 'Java', color: '#4ecca3' },
  'Friday-9:00 AM': { subject: 'Alss', color: '#f0a500' },
};

function Timetable() {
  const [schedule, setSchedule] = useState(exampleSchedule);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ subject: '', color: '#7C83D4' });

  const handleCellClick = (day, hour) => {
    setSelected(`${day}-${hour}`);
    setForm({ subject: '', color: '#7C83D4' });
  };

  const handleAdd = () => {
    if (!form.subject.trim()) return;
    setSchedule({ ...schedule, [selected]: { ...form } });
    setSelected(null);
  };

  const handleDelete = (key) => {
    const updated = { ...schedule };
    delete updated[key];
    setSchedule(updated);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📅 Module Timetable</h1>
      <p style={styles.muted}>Click any empty cell to add a module. Monday to Friday, 8AM to 6PM.</p>

      {/* Timetable Grid */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Time</th>
              {days.map(day => (
                <th key={day} style={styles.th}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map(hour => (
              <tr key={hour}>
                <td style={styles.timeCell}>{hour}</td>
                {days.map(day => {
                  const key = `${day}-${hour}`;
                  const entry = schedule[key];
                  return (
                    <td
                      key={key}
                      style={{
                        ...styles.cell,
                        backgroundColor: entry ? entry.color + '33' : 'transparent',
                        border: entry ? `1px solid ${entry.color}` : '1px solid #2a2a5a',
                        cursor: 'pointer',
                      }}
                      onClick={() => !entry && handleCellClick(day, hour)}
                    >
                      {entry ? (
                        <div style={styles.entryBox}>
                          <span style={{ color: entry.color, fontSize: '0.8rem', fontWeight: 'bold' }}>
                            {entry.subject}
                          </span>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleDelete(key); }}
                            style={styles.deleteBtn}
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <span style={styles.emptyCell}>+</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Module Modal */}
      {selected && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h3 style={styles.modalTitle}>Add Module</h3>
            <p style={styles.muted}>
              {selected.replace('-', ' at ')}
            </p>
            <input
              type="text"
              placeholder="e.g. Mathematics"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              style={styles.input}
            />
            <div style={styles.colorRow}>
              <label style={styles.label}>Pick a color:</label>
              <input
                type="color"
                value={form.color}
                onChange={(e) => setForm({ ...form, color: e.target.value })}
                style={styles.colorPicker}
              />
            </div>
            <div style={styles.modalBtns}>
              <button onClick={handleAdd} style={styles.addBtn}>Add Module</button>
              <button onClick={() => setSelected(null)} style={styles.cancelBtn}>Cancel</button>
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
    marginBottom: '1.5rem',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    minWidth: '700px',
  },
  th: {
    backgroundColor: '#16213e',
    color: '#a0a8f0',
    padding: '0.8rem',
    textAlign: 'center',
    border: '1px solid #2a2a5a',
    fontSize: '0.9rem',
  },
  timeCell: {
    backgroundColor: '#16213e',
    color: '#7C83D4',
    padding: '0.6rem 1rem',
    fontSize: '0.8rem',
    border: '1px solid #2a2a5a',
    whiteSpace: 'nowrap',
    fontWeight: 'bold',
  },
  cell: {
    padding: '0.5rem',
    textAlign: 'center',
    minWidth: '120px',
    height: '50px',
    transition: 'all 0.2s',
  },
  entryBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 0.3rem',
  },
  deleteBtn: {
    backgroundColor: 'transparent',
    color: '#ff6b6b',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.75rem',
    padding: '0.1rem 0.3rem',
  },
  emptyCell: {
    color: '#2a2a5a',
    fontSize: '1.2rem',
  },
  overlay: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100%', height: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
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
    maxWidth: '400px',
    border: '1px solid #7C83D4',
  },
  modalTitle: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  input: {
    width: '100%',
    padding: '0.8rem',
    borderRadius: '8px',
    border: '1px solid #7C83D4',
    backgroundColor: '#1a1a2e',
    color: '#ffffff',
    fontSize: '1rem',
    outline: 'none',
    marginBottom: '1rem',
    marginTop: '1rem',
  },
  colorRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  label: {
    color: '#a0a8f0',
    fontSize: '0.9rem',
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
  addBtn: {
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

export default Timetable;