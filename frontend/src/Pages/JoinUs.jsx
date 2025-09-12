import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaDumbbell, FaCalendarAlt, FaLock, FaCheck, FaArrowRight, FaStar, FaTrophy, FaHeartbeat } from 'react-icons/fa';
import { payment } from '../services/userService';
import Navbar from '../Components/Navbar';
import { useSelector } from 'react-redux';

const JoinUs = () => {
  const mode = useSelector((state) => state.mode.value)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    plan: null,
    terms: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await payment(formData);
      if(result.data.success){
        const options = {
          key: "rzp_test_pEZdDpwnJejkWR", // Add your Razorpay Key ID
          amount: result.data.data.amount * 100, // Amount in paise
          currency:'INR',
          name: "GYMX",
          description: "Test Transaction",
          order_id: result.data.data.id,
          handler: function (response) {
            alert("order is created")
            setTimeout(() => {
              setIsSubmitting(false);
              setIsSubmitted(true);
            }, 1500);
          },
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone,
          },
          theme: {
            color: "#3399cc",
          },                                                                                             
        };
        const rzp = new window.Razorpay(options)
        rzp.open();
      }
    } catch(err) {
      console.log(err.message);
      setIsSubmitting(false)
    }
  };
  
  const plans = [
    { id: 'monthly', name: 'Monthly', price: '999', features: ['Unlimited Access', 'Free Locker'] },
    { id: 'quarterly', name: 'Quarterly', price: '2499', features: ['+ Diet Plan', '+ 1 PT Session'] },
    { id: 'yearly', name: 'Yearly', price: '8999', features: ['+ Gym Kit', '+ 3 PT Sessions'] }
  ];

  // Define colors based on mode
  const colors = {
    bgPrimary: mode === 'dark' ? 'bg-gray-900' : 'bg-indigo-50',
    bgSecondary: mode === 'dark' ? 'bg-gray-800' : 'bg-white',
    bgGradientFrom: mode === 'dark' ? 'from-gray-900' : 'from-indigo-50',
    bgGradientTo: mode === 'dark' ? 'to-gray-800' : 'to-purple-100',
    textPrimary: mode === 'dark' ? 'text-white' : 'text-gray-900',
    textSecondary: mode === 'dark' ? 'text-gray-300' : 'text-gray-700',
    borderColor: mode === 'dark' ? 'border-gray-700' : 'border-gray-300',
    inputBg: mode === 'dark' ? 'bg-gray-700' : 'bg-gray-50',
    inputText: mode === 'dark' ? 'text-white' : 'text-gray-900',
    cardBg: mode === 'dark' ? 'bg-gray-800' : 'bg-white',
    accent: mode === 'dark' ? 'amber-400' : 'indigo-600',
    accentGradientFrom: mode === 'dark' ? 'from-amber-500' : 'from-indigo-600',
    accentGradientTo: mode === 'dark' ? 'to-yellow-400' : 'to-purple-600',
  };

  return (
    <>  
      <Navbar/>
      <motion.div 
        className={`min-h-screen py-12 px-4 sm:px-6 ${colors.bgPrimary}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <motion.div 
            className="text-center mb-16"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              className={`inline-flex items-center justify-center p-3 rounded-full mb-6 ${
                mode === 'dark' 
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-300' 
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600'
              }`}
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
              <FaDumbbell className="text-white text-2xl" />
            </motion.div>
            <motion.h1 
              className={`text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent ${
                mode === 'dark' 
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-300' 
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600'
              }`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Join Our Fitness Community
            </motion.h1>
            <motion.p 
              className={`text-xl ${colors.textSecondary} max-w-2xl mx-auto`}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              Transform your life today with our state-of-the-art facilities and expert trainers
            </motion.p>
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Membership Form */}
            <motion.div 
              className={`${colors.cardBg} rounded-3xl shadow-xl overflow-hidden h-fit`}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <div className={`p-6 ${
                mode === 'dark' 
                  ? 'bg-gradient-to-r from-gray-900 to-gray-800' 
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600'
              }`}>
                <h2 className="text-2xl font-bold text-white">Membership Application</h2>
                <p className={mode === 'dark' ? 'text-gray-300' : 'text-indigo-200'}>Fill out the form to start your fitness journey</p>
              </div>
              
              {isSubmitted ? (
                <motion.div 
                  className="p-8 text-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  <motion.div
                    className="inline-block mb-6"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <FaCheck className="text-green-500 text-6xl" />
                  </motion.div>
                  <h3 className={`text-2xl font-bold ${colors.textPrimary} mb-4`}>Successfully Submitted!</h3>
                  <p className={`${colors.textSecondary} mb-6`}>
                    Thank you for joining GymX! Our team will contact you within 24 hours to complete your registration.
                  </p>
                  <motion.button
                    className={`px-6 py-3 font-bold rounded-lg shadow-md ${
                      mode === 'dark' 
                        ? 'bg-gradient-to-r from-amber-400 to-yellow-300 text-gray-900' 
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsSubmitted(false)}
                  >
                    Submit Another Form
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 md:p-8">
                  <div className="space-y-6">
                    <div>
                      <label className={`block ${colors.textPrimary} mb-2 font-medium`}>Full Name</label>
                      <div className="relative">
                        <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-3 ${colors.inputBg} rounded-lg ${colors.borderColor} focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${colors.inputText}`}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className={`block ${colors.textPrimary} mb-2 font-medium`}>Email Address</label>
                      <div className="relative">
                        <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-3 ${colors.inputBg} rounded-lg ${colors.borderColor} focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${colors.inputText}`}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className={`block ${colors.textPrimary} mb-2 font-medium`}>Phone Number</label>
                      <div className="relative">
                        <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="Number"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-3 ${colors.inputBg} rounded-lg ${colors.borderColor} focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${colors.inputText}`}
                          placeholder="Enter your phone number"
                          required
                          minLength={10}
                          maxLength={10}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className={`block ${colors.textPrimary} mb-2 font-medium`}>Membership Plan</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {plans.map((plan) => (
                          <motion.div
                            key={plan.id}
                            className={`relative p-4 rounded-xl border-2 cursor-pointer ${
                              formData.plan?.id === plan.id 
                                ? `${mode === 'dark' ? 'border-amber-400 bg-amber-900/20' : 'border-indigo-500 bg-indigo-50'}` 
                                : `${colors.borderColor} ${colors.cardBg}`
                            }`}
                            whileHover={{ y: -5 }}
                            onClick={() => setFormData({...formData, plan: plan})}
                          >
                            {formData.plan?.id === plan.id && (
                              <motion.div 
                                className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                              >
                                <FaCheck className="text-white text-xs" />
                              </motion.div>
                            )}
                            <h3 className={`font-bold ${colors.textPrimary}`}>{plan.name}</h3>
                            <p className={`font-bold ${mode === 'dark' ? 'text-amber-400' : 'text-indigo-600'}`}>₹{plan.price}</p>
                            <ul className={`mt-2 text-sm ${colors.textSecondary}`}>
                              {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-center">
                                  <FaCheck className="text-green-500 mr-2 text-xs" /> {feature}
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          type="checkbox"
                          name="terms"
                          checked={formData.terms}
                          onChange={handleChange}
                          className={`w-4 h-4 ${mode === 'dark' ? 'text-amber-400 bg-gray-700 border-gray-600' : 'text-indigo-600 bg-gray-100 border-gray-300'} rounded focus:ring-indigo-500`}
                          required
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label className={colors.textPrimary}>
                          I agree to the <a href="#" className={`${mode === 'dark' ? 'text-amber-400' : 'text-indigo-600'} hover:underline`}>Terms and Conditions</a> and <a href="#" className={`${mode === 'dark' ? 'text-amber-400' : 'text-indigo-600'} hover:underline`}>Privacy Policy</a>
                        </label>
                      </div>
                    </div>
                    
                    <motion.button
                      type="submit"
                      className={`w-full py-4 px-6 font-bold rounded-xl shadow-lg flex items-center justify-center ${
                        mode === 'dark' 
                          ? 'bg-gradient-to-r from-amber-400 to-yellow-300 text-gray-900 hover:from-amber-500 hover:to-yellow-400' 
                          : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting || !formData.plan}
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className={`w-6 h-6 rounded-full border-2 ${mode === 'dark' ? 'border-gray-900 border-t-transparent' : 'border-white border-t-transparent'}`}
                        />
                      ) : (
                        <>
                          Complete Registration <FaArrowRight className="ml-3" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              )}
            </motion.div>
            
            {/* Benefits Section */}
            <div>
            <motion.div 
  className="mb-12"
  initial={{ x: 100, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ delay: 0.9, duration: 0.8 }}
