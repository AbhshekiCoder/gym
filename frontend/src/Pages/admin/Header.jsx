import React, { useState } from 'react';
import { hover, motion } from 'framer-motion';
import { FaBell, FaUser, FaEllipsisV, FaSearch, FaBars } from 'react-icons/fa';

const Header = ({ activeTab, mode, colors, user, sidebarCollapsed, setSidebarCollapsed }) => {
  const [notificationCount] = useState(5);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifications = [
    { id: 1, title: 'Membership Expiry', message: '3 memberships expiring today', time: '10 mins ago', read: false },
    { id: 2, title: 'New Lead', message: 'Rahul Sharma inquired about membership', time: '30 mins ago', read: false },
    { id: 3, title: 'Payment Received', message: 'Payment of ₹2,500 received from Priya', time: '1 hour ago', read: true },
  ];

  return (
    <motion.header 
      className="shadow-sm p-4 flex items-center justify-between sticky top-0 z-30"
      style={{ 
        backgroundColor: colors.card,
        borderBottom: `1px solid ${mode === 'dark' ? '#374151' : '#e5e7eb'}`
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center">
        <motion.button 
          className="p-2 rounded-lg mr-4"
          style={{ background: mode === 'dark' ? '#374151' : '#f3f4f6' }}
          whileHover={{ rotate: 90 }}
          transition={{ duration: 0.3 }}
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          <FaBars style={{ color: colors.text }} />
        </motion.button>
        <h2 className="text-xl font-bold capitalize" style={{ color: colors.text }}>
          {activeTab}
        </h2>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2"
              style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }} />
            <input
              type="text"
              placeholder="Search..."
              className="pl-12 pr-4 py-2 rounded-lg border focus:ring-2 focus:border-transparent w-64"
              style={{
                backgroundColor: mode === 'dark' ? '#374151' : '#f9fafb',
                borderColor: mode === 'dark' ? '#4b5563' : '#e5e7eb',
                color: colors.text
              }}
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <motion.button 
              className="p-2 rounded-full relative"
              style={{ background: mode === 'dark' ? '#374151' : '#f3f4f6' }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <FaBell style={{ color: colors.text }} />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 text-xs rounded-full w-5 h-5 flex items-center justify-center text-white"
                  style={{ backgroundColor: colors.accent }}>
                  {notificationCount}
                </span>
              )}
            </motion.button>
            
            {showNotifications && (
              <motion.div 
                className={`absolute ${mode === "dark"?'bg-[#4b5563]':'bg-[#e5e7eb]'} right-0 mt-2 w-80  rounded-lg shadow-xl z-40 borde`}
                style={{ borderColor: mode === 'dark' ? '#4b5563' : '#e5e7eb' }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="p-4 border-b" style={{ borderColor: mode === 'dark' ? '#4b5563' : '#e5e7eb' }}>
                  <h3 className="font-semibold" style={{ color: colors.text }}>Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div key={notif.id} className={`p-4 border-b ${!notif.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`} 
                      style={{ borderColor: mode === 'dark' ? '#4b5563' : '#e5e7eb' }}>
                      <h4 className="font-medium" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280'  }}>{notif.title}</h4>
                      <p className="text-sm mt-1" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>{notif.message}</p>
                      <p className="text-xs mt-2" style={{ color: mode === 'dark' ? '#6b7280' : '#9ca3af' }}>{notif.time}</p>
                    </div>
                  ))}
                </div>
                <div className="p-2 text-center">
                  <button className="text-sm" style={{ color: colors.primary }}>View All</button>
                </div>
              </motion.div>
            )}
          </div>
          
          <div className="relative">
            <motion.button 
              className="flex items-center space-x-2 p-2 rounded-lg"
              style={{ background: mode === 'dark' ? '#374151' : '#f3f4f6' }}
              whileHover={{ backgroundColor: mode === 'dark' ? '#4b5563' : '#e5e7eb' }}
              onClick={() => setShowProfile(!showProfile)}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2"
                style={{ 
                  background: mode === 'dark' 
                    ? 'linear-gradient(90deg, #fbbf24, #d97706)' 
                    : 'linear-gradient(90deg, #4f46e5, #7c3aed)'
                }}
              >
                <FaUser className="text-white text-sm" />
              </div>
              {!sidebarCollapsed && (
                <div className="hidden md:block">
                  <p className="font-medium text-sm" style={{ color: colors.text }}>{user?.name || 'Admin'}</p>
                  <p className="text-xs" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                    {user?.email || 'admin@gymx.com'}
                  </p>
                </div>
              )}
            </motion.button>
            
            {showProfile && (
              <motion.div 
                className="absolute right-0 mt-2 w-48 rounded-lg shadow-xl z-40 border py-2"
                style={{ borderColor: mode === 'dark' ? '#4b5563' : '#e5e7eb', backgroundColor:  mode === 'dark' ? '#4b5563' : '#e5e7eb'}}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <button className={`block w-full text-left px-4 py-2 text-sm hover:text-gray-700  hover:bg-gray-100 dark:hover:bg-gray-700`}
                  style={{ color: colors.text }}>
                  Profile
                </button>
                <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700" 
                  style={{ color: colors.text }}>
                  Settings
                </button>
                <div className="border-t my-1" style={{ borderColor: mode === 'dark' ? '#4b5563' : '#e5e7eb' }}></div>
                <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700" 
                  style={{ color: colors.text }}>
                  Logout
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;