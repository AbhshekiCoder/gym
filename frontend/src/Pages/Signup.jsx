import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserPlus, FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { signupUser } from '../services/authService';
import { Message } from 'rsuite';
import { useSelector } from 'react-redux';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

const slide = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5 }
};

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [type, setType] = useState();
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  
  const mode = useSelector((state) => state.mode.value);
  
  // Color scheme based on mode
  const colors = {
    primary: mode === 'dark' ? '#fbbf24' : '#4f46e5',
    secondary: mode === 'dark' ? '#d97706' : '#7c3aed',
    text: mode === 'dark' ? '#f3f4f6' : '#1f2937',
    bg: mode === 'dark' ? '#111827' : '#f9fafb',
    card: mode === 'dark' ? '#1f2937' : '#ffffff',
    accent: mode === 'dark' ? '#ef4444' : '#dc2626'
  };

  const signup = async (e) => {
    e.preventDefault();
    try {
      const result = await signupUser(formData);
      if (result.success) {
        setType('success');
        setMessage(result.message);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 2000);
      }
    } catch (err) {
      setType('warning');
      setMessage(err.response?.data?.error || 'Signup failed');
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000);
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setFormData({ ...formData, password });
    
    // Calculate password strength
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  return (
    <div 
      className={`min-h-screen flex items-center justify-center transition-all duration-300 ${
        mode === 'dark' 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-indigo-100 via-purple-100 to-cyan-100'
      } px-4 relative overflow-hidden`}
      style={{ color: colors.text }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              background: colors.primary,
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

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

      {/* Signup Form */}
      <motion.div
        className="p-8 rounded-3xl shadow-2xl w-full max-w-md z-10"
        style={{ backgroundColor: colors.card }}
        {...fadeInUp}
      >
        {/* Header */}
        <motion.div className="text-center mb-6">
          <motion.div
            className="inline-block p-4 rounded-full shadow-lg mb-4"
            style={{ background: `rgba(${mode === 'dark' ? '251, 191, 36' : '79, 70, 229'}, 0.1)` }}
            animate={{ rotate: [0, 10, -10, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
          >
            <FaUserPlus 
              className="text-3xl" 
              style={{ color: colors.primary }} 
            />
          </motion.div>
          <h1 
            className="text-3xl font-bold"
            style={{ 
              background: mode === 'dark' 
                ? 'linear-gradient(90deg, #fbbf24, #d97706)' 
                : 'linear-gradient(90deg, #4f46e5, #7c3aed)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Create Your Account
          </h1>
        </motion.div>

        {/* Form */}
        <form className="space-y-5" onSubmit={signup}>
          <div className="relative">
            <FaUser 
              className="absolute left-4 top-1/2 transform -translate-y-1/2" 
              style={{ color: colors.text, opacity: 0.7 }} 
            />
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full pl-12 pr-4 py-3 rounded-xl shadow-md focus:ring-2 focus:ring-amber-400"
              style={{ 
                backgroundColor: mode === 'dark' ? '#374151' : '#f3f4f6',
                borderColor: mode === 'dark' ? '#4b5563' : '#d1d5db',
                color: colors.text
              }}
            />
          </div>
          
          <div className="relative">
            <FaEnvelope 
              className="absolute left-4 top-1/2 transform -translate-y-1/2" 
              style={{ color: colors.text, opacity: 0.7 }} 
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-12 pr-4 py-3 rounded-xl shadow-md focus:ring-2 focus:ring-amber-400"
              style={{ 
                backgroundColor: mode === 'dark' ? '#374151' : '#f3f4f6',
                borderColor: mode === 'dark' ? '#4b5563' : '#d1d5db',
                color: colors.text
              }}
            />
          </div>
          
          <div className="relative">
            <FaLock 
              className="absolute left-4 top-1/2 transform -translate-y-1/2" 
              style={{ color: colors.text, opacity: 0.7 }} 
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={handlePasswordChange}
              className="w-full pl-12 pr-12 py-3 rounded-xl shadow-md focus:ring-2 focus:ring-amber-400"
              style={{ 
                backgroundColor: mode === 'dark' ? '#374151' : '#f3f4f6',
                borderColor: mode === 'dark' ? '#4b5563' : '#d1d5db',
                color: colors.text
              }}
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
              style={{ color: colors.text, opacity: 0.7 }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          
          {/* Password Strength Indicator */}
          {formData.password && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Password Strength:</span>
                <span className="text-sm font-medium">
                  {passwordStrength === 0 ? 'Weak' : 
                   passwordStrength === 1 ? 'Fair' : 
                   passwordStrength === 2 ? 'Medium' : 
                   passwordStrength === 3 ? 'Good' : 'Strong'}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    passwordStrength === 0 ? 'bg-red-500 w-1/4' : 
                    passwordStrength === 1 ? 'bg-orange-500 w-2/4' : 
                    passwordStrength === 2 ? 'bg-yellow-500 w-3/4' : 
                    'bg-green-500 w-full'
                  }`}
                ></div>
              </div>
            </div>
          )}
          
          <div className="relative">
            <label className="block mb-2 text-sm font-medium" style={{ color: colors.text }}>
              Account Type
            </label>
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: 'user', name: 'Member', desc: 'Standard gym access' },
                { id: 'admin', name: 'Admin', desc: 'Manage gym operations' }
              ].map((role) => (
                <motion.div
                  key={role.id}
                  className={`p-3 rounded-xl border-2 cursor-pointer ${
                    formData.role === role.id 
                      ? 'border-amber-400' 
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                  style={{ backgroundColor: colors.card }}
                  whileHover={{ y: -3 }}
                  onClick={() => setFormData({...formData, role: role.id})}
                >
                  <h3 className="font-bold" style={{ color: colors.text }}>{role.name}</h3>
                  <p className="text-xs opacity-75">{role.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 font-bold rounded-xl shadow-lg"
            style={{ 
              background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
              color: mode === 'dark' ? '#1f2937' : '#ffffff'
            }}
          >
            Create Account
          </motion.button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-sm mt-6" style={{ color: colors.text, opacity: 0.8 }}>
          Already have an account?{' '}
          <Link 
            to="/login" 
            className="font-semibold hover:underline"
            style={{ color: colors.primary }}
          >
            Login here
          </Link>
        </p>
      </motion.div>
      
      {/* Footer */}
      <footer 
        className="absolute bottom-0 left-0 right-0 py-8 px-4 md:px-8"
        style={{ 
          background: mode === 'dark' 
            ? 'linear-gradient(to right, #0f172a, #1e293b)' 
            : 'linear-gradient(to right, #4f46e5, #7c3aed)',
          color: '#fff'
        }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaUserPlus className="text-xl text-amber-400" />
            <span className="text-xl font-bold">GymX</span>
          </div>
          <p className="text-sm opacity-75">
            &copy; {new Date().getFullYear()} GymX Fitness. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Signup;