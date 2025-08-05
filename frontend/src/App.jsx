import React, { useEffect } from 'react';
import {  Routes, Route, useNavigate } from 'react-router-dom';


import Home from './Pages/Home';
import About from './Pages/About';
import Pricing from './Pages/Pricing';
import JoinUs from './Pages/JoinUs';
import Admin from './Pages/Admin';
import Login from './Pages/Login'
import Signup from './Pages/Signup';
import 'rsuite/dist/rsuite.min.css';
import { useDispatch } from 'react-redux';
import { userinfo } from './features/userinfo';
import { user } from './services/authService';
function App() {
  const dispatch = useDispatch()

  useEffect(()=>{
    const fetch = async() =>{
      
      let token = localStorage.getItem("token")
      if(token){
      const result1 = await user(token);
            console.log(result1)
            if(result1){
              dispatch(userinfo(result1.data.data))
             
              
               
            
            }
          }

    }
    fetch()
     

  },[])
  
  return (
    
      <div className="bg-gray-900 text-white min-h-screen ">
       
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/pricing' element={<Pricing/>}></Route>
          <Route path='/join' element={<JoinUs/>}></Route>
          <Route path='/admin' element={<Admin/>}></Route>
          <Route path = "/login" element={<Login/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>

         
        </Routes>
  
      </div>
    
  );
}

export default App;

