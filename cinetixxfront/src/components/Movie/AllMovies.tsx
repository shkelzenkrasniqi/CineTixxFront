import { useState, useEffect } from 'react';
import axios from 'axios';
import AddMovie from './AddMovie';
import EditMovie from './EditMovie';

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [showAddMovieForm, setShowAddMovieForm] = useState(false);
  const [editingMovieId, setEditingMovieId] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:5048/api/Movie');
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleAddNewMovie = async () => {
    try {
      await fetchMovies(); 
      setShowAddMovieForm(false);
    } catch (error) {
      console.error('Error adding new movie:', error);
      alert('Failed to add movie. Please try again later.');
    }
  };
  
  const handleEditMovie = (movieId) => {
    setEditingMovieId(movieId);
  };

  const handleEditMovieCancel = () => {
    setEditingMovieId(null);
    fetchMovies(); 
  };

  const handleDeleteMovie = async (movieId) => {
    try {
      await axios.delete(`http://localhost:5048/api/Movie/${movieId}`);
      fetchMovies(); // Fetch updated list of movies after deletion
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Movies</h2>
       {/* Render AddMovie component if showAddMovieForm is true */}
       {showAddMovieForm && (
        <div>
          <button onClick={() => setShowAddMovieForm(false)}>Go back</button>
          <AddMovie onSuccess={handleAddNewMovie} />
        </div>
      )}

      {/* Render button for adding new movie */}
      {!showAddMovieForm && (
        <button
          onClick={() => setShowAddMovieForm(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Add New Movie
        </button>
      )}

      {/* Render list of movies */}
      <div>
        {movies.map((movie) => (
          <div key={movie.id} className="border p-4 mb-4">
            <h3 className="text-xl font-bold mb-2">{movie.movieName}</h3>
            
            <div className="mt-2">
              {/* Render Edit button for each movie */}
              <button
                onClick={() => handleEditMovie(movie.id)}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Edit
              </button>

              {/* Render Delete button for each movie */}
              <button
                onClick={() => handleDeleteMovie(movie.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
            {/* Render EditMovie component if editingMovieId matches */}
            {editingMovieId === movie.id && (
              <EditMovie movieId={movie.id} onCancel={handleEditMovieCancel} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMovies;
