import React, { useState, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FaCar, FaUser, FaMapMarkerAlt, FaShieldAlt, FaInfoCircle, FaHome, FaClipboardList, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaTachometerAlt, FaBell } from 'react-icons/fa';
import Logo from '../assets/tblogo.png';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const isDriver = isAuthenticated && user?.role === 'driver';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="w-full text-blue-900 shadow-md bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-2 md:px-0">
        <div className="w-10 flex items-center">
          <img src={Logo} alt="Tubyikorere's Logo" />
        </div>
        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center mr-6">
          {isDriver ? (
            <>
              <Link to="/driver" className="flex items-center gap-1 hover:text-orange-500"><FaTachometerAlt /> Dashboard</Link>
              <Link to="/driver/notifications" className="flex items-center gap-1 hover:text-orange-500"><FaBell /> Notifications</Link>
              <Link to="/driver/profile" className="flex items-center gap-1 hover:text-orange-500"><FaUser /> Profile</Link>
              {isAuthenticated && <button onClick={handleLogout} className="flex items-center gap-1 hover:text-orange-500 bg-transparent border-none cursor-pointer"><FaSignOutAlt /> Logout</button>}
            </>
          ) : (
            <>
              <Link to="/" className="flex items-center gap-1 hover:text-orange-500"><FaHome className="md:hidden"/> Home</Link>
              {isAuthenticated && <Link to="/book-driver" className="flex items-center gap-1 hover:text-orange-500"><FaCar className="md:hidden"/> Book a Driver</Link>}
              {isAuthenticated && <Link to="/my-bookings" className="flex items-center gap-1 hover:text-orange-500"><FaClipboardList className="md:hidden"/> My Bookings</Link>}
              {isAuthenticated && <Link to="/drivers-nearby" className="flex items-center gap-1 hover:text-orange-500"><FaMapMarkerAlt className="md:hidden"/> Drivers Nearby</Link>}
              <Link to="/safety" className="flex items-center gap-1 hover:text-orange-500"><FaShieldAlt className="md:hidden"/> Safety & Emergency</Link>
              <Link to="/about" className="flex items-center gap-1 hover:text-orange-500"><FaInfoCircle className="md:hidden"/> About</Link>
              {isAuthenticated && <Link to="/profile" className="flex items-center gap-1 hover:text-orange-500"><FaUser className="md:hidden"/> Profile</Link>}
              {!isAuthenticated && <Link to="/login" className="flex items-center gap-1 hover:text-orange-500"><FaSignInAlt className="md:hidden"/> Login</Link>}
              {!isAuthenticated && <Link to="/signup" className="flex items-center gap-1 hover:text-orange-500"><FaUserPlus className="md:hidden"/> Signup</Link>}
              {isAuthenticated && <button onClick={handleLogout} className="flex items-center gap-1 hover:text-orange-500 bg-transparent border-none cursor-pointer"><FaSignOutAlt className="md:hidden"/> Logout</button>}
            </>
          )}
        </nav>
        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden grid grid-cols-6 gap-4 px-4 pb-4 bg-white shadow text-2xl justify-items-center">
          {isDriver ? (
            <>
              <Link to="/driver" aria-label="Dashboard" onClick={() => setMenuOpen(false)}><FaTachometerAlt /></Link>
              <Link to="/driver/notifications" aria-label="Notifications" onClick={() => setMenuOpen(false)}><FaBell /></Link>
              <Link to="/driver/profile" aria-label="Profile" onClick={() => setMenuOpen(false)}><FaUser /></Link>
              {isAuthenticated && <button aria-label="Logout" onClick={() => { handleLogout(); setMenuOpen(false); }} className="bg-transparent border-none cursor-pointer"><FaSignOutAlt /></button>}
            </>
          ) : (
            <>
              <Link to="/" aria-label="Home" onClick={() => setMenuOpen(false)}><FaHome /></Link>
              {isAuthenticated && <Link to="/book-driver" aria-label="Book a Driver" onClick={() => setMenuOpen(false)}><FaCar /></Link>}
              {isAuthenticated && <Link to="/my-bookings" aria-label="My Bookings" onClick={() => setMenuOpen(false)}><FaClipboardList /></Link>}
              {isAuthenticated && <Link to="/drivers-nearby" aria-label="Drivers Nearby" onClick={() => setMenuOpen(false)}><FaMapMarkerAlt /></Link>}
              <Link to="/safety" aria-label="Safety" onClick={() => setMenuOpen(false)}><FaShieldAlt /></Link>
              <Link to="/about" aria-label="About" onClick={() => setMenuOpen(false)}><FaInfoCircle /></Link>
              {isAuthenticated && <Link to="/profile" aria-label="Profile" onClick={() => setMenuOpen(false)}><FaUser /></Link>}
              {!isAuthenticated && <Link to="/login" aria-label="Login" onClick={() => setMenuOpen(false)}><FaSignInAlt /></Link>}
              {!isAuthenticated && <Link to="/signup" aria-label="Signup" onClick={() => setMenuOpen(false)}><FaUserPlus /></Link>}
              {isAuthenticated && <button aria-label="Logout" onClick={() => { handleLogout(); setMenuOpen(false); }} className="bg-transparent border-none cursor-pointer"><FaSignOutAlt /></button>}
            </>
          )}
        </nav>
      )}
    </header>
  );
}
