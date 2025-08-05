import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser } from 'react-icons/fa';

const Settings = ({ colors, mode, user }) => {
  const [settings, setSettings] = useState({
    gymName: 'GymX Fitness',
    openingTime: '06:00',
    closingTime: '22:00',
    membershipFee: 2500,
    maxClassCapacity: 25
  });

  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const saveSettings = (e) => {
    e.preventDefault();
    alert('Settings saved successfully!');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      {/* Gym Settings */}
      <motion.div 
        className="rounded-xl shadow-lg p-6"
        style={{ backgroundColor: colors.card }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h3 className="text-xl font-bold mb-6" style={{ color: colors.text }}>Gym Settings</h3>
        
        <form onSubmit={saveSettings}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Gym Name</label>
            <input
              type="text"
              name="gymName"
              value={settings.gymName}
              onChange={handleSettingsChange}
              className="w-full px-4 py-2 rounded-lg border"
              style={{ 
                backgroundColor: mode === 'dark' ? '#374151' : '#f9fafb',
                borderColor: mode === 'dark' ? '#4b5563' : '#e5e7eb',
                color: colors.text
              }}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Opening Time</label>
              <input
                type="time"
                name="openingTime"
                value={settings.openingTime}
                onChange={handleSettingsChange}
                className="w-full px-4 py-2 rounded-lg border"
                style={{ 
                  backgroundColor: mode === 'dark' ? '#374151' : '#f9fafb',
                  borderColor: mode === 'dark' ? '#4b5563' : '#e5e7eb',
                  color: colors.text
                }}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Closing Time</label>
              <input
                type="time"
                name="closingTime"
                value={settings.closingTime}
                onChange={handleSettingsChange}
                className="w-full px-4 py-2 rounded-lg border"
                style={{ 
                  backgroundColor: mode === 'dark' ? '#374151' : '#f9fafb',
                  borderColor: mode === 'dark' ? '#4b5563' : '#e5e7eb',
                  color: colors.text
                }}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Monthly Membership Fee (₹)</label>
              <input
                type="number"
                name="membershipFee"
                value={settings.membershipFee}
                onChange={handleSettingsChange}
                className="w-full px-4 py-2 rounded-lg border"
                style={{ 
                  backgroundColor: mode === 'dark' ? '#374151' : '#f9fafb',
                  borderColor: mode === 'dark' ? '#4b5563' : '#e5e7eb',
                  color: colors.text
                }}
                min="0"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Max Class Capacity</label>
              <input
                type="number"
                name="maxClassCapacity"
                value={settings.maxClassCapacity}
                onChange={handleSettingsChange}
                className="w-full px-4 py-2 rounded-lg border"
                style={{ 
                  backgroundColor: mode === 'dark' ? '#374151' : '#f9fafb',
                  borderColor: mode === 'dark' ? '#4b5563' : '#e5e7eb',
                  color: colors.text
                }}
                min="5"
                max="50"
                required
              />
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-lg font-medium"
            style={{ 
              background: mode === 'dark' 
                ? 'linear-gradient(90deg, #fbbf24, #d97706)' 
                : 'linear-gradient(90deg, #4f46e5, #7c3aed)',
              color: mode === 'dark' ? '#1f2937' : '#ffffff'
            }}
            type="submit"
          >
            Save Settings
          </motion.button>
        </form>
      </motion.div>
      
      {/* Admin Profile */}
      <motion.div 
        className="rounded-xl shadow-lg p-6"
        style={{ backgroundColor: colors.card }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h3 className="text-xl font-bold mb-6" style={{ color: colors.text }}>Admin Profile</h3>
        
        <div className="flex flex-col items-center mb-6">
          <motion.div 
            className="w-24 h-24 rounded-full flex items-center justify-center mb-4"
            style={{ 
              background: mode === 'dark' 
                ? 'linear-gradient(90deg, #fbbf24, #d97706)' 
                : 'linear-gradient(90deg, #4f46e5, #7c3aed)'
            }}
            whileHover={{ rotate: 10 }}
          >
            <FaUser className="text-white text-3xl" />
          </motion.div>
          <h4 className="text-lg font-bold" style={{ color: colors.text }}>{user?.name || ''}</h4>
          <p className="text-sm" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>Administrator</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>Email Address</label>
            <div className="px-4 py-2 rounded-lg" style={{ 
                backgroundColor: mode === 'dark' ? '#374151' : '#f9fafb',
                color: mode === 'dark' ? '#9ca3af' : '#6b7280'
              }}>
              {user?.email || ''}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>Role</label>
            <div className="px-4 py-2 rounded-lg" style={{ 
                backgroundColor: mode === 'dark' ? '#374151' : '#f9fafb',
                color: mode === 'dark' ? '#9ca3af' : '#6b7280'
              }}>
              Super Administrator
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>Last Login</label>
            <div className="px-4 py-2 rounded-lg" style={{ 
                backgroundColor: mode === 'dark' ? '#374151' : '#f9fafb',
                color: mode === 'dark' ? '#9ca3af' : '#6b7280'
              }}>
              Today at 09:24 AM
            </div>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 rounded-lg font-medium mt-6"
          style={{ 
            background: mode === 'dark' ? '#374151' : '#f3f4f6',
            color: colors.text,
            border: `1px solid ${mode === 'dark' ? '#4b5563' : '#e5e7eb'}`
          }}
        >
          Change Password
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Settings;