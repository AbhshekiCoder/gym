import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaDumbbell, FaCalendarAlt, FaLock, FaCheck, FaArrowRight, FaStar, FaTrophy, FaHeartbeat } from 'react-icons/fa';
import { payment } from '../services/userService';

const JoinUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    plan: '',
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
  try{
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
        const rzp =  new window.Razorpay(options)
		rzp.open();

    }
  }catch(err){
    console.log(err.message)
  }
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };
  
  const plans = [
    { id: 'monthly', name: 'Monthly', price: '999', features: ['Unlimited Access', 'Free Locker'] },
    { id: 'quarterly', name: 'Quarterly', price: '2499', features: ['+ Diet Plan', '+ 1 PT Session'] },
    { id: 'yearly', name: 'Yearly', price: '8999', features: ['+ Gym Kit', '+ 3 PT Sessions'] }
  ];

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6"
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
            className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full mb-6"
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
            className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-amber-400 dark:to-yellow-300"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Join Our Fitness Community
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto"
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
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-gray-900 dark:to-gray-800 p-6">
              <h2 className="text-2xl font-bold text-white">Membership Application</h2>
              <p className="text-indigo-200">Fill out the form to start your fitness journey</p>
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
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Successfully Submitted!</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Thank you for joining GymX! Our team will contact you within 24 hours to complete your registration.
                </p>
                <motion.button
                  className="px-6 py-3 bg-gradient-to-r from-amber-400 to-yellow-300 text-gray-900 font-bold rounded-lg shadow-md"
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
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Full Name</label>
                    <div className="relative">
                      <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Email Address</label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Phone Number</label>
                    <div className="relative">
                      <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Membership Plan</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {plans.map((plan) => (
                        <motion.div
                          key={plan.id}
                          className={`relative p-4 rounded-xl border-2 cursor-pointer ${
                            formData.plan === plan.id 
                              ? 'border-indigo-500 bg-indigo-50 dark:bg-gray-700' 
                              : 'border-gray-300 dark:border-gray-600'
                          }`}
                          whileHover={{ y: -5 }}
                          onClick={() => setFormData({...formData, plan: plan})}
                        >
                          {formData.plan.id === plan.id && (
                            <motion.div 
                              className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                            >
                              <FaCheck className="text-white text-xs" />
                            </motion.div>
                          )}
                          <h3 className="font-bold text-gray-800 dark:text-white">{plan.name}</h3>
                          <p className="text-indigo-600 dark:text-amber-400 font-bold">₹{plan.price}</p>
                          <ul className="mt-2 text-sm text-gray-600 dark:text-gray-300">
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
                        className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label className="text-gray-700 dark:text-gray-300">
                        I agree to the <a href="#" className="text-indigo-600 dark:text-amber-400 hover:underline">Terms and Conditions</a> and <a href="#" className="text-indigo-600 dark:text-amber-400 hover:underline">Privacy Policy</a>
                      </label>
                    </div>
                  </div>
                  
                  <motion.button
                    type="submit"
                    className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-6 h-6 rounded-full border-2 border-white border-t-transparent"
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
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Why Join GymX?</h2>
              
              <div className="space-y-6">
                {[
                  { 
                    icon: <FaDumbbell className="text-indigo-600 dark:text-amber-400 text-2xl" />, 
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
                    className="flex items-start p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.0 + index * 0.1, duration: 0.5 }}
                    whileHover={{ 
                      y: -5,
                      backgroundColor: "#f9fafb"
                    }}
                  >
                    <div className="p-3 bg-indigo-100 dark:bg-gray-700 rounded-lg mr-4">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">{benefit.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{benefit.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Testimonials */}
            <motion.div 
              className="bg-gradient-to-r from-amber-400 to-yellow-300 dark:from-amber-500 dark:to-yellow-400 rounded-3xl p-8 shadow-xl"
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
                    className="bg-white/80 p-6 rounded-xl backdrop-blur-sm"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2.0 + index * 0.2, duration: 0.5 }}
                  >
                    <div className="flex items-center mb-4">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 mr-4" />
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
          className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-gray-900 dark:to-gray-800 rounded-3xl p-8 text-center text-white shadow-2xl"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.7 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Transform Your Life?</h2>
          <p className="text-xl text-indigo-200 max-w-2xl mx-auto mb-8">
            Join thousands of satisfied members and start your fitness journey today
          </p>
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-amber-400 to-yellow-300 text-gray-900 font-bold rounded-xl shadow-lg flex items-center justify-center mx-auto"
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
  );
};

export default JoinUs;