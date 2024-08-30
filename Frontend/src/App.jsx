import React, { useState} from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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
import PetProfile from './Components/PetProfile/PetProfile';
import pet from './Components/PetProfile/petData'
import ScheduledAppointments from './Components/Appointments/ScheduledAppointments';
import AppointmentDetail from './Components/Appointments/AppointmentDetail';
import DonationPage from './Components/Donation/DonationPage';
import Questionnaire from './Components/Questionaire/Questionnaire';
import HomePage from './Components/PetProfile/HomePage';


function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); 

 

  return (
    <>
      {!isAuthPage && <Header isLoggedIn={isLoggedIn} isAdmin={isAdmin} setIsLoggedIn={setIsLoggedIn} />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path='/register' element={<Register />} />
        <Route path='/shelter' element={<Shelter />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/adopt-us' element={<HomePage/> } />
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
