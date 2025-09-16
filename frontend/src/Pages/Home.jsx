import React from 'react';
import { motion } from 'framer-motion';
import {
  FaDumbbell, FaRunning, FaHeartbeat, FaArrowRight,
  FaAppleAlt, FaFireAlt, FaUsers, FaChartLine,
  FaAward, FaCalendarAlt, FaStar, FaRegSmile,
  FaChevronLeft,
  FaChevronRight,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaPaperPlane,
  FaHome,
  FaCalendar,
  FaUser,
  FaMapMarkedAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaInfoCircle,
  FaHeart,
  FaWeight,
  FaChild
} from 'react-icons/fa';
import Navbar from '../Components/Navbar';
import { useSelector } from 'react-redux';
import {Swiper, SwiperSlide} from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';


// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
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
          className="text-3xl md:text-3xl lg:text-5xl font-extrabold mb-6 leading-tight"
          style={{ 
            color: mode === 'dark' ? '#f8fafc' : '#1f2937'
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Transform Your Body, <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Transform Your Life</span>
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl mb-10 max-w-2xl mx-auto lg:mx-0 opacity-90"
          style={{ color: mode === 'dark' ? '#cbd5e1' : '#4b5563' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          At Gymx Fitness, we provide world-class training facilities and personalized programs to help you achieve your fitness goals faster than you thought possible.
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
              color: colors.primary,
              background: mode === 'dark' ? 'rgba(30, 30, 40, 0.5)' : 'rgba(255, 255, 255, 0.8)'
            }}
          >
            Free Trial
          </motion.button>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-3 gap-6 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold" style={{ color: colors.primary }}>5000+</div>
            <div className="text-sm" style={{ color: mode === 'dark' ? '#cbd5e1' : '#4b5563' }}>Happy Members</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold" style={{ color: colors.primary }}>25+</div>
            <div className="text-sm" style={{ color: mode === 'dark' ? '#cbd5e1' : '#4b5563' }}>Expert Trainers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold" style={{ color: colors.primary }}>15</div>
            <div className="text-sm" style={{ color: mode === 'dark' ? '#cbd5e1' : '#4b5563' }}>Years Experience</div>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Swiper Slider */}
      <motion.div 
        className="flex-1 w-full"
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
            className="relative rounded-3xl overflow-hidden shadow-2xl max-w-3xl"
            style={{ 
              background: mode === 'dark' 
                ? 'linear-gradient(45deg, #1e293b, #334155)' 
                : 'linear-gradient(45deg, #e0e7ff, #ede9fe)'
            }}
          >
            {/* Swiper Container */}
            <Swiper
              spaceBetween={0}
              slidesPerView={1}
              loop={true}
              autoplay={true}
              pagination={{ clickable: true, el: '.swiper-pagination' }}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              modules={[ Pagination, Autoplay]}
              className="h-[500px]"
            >
              {/* Slide 1 */}
              <SwiperSlide>
                <div className="h-full w-full relative">
                  <img 
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                    alt="Modern gym equipment"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 text-white">
                    <h3 className="text-xl font-bold">State-of-the-Art Equipment</h3>
                    <p>Professional grade machines for optimal results</p>
                  </div>
                </div>
              </SwiperSlide>
              
              {/* Slide 2 */}
              <SwiperSlide>
                <div className="h-full w-full relative">
                  <img 
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                    alt="Personal training session"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 text-white">
                    <h3 className="text-xl font-bold">Expert Personal Training</h3>
                    <p>Custom programs designed for your goals</p>
                  </div>
                </div>
              </SwiperSlide>
              
              {/* Slide 3 */}
              <SwiperSlide>
                <div className="h-full w-full relative">
                  <img 
                    src="https://kaizenaire.com/wp-content/uploads/2023/12/image-1774.jpeg" 
                    alt="Group fitness class"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 text-white">
                    <h3 className="text-xl font-bold">Group Fitness Classes</h3>
                    <p>Motivating workouts in a community setting</p>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
            
            {/* Custom Pagination */}
            <div className="swiper-pagination !bottom-4"></div>
            
            {/* Navigation Arrows */}
            <div className="swiper-button-prev !text-white after:!text-xl"></div>
            <div className="swiper-button-next !text-white after:!text-xl"></div>
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
              Join thousands of members who have transformed their lives with Titan Fitness
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
            {/* Person 1 - Main (top left) */}
            <motion.div
              className="rounded-2xl overflow-hidden aspect-square row-span-2 relative group"
              whileHover={{ y: -10 }}
            >
              <img 
                // --- FIXED IMAGE ---
                src="https://cdn.pixabay.com/photo/2023/09/24/13/05/ai-generated-8272787_1280.jpg" 
                alt="Sarah Johnson - Lost 45lbs"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <div className="text-white">
                  <div className="text-lg font-bold">Sarah Johnson</div>
                  <div className="text-sm">Lost 45lbs in 6 months</div>
                  <div className="flex mt-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-amber-400 text-sm" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Person 2 (top right) */}
            <motion.div
              className="rounded-2xl overflow-hidden aspect-square relative group"
              whileHover={{ y: -10 }}
            >
              <img 
                // --- FIXED IMAGE ---
                src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=500&auto=format&fit=crop" 
                alt="Mike Thompson - Gained 20lbs muscle"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <div className="text-white">
                  <div className="text-lg font-bold">Mike Thompson</div>
                  <div className="text-sm">Gained 20lbs muscle</div>
                  <div className="flex mt-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-amber-400 text-sm" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Person 3 (bottom left) */}
            <motion.div
              className="rounded-2xl overflow-hidden aspect-square relative group"
              whileHover={{ y: -10 }}
            >
              <img 
                // --- FIXED IMAGE ---
                src="https://cdn.pixabay.com/photo/2024/04/17/21/49/ai-generated-8703068_1280.jpg" 
                alt="Lisa Chen - Marathon Finisher"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <div className="text-white">
                  <div className="text-lg font-bold">Lisa Chen</div>
                  <div className="text-sm">First marathon at 40</div>
                  <div className="flex mt-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-amber-400 text-sm" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Person 4 (bottom right) */}
            <motion.div
              className="rounded-2xl overflow-hidden aspect-square relative group"
              whileHover={{ y: -10 }}
            >
              <img 
                // --- This image was already working ---
                src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                alt="David Wilson - Fitness Coach"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <div className="text-white">
                  <div className="text-lg font-bold">David Wilson</div>
                  <div className="text-sm">Now a certified trainer</div>
                  <div className="flex mt-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-amber-400 text-sm" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Additional Testimonials Carousel */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-center mb-8">What Our Members Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                text: "Titan Fitness changed my life! The trainers are amazing and the community support kept me motivated.",
                name: "Jennifer K.",
                role: "Member for 2 years"
              },
              {
                text: "I've tried many gyms, but the equipment and facilities here are top-notch. Worth every penny!",
                name: "Marcus R.",
                role: "Member for 1 year"
              },
              {
                text: "The nutritional guidance combined with training helped me achieve results I never thought possible.",
                name: "Sophia T.",
                role: "Member for 3 years"
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="p-6 rounded-2xl"
                style={{ background: colors.card }}
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-amber-400" />
                  ))}
                </div>
                <p className="mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-sm opacity-75">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
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
  className="py-16 px-4 md:px-8"
  style={{ 
    background: mode === 'dark' 
      ? 'linear-gradient(to right, #0f172a, #1e293b)' 
      : 'linear-gradient(to right, #4f46e5, #7c3aed)',
    color: '#fff'
  }}
