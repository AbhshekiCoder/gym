import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaDollarSign, FaChartLine, FaDumbbell, FaUserCheck, FaHandshake } from 'react-icons/fa';

const StatsCard = ({ title, value, change, iconType, gradient, colors, mode, index }) => {
  const getIcon = () => {
    switch (iconType) {
      case 'users':
        return <FaUsers className="text-xl" />;
      case 'activeUsers':
        return <FaUserCheck className="text-xl" />;
      case 'revenue':
        return <FaDollarSign className="text-xl" />;
      case 'attendance':
        return <FaChartLine className="text-xl" />;
      case 'classes':
        return <FaDumbbell className="text-xl" />;
      case 'leads':
        return <FaHandshake className="text-xl" />;
      default:
        return <FaUsers className="text-xl" />;
    }
  };

  return (
    <motion.div
      className="rounded-xl shadow-lg p-4 sm:p-6 text-white overflow-hidden"
      style={{ 
        background: gradient,
        boxShadow: `0 10px 25px -5px ${mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'}`
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm opacity-80">{title}</p>
          <p className="text-xl sm:text-2xl font-bold mt-1 sm:mt-2">{value}</p>
          <p className="text-xs sm:text-sm mt-2 px-2 py-1 rounded-full inline-block"
            style={{ background: 'rgba(255, 255, 255, 0.2)' }}>
            {change}
          </p>
        </div>
        <motion.div 
          className="p-3 rounded-lg" 
          style={{ background: 'rgba(255, 255, 255, 0.2)' }}
          animate={{ rotate: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {getIcon()}
        </motion.div>
      </div>
      
      {/* Mini progress bar for some cards */}
      {(iconType === 'activeUsers' || iconType === 'revenue') && (
        <div className="mt-4 w-full bg-white/20 rounded-full h-1.5">
          <div 
            className="h-1.5 rounded-full bg-white" 
            style={{ width: iconType === 'activeUsers' ? '75%' : '82%' }}
          ></div>
        </div>
      )}
    </motion.div>
  );
};

export default StatsCard;