import { useState, useEffect } from 'react';
import axios from 'axios';

const EditCinemaRoom = ({ cinemaRoomId, onCancel }) => {
  const [cinemaRoom, setCinemaRoom] = useState({
    roomNumber: '',
    name: '',
    location: '',
    numberOfSeats: '',
    is3D: false
  });

  useEffect(() => {
    fetchCinemaRoom();
  }, [cinemaRoomId]);

  const fetchCinemaRoom = async () => {
    try {
      const response = await axios.get(`http://localhost:5048/api/CinemaRoom/${cinemaRoomId}`);
      setCinemaRoom(response.data);
    } catch (error) {
      console.error('Error fetching cinema room:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCinemaRoom((prevCinemaRoom) => ({
      ...prevCinemaRoom,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5048/api/CinemaRoom/${cinemaRoomId}`, cinemaRoom);
      onCancel(); 
      alert('Cinema room updated successfully!');
    } catch (error) {
      console.error('Error updating cinema room:', error);
      alert('Failed to update cinema room. Please try again later.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-8 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Cinema Room</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Room Number:</label>
          <input
            type="number"
            name="roomNumber"
            value={cinemaRoom.roomNumber}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Name:</label>
          <input
            type="text"
            name="name"
            value={cinemaRoom.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Location:</label>
          <input
            type="text"
            name="location"
            value={cinemaRoom.location}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Number of Seats:</label>
          <input
            type="number"
            name="numberOfSeats"
            value={cinemaRoom.numberOfSeats}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1">3D:</label>
          <select
            name="is3D"
            value={cinemaRoom.is3D}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            required
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
        >
          Update Cinema Room
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

export default EditCinemaRoom;
