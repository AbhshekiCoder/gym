import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import StatsCard from './StatsCard';
import RecentMembers from './RecentMembers';
import UpcomingClasses from './UpcomingClasses';
import QuickStats from './QuickStats';
import { member_fetch } from '../../services/adminService';

const Dashboard = ({ colors, mode }) => {
  const [recentMembers, setRecentMembers] = useState()
  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const stats = [
    { 
      title: "Total Members", 
      value: "1,284", 
      change: "+12%", 
      iconType: "users",
      gradient: mode === 'dark' 
        ? 'linear-gradient(135deg, #4338ca, #7c3aed)' 
        : 'linear-gradient(135deg, #4f46e5, #818cf8)'
    },
    { 
      title: "Monthly Revenue", 
      value: "₹2,84,900", 
      change: "+8.2%", 
      iconType: "revenue",
      gradient: mode === 'dark' 
        ? 'linear-gradient(135deg, #047857, #10b981)' 
        : 'linear-gradient(135deg, #059669, #34d399)'
    },
    { 
      title: "Avg. Attendance", 
      value: "78%", 
      change: "+5.3%", 
      iconType: "attendance",
      gradient: mode === 'dark' 
        ? 'linear-gradient(135deg, #b45309, #f59e0b)' 
        : 'linear-gradient(135deg, #d97706, #fbbf24)'
    },
    { 
      title: "Classes Today", 
      value: "14", 
      change: "3 full", 
      iconType: "classes",
      gradient: mode === 'dark' 
        ? 'linear-gradient(135deg, #9d174d, #ec4899)' 
        : 'linear-gradient(135deg, #db2777, #f472b6)'
    }
  ];
  
 
  
  const upcomingClasses = [
    { name: "Yoga Flow", time: "9:00 AM", trainer: "Priya", attendees: 12, capacity: 20 },
    { name: "HIIT Blast", time: "11:00 AM", trainer: "Ravi", attendees: 18, capacity: 20 },
    { name: "Strength Training", time: "4:30 PM", trainer: "Aman", attendees: 15, capacity: 20 },
    { name: "Zumba Party", time: "6:00 PM", trainer: "Neha", attendees: 20, capacity: 25 }
  ];

  const data = async() =>{
    const result = await member_fetch();
    if(result.data.success){
      setRecentMembers(result.data.data);
    }
  }
  useEffect(() =>{
    data();
  })
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={stagger}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {stats.map((stat, index) => (
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
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
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