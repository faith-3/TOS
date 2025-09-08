import React, { useState, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FaCar, FaUser, FaMapMarkerAlt, FaShieldAlt, FaInfoCircle, FaHome, FaClipboardList, FaSignInAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';
import Logo from '../assets/tblogo.png';
import { AuthContext } from '../App';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

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
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="flex items-center gap-1 hover:text-orange-500"><FaHome /> Home</Link>
          {isAuthenticated && <Link to="/book-driver" className="flex items-center gap-1 hover:text-orange-500"><FaCar /> Book a Driver</Link>}
          {isAuthenticated && <Link to="/my-bookings" className="flex items-center gap-1 hover:text-orange-500"><FaClipboardList /> My Bookings</Link>}
          {isAuthenticated && <Link to="/drivers-nearby" className="flex items-center gap-1 hover:text-orange-500"><FaMapMarkerAlt /> Drivers Nearby</Link>}
          <Link to="/safety" className="flex items-center gap-1 hover:text-orange-500"><FaShieldAlt /> Safety & Emergency</Link>
          <Link to="/about" className="flex items-center gap-1 hover:text-orange-500"><FaInfoCircle /> About</Link>
          {isAuthenticated && <Link to="/profile" className="flex items-center gap-1 hover:text-orange-500"><FaUser /> Profile</Link>}
          {!isAuthenticated && <Link to="/login" className="flex items-center gap-1 hover:text-orange-500"><FaSignInAlt /> Login</Link>}
          {!isAuthenticated && <Link to="/signup" className="flex items-center gap-1 hover:text-orange-500"><FaUserPlus /> Signup</Link>}
          {isAuthenticated && <button onClick={handleLogout} className="flex items-center gap-1 hover:text-orange-500 bg-transparent border-none cursor-pointer"><FaSignOutAlt /> Logout</button>}
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
        <nav className="md:hidden flex flex-col space-y-2 px-4 pb-4 bg-white shadow">
          <Link to="/" className="flex items-center gap-2 py-2 hover:text-orange-500" onClick={() => setMenuOpen(false)}><FaHome /> Home</Link>
          {isAuthenticated && <Link to="/book-driver" className="flex items-center gap-2 py-2 hover:text-orange-500" onClick={() => setMenuOpen(false)}><FaCar /> Book a Driver</Link>}
          {isAuthenticated && <Link to="/my-bookings" className="flex items-center gap-2 py-2 hover:text-orange-500" onClick={() => setMenuOpen(false)}><FaClipboardList /> My Bookings</Link>}
          {isAuthenticated && <Link to="/drivers-nearby" className="flex items-center gap-2 py-2 hover:text-orange-500" onClick={() => setMenuOpen(false)}><FaMapMarkerAlt /> Drivers Nearby</Link>}
          <Link to="/safety" className="flex items-center gap-2 py-2 hover:text-orange-500" onClick={() => setMenuOpen(false)}><FaShieldAlt /> Safety & Emergency</Link>
          <Link to="/about" className="flex items-center gap-2 py-2 hover:text-orange-500" onClick={() => setMenuOpen(false)}><FaInfoCircle /> About</Link>
          {isAuthenticated && <Link to="/profile" className="flex items-center gap-2 py-2 hover:text-orange-500" onClick={() => setMenuOpen(false)}><FaUser /> Profile</Link>}
          {!isAuthenticated && <Link to="/login" className="flex items-center gap-2 py-2 hover:text-orange-500" onClick={() => setMenuOpen(false)}><FaSignInAlt /> Login</Link>}
          {!isAuthenticated && <Link to="/signup" className="flex items-center gap-2 py-2 hover:text-orange-500" onClick={() => setMenuOpen(false)}><FaUserPlus /> Signup</Link>}
          {isAuthenticated && <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="flex items-center gap-2 py-2 hover:text-orange-500 bg-transparent border-none cursor-pointer"><FaSignOutAlt /> Logout</button>}
        </nav>
      )}
    </header>
  );
}
