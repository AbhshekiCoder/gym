import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import Sidebar from './admin/Sidebar';
import Header from './admin/Header';
import Dashboard from './admin/Dashboard';
import Members from './admin/Members';
import Classes from './admin/Classes';
import Payments from './admin/Payments';
import Reports from './admin/Reports';
import Challenges from './admin/Challenges';
import Settings from './admin/Settings';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const mode = useSelector((state) => state.mode.value);
  const user = useSelector((state) => state.user.value);

  const colors = {
    primary: mode === 'dark' ? '#fbbf24' : '#4f46e5',
    secondary: mode === 'dark' ? '#d97706' : '#7c3aed',
    text: mode === 'dark' ? '#f3f4f6' : '#1f2937',
    bg: mode === 'dark' ? '#111827' : '#f9fafb',
    card: mode === 'dark' ? '#1f2937' : '#ffffff',
    accent: mode === 'dark' ? '#ef4444' : '#dc2626'
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard colors={colors} mode={mode} />;
      case 'members':
        return <Members colors={colors} mode={mode} />;
      case 'classes':
        return <Classes colors={colors} mode={mode} />;
      case 'payments':
        return <Payments colors={colors} mode={mode} />;
      case 'reports':
        return <Reports colors={colors} mode={mode} />;
      case 'challenges':
        return <Challenges colors={colors} mode={mode} />;
      case 'settings':
        return <Settings colors={colors} mode={mode} user={user} />;
      default:
        return <Dashboard colors={colors} mode={mode} />;
    }
  };

  return (
    <div 
      className="flex min-h-screen"
      style={{ 
        background: mode === 'dark' 
          ? 'linear-gradient(135deg, #111827, #1f2937, #111827)' 
          : 'linear-gradient(135deg, #f0f9ff, #e0e7ff, #f0f9ff)'
      }}
    >
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        mode={mode} 
        colors={colors} 
      />
      
      <div className="flex-1 flex flex-col">
        <Header 
          activeTab={activeTab} 
          mode={mode} 
          colors={colors} 
          user={user} 
        />
        
        <motion.div 
          className="flex-1 p-4 sm:p-6 overflow-y-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;