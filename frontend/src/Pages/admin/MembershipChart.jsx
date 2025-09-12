import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const MembershipChart = ({ colors, mode }) => {
  const data = [
    { name: 'Active', value: 75 },
    { name: 'Expired', value: 15 },
    { name: 'Pending', value: 10 },
  ];

  const COLORS = ['#10b981', '#ef4444', '#f59e0b'];

  return (
    <motion.div 
      className="rounded-xl shadow-lg p-6"
      style={{ backgroundColor: colors.card }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold" style={{ color: colors.text }}>Membership Status</h3>
        <div className="text-sm" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
          Total: 284
        </div>
      </div>
      
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: mode === 'dark' ? '#1f2937' : '#fff',
                borderColor: mode === 'dark' ? '#374151' : '#e5e7eb',
                color: colors.text
              }} 
              formatter={(value) => [`${value} members`, '']}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default MembershipChart;