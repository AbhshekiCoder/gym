import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaDollarSign } from 'react-icons/fa';
import { payment_fetch } from '../../services/adminService';

const Payments = ({ colors, mode }) => {
  const [payments, setPayments] = useState();
  

  const data = async() =>{
    try{
      const result = await payment_fetch();
      if(result.data.success){
        setPayments(result.data.data)
      }
  

    
  }catch(err){
    console.log(err.message)
  }

  }
  useEffect(()=>{
    data();

  },[])
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: colors.card }}>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h3 className="text-xl font-bold" style={{ color: colors.text }}>Payment Records</h3>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2" 
                style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }} />
              <input
                type="text"
                placeholder="Search payments..."
                className="w-full pl-12 pr-4 py-2 rounded-lg border"
                style={{ 
                  backgroundColor: mode === 'dark' ? '#374151' : '#f9fafb',
                  borderColor: mode === 'dark' ? '#4b5563' : '#e5e7eb',
                  color: colors.text,
                }}
              />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-lg flex items-center text-sm"
              style={{ 
                background: mode === 'dark' 
                  ? 'linear-gradient(90deg, #fbbf24, #d97706)' 
                  : 'linear-gradient(90deg, #4f46e5, #7c3aed)',
                color: mode === 'dark' ? '#1f2937' : '#ffffff'
              }}
            >
              <FaDollarSign className="mr-2" /> Record Payment
            </motion.button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr style={{ backgroundColor: mode === 'dark' ? '#374151' : '#f3f4f6' }}>
                <th className="py-3 px-4 text-left">Payment ID</th>
                <th className="py-3 px-4 text-left">Member</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Amount</th>
                <th className="py-3 px-4 text-left">Method</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments?payments.map((payment, index) => (
                <motion.tr 
                  key={index} 
                  className="hover:opacity-90 transition-opacity"
                  style={{ 
                    borderBottom: `1px solid ${mode === 'dark' ? '#4b5563' : '#e5e7eb'}`,
                    backgroundColor: index % 2 === 0 
                      ? (mode === 'dark' ? 'rgba(31, 41, 55, 0.5)' : 'rgba(249, 250, 251, 0.5)') 
                      : 'transparent'
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <td className="py-3 px-4 font-medium" style={{ color: colors.text }}>{payment._id}</td>
                  <td className="py-3 px-4" style={{ color: colors.text }}>{payment.phone}</td>
                  <td className="py-3 px-4" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>{payment.createdAt}</td>
                  <td className="py-3 px-4 font-bold" style={{ color: colors.primary }}>{payment.plan} </td>
                  <td className="py-3 px-4" style={{ color: colors.text }}>upi</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-xs"
                      style={{ 
                        backgroundColor:mode === 'dark' ? '#10b981' : '#047857'
                          
                      }}
                    >
                      completed
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <motion.button 
                      className="hover:underline text-sm"
                      style={{ color: colors.primary }}
                      whileHover={{ scale: 1.1 }}
                    >
                      Receipt
                    </motion.button>
                  </td>
                </motion.tr>
              )):''}
            </tbody>
          </table>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
          <p className="text-sm" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
            Showing 1 to 5 of 24 payments
          </p>
          <div className="flex gap-2">
            {['Previous', '1', '2', '3', 'Next'].map((label, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg px-3 py-2 text-sm"
                style={{ 
                  background: idx === 1
                    ? (mode === 'dark' 
                        ? 'linear-gradient(90deg, #fbbf24, #d97706)' 
                        : 'linear-gradient(90deg, #4f46e5, #7c3aed)')
                    : (mode === 'dark' ? '#374151' : '#f3f4f6'),
                  color: idx === 1 
                    ? (mode === 'dark' ? '#1f2937' : '#ffffff') 
                    : colors.text
                }}
              >
                {label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Payments;