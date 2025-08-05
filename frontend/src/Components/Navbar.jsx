import React, { useEffect, useState } from 'react';
import { NavLink as RouterNavLink, useNavigate } from 'react-router-dom';
import {
  FaHome, FaInfoCircle, FaUserPlus, FaUserCog,
  FaDumbbell, FaSun, FaMoon, FaSignInAlt,
  FaSignOutAlt, FaBars, FaTimes, FaUser
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { userinfo } from '../features/userinfo';
import { toogleMode } from '../features/mode';

const Navbar = () => {
  const userInfo = useSelector((state) => state.user.value);
  const mode = useSelector((state) => state.mode.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Apply dark mode class and handle scroll effect
  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark');
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mode]);

  const logout = () => {
    localStorage.removeItem('token');
    dispatch(userinfo(''));
    navigate('/');
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleToggleMode = () => {
    dispatch(toogleMode(mode === 'light' ? 'dark' : 'light'));
  };

  // Dynamic classes
  const bgClass = mode === 'dark'
    ? 'bg-gradient-to-r from-gray-800 to-gray-900'
    : 'bg-gradient-to-r from-indigo-600 to-purple-600';

  const shadowClass = scrolled 
    ? (mode === 'dark' ? 'shadow-lg shadow-gray-900/50' : 'shadow-lg shadow-indigo-500/30')
    : '';

  const mobileBgClass = mode === 'dark'
    ? 'bg-gray-800'
    : 'bg-indigo-500';

  return (
    <nav className={`navbar sticky top-0 p-4 flex justify-between items-center ${bgClass} ${shadowClass} text-white transition-all duration-300 z-50`}>
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <FaDumbbell className="text-3xl text-amber-400 animate-pulse" />
        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-300">
          GymX
        </span>
      </div>

      {/* Desktop Controls */}
      <div className="hidden md:flex items-center gap-4">
        <button 
          onClick={handleToggleMode}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200"
          aria-label={mode === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
        >
          {mode === 'dark' 
            ? <FaSun className="text-yellow-300 text-lg" /> 
            : <FaMoon className="text-indigo-100 text-lg" />}
        </button>
        
        <div className="flex items-center gap-1">
          <NavLink to="/" icon={<FaHome />} text="Home" />
          <NavLink to="/about" icon={<FaInfoCircle />} text="About" />
          <NavLink to="/join" icon={<FaUserPlus />} text="Join" />
          <NavLink to="/login" icon={<FaUserCog />} text="Admin" />
          <NavLink to="/signup" icon={<FaUserPlus />} text="Sign Up" />
        </div>

        {userInfo?.name ? (
          <div className="flex items-center gap-3 ml-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-sm">
              <FaUser className="text-amber-300" />
              <span className="font-medium text-amber-300">{userInfo.name}</span>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-600 transition-colors duration-200"
            >
              <FaSignOutAlt />
              <span>Sign Out</span>
            </button>
          </div>
        ) : (
          <NavLink to="/login" icon={<FaSignInAlt />} text="Sign In" />
        )}
      </div>

      {/* Mobile Controls */}
      <div className="md:hidden flex items-center gap-3">
        <button 
          onClick={handleToggleMode}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          aria-label={mode === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
        >
          {mode === 'dark' 
            ? <FaSun className="text-yellow-300" /> 
            : <FaMoon className="text-indigo-100" />}
        </button>
        
        <button 
          onClick={toggleMenu}
          className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed top-20 right-0 w-full max-w-xs ${mobileBgClass} rounded-lg shadow-xl transition-all duration-300 transform origin-top-right z-40
        ${menuOpen ? 'scale-100 opacity-100 visible' : 'scale-95 opacity-0 invisible'}`}>
        <div className="flex flex-col p-4 gap-2">
          <MobileNavLink to="/" icon={<FaHome />} text="Home" onClick={toggleMenu} />
          <MobileNavLink to="/about" icon={<FaInfoCircle />} text="About" onClick={toggleMenu} />
          <MobileNavLink to="/join" icon={<FaUserPlus />} text="Join" onClick={toggleMenu} />
          <MobileNavLink to="/login" icon={<FaUserCog />} text="Admin" onClick={toggleMenu} />
          <MobileNavLink to="/signup" icon={<FaUserPlus />} text="Sign Up" onClick={toggleMenu} />
          
          {userInfo?.name ? (
            <>
              <div className="flex items-center gap-2 px-4 py-3 mt-2 rounded-lg bg-white/10">
                <FaUser className="text-amber-300" />
                <span className="font-medium text-amber-300">{userInfo.name}</span>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-3 rounded-lg bg-rose-500 hover:bg-rose-600 transition-colors mt-2"
              >
                <FaSignOutAlt />
                <span>Sign Out</span>
              </button>
            </>
          ) : (
            <MobileNavLink to="/login" icon={<FaSignInAlt />} text="Sign In" onClick={toggleMenu} />
          )}
        </div>
      </div>
    </nav>
  );
};

// Desktop NavLink Component
const NavLink = ({ to, icon, text }) => (
  <RouterNavLink
    to={to}
    className={({ isActive }) => 
      `flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-white/20 ${
        isActive 
          ? 'bg-white/20 text-amber-300 font-semibold' 
          : 'text-white'
      }`
    }
  >
    <span>{icon}</span>
    <span>{text}</span>
  </RouterNavLink>
);

// Mobile NavLink Component
const MobileNavLink = ({ to, icon, text, onClick }) => (
  <RouterNavLink
    to={to}
    className={({ isActive }) => 
      `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
        isActive 
          ? 'bg-white/20 text-amber-300 font-semibold' 
          : 'text-white hover:bg-white/10'
      }`
    }
    onClick={onClick}
  >
    <span>{icon}</span>
    <span>{text}</span>
  </RouterNavLink>
);

export default Navbar;