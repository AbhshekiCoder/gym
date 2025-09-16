import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserPlus, FaEdit, FaTrash, FaEye, FaDumbbell } from 'react-icons/fa';

const Trainers = ({ colors, mode }) => {
  const [trainers, setTrainers] = useState([
    { id: 1, name: 'Ravi Kumar', specialty: 'Strength Training', experience: '5 years', members: 24, status: 'Active' },
    { id: 2, name: 'Priya Sharma', specialty: 'Yoga & Meditation', experience: '7 years', members: 18, status: 'Active' },
    { id: 3, name: 'Aman Singh', specialty: 'Cardio & HIIT', experience: '4 years', members: 15, status: 'Active' },
    { id: 4, name: 'Neha Patel', specialty: 'Zumba & Aerobics', experience: '6 years', members: 22, status: 'On Leave' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    experience: '',
    status: 'Active'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTrainer = {
      id: trainers.length + 1,
      ...formData,
      members: 0
    };
    setTrainers([...trainers, newTrainer]);
    setShowForm(false);
    setFormData({ name: '', specialty: '', experience: '', status: 'Active' });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: colors.card }}>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h3 className="text-xl font-bold" style={{ color: colors.text }}>Trainers Management</h3>
          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-lg flex items-center text-sm"
              style={{
                background: mode === 'dark' ? '#374151' : '#f3f4f6',
                color: colors.text,
                border: `1px solid ${mode === 'dark' ? '#4b5563' : '#e5e7eb'}`
              }}
            >
              <FaDumbbell className="mr-2" /> Assign Classes
            </motion.button>
            <motion.button
              onClick={() => setShowForm(true)}
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
              <FaUserPlus className="mr-2" /> Add Trainer
            </motion.button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr style={{ backgroundColor: mode === 'dark' ? '#374151' : '#f3f4f6', color: mode === 'dark'?'white':'black' }}>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Specialty</th>
                <th className="py-3 px-4 text-left">Experience</th>
                <th className="py-3 px-4 text-left">Members</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {trainers.map((trainer, index) => (
                <motion.tr 
                  key={trainer.id}
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
                  <td className="py-3 px-4 font-medium" style={{ color: colors.text }}>{trainer.name}</td>
                  <td className="py-3 px-4" style={{ color: colors.text }}>{trainer.specialty}</td>
                  <td className="py-3 px-4" style={{ color: colors.text }}>{trainer.experience}</td>
                  <td className="py-3 px-4" style={{ color: colors.text }}>{trainer.members}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-xs"
                      style={{ 
                        backgroundColor: trainer.status === 'Active' 
                          ? (mode === 'dark' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)')
                          : (mode === 'dark' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0.1)'),
                        color: trainer.status === 'Active' 
                          ? (mode === 'dark' ? '#10b981' : '#047857') 
                          : (mode === 'dark' ? '#f59e0b' : '#b45309')
                      }}
                    >
                      {trainer.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <motion.button whileHover={{ scale: 1.1 }} className="text-sm" style={{ color: colors.primary }}>
                        <FaEdit />
                      </motion.button>
                      <motion.button whileHover={{ scale: 1.1 }} className="text-sm" style={{ color: colors.accent }}>
                        <FaTrash />
                      </motion.button>
                      <motion.button whileHover={{ scale: 1.1 }} className="text-sm" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                        <FaEye />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Trainer Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
          <motion.div 
            className="rounded-xl p-6 w-full max-w-md shadow-xl"
            style={{
              backgroundColor: colors.card,
              color: colors.text,
              border: `1px solid ${mode === 'dark' ? '#4b5563' : '#e5e7eb'}`
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h3 className="text-lg mb-4 font-semibold">Add New Trainer</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
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
                <label className="block text-sm font-medium mb-1">Specialty</label>
                <input
                  type="text"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleInputChange}
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
                <label className="block text-sm font-medium mb-1">Experience</label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
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
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border"
                  style={{ 
                    backgroundColor: mode === 'dark' ? '#374151' : '#f9fafb',
                    borderColor: mode === 'dark' ? '#4b5563' : '#e5e7eb',
                    color: colors.text
                  }}
                >
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: mode === 'dark' ? '#374151' : '#f3f4f6',
                    color: colors.text
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-white"
                  style={{
                    background: mode === 'dark' 
                      ? 'linear-gradient(90deg, #fbbf24, #d97706)' 
                      : 'linear-gradient(90deg, #4f46e5, #7c3aed)'
                  }}
                >
                  Add Trainer
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Trainers;