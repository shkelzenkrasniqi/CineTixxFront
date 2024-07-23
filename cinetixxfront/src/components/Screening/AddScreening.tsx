import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddScreening = ({ onSuccess }) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [cinemaRoomId, setCinemaRoomId] = useState('');
  const [movieId, setMovieId] = useState('');
  const [price, setPrice] = useState(''); // State for price
  const [cinemaRooms, setCinemaRooms] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch cinema rooms
    axios.get('http://localhost:5048/api/Screening/cinema-rooms')
      .then(response => {
        setCinemaRooms(response.data);
      }) 
      .catch(error => {
        console.error('Error fetching cinema rooms:', error);
      });

    // Fetch movies
    axios.get('http://localhost:5048/api/Screening/movies')
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5048/api/Screening', {
        startTime: startTime,
        endTime: endTime,
        cinemaRoomId: cinemaRoomId,
        movieId: movieId,
        price: price // Include price in the request
      });
      if (typeof onSuccess === 'function') {
        onSuccess(); // Call the onSuccess callback to handle success action
      }
      // alert('Screening added successfully!'); if you want to show successful addition 
    } catch (error) {
      console.error('Error adding screening:', error);
      alert('Failed to add screening. Please try again later.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-8 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add Screening</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Start Time:</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1">End Time:</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Price:</label> {/* Add price input field */}
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Cinema Room:</label>
          <select
            value={cinemaRoomId}
            onChange={(e) => setCinemaRoomId(e.target.value)}
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
            value={movieId}
            onChange={(e) => setMovieId(e.target.value)}
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
          Add Screening
        </button>
      </form>
    </div>
  );
};

export default AddScreening;
