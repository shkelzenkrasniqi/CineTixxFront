import  { useState, useEffect } from 'react';
import axios from 'axios';
import AddScreening from './AddScreening';
import EditScreening from './EditScreening';

const AllScreenings = () => {
  const [screenings, setScreenings] = useState([]);
  const [showAddScreeningForm, setShowAddScreeningForm] = useState(false);
  const [editingScreeningId, setEditingScreeningId] = useState(null);

  useEffect(() => {
    fetchScreenings();
  }, []);

  const fetchScreenings = async () => {
    try {
      const response = await axios.get('http://localhost:5048/api/Screening');
      const screeningsData = response.data;

      // Fetch movie details for each screening
      const screeningsWithMovies = await Promise.all(
        screeningsData.map(async (screening) => {
          const movieResponse = await axios.get(`http://localhost:5048/api/Movie/${screening.movieId}`);
          const movieName = movieResponse.data.movieName;
          return { ...screening, movieName };
        })
      );

      setScreenings(screeningsWithMovies);
    } catch (error) {
      console.error('Error fetching screenings:', error);
    }
  };

  const handleAddNewScreening = async () => {
    try {
      await fetchScreenings(); // Fetch updated list of screenings after addition
      setShowAddScreeningForm(false); // Optionally close the add screening form
    } catch (error) {
      console.error('Error adding new screening:', error);
      alert('Failed to add screening. Please try again later.');
    }
  };

  const handleEditScreening = (screeningId) => {
    setEditingScreeningId(screeningId);
  };

  const handleEditScreeningCancel = () => {
    setEditingScreeningId(null);
    fetchScreenings(); // Refresh screenings list after canceling edit
  };

  const handleDeleteScreening = async (screeningId) => {
    try {
      await axios.delete(`http://localhost:5048/api/Screening/${screeningId}`);
      fetchScreenings(); // Fetch updated list of screenings after deletion
    } catch (error) {
      console.error('Error deleting screening:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Screenings</h2>
       {/* Render AddScreening component if showAddScreeningForm is true */}
       {showAddScreeningForm && (
        <div>
          <button onClick={() => setShowAddScreeningForm(false)}>Go back</button>
          <AddScreening onSuccess={handleAddNewScreening} />
        </div>
      )}

      {/* Render button for adding new screening */}
      {!showAddScreeningForm && (
        <button
          onClick={() => setShowAddScreeningForm(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Add New Screening
        </button>
      )}

      {/* Render list of screenings */}
      <div>
        {screenings.map((screening) => (
          <div key={screening.id} className="border p-4 mb-4">
            <h3 className="text-xl font-bold mb-2">{screening.movieName}</h3>
            <h5 className="text-l font-bold mb-2">{screening.startTime}</h5>
            <div className="mt-2">
              {/* Render Edit button for each screening */}
              <button
                onClick={() => handleEditScreening(screening.id)}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Edit
              </button>

              {/* Render Delete button for each screening */}
              <button
                onClick={() => handleDeleteScreening(screening.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
            {/* Render EditScreening component if editingScreeningId matches */}
            {editingScreeningId === screening.id && (
              <EditScreening screeningId={screening.id} onCancel={handleEditScreeningCancel} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllScreenings;
