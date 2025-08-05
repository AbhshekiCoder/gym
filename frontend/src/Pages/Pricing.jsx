import { motion } from 'framer-motion';
import { FaCheck, FaDumbbell, FaCrown, FaStar, FaFire, FaCalendarAlt, FaLockOpen, FaUtensils, FaUserFriends, FaGift } from 'react-icons/fa';
import  Navbar  from '../Components/Navbar'

const Pricing = () => {
  const plans = [
    { 
      title: "Monthly", 
      price: "₹999", 
      features: ["Unlimited Access", "Free Locker", "Basic Classes"],
      icon: <FaCalendarAlt className="text-indigo-500" />,
      color: "from-indigo-500 to-purple-600",
      popular: false
    },
    { 
      title: "Quarterly", 
      price: "₹2499", 
      features: ["All Monthly Features", "+ Diet Plan", "+ 1 PT Session", "+ Premium Classes"],
      icon: <FaDumbbell className="text-amber-400" />,
      color: "from-amber-500 to-yellow-400",
      popular: true
    },
    { 
      title: "Yearly", 
      price: "₹8999", 
      features: ["All Quarterly Features", "+ Gym Kit", "+ 3 PT Sessions", "+ Spa Access", "+ Nutrition Counseling"],
      icon: <FaCrown className="text-purple-400" />,
      color: "from-purple-500 to-pink-500",
      popular: false
    }
  ];

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-800 dark:to-gray-900 py-16 px-4 sm:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Navbar/>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
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
            <FaStar className="text-white text-2xl" />
          </motion.div>
          <motion.h1 
            className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-amber-400 dark:to-yellow-300"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Choose Your Perfect Plan
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            Transform your fitness journey with our flexible membership options
          </motion.p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, staggerChildren: 0.2 }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.title}
              className="relative"
              initial={{ y: 100, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ 
                delay: 0.8 + index * 0.2, 
                duration: 0.7, 
                type: "spring", 
                bounce: 0.4 
              }}
              whileHover={{ 
                y: -15,
                scale: 1.03
              }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-500 to-yellow-400 text-white px-6 py-2 rounded-full shadow-lg z-10 flex items-center">
                  <FaFire className="mr-2 animate-pulse" /> MOST POPULAR
                </div>
              )}
              
              <div className={`bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl h-full flex flex-col border-t-8 ${plan.popular ? 'border-amber-500' : 'border-transparent'}`}>
                <div className={`p-8 bg-gradient-to-r ${plan.color} text-white`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold flex items-center">
                        {plan.icon} <span className="ml-3">{plan.title}</span>
                      </h2>
                      <div className="mt-4 flex items-baseline">
                        <span className="text-4xl font-extrabold">{plan.price}</span>
                        {plan.title !== "Yearly" && (
                          <span className="ml-2 text-lg font-medium">/month</span>
                        )}
                      </div>
                    </div>
                    <div className="bg-white/20 p-3 rounded-lg">
                      {plan.icon}
                    </div>
                  </div>
                </div>
                
                <div className="p-6 flex-grow">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <motion.li 
                        key={i}
                        className="flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.0 + index * 0.2 + i * 0.1 }}
                      >
                        <FaCheck className="text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                <div className="px-6 pb-8">
                  <motion.button
                    className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 shadow-lg'
                        : 'bg-gradient-to-r from-gray-700 to-gray-800 dark:from-gray-700 dark:to-gray-800 hover:from-gray-800 hover:to-gray-900'
                    }`}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Started
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Features */}
        <motion.div 
          className="mt-20 max-w-4xl mx-auto bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 shadow-2xl text-white"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.7 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">All Plans Include</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <FaUserFriends className="text-3xl mb-4" />, title: "Community Events", desc: "Exclusive member gatherings" },
              { icon: <FaUtensils className="text-3xl mb-4" />, title: "Nutrition Guides", desc: "Weekly meal plans" },
              { icon: <FaLockOpen className="text-3xl mb-4" />, title: "24/7 Access", desc: "Workout anytime" },
              { icon: <FaGift className="text-3xl mb-4" />, title: "Welcome Kit", desc: "Gym essentials package" },
              { icon: <FaDumbbell className="text-3xl mb-4" />, title: "Equipment Orientation", desc: "Personalized training" },
              { icon: <FaStar className="text-3xl mb-4" />, title: "VIP Support", desc: "Priority assistance" }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.0 + index * 0.1, duration: 0.5 }}
                whileHover={{ 
                  y: -5,
                  backgroundColor: "rgba(255, 255, 255, 0.15)"
                }}
              >
                <motion.div
                  className="inline-block mb-2"
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-indigo-100">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Pricing;