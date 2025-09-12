import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSignInAlt, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, user } from '../services/authService';
import { Message } from 'rsuite';
import { useDispatch } from 'react-redux';
import { userinfo } from '../features/userinfo';
import { useSelector } from 'react-redux';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

const slide = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5 }
};

const Login = () => {
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '',
    remember: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [type, setType] = useState();
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const mode = useSelector((state) => state.mode.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Color scheme based on mode
  const colors = {
    primary: mode === 'dark' ? '#fbbf24' : '#4f46e5',
    secondary: mode === 'dark' ? '#d97706' : '#7c3aed',
    text: mode === 'dark' ? '#f3f4f6' : '#1f2937',
    bg: mode === 'dark' ? '#111827' : '#f9fafb',
    card: mode === 'dark' ? '#1f2937' : '#ffffff',
    accent: mode === 'dark' ? '#ef4444' : '#dc2626'
  };

  const login = async(e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await loginUser(formData);
      
      if (result.data.success) {
        setType('success');
        setMessage(result.data.message);
        setShowMessage(true);
        
        localStorage.setItem("token", result.data.token);
        const result1 = await user(result.data.token);
        
        if (result1) {
          dispatch(userinfo(result1.data.data));
          
          if (formData.remember) {
            localStorage.setItem('rememberToken', result.data.token);
          }
          
          if (result1.data.data.role === "admin") {
            setTimeout(() =>{
              navigate('/admin');

            },2000)
            
          } else {
            setTimeout(() =>{
              navigate('/');

            },2000)
          }
        }

        // Remove token after 1 hour if not remembered
        if (!formData.remember) {
          setTimeout(() => {
            localStorage.removeItem("token");
          }, 3600000); // 1 hour
        }
      }
    } catch (err) {
      console.log(err.message);
      if (err.response?.data) {
        setType('warning');
        setMessage(err.response.data.message);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 2000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className={`min-h-screen flex items-center justify-center transition-all duration-300 ${
        mode === 'dark' 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-purple-100 via-indigo-100 to-cyan-100'
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

      {/* Login Form */}
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
            <FaSignInAlt 
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
            Welcome Back!
          </h1>
          <p className="mt-2" style={{ color: colors.text, opacity: 0.8 }}>
            Sign in to continue your fitness journey
          </p>
        </motion.div>

        {/* Form */}
        <form className="space-y-5" onSubmit={login}>
          <div className="relative">
            <FaEnvelope 
              className="absolute left-4 top-1/2 transform -translate-y-1/2" 
              style={{ color: colors.text, opacity: 0.7 }} 
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-12 pr-4 py-3 rounded-xl shadow-md focus:ring-2 focus:ring-amber-400"
              style={{ 
                backgroundColor: mode === 'dark' ? '#374151' : '#f3f4f6',
                borderColor: mode === 'dark' ? '#4b5563' : '#d1d5db',
                color: colors.text
              }}
              required
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
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              className="w-full pl-12 pr-12 py-3 rounded-xl shadow-md focus:ring-2 focus:ring-amber-400"
              style={{ 
                backgroundColor: mode === 'dark' ? '#374151' : '#f3f4f6',
                borderColor: mode === 'dark' ? '#4b5563' : '#d1d5db',
                color: colors.text
              }}
              required
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
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={formData.remember}
                onChange={e => setFormData({ ...formData, remember: e.target.checked })}
                className="w-4 h-4 rounded focus:ring-amber-400"
                style={{ 
                  backgroundColor: mode === 'dark' ? '#374151' : '#f3f4f6',
                  borderColor: mode === 'dark' ? '#4b5563' : '#d1d5db',
                  color: colors.primary
                }}
              />
              <label 
                htmlFor="remember" 
                className="ml-2 text-sm"
                style={{ color: colors.text, opacity: 0.8 }}
              >
                Remember me
              </label>
            </div>
            
            <Link 
              to="/forgot-password" 
              className="text-sm hover:underline"
              style={{ color: colors.primary }}
            >
              Forgot Password?
            </Link>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 font-bold rounded-xl shadow-lg flex items-center justify-center"
            style={{ 
              background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
              color: mode === 'dark' ? '#1f2937' : '#ffffff'
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6 rounded-full border-2 border-current border-t-transparent"
              />
            ) : (
              'Login'
            )}
          </motion.button>
        </form>

        {/* Social Login */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" style={{ borderColor: colors.text, opacity: 0.2 }}></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span 
              className="px-2 bg-gray-800 text-gray-300"
              style={{ 
                backgroundColor: colors.card,
                color: colors.text,
                opacity: 0.8
              }}
            >
              Or continue with
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: 'google', name: 'Google', color: '#DB4437' },
            { id: 'facebook', name: 'Facebook', color: '#4267B2' }
          ].map((service) => (
            <motion.button
              key={service.id}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="py-2 rounded-xl flex items-center justify-center gap-2"
              style={{ 
                backgroundColor: `${service.color}10`,
                border: `1px solid ${service.color}30`
              }}
            >
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: service.color }}
              >
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span style={{ color: service.color }}>{service.name}</span>
            </motion.button>
          ))}
        </div>

        {/* Footer Link */}
        <p className="text-center text-sm mt-6" style={{ color: colors.text, opacity: 0.8 }}>
          Don't have an account?{" "}
          <Link 
            to="/signup" 
            className="font-semibold hover:underline"
            style={{ color: colors.primary }}
          >
            Sign up
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
            <FaSignInAlt className="text-xl text-amber-400" />
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

export default Login;