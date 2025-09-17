import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaImage, 
  FaUser, 
  FaQuoteLeft, 
  FaUpload, 
  FaTrash, 
  FaEdit, 
  FaPlus,
  FaSave
} from 'react-icons/fa';

const WebsiteContent = ({ colors, mode }) => {
  const [activeTab, setActiveTab] = useState('slider');
  const [sliderImages, setSliderImages] = useState([
    { id: 1, url: '/api/placeholder/800/400', title: 'Summer Fitness Challenge', description: 'Join our summer program and get 20% off', active: true },
    { id: 2, url: '/api/placeholder/800/400', title: 'New Yoga Classes', description: 'Experience peace with our new yoga sessions', active: true },
  ]);
  
  const [trainers, setTrainers] = useState([
    { id: 1, name: 'John Doe', specialty: 'Weight Training', image: '/api/placeholder/200/200', bio: 'Certified trainer with 10+ years of experience', active: true },
    { id: 2, name: 'Jane Smith', specialty: 'Yoga & Meditation', image: '/api/placeholder/200/200', bio: 'Yoga expert with 8 years of teaching experience', active: true },
  ]);
  
  const [quotes, setQuotes] = useState([
    { id: 1, text: 'The only bad workout is the one that didn\'t happen.', author: 'Unknown', active: true },
    { id: 2, text: 'Your body can stand almost anything. It\'s your mind that you have to convince.', author: 'Unknown', active: true },
  ]);
  
  const [newImage, setNewImage] = useState({ title: '', description: '', file: null });
  const [newTrainer, setNewTrainer] = useState({ name: '', specialty: '', bio: '', file: null });
  const [newQuote, setNewQuote] = useState({ text: '', author: '' });

  const handleImageUpload = (e) => {
    e.preventDefault();
    if (newImage.file) {
      const newItem = {
        id: Date.now(),
        url: URL.createObjectURL(newImage.file),
        title: newImage.title,
        description: newImage.description,
        active: true
      };
      setSliderImages([...sliderImages, newItem]);
      setNewImage({ title: '', description: '', file: null });
    }
  };

  const handleTrainerAdd = (e) => {
    e.preventDefault();
    if (newTrainer.file) {
      const newItem = {
        id: Date.now(),
        name: newTrainer.name,
        specialty: newTrainer.specialty,
        bio: newTrainer.bio,
        image: URL.createObjectURL(newTrainer.file),
        active: true
      };
      setTrainers([...trainers, newItem]);
      setNewTrainer({ name: '', specialty: '', bio: '', file: null });
    }
  };

  const handleQuoteAdd = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      text: newQuote.text,
      author: newQuote.author,
      active: true
    };
    setQuotes([...quotes, newItem]);
    setNewQuote({ text: '', author: '' });
  };

  const toggleItemStatus = (type, id) => {
    if (type === 'slider') {
      setSliderImages(sliderImages.map(img => 
        img.id === id ? { ...img, active: !img.active } : img
      ));
    } else if (type === 'trainer') {
      setTrainers(trainers.map(trainer => 
        trainer.id === id ? { ...trainer, active: !trainer.active } : trainer
      ));
    } else if (type === 'quote') {
      setQuotes(quotes.map(quote => 
        quote.id === id ? { ...quote, active: !quote.active } : quote
      ));
    }
  };

  const deleteItem = (type, id) => {
    if (type === 'slider') {
      setSliderImages(sliderImages.filter(img => img.id !== id));
    } else if (type === 'trainer') {
      setTrainers(trainers.filter(trainer => trainer.id !== id));
    } else if (type === 'quote') {
      setQuotes(quotes.filter(quote => quote.id !== id));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold" style={{ color: colors.text }}>Website Content Management</h2>
        <p className="text-sm" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
          Manage slider images, trainer profiles, and motivational quotes for your website
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b mb-6" style={{ borderColor: mode === 'dark' ? '#374151' : '#e5e7eb' }}>
        {['slider', 'trainers', 'quotes'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 font-medium text-sm capitalize ${activeTab === tab ? 'border-b-2' : ''}`}
            style={{
              color: activeTab === tab ? colors.primary : colors.text,
              borderColor: activeTab === tab ? colors.primary : 'transparent'
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'slider' ? 'Slider Images' : tab}
          </button>
        ))}
      </div>

      {/* Slider Images Tab */}
      {activeTab === 'slider' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div 
            className="rounded-xl shadow-lg p-6"
            style={{ backgroundColor: colors.card }}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <h3 className="text-lg font-bold mb-4" style={{ color: colors.text }}>Add New Slider Image</h3>
            <form onSubmit={handleImageUpload}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Title</label>
                <input
                  type="text"
                  value={newImage.title}
                  onChange={(e) => setNewImage({...newImage, title: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border"
                  style={{ 
                    backgroundColor: mode === 'dark' ? '#374151' : '#f9fafb',
                    borderColor: mode === 'dark' ? '#4b5563' : '#e5e7eb',
                    color: colors.text
                  }}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Description</label>
                <textarea
                  value={newImage.description}
                  onChange={(e) => setNewImage({...newImage, description: e.target.value})}
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
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Image</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer"
                    style={{ 
                      borderColor: mode === 'dark' ? '#4b5563' : '#d1d5db',
                      backgroundColor: mode === 'dark' ? '#374151' : '#f9fafb'
                    }}>
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FaUpload className="w-8 h-8 mb-3" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }} />
                      <p className="text-sm" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                        Click to upload or drag and drop
                      </p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={(e) => setNewImage({...newImage, file: e.target.files[0]})}
                      accept="image/*"
                      required
                    />
                  </label>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-lg font-medium flex items-center justify-center"
                style={{ 
                  background: mode === 'dark' 
                    ? 'linear-gradient(90deg, #fbbf24, #d97706)' 
                    : 'linear-gradient(90deg, #4f46e5, #7c3aed)',
                  color: mode === 'dark' ? '#1f2937' : '#ffffff'
                }}
                type="submit"
              >
                <FaPlus className="mr-2" /> Upload Image
              </motion.button>
            </form>
          </motion.div>

          <motion.div 
            className="rounded-xl shadow-lg p-6"
            style={{ backgroundColor: colors.card }}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <h3 className="text-lg font-bold mb-4" style={{ color: colors.text }}>Slider Images</h3>
            <div className="space-y-4">
              {sliderImages.map((image) => (
                <div key={image.id} className="p-4 rounded-lg border"
                  style={{ 
                    backgroundColor: mode === 'dark' ? '#374151' : '#f9fafb',
                    borderColor: mode === 'dark' ? '#4b5563' : '#e5e7eb'
                  }}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-lg overflow-hidden mr-4">
                        <img src={image.url} alt={image.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-medium" style={{ color: colors.text }}>{image.title}</h4>
                        <p className="text-sm" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                          {image.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className={`px-3 py-1 rounded text-xs ${
                          image.active 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                        onClick={() => toggleItemStatus('slider', image.id)}
                      >
                        {image.active ? 'Active' : 'Inactive'}
                      </button>
                      <button
                        className="p-1 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                        onClick={() => deleteItem('slider', image.id)}
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Trainers Tab */}
      {activeTab === 'trainers' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div 
            className="rounded-xl shadow-lg p-6"
            style={{ backgroundColor: colors.card }}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <h3 className="text-lg font-bold mb-4" style={{ color: colors.text }}>Add New Trainer</h3>
            <form onSubmit={handleTrainerAdd}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Name</label>
                <input
                  type="text"
                  value={newTrainer.name}
                  onChange={(e) => setNewTrainer({...newTrainer, name: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border"
                  style={{ 
                    backgroundColor: mode === 'dark' ? '#374151' : '#f9fafb',
                    borderColor: mode === 'dark' ? '#4b5563' : '#e5e7eb',
                    color: colors.text
                  }}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Specialty</label>
                <input
                  type="text"
                  value={newTrainer.specialty}
                  onChange={(e) => setNewTrainer({...newTrainer, specialty: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border"
                  style={{ 
                    backgroundColor: mode === 'dark' ? '#374151' : '#f9fafb',
                    borderColor: mode === 'dark' ? '#4b5563' : '#e5e7eb',
                    color: colors.text
                  }}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Bio</label>
                <textarea
                  value={newTrainer.bio}
                  onChange={(e) => setNewTrainer({...newTrainer, bio: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border"
                  style={{ 
                    backgroundColor: mode === 'dark' ? '#374151' : '#f9fafb',
                    borderColor: mode === 'dark' ? '#4b5563' : '#e5e7eb',
                    color: colors.text
                  }}
                  rows="3"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Photo</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer"
                    style={{ 
                      borderColor: mode === 'dark' ? '#4b5563' : '#d1d5db',
                      backgroundColor: mode === 'dark' ? '#374151' : '#f9fafb'
                    }}>
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FaUpload className="w-8 h-8 mb-3" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }} />
                      <p className="text-sm" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                        Click to upload trainer photo
                      </p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={(e) => setNewTrainer({...newTrainer, file: e.target.files[0]})}
                      accept="image/*"
                      required
                    />
                  </label>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-lg font-medium flex items-center justify-center"
                style={{ 
                  background: mode === 'dark' 
                    ? 'linear-gradient(90deg, #fbbf24, #d97706)' 
                    : 'linear-gradient(90deg, #4f46e5, #7c3aed)',
                  color: mode === 'dark' ? '#1f2937' : '#ffffff'
                }}
                type="submit"
              >
                <FaPlus className="mr-2" /> Add Trainer
              </motion.button>
            </form>
          </motion.div>

          <motion.div 
            className="rounded-xl shadow-lg p-6"
            style={{ backgroundColor: colors.card }}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <h3 className="text-lg font-bold mb-4" style={{ color: colors.text }}>Trainers</h3>
            <div className="space-y-4">
              {trainers.map((trainer) => (
                <div key={trainer.id} className="p-4 rounded-lg border"
                  style={{ 
                    backgroundColor: mode === 'dark' ? '#374151' : '#f9fafb',
                    borderColor: mode === 'dark' ? '#4b5563' : '#e5e7eb'
                  }}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                        <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-medium" style={{ color: colors.text }}>{trainer.name}</h4>
                        <p className="text-sm font-medium" style={{ color: mode === 'dark' ? '#fbbf24' : '#4f46e5' }}>
                          {trainer.specialty}
                        </p>
                        <p className="text-sm mt-1" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                          {trainer.bio}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className={`px-3 py-1 rounded text-xs ${
                          trainer.active 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                        onClick={() => toggleItemStatus('trainer', trainer.id)}
                      >
                        {trainer.active ? 'Active' : 'Inactive'}
                      </button>
                      <button
                        className="p-1 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                        onClick={() => deleteItem('trainer', trainer.id)}
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Quotes Tab */}
      {activeTab === 'quotes' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div 
            className="rounded-xl shadow-lg p-6"
            style={{ backgroundColor: colors.card }}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <h3 className="text-lg font-bold mb-4" style={{ color: colors.text }}>Add New Quote</h3>
            <form onSubmit={handleQuoteAdd}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Quote Text</label>
                <textarea
                  value={newQuote.text}
                  onChange={(e) => setNewQuote({...newQuote, text: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border"
                  style={{ 
                    backgroundColor: mode === 'dark' ? '#374151' : '#f9fafb',
                    borderColor: mode === 'dark' ? '#4b5563' : '#e5e7eb',
                    color: colors.text
                  }}
                  rows="3"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Author</label>
                <input
                  type="text"
                  value={newQuote.author}
                  onChange={(e) => setNewQuote({...newQuote, author: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border"
                  style={{ 
                    backgroundColor: mode === 'dark' ? '#374151' : '#f9fafb',
                    borderColor: mode === 'dark' ? '#4b5563' : '#e5e7eb',
                    color: colors.text
                  }}
                  required
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-lg font-medium flex items-center justify-center"
                style={{ 
                  background: mode === 'dark' 
                    ? 'linear-gradient(90deg, #fbbf24, #d97706)' 
                    : 'linear-gradient(90deg, #4f46e5, #7c3aed)',
                  color: mode === 'dark' ? '#1f2937' : '#ffffff'
                }}
                type="submit"
              >
                <FaPlus className="mr-2" /> Add Quote
              </motion.button>
            </form>
          </motion.div>

          <motion.div 
            className="rounded-xl shadow-lg p-6"
            style={{ backgroundColor: colors.card }}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <h3 className="text-lg font-bold mb-4" style={{ color: colors.text }}>Motivational Quotes</h3>
            <div className="space-y-4">
              {quotes.map((quote) => (
                <div key={quote.id} className="p-4 rounded-lg border"
                  style={{ 
                    backgroundColor: mode === 'dark' ? '#374151' : '#f9fafb',
                    borderColor: mode === 'dark' ? '#4b5563' : '#e5e7eb'
                  }}>
                  <div className="flex justify-between items-start">
                    <div>
                      <FaQuoteLeft className="text-2xl mb-2" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }} />
                      <p className="italic mb-2" style={{ color: colors.text }}>"{quote.text}"</p>
                      <p className="text-sm font-medium" style={{ color: mode === 'dark' ? '#fbbf24' : '#4f46e5' }}>
                        - {quote.author}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className={`px-3 py-1 rounded text-xs ${
                          quote.active 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                        onClick={() => toggleItemStatus('quote', quote.id)}
                      >
                        {quote.active ? 'Active' : 'Inactive'}
                      </button>
                      <button
                        className="p-1 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                        onClick={() => deleteItem('quote', quote.id)}
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default WebsiteContent;