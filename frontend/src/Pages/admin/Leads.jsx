import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaUserPlus, FaFilter, FaFileExport } from 'react-icons/fa';

const Leads = ({ colors, mode }) => {
  const [leads, setLeads] = useState([
    { id: 1, name: 'Rahul Sharma', phone: '+91 9876543210', source: 'Website', status: 'New', date: '2023-10-15' },
    { id: 2, name: 'Priya Patel', phone: '+91 8765432109', source: 'Walk-in', status: 'Contacted', date: '2023-10-14' },
    { id: 3, name: 'Amit Kumar', phone: '+91 7654321098', source: 'Referral', status: 'Follow-up', date: '2023-10-13' },
    { id: 4, name: 'Sneha Singh', phone: '+91 6543210987', source: 'Website', status: 'Converted', date: '2023-10-12' },
    { id: 5, name: 'Vikram Yadav', phone: '+91 5432109876', source: 'Social Media', status: 'New', date: '2023-10-11' },
  ]);

  const [statusFilter, setStatusFilter] = useState('All');
  const [sourceFilter, setSourceFilter] = useState('All');

  const filteredLeads = leads.filter(lead => {
    return (statusFilter === 'All' || lead.status === statusFilter) &&
           (sourceFilter === 'All' || lead.source === sourceFilter);
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'New': return colors.info;
      case 'Contacted': return colors.warning;
      case 'Follow-up': return colors.primary;
      case 'Converted': return colors.success;
      default: return colors.text;
    }
  };

  const updateLeadStatus = (id, newStatus) => {
    setLeads(leads.map(lead => 
      lead.id === id ? { ...lead, status: newStatus } : lead
    ));
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: colors.card }}>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h3 className="text-xl font-bold" style={{ color: colors.text }}>Leads Management</h3>
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
            <FaUserPlus className="mr-2" /> Add Lead
          </motion.button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <div className="flex items-center">
              <FaFilter className="mr-2" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }} />
              <span className="text-sm mr-2" style={{ color: colors.text }}>Filter:</span>
            </div>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border text-sm"
              style={{
                backgroundColor: mode === 'dark' ? '#374151' : '#f9fafb',
                borderColor: mode === 'dark' ? '#4b5563' : '#e5e7eb',
                color: colors.text
              }}
            >
              <option value="All">All Status</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Converted">Converted</option>
            </select>
            <select 
              value={sourceFilter} 
              onChange={(e) => setSourceFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border text-sm"
              style={{
                backgroundColor: mode === 'dark' ? '#374151' : '#f9fafb',
                borderColor: mode === 'dark' ? '#4b5563' : '#e5e7eb',
                color: colors.text
              }}
            >
              <option value="All">All Sources</option>
              <option value="Website">Website</option>
              <option value="Walk-in">Walk-in</option>
              <option value="Referral">Referral</option>
              <option value="Social Media">Social Media</option>
            </select>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-2 rounded-lg flex items-center text-sm"
            style={{
              background: mode === 'dark' ? '#374151' : '#f3f4f6',
              color: colors.text,
              border: `1px solid ${mode === 'dark' ? '#4b5563' : '#e5e7eb'}`
            }}
          >
            <FaFileExport className="mr-2" /> Export
          </motion.button>
        </div>

        {/* Leads Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr style={{ backgroundColor: mode === 'dark' ? '#374151' : '#f3f4f6', color: mode === 'dark'?'white':'black' }}>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Contact</th>
                <th className="py-3 px-4 text-left">Source</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead, index) => (
                <motion.tr 
                  key={lead.id}
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
                  <td className="py-3 px-4 font-medium" style={{ color: colors.text }}>{lead.name}</td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <FaPhone className="mr-1 text-xs" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }} />
                        <span style={{ color: colors.text }}>{lead.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4" style={{ color: colors.text }}>{lead.source}</td>
                  <td className="py-3 px-4" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>{lead.date}</td>
                  <td className="py-3 px-4">
                    <select 
                      value={lead.status} 
                      onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                      className="px-2 py-1 rounded-full text-xs border-0 outline-none"
                      style={{
                        backgroundColor: mode === 'dark' 
                          ? `${getStatusColor(lead.status)}20` 
                          : `${getStatusColor(lead.status)}10`,
                        color: getStatusColor(lead.status),
                        fontWeight: '500'
                      }}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Follow-up">Follow-up</option>
                      <option value="Converted">Converted</option>
                    </select>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        className="p-1 rounded-full"
                        style={{ 
                          backgroundColor: mode === 'dark' ? '#374151' : '#f3f4f6',
                          color: colors.primary
                        }}
                      >
                        <FaPhone size={12} />
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        className="p-1 rounded-full"
                        style={{ 
                          backgroundColor: mode === 'dark' ? '#374151' : '#f3f4f6',
                          color: colors.info
                        }}
                      >
                        <FaEnvelope size={12} />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLeads.length === 0 && (
          <div className="text-center py-8" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
            No leads found with the selected filters.
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Leads;