>
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
      {/* Brand Section */}
      <div className="lg:col-span-2">
        <div className="flex items-center gap-3 mb-6">
          <FaDumbbell className="text-2xl text-amber-400" />
          <span className="text-2xl font-bold">GymX Fitness</span>
        </div>
        <p className="opacity-80 mb-6 max-w-md">
          Transforming lives through fitness since 2010. Our mission is to help you become the strongest version of yourself, both physically and mentally.
        </p>
        <div className="flex gap-4 mb-6">
          <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
            <FaFacebookF className="text-amber-400" />
          </a>
          <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
            <FaInstagram className="text-amber-400" />
          </a>
          <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
            <FaTwitter className="text-amber-400" />
          </a>
          <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
            <FaYoutube className="text-amber-400" />
          </a>
        </div>
        
        {/* Newsletter Subscription */}
        <div className="mt-6">
          <h4 className="font-bold mb-3">Subscribe to Our Newsletter</h4>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-4 py-2 rounded-l-lg focus:outline-none flex-grow text-gray-800"
            />
            <button className="bg-amber-400 text-gray-900 font-bold px-4 py-2 rounded-r-lg hover:bg-amber-500 transition">
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
      
      {/* Quick Links */}
      <div>
        <h3 className="text-lg font-bold mb-6">Quick Links</h3>
        <ul className="space-y-3 opacity-80">
          <li className="hover:opacity-100 cursor-pointer transition hover:translate-x-1">
            <a href="#" className="flex items-center gap-2 text-white"><FaHome className="text-amber-400 text-sm" /> Home</a>
          </li>
          <li className="hover:opacity-100 cursor-pointer transition hover:translate-x-1">
            <a href="#" className="flex text-white items-center gap-2 "><FaInfoCircle className="text-amber-400 text-sm" /> About Us</a>
          </li>
          <li className="hover:opacity-100 cursor-pointer transition hover:translate-x-1">
            <a href="#" className="flex items-center gap-2 text-white"><FaDumbbell className="text-amber-400 text-sm" /> Programs</a>
          </li>
          <li className="hover:opacity-100 cursor-pointer transition hover:translate-x-1">
            <a href="#" className="flex text-white items-center gap-2"><FaCalendar className="text-amber-400 text-sm" /> Schedule</a>
          </li>
          <li className="hover:opacity-100 cursor-pointer transition hover:translate-x-1">
            <a href="#" className="flex items-center gap-2 text-white"><FaStar className="text-amber-400 text-sm" /> Membership</a>
          </li>
        </ul>
      </div>
      
      {/* Programs */}
      <div>
        <h3 className="text-lg font-bold mb-6">Our Programs</h3>
        <ul className="space-y-3 opacity-80">
          <li className="hover:opacity-100 cursor-pointer transition hover:translate-x-1">
            <a href="#" className="flex items-center gap-2 text-white"><FaHeart className="text-amber-400 text-sm" /> Personal Training</a>
          </li>
          <li className="hover:opacity-100 cursor-pointer transition hover:translate-x-1">
            <a href="#" className="flex items-center gap-2 text-white"><FaUser className="text-amber-400 text-sm" /> Group Classes</a>
          </li>
          <li className="hover:opacity-100 cursor-pointer transition hover:translate-x-1">
            <a href="#" className="flex items-center gap-2 text-white"><FaRunning className="text-amber-400 text-sm" /> Cardio Training</a>
          </li>
          <li className="hover:opacity-100 cursor-pointer transition hover:translate-x-1">
            <a href="#" className="flex items-center gap-2 text-white"><FaWeight className="text-amber-400 text-sm" /> Strength Training</a>
          </li>
          <li className="hover:opacity-100 cursor-pointer transition hover:translate-x-1">
            <a href="#" className="flex items-center gap-2 text-white"><FaChild className="text-amber-400 text-sm" /> Youth Programs</a>
          </li>
        </ul>
      </div>
      
      {/* Contact Info */}
      <div>
        <h3 className="text-lg font-bold mb-6">Contact Us</h3>
        <ul className="space-y-4 opacity-80">
          <li className="flex items-start gap-3">
            <FaMapMarkedAlt className="text-amber-400 mt-1" />
            <span>123 Fitness Street, Health City, HC 12345</span>
          </li>
          <li className="flex items-center gap-3">
            <FaPhone className="text-amber-400" />
            <span>(555) 123-4567</span>
          </li>
          <li className="flex items-center gap-3">
            <FaEnvelope className="text-amber-400" />
            <span>info@gymxfitness.com</span>
          </li>
          <li className="flex items-center gap-3">
            <FaClock className="text-amber-400" />
            <span>Mon-Fri: 5am - 11pm<br/>Weekends: 7am - 9pm</span>
          </li>
        </ul>
      </div>
    </div>
    
    {/* Bottom Bar */}
    <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
      <p className="opacity-75 mb-4 md:mb-0">
        &copy; {new Date().getFullYear()} Gymx Fitness. All rights reserved.
      </p>
      <div className="flex gap-6">
        <a href="#" className="opacity-75 hover:opacity-100 transition">Privacy Policy</a>
        <a href="#" className="opacity-75 hover:opacity-100 transition">Terms of Service</a>
        <a href="#" className="opacity-75 hover:opacity-100 transition">Cookie Policy</a>
      </div>
    </div>
  </div>
</footer>
    </div>
  );
};

export default Home;