import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaDollarSign, 
  FaUserPlus, 
  FaChartLine, 
  FaDumbbell, 
  FaHeartbeat,
  FaClock,
  FaWeight,
  FaRunning,
  FaCalendarAlt,
  FaStar,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';

const Reports = ({ colors, mode }) => {
  // Sample data
  const attendanceData = [
    { day: 'Mon', attendance: 75, classes: 12 },
    { day: 'Tue', attendance: 82, classes: 15 },
    { day: 'Wed', attendance: 78, classes: 14 },
    { day: 'Thu', attendance: 80, classes: 16 },
    { day: 'Fri', attendance: 85, classes: 18 },
    { day: 'Sat', attendance: 90, classes: 20 },
    { day: 'Sun', attendance: 65, classes: 10 }
  ];

  const membershipGrowth = [
    { month: 'Jan', members: 850 },
    { month: 'Feb', members: 920 },
    { month: 'Mar', members: 980 },
    { month: 'Apr', members: 1050 },
    { month: 'May', members: 1120 },
    { month: 'Jun', members: 1200 }
  ];

  const popularClasses = [
    { name: 'Yoga', participants: 85, revenue: 42000 },
    { name: 'CrossFit', participants: 72, revenue: 58000 },
    { name: 'Zumba', participants: 95, revenue: 38000 },
    { name: 'Pilates', participants: 68, revenue: 35000 },
    { name: 'Boxing', participants: 78, revenue: 45000 }
  ];

  const equipmentUsage = [
    { name: 'Treadmills', usage: 85 },
    { name: 'Weights', usage: 92 },
    { name: 'Bikes', usage: 78 },
    { name: 'Ellipticals', usage: 72 },
    { name: 'Rowers', usage: 65 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-4"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold" style={{ color: colors.text }}>Gym Performance Dashboard</h2>
        <div className="flex items-center space-x-2 px-4 py-2 rounded-lg" 
          style={{ background: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)' }}>
          <FaCalendarAlt className="text-amber-400" />
          <span style={{ color: colors.text }}>Last 30 Days</span>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { 
            title: "Monthly Revenue", 
            value: "₹2,84,900", 
            change: "+8.2%", 
            icon: <FaDollarSign />, 
            trend: 'up' 
          },
          { 
            title: "New Members", 
            value: "42", 
            change: "+12%", 
            icon: <FaUserPlus />, 
            trend: 'up' 
          },
          { 
            title: "Avg. Attendance", 
            value: "78%", 
            change: "+3.1%", 
            icon: <FaChartLine />, 
            trend: 'up' 
          },
          { 
            title: "Classes Conducted", 
            value: "186", 
            change: "+15%", 
            icon: <FaDumbbell />, 
            trend: 'up' 
          }
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="rounded-2xl p-5 shadow-lg border"
            style={{ 
              backgroundColor: colors.card,
              borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm opacity-80 mb-2" style={{ color: colors.text }}>{stat.title}</p>
                <p className="text-2xl font-bold mb-2" style={{ color: colors.text }}>{stat.value}</p>
                <div className="flex items-center">
                  <span className={`text-sm flex items-center mr-2 ${
                    stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {stat.trend === 'up' ? <FaArrowUp size={12} /> : <FaArrowDown size={12} />}
                    {stat.change}
                  </span>
                  <span className="text-xs opacity-70" style={{ color: colors.text }}>vs last month</span>
                </div>
              </div>
              <div 
                className="p-3 rounded-xl flex items-center justify-center" 
                style={{ 
                  background: mode === 'dark' 
                    ? 'rgba(251, 191, 36, 0.2)' 
                    : 'rgba(79, 70, 229, 0.1)',
                  color: colors.primary
                }}
              >
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Chart */}
        <motion.div 
          className="rounded-2xl p-6 border"
          style={{ 
            backgroundColor: colors.card,
            borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
          }}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold" style={{ color: colors.text }}>Weekly Attendance & Classes</h3>
            <span className="text-sm px-3 py-1 rounded-full" 
              style={{ 
                background: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                color: colors.text
              }}>
              +8% this week
            </span>
          </div>
          <div className="h-64 flex items-end justify-between space-x-2">
            {attendanceData.map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1 space-y-2">
                <div className="w-full flex flex-col items-center">
                  <div className="text-xs mb-1" style={{ color: colors.text }}>{data.attendance}%</div>
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
                </div>
                <div className="w-full flex flex-col items-center mt-2">
                  <div className="text-xs mb-1" style={{ color: colors.text }}>{data.classes}</div>
                  <motion.div
                    className="w-8 rounded-t-lg"
                    style={{ 
                      backgroundColor: mode === 'dark' ? '#fbbf24' : '#8b5cf6',
                      height: `${data.classes * 4}%`,
                      maxHeight: '100%'
                    }}
                    initial={{ height: 0 }}
                    animate={{ height: `${data.classes * 4}%` }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                  ></motion.div>
                </div>
                <div className="mt-2 text-xs font-medium" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>{data.day}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: colors.primary }}></div>
              <span className="text-xs" style={{ color: colors.text }}>Attendance %</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: mode === 'dark' ? '#fbbf24' : '#8b5cf6' }}></div>
              <span className="text-xs" style={{ color: colors.text }}>Classes</span>
            </div>
          </div>
        </motion.div>
        
        {/* Membership Growth */}
        <motion.div 
          className="rounded-2xl p-6 border"
          style={{ 
            backgroundColor: colors.card,
            borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
          }}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold" style={{ color: colors.text }}>Membership Growth</h3>
            <span className="text-sm px-3 py-1 rounded-full" 
              style={{ 
                background: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                color: colors.text
              }}>
              +284 this year
            </span>
          </div>
          <div className="h-64 relative">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {[0, 25, 50, 75, 100].map((percent, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-10 text-right text-xs mr-2" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                    {percent === 0 ? '0' : percent === 100 ? '1200' : Math.round(1200 * percent / 100)}
                  </div>
                  <div className="flex-1 h-px" style={{ background: mode === 'dark' ? '#374151' : '#e5e7eb' }}></div>
                </div>
              ))}
            </div>
            
            {/* Growth line */}
            <div className="absolute inset-0 pl-12 pt-4 pr-4 pb-6">
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path 
                  d="M0,80 L20,70 L40,50 L60,40 L80,20 L100,10" 
                  stroke={colors.primary} 
                  strokeWidth="2" 
                  fill="none" 
                  strokeLinecap="round"
                />
                {[0, 20, 40, 60, 80, 100].map((x, i) => (
                  <circle 
                    key={i}
                    cx={x} 
                    cy={i === 0 ? 80 : i === 1 ? 70 : i === 2 ? 50 : i === 3 ? 40 : i === 4 ? 20 : 10} 
                    r="2" 
                    fill={colors.primary} 
                    stroke="#fff" 
                    strokeWidth="1"
                  />
                ))}
              </svg>
            </div>
          </div>
          <div className="flex justify-between mt-2 px-2">
            {membershipGrowth.map((data, index) => (
              <div key={index} className="text-xs" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                {data.month}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Additional Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Popular Classes */}
        <motion.div 
          className="rounded-2xl p-6 border"
          style={{ 
            backgroundColor: colors.card,
            borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-bold mb-6" style={{ color: colors.text }}>Popular Classes</h3>
          <div className="space-y-4">
            {popularClasses.map((classData, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
                    style={{ 
                      background: mode === 'dark' 
                        ? 'rgba(251, 191, 36, 0.2)' 
                        : 'rgba(79, 70, 229, 0.1)',
                      color: colors.primary
                    }}>
                    {index + 1}
                  </div>
                  <div>
                    <div style={{ color: colors.text }}>{classData.name}</div>
                    <div className="text-xs" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                      {classData.participants} participants
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div style={{ color: colors.text }}>₹{classData.revenue.toLocaleString()}</div>
                  <div className="text-xs" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                    revenue
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Equipment Usage */}
        <motion.div 
          className="rounded-2xl p-6 border"
          style={{ 
            backgroundColor: colors.card,
            borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-xl font-bold mb-6" style={{ color: colors.text }}>Equipment Usage</h3>
          <div className="space-y-4">
            {equipmentUsage.map((equipment, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span style={{ color: colors.text }}>{equipment.name}</span>
                  <span style={{ color: colors.text }}>{equipment.usage}%</span>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden"
                  style={{ background: mode === 'dark' ? '#374151' : '#e5e7eb' }}>
                  <motion.div 
                    className="h-full rounded-full"
                    style={{ 
                      background: mode === 'dark' 
                        ? 'linear-gradient(90deg, #fbbf24, #d97706)' 
                        : 'linear-gradient(90deg, #4f46e5, #7c3aed)'
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${equipment.usage}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Reports;