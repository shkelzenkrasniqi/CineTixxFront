import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllAdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all bookings
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:5048/api/booking');
        setBookings(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const deleteBooking = async (id) => {
    try {
      await axios.delete(`http://localhost:5048/api/booking/${id}`);
      // Remove the deleted booking from the state
      setBookings(bookings.filter(booking => booking.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="text-center mt-4 text-xl">Loading...</div>;
  if (error) return <div className="text-center mt-4 text-xl text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">All Bookings</h2>
      <ul className="space-y-4">
        {bookings.map(booking => (
          <li key={booking.id} className="bg-white shadow-md p-4 rounded-lg">
            <p className="text-lg">Movie: {booking.screening.movie.movieName}</p>
            <p className="text-lg">Salla: {booking.screening.cinemaRoom.name}</p>
            <button 
              onClick={() => deleteBooking(booking.id)} 
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllAdminBookings;
