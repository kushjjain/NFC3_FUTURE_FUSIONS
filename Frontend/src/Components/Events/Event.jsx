import React, { useState } from 'react';

const events = [
  {
    id: 1,
    title: 'Community Fundraiser',
    date: '2024-09-15',
    time: '10:00 AM',
    location: 'Community Center, City Park',
    description: 'Join us for a fundraiser event to support local charities. There will be various activities and entertainment for all ages.',
  },
  {
    id: 2,
    title: 'Volunteer Orientation',
    date: '2024-09-22',
    time: '2:00 PM',
    location: 'Old Age Home, Main Hall',
    description: 'An orientation session for new volunteers. Learn about our programs, meet other volunteers, and find out how you can get involved.',
  },
  {
    id: 3,
    title: 'Annual Gala Dinner',
    date: '2024-10-05',
    time: '6:00 PM',
    location: 'Grand Hotel, Downtown',
    description: 'A formal dinner event to celebrate our achievements and support our ongoing initiatives. Enjoy a night of fine dining and entertainment.',
  },
  {
    id: 4,
    title: 'Family Fun Day',
    date: '2024-10-12',
    time: '11:00 AM',
    location: 'City Park, Pavilion',
    description: 'A day of fun activities for families, including games, food stalls, and entertainment. All ages are welcome!',
  },
  {
    id: 5,
    title: 'Health and Wellness Workshop',
    date: '2024-10-19',
    time: '9:00 AM',
    location: 'Wellness Center, Room 101',
    description: 'A workshop focused on health and wellness for seniors and families. Topics include nutrition, exercise, and mental well-being.',
  },
  {
    id: 6,
    title: 'Holiday Craft Fair',
    date: '2024-11-02',
    time: '10:00 AM',
    location: 'Community Center, Exhibition Hall',
    description: 'Shop for handmade crafts and holiday gifts at our annual craft fair. Support local artisans and find unique items for the season.',
  }
];

const Event = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleClose = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Upcoming Events</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-50"
              onClick={() => handleEventClick(event)}
            >
              <h2 className="text-2xl font-semibold mb-2">{event.title}</h2>
              <p className="text-gray-600 mb-2">{event.date} at {event.time}</p>
              <p className="text-gray-800">{event.location}</p>
            </div>
          ))}
        </div>

        {selectedEvent && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative">
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                onClick={handleClose}
              >
                &times;
              </button>
              <h2 className="text-3xl font-bold mb-4">{selectedEvent.title}</h2>
              <p className="text-gray-600 mb-2">{selectedEvent.date} at {selectedEvent.time}</p>
              <p className="text-gray-800 mb-4">{selectedEvent.location}</p>
              <p className="text-gray-700 mb-4">{selectedEvent.description}</p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                onClick={() => alert('Registered for the event')}
              >
                Register
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Event;