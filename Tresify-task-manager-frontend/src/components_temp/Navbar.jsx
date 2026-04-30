import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { path: '/home', label: 'Home' },
    { path: '/list', label: 'Tasks' },
    { path: '/add', label: '+ Add Task' },
    { path: '/timetable', label: 'Timetable' },
    { path: '/gym', label: 'Gym' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const initials = user.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        Tres<span style={styles.logoAccent}>ify</span>
      </div>
      <div style={styles.links}>
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            style={{
              ...styles.link,
              ...(location.pathname === link.path ? styles.activeLink : {}),
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div style={styles.userSection}>
        <div style={styles.avatar}>{initials}</div>
        <span style={styles.userName}>{user.name || 'User'}</span>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          → Logout
        </button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: '#16213e',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '2px solid #7C83D4',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: '2px',
  },
  logoAccent: {
    color: '#7C83D4',
  },
  links: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
  },
  link: {
    color: '#8892b0',
    fontSize: '0.95rem',
    fontWeight: '500',
    padding: '0.4rem 0.8rem',
    borderRadius: '6px',
  },
  activeLink: {
    color: '#ffffff',
    backgroundColor: '#7C83D4',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
  },
  avatar: {
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    backgroundColor: '#7C83D4',
    color: '#ffffff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  userName: {
    color: '#ffffff',
    fontSize: '0.95rem',
    fontWeight: '500',
  },
  logoutBtn: {
    backgroundColor: 'transparent',
    color: '#ffffff',
    border: '1px solid #7C83D4',
    padding: '0.4rem 1rem',
    borderRadius: '20px',
    fontSize: '0.85rem',
    cursor: 'pointer',
    fontWeight: '500',
  },
};

export default Navbar;