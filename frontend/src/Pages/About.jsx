import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaDumbbell, FaRunning, FaHeartbeat, FaTrophy, 
  FaUsers, FaLightbulb, FaArrowRight, FaStar 
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

const About = () => {
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
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-16 px-4 md:px-8 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16 py-12"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div 
              className="inline-block p-5 mb-6 rounded-full shadow-xl"
              style={{ 
                background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`
              }}
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1.05, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <FaDumbbell className="text-white text-4xl" />
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-extrabold mb-6"
              style={{ 
                background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              About GymX
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              Transforming lives through fitness since 2015
            </motion.p>
          </motion.div>

          {/* Mission Statement */}
          <motion.div 
            className="rounded-3xl p-8 md:p-12 shadow-2xl mb-16"
            style={{ 
              background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
              color: mode === 'dark' ? '#1f2937' : '#ffffff'
            }}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <motion.div 
              className="flex items-center mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <FaLightbulb className="text-3xl mr-4" style={{ color: colors.bg }} />
              <h2 className="text-2xl md:text-3xl font-bold">Our Mission</h2>
            </motion.div>
            
            <motion.p 
              className="text-lg md:text-xl mb-8"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.7 }}
            >
              At GymX, we empower individuals to achieve their fitness goals through state-of-the-art equipment, 
              personalized training programs, and a supportive community environment that inspires growth.
            </motion.p>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, staggerChildren: 0.2 }}
            >
              {[
                { icon: <FaTrophy className="text-2xl" style={{ color: colors.bg }} />, text: "15,000+ Members Transformed" },
                { icon: <FaRunning className="text-2xl" style={{ color: colors.bg }} />, text: "200+ Weekly Classes" },
                { icon: <FaUsers className="text-2xl" style={{ color: colors.bg }} />, text: "Community of Champions" }
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center p-4 rounded-xl backdrop-blur-sm"
                  style={{ background: 'rgba(255, 255, 255, 0.2)' }}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.3 + index * 0.2, duration: 0.6 }}
                >
                  <div className="mr-4">{item.icon}</div>
                  <p className="font-medium">{item.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Trainers Section */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.div 
              className="flex items-center mb-10"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.7 }}
            >
              <FaUsers className="text-3xl mr-4" style={{ color: colors.primary }} />
              <h2 className="text-2xl md:text-3xl font-bold">Meet Our Elite Trainers</h2>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.9, staggerChildren: 0.2 }}
            >
              {[
                { 
                  name: "Ravi", 
                  role: "Strength & Conditioning", 
                  bio: "National powerlifting champion with 10+ years experience",
                  color: "from-indigo-500 to-purple-600"
                },
                { 
                  name: "Priya", 
                  role: "Yoga & Flexibility", 
                  bio: "International yoga instructor with holistic approach",
                  color: "from-amber-500 to-yellow-400"
                },
                { 
                  name: "Aman", 
                  role: "Functional Fitness", 
                  bio: "CrossFit specialist and nutrition coach",
                  color: "from-pink-500 to-rose-500"
                }
              ].map((trainer, index) => (
                <motion.div 
                  key={trainer.name}
                  className="rounded-2xl overflow-hidden shadow-xl"
                  style={{ backgroundColor: colors.card }}
                  initial={{ y: 100, opacity: 0, rotate: -5 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  transition={{ 
                    delay: 2.0 + index * 0.3, 
                    duration: 0.7, 
                    type: "spring", 
                    bounce: 0.4 
                  }}
                  whileHover={{ 
                    y: -15,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                  }}
                >
                  <div className={`h-2 bg-gradient-to-r ${trainer.color}`}></div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div 
                        className="rounded-xl w-16 h-16 mr-4 flex items-center justify-center"
                        style={{ 
                          background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
                          color: mode === 'dark' ? '#1f2937' : '#ffffff'
                        }}
                      >
                        {trainer.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{trainer.name}</h3>
                        <p className="font-medium" style={{ color: colors.primary }}>{trainer.role}</p>
                      </div>
                    </div>
                    <p className="mb-4 opacity-80">{trainer.bio}</p>
                    <div className="flex space-x-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar 
                          key={i} 
                          className={i < 4 ? "text-amber-400" : "text-gray-300"} 
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Facility Section */}
          <motion.div 
            className="rounded-3xl p-8 md:p-12 shadow-2xl mb-16"
            style={{ 
              background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
              color: mode === 'dark' ? '#1f2937' : '#ffffff'
            }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 2.8, duration: 0.7 }}
          >
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <motion.h2 
                  className="text-2xl md:text-3xl font-bold mb-4"
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 3.0 }}
                >
                  World-Class Facilities
                </motion.h2>
                
                <motion.ul 
                  className="space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.2, staggerChildren: 0.1 }}
                >
                  {[
                    "10,000 sq ft workout space",
                    "Olympic-grade equipment",
                    "Hydrotherapy pool",
                    "Cryotherapy chambers",
                    "Organic juice bar",
                    "Luxury locker rooms"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-center"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 3.3 + index * 0.1 }}
                    >
                      <FaDumbbell className="mr-3" />
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-8 px-6 py-3 rounded-xl font-bold flex items-center gap-2"
                  style={{ 
                    background: colors.bg,
                    color: colors.primary
                  }}
                >
                  Schedule a Tour <FaArrowRight />
                </motion.button>
              </div>
              
             <div className="md:w-1/2 grid grid-cols-2 gap-4">
  {[
    "https://images.unsplash.com/photo-1696563996353-214a3690bb11?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGd5bSUyMHRyYWluZXJ8ZW58MHx8MHx8fDA%3D",
    "https://static1.gensler.com/uploads/image/93798/EvelynRubenstein_DeepDive_Carousel04_2000px_1724352330.jpg",
    "https://images.squarespace-cdn.com/content/v1/5ada11772714e5eb213ab1df/1586880135100-S4GZIJ16S7FRRPUNW46L/DSC_1335.jpg ",
    "https://d6whyyexjggmd.cloudfront.net/wp-content/uploads/2019/12/crcc-amenities-fitness-center-1200x675.jpg "
  ].map((imgUrl, index) => (
    <motion.div 
      key={index}
      className="rounded-xl shadow-lg overflow-hidden h-40 relative group"
      style={{ background: 'rgba(255, 255, 255, 0.2)' }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 3.8 + index * 0.2, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <img 
          src={imgUrl} 
          alt={`Professional Trainer ${index + 1}`}
          className="w-full h-full object-cover"
        />
        {/* Hover Overlay with Trainer Info */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex flex-col justify-end p-3">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <h4 className="text-white font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {['Sarah Johnson', 'Mike Rodriguez', 'Lisa Chen', 'David Wilson'][index]}
            </h4>
            <p className="text-xs text-amber-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
              {['Fitness Coach', 'Strength Trainer', 'Yoga Instructor', 'Nutrition Specialist'][index]}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  ))}
</div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            className="rounded-3xl p-8 md:p-12 text-center mb-16"
            style={{ backgroundColor: colors.card }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.0, duration: 0.7 }}
          >
            <h2 className="text-3xl font-bold mb-6">
              Ready to Start Your <span style={{ color: colors.primary }}>Fitness Journey</span>?
            </h2>
            
            <motion.p 
              className="text-xl mb-8 max-w-2xl mx-auto opacity-90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4.2 }}
            >
              Join thousands of members who have transformed their lives
            </motion.p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg mx-auto"
              style={{ 
                background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                color: mode === 'dark' ? '#1f2937' : '#ffffff'
              }}
            >
              Join Today <FaArrowRight />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;