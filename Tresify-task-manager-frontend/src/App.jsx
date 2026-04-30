import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import List from './pages/List.jsx';
import Details from './pages/Details.jsx';
import AddTask from './pages/AddTask.jsx';
import Timetable from './pages/Timetable.jsx';
import Gym from './pages/Gym.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

const isLoggedIn = () => !!localStorage.getItem('token');

const PrivateRoute = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={
          <PrivateRoute><Navbar /><Home /></PrivateRoute>
        } />
        <Route path="/list" element={
          <PrivateRoute><Navbar /><List /></PrivateRoute>
        } />
        <Route path="/details/:id" element={
          <PrivateRoute><Navbar /><Details /></PrivateRoute>
        } />
        <Route path="/add" element={
          <PrivateRoute><Navbar /><AddTask /></PrivateRoute>
        } />
        <Route path="/timetable" element={
          <PrivateRoute><Navbar /><Timetable /></PrivateRoute>
        } />
        <Route path="/gym" element={
          <PrivateRoute><Navbar /><Gym /></PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;