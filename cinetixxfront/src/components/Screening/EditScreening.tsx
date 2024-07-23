import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditScreening = ({ screeningId, onCancel }) => {
  const [screening, setScreening] = useState({
    startTime: '',
    endTime: '',
    cinemaRoomId: '',
    movieId: ''
  });
  const [cinemaRooms, setCinemaRooms] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchScreening();
    fetchCinemaRooms();
    fetchMovies();
  }, [screeningId]);

  const fetchScreening = async () => {
    try {
      const response = await axios.get(`http://localhost:5048/api/Screening/${screeningId}`);
      setScreening(response.data);
    } catch (error) {
      console.error('Error fetching screening:', error);
    }
  };

  const fetchCinemaRooms = async () => {
    try {
      const response = await axios.get('http://localhost:5048/api/Screening/cinema-rooms');
      setCinemaRooms(response.data);
    } catch (error) {
      console.error('Error fetching cinema rooms:', error);
    }
  };

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:5048/api/Screening/movies');
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setScreening((prevScreening) => ({
      ...prevScreening,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5048/api/Screening/${screeningId}`, screening);
      onCancel(); 
      alert('Screening updated successfully!');
    } catch (error) {
      console.error('Error updating screening:', error);
      alert('Failed to update screening. Please try again later.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-8 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Screening</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Start Time:</label>
          <input
            type="datetime-local"
            name="startTime"
            value={screening.startTime}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1">End Time:</label>
          <input
            type="datetime-local"
            name="endTime"
            value={screening.endTime}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Cinema Room:</label>
          <select
            name="cinemaRoomId"
            value={screening.cinemaRoomId}
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
        <div>
          <label className="block mb-1">Movie:</label>
          <select
            name="movieId"
            value={screening.movieId}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            required
          >
            <option value="">Select Movie</option>
            {movies.map(movie => (
              <option key={movie.id} value={movie.id}>{movie.movieName}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
        >
          Update Screening
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

export default EditScreening;
