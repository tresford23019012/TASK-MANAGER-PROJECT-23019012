import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api';

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError('⚠️ All fields are required');
      return;
    }
    if (form.password.length < 6) {
      setError('⚠️ Password must be at least 6 characters');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('⚠️ Passwords do not match');
      return;
    }

    setLoading(true);
    const data = await registerUser({
      name: form.name,
      email: form.email,
      password: form.password,
    });
    setLoading(false);

    if (data.error) {
      setError(data.error);
      return;
    }

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    navigate('/home');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        {/* Logo */}
        <h1 style={styles.logo}>
          Tres<span style={styles.accent}>ify</span>
        </h1>
        <p style={styles.subtitle}>Create your account to get started</p>

        {/* Error */}
        {error && <p style={styles.error}>{error}</p>}

        {/* Name */}
        <div style={styles.field}>
          <label style={styles.label}>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        {/* Email */}
        <div style={styles.field}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        {/* Password */}
        <div style={styles.field}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        {/* Confirm Password */}
        <div style={styles.field}>
          <label style={styles.label}>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
            value={form.confirmPassword}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <button
          onClick={handleSubmit}
          style={styles.btn}
          disabled={loading}
        >
          {loading ? 'Creating account...' : 'Register'}
        </button>

        <p style={styles.switchText}>
          Already have an account?{' '}
          <Link to="/login" style={styles.link}>Login here</Link>
        </p>

      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
  },
  card: {
    backgroundColor: '#16213e',
    borderRadius: '16px',
    padding: '2.5rem',
    width: '90%',
    maxWidth: '420px',
    border: '1px solid #7C83D4',
  },
  logo: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '0.5rem',
    color: '#ffffff',
  },
  accent: {
    color: '#7C83D4',
  },
  subtitle: {
    textAlign: 'center',
    color: '#8892b0',
    marginBottom: '2rem',
    fontSize: '0.95rem',
  },
  error: {
    backgroundColor: '#ff6b6b22',
    color: '#ff6b6b',
    padding: '0.8rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    fontSize: '0.9rem',
    border: '1px solid #ff6b6b',
  },
  field: {
    marginBottom: '1.2rem',
  },
  label: {
    display: 'block',
    color: '#a0a8f0',
    fontSize: '0.9rem',
    marginBottom: '0.4rem',
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
  },
  btn: {
    width: '100%',
    padding: '0.9rem',
    backgroundColor: '#7C83D4',
    color: '#ffffff',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    marginTop: '0.5rem',
    marginBottom: '1.5rem',
  },
  switchText: {
    textAlign: 'center',
    color: '#8892b0',
    fontSize: '0.9rem',
  },
  link: {
    color: '#7C83D4',
    fontWeight: 'bold',
  },
};

export default Register;