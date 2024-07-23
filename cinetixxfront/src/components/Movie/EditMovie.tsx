import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditMovie = ({ movieId, onCancel }) => {
  const [movie, setMovie] = useState({
    movieName: '',
    movieDescription: '',
    movieTrailer: ''
  });

  useEffect(() => {
    fetchMovie();
  }, [movieId]);

  const fetchMovie = async () => {
    try {
      const response = await axios.get(`http://localhost:5048/api/Movie/${movieId}`);
      setMovie(response.data);
    } catch (error) {
      console.error('Error fetching movie:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5048/api/Movie/${movieId}`, movie);
      onCancel(); 
      alert('Movie updated successfully!');
    } catch (error) {
      console.error('Error updating movie:', error);
      alert('Failed to update movie. Please try again later.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-8 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Movie</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Movie Name:</label>
          <input
            type="text"
            name="movieName"
            value={movie.movieName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Description:</label>
          <textarea
            name="movieDescription"
            value={movie.movieDescription}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Trailer:</label>
          <input
            type="text"
            name="movieTrailer"
            value={movie.movieTrailer}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
        >
          Update Movie
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

export default EditMovie;