>
  <h2 className={`text-2xl font-bold ${colors.textPrimary} mb-6`}>Why Join GymX?</h2>
  
  <div className="space-y-6">
    {[
      { 
        icon: <FaDumbbell className={`${mode === 'dark' ? 'text-amber-400' : 'text-indigo-600'} text-2xl`} />, 
        title: "World-Class Equipment", 
        desc: "Access to the latest fitness machines and free weights" 
      },
      { 
        icon: <FaStar className="text-amber-500 text-2xl" />, 
        title: "Expert Trainers", 
        desc: "Certified professionals to guide your fitness journey" 
      },
      { 
        icon: <FaHeartbeat className="text-pink-500 text-2xl" />, 
        title: "Personalized Programs", 
        desc: "Custom workout and nutrition plans tailored to your goals" 
      },
      { 
        icon: <FaLock className="text-purple-500 text-2xl" />, 
        title: "24/7 Access", 
        desc: "Workout anytime that fits your schedule" 
      },
      { 
        icon: <FaTrophy className="text-yellow-500 text-2xl" />, 
        title: "Community Challenges", 
        desc: "Participate in fun competitions and win prizes" 
      },
      { 
        icon: <FaCalendarAlt className="text-green-500 text-2xl" />, 
        title: "Flexible Memberships", 
        desc: "Choose from various plans to suit your needs" 
      }
    ].map((benefit, index) => (
      <motion.div 
        key={index}
        className={`flex items-start p-4 ${mode === 'dark' ? 'bg-gray-800' : 'bg-indigo-50'} rounded-xl shadow-md hover:shadow-lg transition-shadow`}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.0 + index * 0.1, duration: 0.5 }}
        whileHover={{ 
          y: -5,
          backgroundColor: mode === 'dark' ? '#374151' : '#e0e7ff'
        }}
      >
        <div className={`p-3 rounded-lg mr-4 ${mode === 'dark' ? 'bg-gray-700' : 'bg-indigo-100'}`}>
          {benefit.icon}
        </div>
        <div>
          <h3 className={`text-lg font-bold ${mode === 'dark' ? 'text-white' : 'text-gray-800'} mb-1`}>{benefit.title}</h3>
          <p className={`${mode === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{benefit.desc}</p>
        </div>
      </motion.div>
    ))}
  </div>
</motion.div>
              
              {/* Testimonials */}
              <motion.div 
                className={`rounded-3xl p-8 shadow-xl ${
                  mode === 'dark' 
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-400' 
                    : 'bg-gradient-to-r from-amber-400 to-yellow-300'
                }`}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.7 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What Our Members Say</h2>
                
                <div className="space-y-6">
                  {[
                    { 
                      name: "Rajesh K.", 
                      role: "Member for 2 years", 
                      text: "GymX transformed my fitness journey. The trainers are incredibly knowledgeable and the community is so supportive!" 
                    },
                    { 
                      name: "Priya M.", 
                      role: "Member for 1 year", 
                      text: "I've tried many gyms, but GymX stands out with its modern equipment and personalized approach. Highly recommend!" 
                    },
                    { 
                      name: "Amit S.", 
                      role: "Member for 3 years", 
                      text: "The 24/7 access is a game-changer for my busy schedule. Best decision I made for my health!" 
                    }
                  ].map((testimonial, index) => (
                    <motion.div 
                      key={index}
                      className={`p-6 rounded-xl backdrop-blur-sm ${mode === 'dark' ? 'bg-amber-900/30' : 'bg-white/80'}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2.0 + index * 0.2, duration: 0.5 }}
                    >
                      <div className="flex items-center mb-4">
                        <div className={`${mode === 'dark' ? 'bg-amber-800 border-amber-600' : 'bg-gray-200'} border-2 border-dashed rounded-xl w-12 h-12 mr-4`} />
                        <div>
                          <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                          <p className="text-gray-700">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-800 italic">"{testimonial.text}"</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* CTA Banner */}
          <motion.div 
            className={`mt-16 rounded-3xl p-8 text-center shadow-2xl ${
              mode === 'dark' 
                ? 'bg-gradient-to-r from-gray-900 to-gray-800' 
                : 'bg-gradient-to-r from-indigo-600 to-purple-600'
            }`}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.7 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Transform Your Life?</h2>
            <p className={`text-xl ${mode === 'dark' ? 'text-gray-300' : 'text-indigo-200'} max-w-2xl mx-auto mb-8`}>
              Join thousands of satisfied members and start your fitness journey today
            </p>
            <motion.button
              className={`px-8 py-4 font-bold rounded-xl shadow-lg flex items-center justify-center mx-auto ${
                mode === 'dark' 
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-300 text-gray-900 hover:from-amber-500 hover:to-yellow-400' 
                  : 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-600 hover:from-indigo-200 hover:to-purple-200'
              }`}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Join Now <FaArrowRight className="ml-3" />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default JoinUs;