import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt } from 'react-icons/fa';

const UpcomingClasses = ({ colors, mode, upcomingClasses }) => {
  return (
    <motion.div 
      className="rounded-xl shadow-lg p-4 sm:p-6"
      style={{ backgroundColor: colors.card }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h3 className="text-lg font-bold" style={{ color: colors.text }}>
          Upcoming Classes
        </h3>
        <motion.button 
          className="text-sm font-medium flex items-center"
          style={{ color: colors.primary }}
          whileHover={{ x: 5 }}
        >
          View Calendar <FaCalendarAlt className="ml-2 text-xs" />
        </motion.button>
      </div>
      
      <div className="space-y-3 sm:space-y-4">
        {upcomingClasses.map((cls, index) => (
          <motion.div 
            key={index}
            className="flex items-center justify-between p-3 sm:p-4 rounded-lg"
            style={{ 
              backgroundColor: mode === 'dark' ? '#374151' : '#f9fafb'
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            whileHover={{ scale: 1.01 }}
          >
            <div>
              <p className="font-medium text-sm sm:text-base" style={{ color: colors.text }}>{cls.name}</p>
              <p className="text-xs sm:text-sm" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                {cls.time} • {cls.trainer}
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium text-sm sm:text-base" style={{ color: colors.text }}>
                {cls.attendees}/{cls.capacity}
              </p>
              <div className="w-16 sm:w-24 h-2 rounded-full overflow-hidden mt-1"
                style={{ background: mode === 'dark' ? '#4b5563' : '#e5e7eb' }}>
                <div 
                  className="h-full" 
                  style={{ 
                    background: cls.attendees / cls.capacity > 0.8 
                      ? '#ef4444' 
                      : (cls.attendees / cls.capacity > 0.5 ? '#10b981' : '#3b82f6'),
                    width: `${(cls.attendees / cls.capacity) * 100}%`
                  }}
                ></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default UpcomingClasses;