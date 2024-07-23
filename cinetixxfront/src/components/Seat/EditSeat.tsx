import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditSeat = ({ seatId, onCancel }) => {
  const [seat, setSeat] = useState({
    seatNumber: '',
    seatRow: '',
    cinemaRoomId: ''
  });
  const [cinemaRooms, setCinemaRooms] = useState([]);

  useEffect(() => {
    fetchSeat();
    fetchCinemaRooms();
  }, [seatId]);

  const fetchSeat = async () => {
    try {
      const response = await axios.get(`http://localhost:5048/api/Seat/${seatId}`);
      setSeat(response.data);
    } catch (error) {
      console.error('Error fetching seat:', error);
    }
  };

  const fetchCinemaRooms = async () => {
    try {
      const response = await axios.get('http://localhost:5048/api/CinemaRoom');
      setCinemaRooms(response.data);
    } catch (error) {
      console.error('Error fetching cinema rooms:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSeat((prevSeat) => ({
      ...prevSeat,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5048/api/Seat/${seatId}`, seat);
      onCancel(); 
      alert('Seat updated successfully!');
    } catch (error) {
      console.error('Error updating seat:', error);
      alert('Failed to update seat. Please try again later.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-8 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Seat</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Seat Number:</label>
          <input
            type="text"
            name="seatNumber"
            value={seat.seatNumber}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Seat Row:</label>
          <input
            type="text"
            name="seatRow"
            value={seat.seatRow}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Cinema Room:</label>
          <select
            name="cinemaRoomId"
            value={seat.cinemaRoomId}
            onChange={handleInputChange}
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
          Update Seat
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="w-full bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditSeat;
