import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaArrowRight } from 'react-icons/fa';

const Challenges = ({ colors, mode }) => {
  const [challengeForm, setChallengeForm] = useState({
    title: '',
    startDate: '',
    endDate: '',
    goal: '',
    reward: ''
  });

  const [challenges, setChallenges] = useState([
    { title: "30-Day Fitness Challenge", participants: 84, startDate: '2023-10-01', endDate: '2023-10-30', status: 'Active', goal: "Workout daily", reward: "Free membership" },
    { title: "Weight Loss Transformation", participants: 42, startDate: '2023-09-15', endDate: '2023-11-15', status: 'Active', goal: "Lose 5kg", reward: "Cash Prize" },
    { title: "Summer Body Challenge", participants: 65, startDate: '2023-08-01', endDate: '2023-08-31', status: 'Completed', goal: "Body transformation", reward: "Gift Hamper" },
    { title: "Pushup Challenge", participants: 120, startDate: '2023-07-01', endDate: '2023-07-31', status: 'Completed', goal: "100 pushups/day", reward: "T-shirt" }
  ]);

  const [viewChallenge, setViewChallenge] = useState(null);

  const handleChallengeChange = (e) => {
    const { name, value } = e.target;
    setChallengeForm(prev => ({ ...prev, [name]: value }));
  };

  const submitChallenge = (e) => {
    e.preventDefault();
    setChallenges(prev => [
      ...prev,
      {
        ...challengeForm,
        participants: 0,
        status: 'Active'
      }
    ]);
    setChallengeForm({ title: '', startDate: '', endDate: '', goal: '', reward: '' });
  };

  const endChallenge = (index) => {
    const updated = [...challenges];
    updated[index].status = 'Completed';
    setChallenges(updated);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      {/* Form (Always Visible) */}
      <motion.div 
        className="rounded-xl shadow-lg p-6"
        style={{ backgroundColor: colors.card }}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        <h3 className="text-xl font-bold mb-6" style={{ color: colors.text }}>Create New Challenge</h3>
        <form onSubmit={submitChallenge}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Challenge Title</label>
            <input
              type="text"
              name="title"
              value={challengeForm.title}
              onChange={handleChallengeChange}
              className="w-full px-4 py-2 rounded-lg border"
              style={{ 
                backgroundColor: mode === 'dark' ? '#374151' : '#f9fafb',
                borderColor: mode === 'dark' ? '#4b5563' : '#e5e7eb',
                color: colors.text
              }}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={challengeForm.startDate}
                onChange={handleChallengeChange}
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
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>End Date</label>
              <input
                type="date"
                name="endDate"
                value={challengeForm.endDate}
                onChange={handleChallengeChange}
                className="w-full px-4 py-2 rounded-lg border"
                style={{ 
                  backgroundColor: mode === 'dark' ? '#374151' : '#f9fafb',
                  borderColor: mode === 'dark' ? '#4b5563' : '#e5e7eb',
                  color: colors.text
                }}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Goal Description</label>
            <textarea
              name="goal"
              value={challengeForm.goal}
              onChange={handleChallengeChange}
              className="w-full px-4 py-2 rounded-lg border"
              style={{ 
                backgroundColor: mode === 'dark' ? '#374151' : '#f9fafb',
                borderColor: mode === 'dark' ? '#4b5563' : '#e5e7eb',
                color: colors.text
              }}
              rows="2"
              required
            ></textarea>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Reward/Prize</label>
            <input
              type="text"
              name="reward"
              value={challengeForm.reward}
              onChange={handleChallengeChange}
              className="w-full px-4 py-2 rounded-lg border"
              style={{ 
                backgroundColor: mode === 'dark' ? '#374151' : '#f9fafb',
                borderColor: mode === 'dark' ? '#4b5563' : '#e5e7eb',
                color: colors.text
              }}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-lg font-medium"
            style={{ 
              background: mode === 'dark' 
                ? 'linear-gradient(90deg, #fbbf24, #d97706)' 
                : 'linear-gradient(90deg, #4f46e5, #7c3aed)',
              color: mode === 'dark' ? '#1f2937' : '#ffffff'
            }}
            type="submit"
          >
            Create Challenge
          </motion.button>
        </form>
      </motion.div>

      {/* Active Challenges */}
      <motion.div 
        className="rounded-xl shadow-lg p-6"
        style={{ backgroundColor: colors.card }}
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold" style={{ color: colors.text }}>Active Challenges</h3>
          <motion.button 
            className="text-sm font-medium flex items-center"
            style={{ color: colors.primary }}
            whileHover={{ x: 5 }}
          >
            View All <FaArrowRight className="ml-2 text-xs" />
          </motion.button>
        </div>

        <div className="space-y-4">
          {challenges.map((challenge, index) => (
            <motion.div
              key={index}
              className="p-4 rounded-lg"
              style={{
                backgroundColor: mode === 'dark' ? '#374151' : '#f9fafb',
                borderLeft: `4px solid ${challenge.status === 'Active' ? colors.primary : colors.secondary}`
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-lg" style={{ color: colors.text }}>{challenge.title}</h4>
                  <p className="text-sm mt-1" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                    {challenge.startDate} to {challenge.endDate}
                  </p>
                  <div className="flex items-center mt-3">
                    <FaUsers className="mr-2" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }} />
                    <span className="text-sm" style={{ color: colors.text }}>{challenge.participants} participants</span>
                  </div>
                </div>
                <span className="px-2 py-1 rounded-full text-xs"
                  style={{
                    backgroundColor: challenge.status === 'Active'
                      ? (mode === 'dark' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)')
                      : (mode === 'dark' ? 'rgba(107, 114, 128, 0.2)' : 'rgba(107, 114, 128, 0.1)'),
                    color: challenge.status === 'Active'
                      ? (mode === 'dark' ? '#10b981' : '#047857')
                      : (mode === 'dark' ? '#9ca3af' : '#6b7280')
                  }}
                >
                  {challenge.status}
                </span>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                  Ends on: {challenge.endDate}
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="text-sm px-3 py-1 rounded"
                    style={{
                      backgroundColor: mode === 'dark' ? '#1f2937' : '#e5e7ff',
                      color: colors.primary
                    }}
                    onClick={() => setViewChallenge(challenge)}
                  >
                    View
                  </motion.button>
                  {challenge.status === 'Active' && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="text-sm px-3 py-1 rounded"
                      style={{
                        backgroundColor: mode === 'dark' ? '#1f2937' : '#fde68a',
                        color: colors.accent
                      }}
                      onClick={() => endChallenge(index)}
                    >
                      End
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* View Modal */}
      {viewChallenge && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="rounded-xl p-6 w-96 shadow-xl"
            style={{
              backgroundColor: colors.card,
              color: colors.text,
              border: `1px solid ${mode === 'dark' ? '#4b5563' : '#e5e7eb'}`
            }}
          >
            <h3 className="text-lg mb-4 font-semibold">Challenge Details</h3>
            <p><strong>Title:</strong> {viewChallenge.title}</p>
            <p><strong>Dates:</strong> {viewChallenge.startDate} to {viewChallenge.endDate}</p>
            <p><strong>Status:</strong> {viewChallenge.status}</p>
            <p><strong>Participants:</strong> {viewChallenge.participants}</p>
            <p><strong>Goal:</strong> {viewChallenge.goal}</p>
            <p><strong>Reward:</strong> {viewChallenge.reward}</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setViewChallenge(null)}
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
    </motion.div>
  );
};

export default Challenges;
