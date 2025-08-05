import React from 'react';
import { motion } from 'framer-motion';

const RecentMembers = ({ colors, mode, recentMembers }) => {
  return (
    <motion.div 
      className="rounded-xl shadow-lg p-4 sm:p-6"
      style={{ backgroundColor: colors.card }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h3 className="text-lg font-bold" style={{ color: colors.text }}>
          Recent Members
        </h3>
        <motion.button 
          className="text-sm font-medium flex items-center"
          style={{ color: colors.primary }}
          whileHover={{ x: 5 }}
          onClick={() =>{document.querySelector('.member').style.overflowY = 'auto'}}
          
        >
          View All <span className="ml-2 text-xs">→</span>
        </motion.button>
      </div>
      
      <div className="member space-y-3 sm:space-y-4 h-96  overflow-hidden " style={{scrollbarColor: mode === 'dark'? '#4b5563':'#e5e7eb', scrollbarWidth: 'thin'}}>
        {recentMembers?.map((member, index) => (
          <motion.div 
            key={index}
            className="flex items-center justify-between p-3 sm:p-4 rounded-lg"
            style={{ 
              backgroundColor: mode === 'dark' ? '#374151' : '#f9fafb',
              borderBottom: `1px solid ${mode === 'dark' ? '#4b5563' : '#e5e7eb'}`
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center">
              <motion.div 
                className="rounded-xl w-8 h-8 sm:w-10 sm:h-10 mr-3"
                style={{ 
                  background: mode === 'dark' 
                    ? 'linear-gradient(45deg, #1e293b, #334155)' 
                    : 'linear-gradient(45deg, #e0e7ff, #ede9fe)',
                  border: `2px dashed ${mode === 'dark' ? '#4b5563' : '#d1d5db'}`
                }}
                animate={{ 
                  rotate: [0, 5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div>
                <p className="font-medium text-sm sm:text-base" style={{ color: colors.text }}>{member.name}</p>
                <p className="text-xs sm:text-sm" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                  {member.joined}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-sm sm:text-base" style={{ color: colors.text }}>{member.plan}</p>
              <span className="text-xs px-2 py-1 rounded-full"
                style={{ 
                  backgroundColor: member.membership === 'Active' 
                    ? (mode === 'dark' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)') 
                    : (mode === 'dark' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0.1)'),
                  color: member.membership === 'Active' 
                    ? (mode === 'dark' ? '#10b981' : '#047857') 
                    : (mode === 'dark' ? '#f59e0b' : '#b45309')
                }}
              >
                {member.membership}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentMembers;