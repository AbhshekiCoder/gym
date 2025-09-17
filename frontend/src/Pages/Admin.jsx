import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { 
  FaChartBar, FaUsers, FaCalendarAlt, FaDollarSign, 
  FaClipboardList, FaTrophy, FaCog, FaSignOutAlt, 
  FaDumbbell, FaBell, FaUser, FaEllipsisV, FaSearch,
  FaUserPlus, FaFileExport, FaFilter, FaSync
} from 'react-icons/fa';
import Sidebar from './admin/Sidebar';
import Header from './admin/Header';
import Dashboard from './admin/Dashboard';
import Members from './admin/Members';
import Classes from './admin/Classes';
import Payments from './admin/Payments';
import Reports from './admin/Reports';
import Challenges from './admin/Challenges';
import Settings from './admin/Settings';
import Trainers from './admin/Trainers';
import Leads from './admin/Leads';
import WebsiteContent from './admin/WebsiteContent';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const mode = useSelector((state) => state.mode.value);
  const user = useSelector((state) => state.user.value);

  const colors = {
    primary: mode === 'dark' ? '#fbbf24' : '#4f46e5',
    secondary: mode === 'dark' ? '#d97706' : '#7c3aed',
    text: mode === 'dark' ? '#f3f4f6' : '#6b7280',
    bg: mode === 'dark' ? '#111827' : '#f9fafb',
    card: mode === 'dark' ? '#1f2937' : '#ffffff',
    accent: mode === 'dark' ? '#ef4444' : '#dc2626',
    success: mode === 'dark' ? '#10b981' : '#059669',
    warning: mode === 'dark' ? '#f59e0b' : '#d97706',
    info: mode === 'dark' ? '#3b82f6' : '#2563eb'
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard colors={colors} mode={mode} />;
      case 'members':
        return <Members colors={colors} mode={mode} />;
      case 'trainers':
        return <Trainers colors={colors} mode={mode} />;
      case 'classes':
        return <Classes colors={colors} mode={mode} />;
      case 'payments':
        return <Payments colors={colors} mode={mode} />;
      case 'reports':
        return <Reports colors={colors} mode={mode} />;
      case 'challenges':
        return <Challenges colors={colors} mode={mode} />;
      case 'leads':
        return <Leads colors={colors} mode={mode} />;
      case 'settings':
        return <Settings colors={colors} mode={mode} user={user} />;
      case 'websitecontent':
        return <WebsiteContent colors={colors} mode={mode} />;
      default:
        return <Dashboard colors={colors} mode={mode} />;
    }
  };

  return (
    <div 
      className="flex min-h-screen transition-all duration-300"
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
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Header 
          activeTab={activeTab} 
          mode={mode} 
          colors={colors} 
          user={user} 
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
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