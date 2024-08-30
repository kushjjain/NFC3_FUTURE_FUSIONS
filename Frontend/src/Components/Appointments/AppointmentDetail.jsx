import React from 'react';
import { useParams } from 'react-router-dom';
import './AppointmentDetail.css';

const AppointmentDetail = () => {
  const { appointmentId } = useParams();

  // Sample appointment data
  const appointments = [
    {
      id: '1',
      petName: 'Buddy',
      adopterName: 'John Doe',
      scheduledDate: '2024-09-15',
      status: 'Confirmed',
      contactInfo: 'johndoe@example.com',
      notes: 'Excited to meet Buddy!',
    },
    {
      id: '2',
      petName: 'Milo',
      adopterName: 'Jane Smith',
      scheduledDate: '2024-09-20',
      status: 'Pending',
      contactInfo: 'janesmith@example.com',
      notes: 'Looking forward to the appointment.',
    },
    // Add more sample data here...
  ];

  // Find the appointment with the matching ID
  const appointment = appointments.find(app => app.id === appointmentId);

  if (!appointment) {
    return <p>Appointment not found.</p>;
  }

  return (
    <div className="appointmentDetailContainer">
      <h1>Appointment Details</h1>
      <div className="appointmentInfo">
        <p><strong>Pet Name:</strong> {appointment.petName}</p>
        <p><strong>Adopter Name:</strong> {appointment.adopterName}</p>
        <p><strong>Scheduled Date:</strong> {appointment.scheduledDate}</p>
        <p><strong>Status:</strong> {appointment.status}</p>
        <p><strong>Contact Info:</strong> {appointment.contactInfo}</p>
        <p><strong>Notes:</strong> {appointment.notes}</p>
      </div>
    </div>
  );
};

export default AppointmentDetail;
