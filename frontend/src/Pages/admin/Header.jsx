import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBell, FaUser, FaEllipsisV } from 'react-icons/fa';

const Header = ({ activeTab, mode, colors, user }) => {
  const [notificationCount] = useState(5);

  return (
    <motion.header 
      className="shadow-sm p-4 flex items-center justify-between"
      style={{ 
        backgroundColor: colors.card,
        borderBottom: `1px solid ${mode === 'dark' ? '#374151' : '#e5e7eb'}`
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center">
        <motion.div 
          className="p-2 rounded-lg mr-4"
          style={{ background: mode === 'dark' ? '#374151' : '#f3f4f6' }}
          whileHover={{ rotate: 90 }}
          transition={{ duration: 0.3 }}
        >
          <FaEllipsisV style={{ color: colors.text }} />
        </motion.div>
        <h2 className="text-xl font-bold capitalize" style={{ color: colors.text }}>
          {activeTab}
        </h2>
      </div>
      
      <div className="flex items-center space-x-6">
        <div className="relative">
          <motion.button 
            className="p-2 rounded-full relative"
            style={{ background: mode === 'dark' ? '#374151' : '#f3f4f6' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaBell style={{ color: colors.text }} />
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 text-xs rounded-full w-5 h-5 flex items-center justify-center"
                style={{ backgroundColor: colors.accent }}>
                {notificationCount}
              </span>
            )}
          </motion.button>
        </div>
        
        <div className="flex items-center">
          <motion.div 
            className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
            style={{ 
              background: mode === 'dark' 
                ? 'linear-gradient(90deg, #fbbf24, #d97706)' 
                : 'linear-gradient(90deg, #4f46e5, #7c3aed)'
            }}
            whileHover={{ rotate: 10 }}
          >
            <FaUser className="text-white" />
          </motion.div>
          <div>
            <p className="font-medium" style={{ color: colors.text }}>{user?.name || ''}</p>
            <p className="text-sm" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
              {user?.email || ''}
            </p>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;