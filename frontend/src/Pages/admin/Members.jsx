import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserPlus, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { member_fetch, membersCreate } from '../../services/adminService';
import { Message } from 'rsuite';

const Members = ({ colors, mode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [planFilter, setPlanFilter] = useState('All Plans');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [members, setMembers] = useState();
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [viewIndex, setViewIndex] = useState(null);
  const [message, setMessage] = useState();
  const [showMessage, setShowMessage] = useState(false);
  const [type, setType] = useState();

const slide = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5 }
};
 const [formData, setFormData] = useState({ 
    name: '', 
    plan: 'Monthly', 
    membership: 'Active', // Changed from status to membership
    joined: new Date().toISOString().split('T')[0] // Default to current date
  });

  useEffect(() => {
    getMembers()
  }, [])

  const getMembers = async() => {
    const result = await member_fetch();
    if(result.data.success){
      setMembers(result.data.data)
    }
  }

  const openAddForm = () => {
    setEditIndex(null);
    setFormData({ 
      name: '', 
      plan: 'Monthly', 
      membership: 'Active',
      joined: new Date().toISOString().split('T')[0] // Reset to current date
    });
    setShowForm(true);
  };

  const openEditForm = (index) => {
    setEditIndex(index);
    setFormData(members[index]);
    setShowForm(true);
  };

  const openView = (index) => {
    setViewIndex(index);
  };

  const closeModals = () => {
    setShowForm(false);
    setViewIndex(null);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const result = await membersCreate(formData);
      if(result.data.success){
       
        if(editIndex !== null){
        
        }
        setShowForm(false);
        setType('success');
        setMessage(editIndex !== null ? "Member updated successfully" : "Member created successfully");
        setShowMessage(true);
        setTimeout(() =>{
          setShowMessage(false)

        },2000)
      }
    } catch(err) {
      if(err.response?.data){

         setType('warning');
        setMessage(err.response.data.error);
        setShowMessage(true);
        setTimeout(() =>{
          setShowMessage(false)

        },2000)
      }
    }
  };

  // Fixed filter with optional chaining and consistent field names
  const filteredMembers = members?.filter((m) => {
    return (
      (planFilter === 'All Plans' || m.plan === planFilter) &&
      (statusFilter === 'All Status' || m.membership === statusFilter) &&
      m.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }) || [];

    useEffect(() =>{
    getMembers()

  },[])
  


 
  
    


  

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
       {/* Message Notification */}
            {showMessage && (
              <motion.div
                className="fixed top-4 right-4 z-50"
                {...slide}
              >
                <Message showIcon type={type} className="w-fit">
                  {message}
                </Message>
              </motion.div>
            )}
      <div className="rounded-xl shadow-lg p-4 sm:p-6" style={{ backgroundColor: colors.card }}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 gap-4">
          <h3 className="text-lg sm:text-xl font-bold" style={{ color: colors.text }}>Members Management</h3>
          <motion.button
            onClick={openAddForm}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-lg flex items-center text-sm sm:text-base"
            style={{
              background: mode === 'dark'
                ? 'linear-gradient(90deg, #fbbf24, #d97706)'
                : 'linear-gradient(90deg, #4f46e5, #7c3aed)',
              color: mode === 'dark' ? '#1f2937' : '#ffffff'
            }}
          >
            <FaUserPlus className="mr-2" /> Add Member
          </motion.button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-4 sm:mb-6 gap-4">
          <div className="relative w-full">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2"
              style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }} />
            <input
              type="text"
              placeholder="Search members..."
              className="w-full pl-12 pr-4 py-2 sm:py-3 rounded-lg border focus:ring-2 focus:border-transparent"
              style={{
                backgroundColor: mode === 'dark' ? '#374151' : '#f9fafb',
                borderColor: mode === 'dark' ? '#4b5563' : '#e5e7eb',
                color: colors.text
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <select className="rounded-lg px-4 py-2 border text-sm" value={planFilter} onChange={(e) => setPlanFilter(e.target.value)}
              style={{
                backgroundColor: mode === 'dark' ? '#374151' : '#f9fafb',
                borderColor: mode === 'dark' ? '#4b5563' : '#e5e7eb',
                color: colors.text
              }}>
              <option>All Plans</option><option>Monthly</option><option>Quarterly</option><option>Yearly</option>
            </select>
            <select className="rounded-lg px-4 py-2 border text-sm" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                backgroundColor: mode === 'dark' ? '#374151' : '#f9fafb',
                borderColor: mode === 'dark' ? '#4b5563' : '#e5e7eb',
                color: colors.text
              }}>
              <option>All Status</option><option>Active</option><option>Pending</option><option>Expired</option>
            </select>
          </div>
        </div>

        {/* Members Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr style={{ backgroundColor: mode === 'dark' ? '#374151' : '#f3f4f6' }}>
                {['Member', 'Plan', 'Join Date', 'Status', 'Actions'].map((head, i) => (
                  <th key={i} className="py-3 px-4 text-left text-sm sm:text-base" style={{ color: colors.text }}>{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredMembers?filteredMembers.map((member, index) => (
                <motion.tr key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:opacity-90 transition-opacity"
                  style={{
                    borderBottom: `1px solid ${mode === 'dark' ? '#4b5563' : '#e5e7eb'}`,
                    backgroundColor: index % 2 === 0
                      ? (mode === 'dark' ? 'rgba(31, 41, 55, 0.5)' : 'rgba(249, 250, 251, 0.5)')
                      : 'transparent'
                  }}
                >
                  <td className="py-3 px-4" style={{ color: colors.text }}>{member.name}</td>
                  <td className="py-3 px-4" style={{ color: colors.text }}>{member.plan}</td>
                  <td className="py-3 px-4" style={{ color: colors.text }}>{member.joined?member.joined:''}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-xs"
                      style={{
                        backgroundColor: member.membership === 'Active'
                          ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                        color: member.membership === 'Active'
                          ? '#10b981' : '#f59e0b'
                      }}>{member.membership}</span>
                  </td>
                  <td className="py-3 px-4 flex gap-3">
                    <motion.button onClick={() => openEditForm(index)} whileHover={{ scale: 1.05 }} className="text-sm" style={{ color: colors.primary }}>Edit</motion.button>
                    <motion.button onClick={() => openView(index)} whileHover={{ scale: 1.05 }} className="text-sm" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>View</motion.button>
                  </td>
                </motion.tr>
              )):'No members found'}
            </tbody>
          </table>
        </div>

        {/* Add/Edit Modal */}
      {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div
              className="rounded-xl p-6 w-96 shadow-xl"
              style={{
                backgroundColor: colors.card,
                color: colors.text,
                border: `1px solid ${mode === 'dark' ? '#4b5563' : '#e5e7eb'}`
              }}
            >
              <h3 className="text-lg mb-4 font-semibold">
                {editIndex !== null ? 'Edit Member' : 'Add Member'}
              </h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="px-4 py-2 rounded-md border focus:outline-none"
                  style={{
                    backgroundColor: mode === 'dark' ? '#1f2937' : '#f9fafb',
                    color: colors.text,
                    borderColor: mode === 'dark' ? '#4b5563' : '#d1d5db'
                  }}
                />
                
                {/* Joined Date Input */}
                <div>
                  <label className="block text-sm mb-1">Join Date</label>
                  <input
                    type="date"
                    required
                    value={formData.joined}
                    onChange={(e) => setFormData({ ...formData, joined: e.target.value })}
                    className="w-full px-4 py-2 rounded-md border focus:outline-none"
                    style={{
                      backgroundColor: mode === 'dark' ? '#1f2937' : '#f9fafb',
                      color: colors.text,
                      borderColor: mode === 'dark' ? '#4b5563' : '#d1d5db'
                    }}
                  />
                </div>
                
                <select
                  value={formData.plan}
                  onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                  className="px-4 py-2 rounded-md border focus:outline-none"
                  style={{
                    backgroundColor: mode === 'dark' ? '#1f2937' : '#f9fafb',
                    color: colors.text,
                    borderColor: mode === 'dark' ? '#4b5563' : '#d1d5db'
                  }}
                >
                  <option>Monthly</option>
                  <option>Quarterly</option>
                  <option>Yearly</option>
                </select>
                
                {/* Changed from status to membership */}
                <select
                  value={formData.membership}
                  onChange={(e) => setFormData({ ...formData, membership: e.target.value })}
                  className="px-4 py-2 rounded-md border focus:outline-none"
                  style={{
                    backgroundColor: mode === 'dark' ? '#1f2937' : '#f9fafb',
                    color: colors.text,
                    borderColor: mode === 'dark' ? '#4b5563' : '#d1d5db'
                  }}
                >
                  <option>Active</option>
                  <option>Pending</option>
                  <option>Expired</option>
                </select>
                
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={closeModals}
                    className="px-4 py-2 rounded-md"
                    style={{
                      backgroundColor: mode === 'dark' ? '#4b5563' : '#d1d5db',
                      color: mode === 'dark' ? '#f9fafb' : '#111827'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-md"
                    style={{
                      background: mode === 'dark'
                        ? 'linear-gradient(90deg, #fbbf24, #d97706)'
                        : 'linear-gradient(90deg, #4f46e5, #7c3aed)',
                      color: mode === 'dark' ? '#1f2937' : '#ffffff'
                    }}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}


        {/* View Modal */}
     {viewIndex !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div
              className="rounded-xl p-6 w-96 shadow-xl"
              style={{
                backgroundColor: colors.card,
                color: colors.text,
                border: `1px solid ${mode === 'dark' ? '#4b5563' : '#e5e7eb'}`
              }}
            >
              <h3 className="text-lg mb-4 font-semibold">View Member</h3>
              <p><strong>Name:</strong> {members[viewIndex]?.name}</p>
              <p><strong>Plan:</strong> {members[viewIndex]?.plan}</p>
              {/* Updated to membership */}
              <p><strong>Status:</strong> {members[viewIndex]?.membership}</p>
              <p><strong>Joined:</strong> {members[viewIndex]?.joined}</p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={closeModals}
                  className="px-4 py-2 rounded-md"
                  style={{
                    background: mode === 'dark'
                      ? 'linear-gradient(90deg, #fbbf24, #d97706)'
                      : 'linear-gradient(90deg, #4f46e5, #7c3aed)',
                    color: mode === 'dark' ? '#1f2937' : '#ffffff'
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}


      </div>
    </motion.div>
  );
};

export default Members;
