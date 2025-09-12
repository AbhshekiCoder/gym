import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import StatsCard from './StatsCard';
import RecentMembers from './RecentMembers';
import UpcomingClasses from './UpcomingClasses';
import QuickStats from './QuickStats';
import RevenueChart from './RevenueChart';
import MembershipChart from './MembershipChart';
import { member_fetch } from '../../services/adminService';

const Dashboard = ({ colors, mode }) => {
  const [recentMembers, setRecentMembers] = useState([]);
  const [stats, setStats] = useState({
    totalMembers: 0,
    activeMembers: 0,
    monthlyRevenue: 0,
    newLeads: 0
  });

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const upcomingClasses = [
    { name: "Yoga Flow", time: "9:00 AM", trainer: "Priya", attendees: 12, capacity: 20 },
    { name: "HIIT Blast", time: "11:00 AM", trainer: "Ravi", attendees: 18, capacity: 20 },
    { name: "Strength Training", time: "4:30 PM", trainer: "Aman", attendees: 15, capacity: 20 },
    { name: "Zumba Party", time: "6:00 PM", trainer: "Neha", attendees: 20, capacity: 25 }
  ];

  const statsData = [
    { 
      title: "Total Members", 
      value: stats.totalMembers, 
      change: "+12%", 
      iconType: "users",
      gradient: mode === 'dark' 
        ? 'linear-gradient(135deg, #4338ca, #7c3aed)' 
        : 'linear-gradient(135deg, #4f46e5, #818cf8)'
    },
    { 
      title: "Active Members", 
      value: stats.activeMembers, 
      change: "+8.2%", 
      iconType: "activeUsers",
      gradient: mode === 'dark' 
        ? 'linear-gradient(135deg, #047857, #10b981)' 
        : 'linear-gradient(135deg, #059669, #34d399)'
    },
    { 
      title: "Monthly Revenue", 
      value: `₹${stats.monthlyRevenue.toLocaleString()}`, 
      change: "+5.3%", 
      iconType: "revenue",
      gradient: mode === 'dark' 
        ? 'linear-gradient(135deg, #b45309, #f59e0b)' 
        : 'linear-gradient(135deg, #d97706, #fbbf24)'
    },
    { 
      title: "New Leads", 
      value: stats.newLeads, 
      change: "+15%", 
      iconType: "leads",
      gradient: mode === 'dark' 
        ? 'linear-gradient(135deg, #9d174d, #ec4899)' 
        : 'linear-gradient(135deg, #db2777, #f472b6)'
    }
  ];

  const data = async() => {
    const result = await member_fetch();
    if(result.data.success){
      setRecentMembers(result.data.data);
      // Calculate stats from the data
      setStats({
        totalMembers: result.data.data.length,
        activeMembers: result.data.data.filter(m => m.membership === 'Active').length,
        monthlyRevenue: 284900, // This would come from your API
        newLeads: 24 // This would come from your API
      });
    }
  };
  
  useEffect(() => {
    data();
  }, []);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={stagger}
      className="space-y-6"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statsData.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            iconType={stat.iconType}
            gradient={stat.gradient}
            colors={colors}
            mode={mode}
            index={index}
          />
        ))}
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart colors={colors} mode={mode} />
        <MembershipChart colors={colors} mode={mode} />
      </div>
      
      {/* Members and Classes Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentMembers 
          colors={colors} 
          mode={mode} 
          recentMembers={recentMembers} 
        />
        <UpcomingClasses 
          colors={colors} 
          mode={mode} 
          upcomingClasses={upcomingClasses} 
        />
      </div>
      
      <QuickStats colors={colors} mode={mode} />
    </motion.div>
  );
};

export default Dashboard;