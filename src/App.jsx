import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, createContext } from 'react';
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

export const AuthContext = createContext();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book-driver" element={isAuthenticated ? <BookDriver /> : <Login />} />
          <Route path="/my-bookings" element={isAuthenticated ? <MyBookings /> : <Login />} />
          <Route path="/drivers-nearby" element={isAuthenticated ? <DriversNearby /> : <Login />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
