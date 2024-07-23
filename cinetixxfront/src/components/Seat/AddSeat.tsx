import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddSeat = ({ onSuccess }) => {
  const [seatNumber, setSeatNumber] = useState('');
  const [seatRow, setSeatRow] = useState('');
  const [cinemaRooms, setCinemaRooms] = useState([]);
  const [selectedCinemaRoomId, setSelectedCinemaRoomId] = useState('');

  useEffect(() => {
    fetchCinemaRooms();
  }, []);

  const fetchCinemaRooms = async () => {
    try {
      const response = await axios.get('http://localhost:5048/api/CinemaRoom');
      setCinemaRooms(response.data);
    } catch (error) {
      console.error('Error fetching cinema rooms:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5048/api/Seat', {
        seatNumber: seatNumber,
        seatRow: seatRow,
        cinemaRoomId: selectedCinemaRoomId
      });
      onSuccess(); 
    } catch (error) {
      console.error('Error adding seat:', error);
      alert('Failed to add seat. Please try again later.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-8 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add Seat</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Seat Number:</label>
          <input
            type="text"
            value={seatNumber}
            onChange={(e) => setSeatNumber(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Seat Row:</label>
          <input
            type="text"
            value={seatRow}
            onChange={(e) => setSeatRow(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Cinema Room:</label>
          <select
            value={selectedCinemaRoomId}
            onChange={(e) => setSelectedCinemaRoomId(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            required
          >
            <option value="">Select Cinema Room</option>
            {cinemaRooms.map(room => (
              <option key={room.id} value={room.id}>{room.name}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
        >
          Add Seat
        </button>
      </form>
    </div>
  );
};

export default AddSeat;
