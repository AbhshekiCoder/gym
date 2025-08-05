import React from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaUsers, FaCalendarAlt, FaChartLine } from 'react-icons/fa';

const QuickStats = ({ colors, mode }) => {
  return (
    <motion.div 
      className="mt-6 sm:mt-8 rounded-xl shadow-xl p-4 sm:p-6 text-white"
      style={{ 
        background: mode === 'dark' 
          ? 'linear-gradient(135deg, #1e293b, #0f172a)' 
          : 'linear-gradient(135deg, #4f46e5, #7c3aed)',
        boxShadow: `0 10px 25px -5px ${mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'}`
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Quick Stats</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
        {[
          { title: "Active Members", value: "1,042", icon: <FaUser /> },
          { title: "Trainers", value: "12", icon: <FaUsers /> },
          { title: "Classes Weekly", value: "56", icon: <FaCalendarAlt /> },
          { title: "Occupancy Rate", value: "84%", icon: <FaChartLine /> }
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="p-3 sm:p-5 rounded-xl text-center"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div 
              className="inline-flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 rounded-full mb-2 sm:mb-4"
              style={{ background: 'rgba(255, 255, 255, 0.2)' }}
              animate={{ 
                rotate: [0, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {stat.icon}
            </motion.div>
            <p className="text-lg sm:text-2xl font-bold">{stat.value}</p>
            <p className="text-xs sm:text-sm opacity-80 mt-1">{stat.title}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickStats;