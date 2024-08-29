import React from 'react';
import {  Routes, Route, useLocation } from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Home from './Components/HomePage/Home';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Dashboard from './Components/Dashboard/Dashboard';
import ContactUs from './Components/Contact/ContactUs'
import './App.css';
import ContactUs from './Components/Contact/ContactUs';
import Shelter from './Components/Shelter/Shelter';
import Welcome from './Components/Welcome/Welcome';

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isAdmin = true 
  return (
    <>
      {!isAuthPage && <Header isAdmin={isAdmin}/>}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
<<<<<<< HEAD
        <Route path='/shelter' element={<Shelter/>} />
        <Route path='/contact' element={<ContactUs/>} />
        <Route path='/welcome' element={<Welcome/>} />
=======
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/contact' element={<ContactUs/>} />
>>>>>>> 58efdabb15f517ec7dd0964f075b88ec020dd029
      </Routes>
      {!isAuthPage && <Footer />}
    </>
  );
}

export default App;
