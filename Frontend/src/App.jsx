import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios'; // Ensure you have axios installed
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Home from './Components/HomePage/Home';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import ContactUs from './Components/Contact/ContactUs';
import Event from './Components/Events/Event';
import Shelter from './Components/Shelter/Shelter';
import Welcome from './Components/Welcome/Welcome';
import Dashboard from './Components/Dashboard/Dashboard';
import { useAuth } from './Contexts/AuthContext';
import PetProfile from './Components/PetProfile/PetProfile';
import pet from './Components/PetProfile/petData'
import ScheduledAppointments from './Components/Appointments/ScheduledAppointments';
import AppointmentDetail from './Components/Appointments/AppointmentDetail';
import DonationPage from './Components/Donation/DonationPage';
import Questionnaire from './Components/Questionaire/Questionnaire';


function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const { isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5008/api/protected', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        // User is authenticated
        setIsAuthenticated(true);
        setIsAdmin(response.data.isAdmin || false); // Set admin status
      })
      .catch(error => {
        console.error('Token verification failed:', error);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setIsAdmin(false);
      });
    } else {
      setIsAuthenticated(false);
      setIsAdmin(false);
    }
  }, [setIsAuthenticated, setIsAdmin]);

  return (
    <>
      {!isAuthPage && <Header isLoggedIn={isAuthenticated} isAdmin={isAdmin} />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/shelter' element={<Shelter />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/welcome' element={<Welcome />} />
        <Route path='/events' element={<Event />} />
        <Route path='/petprofile' element={<PetProfile pet={pet}/>} />
        <Route path='/qform' element={<Questionnaire/>} />
        <Route path='/schapp' element={<ScheduledAppointments/>} />
        <Route path='/appointment/:appointmentId' element={<AppointmentDetail/>} />
        <Route path='/donate' element={<DonationPage/>} />
      </Routes>
      {!isAuthPage && <Footer />}
    </>
  );
}

export default App;
