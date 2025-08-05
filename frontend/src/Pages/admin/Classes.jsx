import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { classes_fetch, classesCreate, classesDelete } from '../../services/adminService';
import { Message } from 'rsuite';

const Classes = ({ colors, mode }) => {
  const [classForm, setClassForm] = useState({
    classname: '',
    trainer: '',
    date: '',
    time: '',
    duration: 60,
    capacity: 20,
    description: '',
    
  });

  const [classes, setClasses] = useState()
  const slide = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5 }
};

  const [editId, setEditId] = useState(null);
  const [viewing, setViewing] = useState(null);
 const [message, setMessage] = useState();
  const [showMessage, setShowMessage] = useState(false);
  const [type, setType] = useState();
useEffect(() =>{
    data()

  },[])
  const handleClassChange = (e) => {
    const { name, value } = e.target;
    setClassForm(prev => ({ ...prev, [name]: value }));
  };

  const submitClass = async(e) => {
    e.preventDefault();
 console.log(classForm)
    const newClass = {
      id: editId,
      classname: classForm.classname,
      trainer: classForm.trainer,
      time: classForm.time,
      attendees: 0,
      capacity: classForm.capacity,
      description: classForm.description
    };

     try{
     
      const result = await classesCreate(newClass);
      if(result.data.success){
        setType('success');
        setMessage(editId !== null ? "Classes updated successfully" : "Classes created successfully");
        setShowMessage(true);
        setTimeout(() =>{
          setShowMessage(false)

        },2000)
        if(!editId){
         setClasses(classes?prev => [...prev, newClass]:[newClass]);
        }
      }
      if(editId){
        setClasses(prev => prev.map((cls) => cls.id === editId? newClass: cls))
      }
      
     
      
    

    setClassForm({
      classname: '',
      trainer: '',
      date: '',
      time: '',
      duration: 60,
      capacity: 20,
      description: ''
    });
    setEditId(null);
  }catch(err){
    if(err.response?.data){
       setType('warning');
        setMessage(err.response.data.error);
        setShowMessage(true);
        setTimeout(() =>{
          setShowMessage(false)

        },2000)
        console.log(err.message)

    }
  }
  };
  const data = async() =>{
    const result = await classes_fetch();
    if(result.data.success){
      setClasses(result.data.data)
      console.log(result.data.data)
    }
  }

  const handleEdit = (cls) => {
    setClassForm({
      classname: cls.classname,
      trainer: cls.trainer,
      date: '', // Not available in original data
      time: cls.time,
      duration: 60,
      capacity: cls.capacity,
      description: cls.description
    });
    setEditId(cls.id);
  };

  const handleCancel = async(id) => {
    
    const confirm = window.confirm("Are you sure you want to cancel this class?");
    if (confirm) {
      try{
      const result = await classesDelete(id);
      if(result.data.success){
         
        setType('success');
        setMessage(result.data.message);
        setShowMessage(true);
        setTimeout(() =>{
          setShowMessage(false)

        },2000)
      setClasses(prev => prev.filter(cls => cls.id !== id));
      }
        }catch(err){
      if(err.response?.data){
           setType('warning');
        setMessage(err.response.data.error);
        setShowMessage(true);
        setTimeout(() =>{
          setShowMessage(false)

        },2000)

      }
    }
    }
  };

  const handleView = (cls) => {
    setViewing(cls);
  };

  const closeView = () => {
    setViewing(null);
  };
  

  return (
    <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
      {/* Form */}
      <motion.div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: colors.card }}>
        <h3 className="text-xl font-bold mb-6" style={{ color: colors.text }}>
          {editId ? 'Edit Class' : 'Schedule New Class'}
        </h3>

        <form onSubmit={submitClass}>
          {/* Class Name & Trainer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2" style={{ color: colors.text }}>Class Name</label>
              <input type="text" name="classname" value={classForm.classname} onChange={handleClassChange}
                className="w-full px-4 py-2 rounded-lg border"
                style={{
                  backgroundColor: mode === 'dark' ? '#374151' : '#f9fafb',
                  borderColor: mode === 'dark' ? '#4b5563' : '#e5e7eb',
                  color: colors.text
                }} required />
            </div>

            <div>
              <label className="block mb-2" style={{ color: colors.text }}>Trainer</label>
              <select name="trainer" value={classForm.trainer} onChange={handleClassChange}
                className="w-full px-4 py-2 rounded-lg border"
                style={{
                  backgroundColor: mode === 'dark' ? '#374151' : '#f9fafb',
                  borderColor: mode === 'dark' ? '#4b5563' : '#e5e7eb',
                  color: colors.text
                }} required>
                <option value="">Select Trainer</option>
                <option value="Ravi">Ravi Kumar</option>
                <option value="Priya">Priya Sharma</option>
                <option value="Aman">Aman Singh</option>
                <option value="Neha">Neha Patel</option>
              </select>
            </div>
          </div>

          {/* Time & Capacity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2" style={{ color: colors.text }}>Time</label>
              <input type="time" name="time" value={classForm.time} onChange={handleClassChange}
                className="w-full px-4 py-2 rounded-lg border"
                style={{
                  backgroundColor: mode === 'dark' ? '#374151' : '#f9fafb',
                  borderColor: mode === 'dark' ? '#4b5563' : '#e5e7eb',
                  color: colors.text
                }} required />
            </div>
            <div>
              <label className="block mb-2" style={{ color: colors.text }}>Capacity</label>
              <input type="number" name="capacity" value={classForm.capacity} onChange={handleClassChange}
                className="w-full px-4 py-2 rounded-lg border"
                style={{
                  backgroundColor: mode === 'dark' ? '#374151' : '#f9fafb',
                  borderColor: mode === 'dark' ? '#4b5563' : '#e5e7eb',
                  color: colors.text
                }} min="5" max="50" required />
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block mb-2" style={{ color: colors.text }}>Description</label>
            <textarea name="description" value={classForm.description} onChange={handleClassChange}
              className="w-full px-4 py-2 rounded-lg border"
              rows="3"
              style={{
                backgroundColor: mode === 'dark' ? '#374151' : '#f9fafb',
                borderColor: mode === 'dark' ? '#4b5563' : '#e5e7eb',
                color: colors.text
              }} />
          </div>

          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-lg font-medium"
            style={{
              background: mode === 'dark'
                ? 'linear-gradient(90deg, #fbbf24, #d97706)'
                : 'linear-gradient(90deg, #4f46e5, #7c3aed)',
              color: mode === 'dark' ? '#1f2937' : '#ffffff'
            }} type="submit">
            {editId ? 'Update Class' : 'Schedule Class'}
          </motion.button>
        </form>
      </motion.div>

      {/* Upcoming Classes */}
      <motion.div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: colors.card }}>
        <h3 className="text-xl font-bold mb-6" style={{ color: colors.text }}>Upcoming Classes</h3>
        <div className="space-y-4">
          {classes?classes.map((cls, index) => (
            <motion.div key={cls.id} className="flex justify-between items-center p-4 rounded-lg"
              style={{ backgroundColor: mode === 'dark' ? '#374151' : '#f9fafb' }}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.01 }}>
              <div>
                <p className="font-medium" style={{ color: colors.text }}>{cls.classname}</p>
                <p className="text-sm" style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                  {cls.time} • {cls.trainer}
                </p>
              </div>
              <div className="text-right space-x-2">
                <motion.button onClick={() => handleView(cls)}
                  className="text-sm px-2 py-1 rounded" style={{ color: colors.primary }}>
                  View
                </motion.button>
                <motion.button onClick={() => handleEdit(cls)}
                  className="text-sm px-2 py-1 rounded" style={{ color: colors.primary }}>
                  Edit
                </motion.button>
                <motion.button onClick={() => handleCancel(cls.id)}
                  className="text-sm px-2 py-1 rounded" style={{ color: colors.accent }}>
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          )):''}
        </div>
      </motion.div>

      {/* View Modal */}
      {viewing && (
        <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Class Details</h2>
            <p><strong>Name:</strong> {viewing.name}</p>
            <p><strong>Trainer:</strong> {viewing.trainer}</p>
            <p><strong>Time:</strong> {viewing.time}</p>
            <p><strong>Capacity:</strong> {viewing.attendees}/{viewing.capacity}</p>
            <p><strong>Description:</strong> {viewing.description}</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg" onClick={closeView}>
              Close
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Classes;
