import React from 'react';
import { motion } from 'framer-motion';
import {
  FaDumbbell, FaRunning, FaHeartbeat, FaArrowRight,
  FaAppleAlt, FaFireAlt, FaUsers, FaChartLine,
  FaAward, FaCalendarAlt, FaStar, FaRegSmile
} from 'react-icons/fa';
import Navbar from '../Components/Navbar';
import { useSelector } from 'react-redux';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const Home = () => {
  const user = useSelector((state) => state.user.value);
  const mode = useSelector((state) => state.mode.value); // 'light' or 'dark'

  // Color scheme based on mode
  const colors = {
    primary: mode === 'dark' ? '#fbbf24' : '#4f46e5',
    secondary: mode === 'dark' ? '#d97706' : '#7c3aed',
    text: mode === 'dark' ? '#f3f4f6' : '#1f2937',
    bg: mode === 'dark' ? '#111827' : '#f9fafb',
    card: mode === 'dark' ? '#1f2937' : '#ffffff',
    accent: mode === 'dark' ? '#ef4444' : '#dc2626'
  };

  return (
    <div 
      className={`min-h-screen transition-all duration-300 ${
        mode === 'dark' 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-cyan-50'
      }`}
      style={{ color: colors.text }}
    >
     <Navbar/>
      {/* Hero Section */}
      <section className="py-16 px-4 md:px-8 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden z-0">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full opacity-10"
              style={{
                background: colors.primary,
                width: `${Math.random() * 300 + 50}px`,
                height: `${Math.random() * 300 + 50}px`,
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

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="flex flex-col lg:flex-row items-center gap-12"
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            {/* Hero Content */}
            <motion.div 
              className="flex-1 text-center lg:text-left"
              variants={fadeInUp}
            >
              <motion.div
                className="inline-block p-3 rounded-xl mb-6"
                style={{ background: `rgba(${mode === 'dark' ? '251, 191, 36' : '79, 70, 229'}, 0.1)` }}
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <FaDumbbell 
                  className="text-4xl" 
                  style={{ color: colors.primary }} 
                />
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-6xl font-extrabold mb-6"
                style={{ 
                  background: mode === 'dark' 
                    ? 'linear-gradient(90deg, #fbbf24, #d97706)' 
                    : 'linear-gradient(90deg, #4f46e5, #7c3aed)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Transform Your Body, Transform Your Life
              </motion.h1>
              
              <motion.p 
                className="text-xl mb-10 max-w-2xl mx-auto lg:mx-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                At GymX, we provide world-class training facilities and personalized programs to help you achieve your fitness goals faster than you thought possible.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg"
                  style={{ 
                    background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                    color: mode === 'dark' ? '#1f2937' : '#ffffff'
                  }}
                >
                  Join Today <FaArrowRight />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl font-bold border-2"
                  style={{ 
                    borderColor: colors.primary,
                    color: colors.primary
                  }}
                >
                  Free Trial
                </motion.button>
              </motion.div>
            </motion.div>
            
            {/* Hero Image */}
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl overflow-hidden">
                  <div 
                    className="absolute inset-0 opacity-20 blur-2xl rounded-full animate-pulse"
                    style={{ background: colors.primary }}
                  />
                </div>
                <div 
                  className="relative rounded-3xl overflow-hidden shadow-2xl"
                  style={{ 
                    background: mode === 'dark' 
                      ? 'linear-gradient(45deg, #1e293b, #334155)' 
                      : 'linear-gradient(45deg, #e0e7ff, #ede9fe)'
                  }}
                >
                  <div className="p-8">
                    <div className="aspect-video rounded-2xl overflow-hidden relative">
                      <div 
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ background: colors.card }}
                      >
                        <div className="text-center p-8">
                          <div className="inline-block p-4 rounded-full mb-4" style={{ background: `rgba(${mode === 'dark' ? '251, 191, 36' : '79, 70, 229'}, 0.1)` }}>
                            <FaDumbbell className="text-4xl" style={{ color: colors.primary }} />
                          </div>
                          <h3 className="text-2xl font-bold mb-2">GymX Fitness Center</h3>
                          <p className="mb-4">State-of-the-art facilities</p>
                          <div className="flex justify-center gap-2">
                            {[...Array(5)].map((_, i) => (
                              <FaStar key={i} className="text-amber-400" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span style={{ color: colors.primary }}>GymX</span>
            </h2>
            <p className="text-xl max-w-3xl mx-auto">
              We provide everything you need to achieve your fitness goals with confidence
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: <FaRunning className="text-4xl" style={{ color: colors.primary }} />, 
                title: "Professional Trainers", 
                desc: "Certified experts with years of experience guiding your fitness journey.",
                color: "bg-blue-500/10"
              },
              { 
                icon: <FaDumbbell className="text-4xl" style={{ color: colors.primary }} />, 
                title: "Modern Equipment", 
                desc: "State-of-the-art machines and tools for every workout need.",
                color: "bg-purple-500/10"
              },
              { 
                icon: <FaHeartbeat className="text-4xl" style={{ color: colors.primary }} />, 
                title: "Health Monitoring", 
                desc: "Track your progress with advanced health metrics and analytics.",
                color: "bg-red-500/10"
              },
              { 
                icon: <FaAppleAlt className="text-4xl" style={{ color: colors.primary }} />, 
                title: "Nutrition Plans", 
                desc: "Personalized diet strategies to complement your workouts.",
                color: "bg-green-500/10"
              },
              { 
                icon: <FaUsers className="text-4xl" style={{ color: colors.primary }} />, 
                title: "Community Support", 
                desc: "Join our vibrant community of fitness enthusiasts.",
                color: "bg-yellow-500/10"
              },
              { 
                icon: <FaCalendarAlt className="text-4xl" style={{ color: colors.primary }} />, 
                title: "Flexible Scheduling", 
                desc: "24/7 access with classes available at your convenience.",
                color: "bg-indigo-500/10"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className={`p-8 rounded-3xl shadow-lg ${feature.color} border border-transparent hover:border-current`}
                style={{ 
                  backgroundColor: colors.card,
                  borderColor: colors.primary
                }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 md:px-8" style={{ background: colors.bg }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Real Results from <span style={{ color: colors.primary }}>Real People</span>
              </h2>
              <p className="text-xl mb-8">
                Join thousands of members who have transformed their lives with GymX
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "95%", label: "Member Satisfaction" },
                  { value: "12k+", label: "Active Members" },
                  { value: "50+", label: "Expert Trainers" },
                  { value: "24/7", label: "Gym Access" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="p-6 rounded-2xl"
                    style={{ background: colors.card }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>
                      {stat.value}
                    </div>
                    <div>{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {[...Array(4)].map((_, index) => (
                <motion.div
                  key={index}
                  className={`rounded-2xl overflow-hidden aspect-square ${index === 0 ? 'row-span-2' : ''}`}
                  style={{ 
                    background: mode === 'dark' 
                      ? 'linear-gradient(45deg, #1e293b, #334155)' 
                      : 'linear-gradient(45deg, #e0e7ff, #ede9fe)'
                  }}
                  whileHover={{ y: -10 }}
                >
                  <div className="h-full flex flex-col items-center justify-center p-4">
                    <div className="w-16 h-16 rounded-full mb-4 flex items-center justify-center" style={{ background: `rgba(${mode === 'dark' ? '251, 191, 36' : '79, 70, 229'}, 0.1)` }}>
                      <FaRegSmile className="text-2xl" style={{ color: colors.primary }} />
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold mb-1">Member #{index + 1}</div>
                      <div className="text-sm opacity-75">Success Story</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{ background: colors.primary }}
        />
        
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at center, transparent, ${colors.bg})`
          }}
        />
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your <span style={{ color: colors.primary }}>Fitness Journey</span>?
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto">
              Join GymX today and get your first month free plus a personalized training session
            </p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-4 rounded-xl shadow-md w-full sm:w-auto"
                style={{ 
                  background: colors.card,
                  color: colors.text
                }}
                whileFocus={{ scale: 1.02 }}
              />
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg"
                style={{ 
                  background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                  color: mode === 'dark' ? '#1f2937' : '#ffffff'
                }}
              >
                Get Started <FaArrowRight />
              </motion.button>
            </motion.div>
            
            <p className="mt-6 text-sm opacity-75">
              No credit card required • Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="py-12 px-4 md:px-8"
        style={{ 
          background: mode === 'dark' 
            ? 'linear-gradient(to right, #0f172a, #1e293b)' 
            : 'linear-gradient(to right, #4f46e5, #7c3aed)',
          color: '#fff'
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <FaDumbbell className="text-2xl text-amber-400" />
                <span className="text-2xl font-bold">GymX</span>
              </div>
              <p className="opacity-80 mb-6">
                Transforming lives through fitness since 2010
              </p>
              <div className="flex gap-4">
                {[...Array(4)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                  >
                    <div className="w-4 h-4 rounded-full" style={{ background: '#fbbf24' }} />
                  </div>
                ))}
              </div>
            </div>
            
            {['Company', 'Resources', 'Legal', 'Contact'].map((title, i) => (
              <div key={i}>
                <h3 className="text-lg font-bold mb-6">{title}</h3>
                <ul className="space-y-3 opacity-80">
                  {[...Array(4)].map((_, j) => (
                    <li key={j} className="hover:opacity-100 cursor-pointer transition">
                      Link {j + 1}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-white/10 mt-12 pt-8 text-center opacity-75">
            <p>&copy; {new Date().getFullYear()} GymX Fitness. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;