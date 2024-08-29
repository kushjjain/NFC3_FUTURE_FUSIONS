import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Home from './Components/HomePage/Home';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Dashboard from './Components/Dashboard/Dashboard';
import ContactUs from './Components/Contact/ContactUs'
import './App.css';

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!isAuthPage && <Header />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/contact' element={<ContactUs/>} />
      </Routes>
      {!isAuthPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
