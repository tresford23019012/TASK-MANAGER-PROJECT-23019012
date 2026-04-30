import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './pages/Home';
import List from './pages/List';
import Details from './pages/Details';
import AddTask from './pages/AddTask';
import Timetable from './pages/Timetable';
import Gym from './pages/Gym';
import Login from './pages/Login';
import Register from './pages/Register';

const isLoggedIn = () => !!localStorage.getItem('token');

const PrivateRoute = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes - no navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private Routes - with navbar */}
        <Route path="/" element={<PrivateRoute><><Navbar /><Navigate to="/home" /></></PrivateRoute>} />
        <Route path="/home" element={<PrivateRoute><><Navbar /><Home /></></PrivateRoute>} />
        <Route path="/list" element={<PrivateRoute><><Navbar /><List /></></PrivateRoute>} />
        <Route path="/details/:id" element={<PrivateRoute><><Navbar /><Details /></></PrivateRoute>} />
        <Route path="/add" element={<PrivateRoute><><Navbar /><AddTask /></></PrivateRoute>} />
        <Route path="/timetable" element={<PrivateRoute><><Navbar /><Timetable /></></PrivateRoute>} />
        <Route path="/gym" element={<PrivateRoute><><Navbar /><Gym /></></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;