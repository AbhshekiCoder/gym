import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaChartBar, FaUsers, FaCalendarAlt, 
  FaDollarSign, FaClipboardList, FaTrophy, 
  FaCog, FaSignOutAlt, FaDumbbell 
} from 'react-icons/fa';

const Sidebar = ({ activeTab, setActiveTab, mode, colors }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FaChartBar /> },
    { id: 'members', label: 'Members', icon: <FaUsers /> },
    { id: 'classes', label: 'Classes', icon: <FaCalendarAlt /> },
    { id: 'payments', label: 'Payments', icon: <FaDollarSign /> },
    { id: 'reports', label: 'Reports', icon: <FaClipboardList /> },
    { id: 'challenges', label: 'Challenges', icon: <FaTrophy /> },
    { id: 'settings', label: 'Settings', icon: <FaCog /> }
  ];

  return (
    <motion.div 
      className="w-64 flex flex-col"
      style={{
        background: mode === 'dark' 
          ? 'linear-gradient(to bottom, #0f172a, #1e293b)' 
          : 'linear-gradient(to bottom, #4f46e5, #7c3aed)',
        color: '#fff'
      }}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6">
        <div className="flex items-center">
          <motion.div 
            className="p-2 rounded-lg mr-3"
            style={{ 
              background: mode === 'dark' 
                ? 'linear-gradient(90deg, #fbbf24, #d97706)' 
                : 'linear-gradient(90deg, #e0e7ff, #c7d2fe)'
            }}
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <FaDumbbell className="text-xl" style={{ color: colors.primary }} />
          </motion.div>
          <h1 className="text-xl font-bold"><Link to="/">GymX Admin</Link></h1>
        </div>
      </div>
      
      <nav className="flex-1 mt-8">
        {navItems.map((item) => (
          <motion.div
            key={item.id}
            className={`flex items-center px-6 py-4 cursor-pointer transition-all ${
              activeTab === item.id 
                ? 'bg-white/10 border-l-4' 
                : 'hover:bg-white/5'
            }`}
            style={{ 
              borderColor: activeTab === item.id ? colors.primary : 'transparent'
            }}
            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
            onClick={() => setActiveTab(item.id)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: item.id * 0.1 }}
          >
            <span className="mr-3">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </motion.div>
        ))}
      </nav>
      
      <div className="p-6 border-t border-white/10">
        <motion.div 
          className="flex items-center cursor-pointer hover:bg-white/5 p-3 rounded-lg"
          whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
        >
          <FaSignOutAlt className="mr-3" />
          <span>Logout</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Sidebar;