import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getEventById } from '../services/eventService';

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const data = await getEventById(eventId);
        setEvent(data);
      } catch (error) {
        console.error('Failed to fetch event details', error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const getFullPhotoUrl = (photoUrl) => {
    const baseUrl = "http://localhost:5048"; // Update to your actual backend URL
    return `${baseUrl}${photoUrl}`;
  };

  if (!event) {
    return (
      <div>
        <Header />
        <div className="bg-gray-900 min-h-screen text-white p-8 flex items-center justify-center">
          <p>Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="bg-gray-900 min-h-screen text-white p-8">
        <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
          {event.photoUrl && (
            <img
              src={getFullPhotoUrl(event.photoUrl)}
              alt={event.title}
              className="w-full h-64 object-cover rounded-t-lg mb-4"
            />
          )}
          <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
          <p className="text-lg mb-4">{event.description}</p>
          <p className="text-lg font-bold mb-4">
            {new Date(event.fromDate).toLocaleDateString()} - {new Date(event.toDate).toLocaleDateString()}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventDetails;
