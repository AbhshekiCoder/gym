import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const RevenueChart = ({ colors, mode }) => {
  const data = [
    { month: 'Jan', revenue: 220000 },
    { month: 'Feb', revenue: 180000 },
    { month: 'Mar', revenue: 200000 },
    { month: 'Apr', revenue: 240000 },
    { month: 'May', revenue: 260000 },
    { month: 'Jun', revenue: 284900 },
    { month: 'Jul', revenue: 275000 },
    { month: 'Aug', revenue: 290000 },
    { month: 'Sep', revenue: 310000 },
    { month: 'Oct', revenue: 295000 },
    { month: 'Nov', revenue: 325000 },
    { month: 'Dec', revenue: 350000 },
  ];

  return (
    <motion.div 
      className="rounded-xl shadow-lg p-6"
      style={{ backgroundColor: colors.card }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold" style={{ color: colors.text }}>Monthly Revenue</h3>
        <div className="flex space-x-2">
          <select className="text-sm rounded-lg px-2 py-1 border" 
            style={{ 
              backgroundColor: mode === 'dark' ? '#374151' : '#f9fafb',
              borderColor: mode === 'dark' ? '#4b5563' : '#e5e7eb',
              color: colors.text
            }}>
            <option>2023</option>
            <option>2022</option>
          </select>
        </div>
      </div>
      
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={mode === 'dark' ? '#374151' : '#e5e7eb'} />
            <XAxis dataKey="month" stroke={mode === 'dark' ? '#9ca3af' : '#6b7280'} />
            <YAxis stroke={mode === 'dark' ? '#9ca3af' : '#6b7280'} tickFormatter={(value) => `₹${value/1000}k`} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: mode === 'dark' ? '#1f2937' : '#fff',
                borderColor: mode === 'dark' ? '#374151' : '#e5e7eb',
                color: colors.text
              }} 
              formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke={mode === 'dark' ? '#fbbf24' : '#4f46e5'} 
              strokeWidth={2}
              activeDot={{ r: 6, fill: mode === 'dark' ? '#d97706' : '#7c3aed' }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default RevenueChart;