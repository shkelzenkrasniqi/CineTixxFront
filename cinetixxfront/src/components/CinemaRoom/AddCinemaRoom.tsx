import React, { useState } from 'react';
import axios from 'axios';

const AddCinemaRoom = ({ onSuccess }) => {
  const [roomNumber, setRoomNumber] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [numberOfSeats, setNumberOfSeats] = useState('');
  const [is3D, setIs3D] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5048/api/CinemaRoom', {
        roomNumber: parseInt(roomNumber),
        name: name,
        location: location,
        numberOfSeats: parseInt(numberOfSeats),
        is3D: is3D
      });
      onSuccess(); 
    } catch (error) {
      console.error('Error adding cinema room:', error);
      alert('Failed to add cinema room. Please try again later.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-8 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add Cinema Room</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Room Number:</label>
          <input
            type="number"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Number of Seats:</label>
          <input
            type="number"
            value={numberOfSeats}
            onChange={(e) => setNumberOfSeats(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1">3D:</label>
          <select
            value={is3D}
            onChange={(e) => setIs3D(e.target.value === "true")}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            required
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
        >
          Add Cinema Room
        </button>
      </form>
    </div>
  );
};

export default AddCinemaRoom;
