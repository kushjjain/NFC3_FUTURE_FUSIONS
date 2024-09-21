import React, { useState, useEffect } from 'react';
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
import axios from 'axios';
import ShelterUpdate from './Components/Shelter/ShelterUpdate';
import UserProfile from './Components/Profile/UserProfile';
import ShelterPage from "./Components/Shelter/ShelterPage"
import ShelterForm from './Components/Shelter/ShelterForm';
import CreateEvent from './Components/Events/CreateEvent';
function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5008/api/auth/check-session', { withCredentials: true });
        if (response.status === 200) {
          setIsLoggedIn(true);
          if (response.data.isAdmin) {
            setIsAdmin(true);
          }
        }
      } catch (error) {
        console.error('Session not valid', error);
      }
    };
    checkSession();
  }, []);

  return (
    <div>
      <div  className=' min-h-screen'>
        {!isAuthPage && <Header isLoggedIn={isLoggedIn} isAdmin={isAdmin} setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/shelter/add-pet/:shelterId' element={<Shelter isAdmin={isAdmin} />} />
          <Route path="/shelter/pets/update/:petId" element={<ShelterUpdate isAdmin={true} />} />
          <Route path="/shelter" element={<ShelterPage />} />
          <Route path="/add-shelter" element={<ShelterForm />} />
          <Route path='/dashboard' element={<Dashboard isAdmin={isAdmin} />} />
          <Route path='/contact' element={<ContactUs />} />
          <Route path='/adopt-us' element={<HomePage isAdmin={isAdmin} />} />
          <Route path='/adopt-us/:id' element={<PetProfile />} />
          <Route path='/welcome' element={<Welcome />} />
          <Route path='/events' element={<Event isAdmin={isAdmin}/>} />
          <Route path="/events/create" element={<CreateEvent />} />
          {/* <Route path='/petprofile' element={<PetProfile pet={pet}/>} /> */}
          <Route path='/qform' element={<Questionnaire />} />
          <Route path='/schapp' element={<ScheduledAppointments />} />
          <Route path='/appointment/:appointmentId' element={<AppointmentDetail />} />
          <Route path='/donate' element={<DonationPage />} />
          <Route path='/profile' element={<UserProfile />} />
        </Routes>
        {!isAuthPage && <Footer />}
      </div>

    </div>
  );
}

export default App;
