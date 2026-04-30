import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={styles.container}>

      {/* Hero Section */}
      <div style={styles.hero}>
        <h1 style={styles.title}>
          Welcome to <span style={styles.accent}>Tresify</span>
        </h1>
        <p style={styles.subtitle}>
          Your all-in-one personal productivity assistant. Manage tasks,
          schedule your modules, and plan your gym sessions — all in one place.
        </p>
        <div style={styles.buttonGroup}>
          <Link to="/list">
            <button style={styles.primaryBtn}>View My Tasks</button>
          </Link>
          <Link to="/add">
            <button style={styles.secondaryBtn}>+ Add New Task</button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div style={styles.featuresTitle}>
        <h2>Everything You Need</h2>
        <p style={styles.muted}>Built for students who want to stay on top of everything</p>
      </div>

      <div style={styles.cards}>
        <div style={styles.card}>
          <div style={styles.cardIcon}>📋</div>
          <h3>Task Manager</h3>
          <p style={styles.muted}>Add, edit, delete and track your daily tasks with priority levels.</p>
          <Link to="/list">
            <button style={styles.cardBtn}>Go to Tasks</button>
          </Link>
        </div>

        <div style={styles.card}>
          <div style={styles.cardIcon}>📅</div>
          <h3>Module Timetable</h3>
          <p style={styles.muted}>Schedule your course modules from Monday to Friday, 8am to 6pm.</p>
          <Link to="/timetable">
            <button style={styles.cardBtn}>Go to Timetable</button>
          </Link>
        </div>

        <div style={styles.card}>
          <div style={styles.cardIcon}>🏋️</div>
          <h3>Gym Planner</h3>
          <p style={styles.muted}>Plan your weekly workout sessions and never skip a gym day.</p>
          <Link to="/gym">
            <button style={styles.cardBtn}>Go to Gym</button>
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div style={styles.stats}>
        <div style={styles.stat}>
          <h2 style={styles.statNumber}>📌</h2>
          <p>Track Priorities</p>
        </div>
        <div style={styles.stat}>
          <h2 style={styles.statNumber}>⏰</h2>
          <p>Hourly Scheduling</p>
        </div>
        <div style={styles.stat}>
          <h2 style={styles.statNumber}>✅</h2>
          <p>Mark Complete</p>
        </div>
        <div style={styles.stat}>
          <h2 style={styles.statNumber}>🎯</h2>
          <p>Stay Focused</p>
        </div>
      </div>

    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1100px',
    margin: '0 auto',
  },
  hero: {
    textAlign: 'center',
    padding: '4rem 2rem',
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  accent: {
    color: '#7C83D4',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#8892b0',
    maxWidth: '600px',
    margin: '0 auto 2rem',
    lineHeight: '1.7',
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  primaryBtn: {
    backgroundColor: '#7C83D4',
    color: '#fff',
    padding: '0.8rem 2rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'all 0.2s ease',
  },
  secondaryBtn: {
    backgroundColor: 'transparent',
    color: '#7C83D4',
    padding: '0.8rem 2rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 'bold',
    border: '2px solid #7C83D4',
  },
  featuresTitle: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  muted: {
    color: '#8892b0',
    marginTop: '0.5rem',
    lineHeight: '1.6',
  },
  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
    marginBottom: '3rem',
  },
  card: {
    backgroundColor: '#16213e',
    borderRadius: '12px',
    padding: '2rem',
    border: '1px solid #7C83D4',
    textAlign: 'center',
  },
  cardIcon: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  cardBtn: {
    marginTop: '1rem',
    backgroundColor: '#7C83D4',
    color: '#fff',
    padding: '0.5rem 1.5rem',
    borderRadius: '6px',
    fontSize: '0.9rem',
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
    backgroundColor: '#16213e',
    borderRadius: '12px',
    padding: '2rem',
    textAlign: 'center',
    border: '1px solid #2a2a5a',
  },
  stat: {
    padding: '1rem',
  },
  statNumber: {
    fontSize: '2rem',
    marginBottom: '0.5rem',
  },
};

export default Home;