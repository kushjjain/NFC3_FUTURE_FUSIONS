import React from 'react';
import { Link } from 'react-router-dom';
import './ScheduledAppointments.css';

const ScheduledAppointments = () => {
  // Sample data for demonstration purposes
  const appointments = [
    {
      id: '1',
      petName: 'Buddy',
      adopterName: 'John Doe',
      scheduledDate: '2024-09-15',
      status: 'Confirmed',
    },
    {
      id: '2',
      petName: 'Milo',
      adopterName: 'Jane Smith',
      scheduledDate: '2024-09-20',
      status: 'Pending',
    },
    // Add more sample data here...
  ];

  if (!appointments || appointments.length === 0) {
    return <p>No scheduled appointments.</p>;
  }

  return (
    <div className="appointmentsContainer">
      <h1>Scheduled Appointments</h1>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id} className="appointmentItem">
            <Link to={`/appointment/${appointment.id}`}>
              <div>
                <strong>Pet Name:</strong> {appointment.petName} <br />
                <strong>Adopter Name:</strong> {appointment.adopterName} <br />
                <strong>Date:</strong> {appointment.scheduledDate} <br />
                <strong>Status:</strong> {appointment.status}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScheduledAppointments;
