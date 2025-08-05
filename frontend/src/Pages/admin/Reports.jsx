import React from 'react';
import { motion } from 'framer-motion';
import { FaDollarSign, FaUserPlus, FaChartLine, FaDumbbell } from 'react-icons/fa';

const Reports = ({ colors, mode }) => {
  const attendanceData = [
    { day: 'Mon', attendance: 75 },
    { day: 'Tue', attendance: 82 },
    { day: 'Wed', attendance: 78 },
    { day: 'Thu', attendance: 80 },
    { day: 'Fri', attendance: 85 },
    { day: 'Sat', attendance: 90 },
    { day: 'Sun', attendance: 65 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Monthly Revenue", value: "₹2,84,900", change: "+8.2%", icon: <FaDollarSign /> },
          { title: "New Members", value: "42", change: "+12%", icon: <FaUserPlus /> },
          { title: "Avg. Attendance", value: "78%", change: "+3.1%", icon: <FaChartLine /> },
          { title: "Classes Conducted", value: "186", change: "+15%", icon: <FaDumbbell /> }
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="rounded-xl shadow-lg p-4 sm:p-6"
            style={{ backgroundColor: colors.card }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm opacity-80" style={{ color: colors.text }}>{stat.title}</p>
                <p className="text-xl sm:text-2xl font-bold mt-2" style={{ color: colors.text }}>{stat.value}</p>
                <p className="text-xs sm:text-sm mt-2 px-2 py-1 rounded-full inline-block"
                  style={{ 
                    background: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                    color: stat.change.includes('+') ? (mode === 'dark' ? '#10b981' : '#047857') : (mode === 'dark' ? '#ef4444' : '#b91c1c')
                  }}>
                  {stat.change}
                </p>
              </div>
              <div 
                className="p-3 rounded-lg" 
                style={{ 
                  background: mode === 'dark' 
                    ? 'linear-gradient(135deg, #1e293b, #0f172a)' 
                    : 'linear-gradient(135deg, #e0e7ff, #c7d2fe)'
                }}
              >
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Chart */}
        <motion.div 
          className="rounded-xl shadow-lg p-6"
          style={{ backgroundColor: colors.card }}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <h3 className="text-xl font-bold mb-6" style={{ color: colors.text }}>Weekly Attendance</h3>
          <div className="h-64 flex items-end justify-between">
            {attendanceData.map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="text-sm mb-2" style={{ color: colors.text }}>{data.attendance}%</div>
                <motion.div
                  className="w-8 rounded-t-lg"
                  style={{ 
                    backgroundColor: colors.primary,
                    height: `${data.attendance}%`,
                    maxHeight: '100%'
                  }}
                  initial={{ height: 0 }}
                  animate={{ height: `${data.attendance}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                ></motion.div>
                <div className="mt-2 text-sm" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>{data.day}</div>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Membership Growth */}
        <motion.div 
          className="rounded-xl shadow-lg p-6"
          style={{ backgroundColor: colors.card }}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <h3 className="text-xl font-bold mb-6" style={{ color: colors.text }}>Membership Growth</h3>
          <div className="h-64 flex flex-col justify-between">
            {[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200].map((value, index) => (
              <div key={index} className="flex items-center">
                <div className="w-10 text-right text-sm mr-2" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                  {value}
                </div>
                <div className="flex-1 h-px" style={{ background: mode === 'dark' ? '#374151' : '#e5e7eb' }}></div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <div className="w-32 h-2 rounded-full overflow-hidden">
              <div 
                className="h-full" 
                style={{ 
                  background: mode === 'dark' 
                    ? 'linear-gradient(90deg, #fbbf24, #d97706)' 
                    : 'linear-gradient(90deg, #4f46e5, #7c3aed)',
                  width: '75%'
                }}
              ></div>
            </div>
          </div>
          <div className="text-center mt-2 text-sm" style={{ color: colors.text }}>
            +284 new members this year
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Reports;