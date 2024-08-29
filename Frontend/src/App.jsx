import React from 'react';
import {  Routes, Route, useLocation } from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Home from './Components/HomePage/Home';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import './App.css';
import ContactUs from './Components/Contact/ContactUs';
import Event from './Components/Events/Event'
import Shelter from './Components/Shelter/Shelter';
import Welcome from './Components/Welcome/Welcome';
import Dashboard from './Components/Dashboard/Dashboard';

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isAdmin = true 
  const isLoggedIn = true
  return (
    <>
      {!isAuthPage && <Header isAdmin={isAdmin} isLoggedIn={isLoggedIn}/>}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/shelter' element={<Shelter/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/contact' element={<ContactUs/>} />
        <Route path='/welcome' element={<Welcome/>} />
        <Route path='/events' element={<Event/>} />
      </Routes>
      {!isAuthPage && <Footer />}
    </>
  );
}

export default App;




// import React from 'react';
// import { Routes, Route, useLocation } from 'react-router-dom';
// import Login from './Components/Login/Login';
// import Register from './Components/Register/Register';
// import Home from './Components/HomePage/Home';
// import Header from './Components/Header/Header';
// import Footer from './Components/Footer/Footer';
// import ContactUs from './Components/Contact/ContactUs';
// import Shelter from './Components/Shelter/Shelter';
// import Welcome from './Components/Welcome/Welcome';
// import Dashboard from './Components/Dashboard/Dashboard';
// import Event from './Components/Events/Event';
// import ProtectedRoute from './Components/Routes/ProtectedRoutes'

// function App() {
//   const location = useLocation();
//   const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
//   const isAdmin = true; // This should be dynamically set based on user authentication

//   return (
//     <>
//       {!isAuthPage && <Header isAdmin={isAdmin} />}
//       <Routes>
//         <Route path='/' element={<Home />} />
//         <Route path='/login' element={<Login />} />
//         <Route path='/register' element={<Register />} />
//         <Route path='/shelter' element={<ProtectedRoute element={<Shelter />} />} />
//         <Route path='/dashboard' element={<ProtectedRoute element={<Dashboard />} />} />
//         <Route path='/contact' element={<ProtectedRoute element={<ContactUs />} />} />
//         <Route path='/welcome' element={<ProtectedRoute element={<Welcome />} />} />
//         <Route path='/events' element={<ProtectedRoute element={<Event />} />} />
//       </Routes>
//       {!isAuthPage && <Footer />}
//     </>
//   );
// }

// export default App;
