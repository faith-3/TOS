import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useContext } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import BookDriver from './components/BookDriver';
import MyBookings from './components/MyBookings';
import DriversNearby from './components/DriversNearby';
import Safety from './components/Safety';
import About from './components/About';
import Profile from './components/Profile';
import Signup from './components/Signup';
import Login from './components/Login';
import { AuthContext } from './context/AuthContext';
import DriverDashboard from './components/DriverDashboard';
import DriverNotifications from './components/DriverNotifications';
import DriverRegister from './components/DriverRegister';
import DriverProfile from './components/DriverProfile';
import ForgotPassword from './components/ForgotPassword';

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book-driver" element={isAuthenticated ? <BookDriver /> : <Login />} />
        <Route path="/my-bookings" element={isAuthenticated ? <MyBookings /> : <Login />} />
        <Route path="/drivers-nearby" element={isAuthenticated ? <DriversNearby /> : <Login />} />
        <Route path="/driver" element={isAuthenticated ? <DriverDashboard /> : <Login />} />
        <Route path="/driver/notifications" element={isAuthenticated ? <DriverNotifications /> : <Login />} />
        <Route path="/driver/profile" element={isAuthenticated ? <DriverProfile /> : <Login />} />
        <Route path="/driver/register" element={isAuthenticated ? <DriverRegister /> : <Login />} />
        <Route path="/safety" element={<Safety />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
