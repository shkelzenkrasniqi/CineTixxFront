import { useState, useEffect } from 'react';
import axios from 'axios';
import AddCinemaRoom from './AddCinemaRoom';
import EditCinemaRoom from './EditCinemaRoom';

const AllCinemaRooms = () => {
  const [cinemaRooms, setCinemaRooms] = useState([]);
  const [showAddCinemaRoomForm, setShowAddCinemaRoomForm] = useState(false);
  const [editingCinemaRoomId, setEditingCinemaRoomId] = useState(null);

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

  const handleAddNewCinemaRoom = async () => {
    try {
      await fetchCinemaRooms(); 
      setShowAddCinemaRoomForm(false);
    } catch (error) {
      console.error('Error adding new cinema room:', error);
      alert('Failed to add cinema room. Please try again later.');
    }
  };
  
  const handleEditCinemaRoom = (cinemaRoomId) => {
    setEditingCinemaRoomId(cinemaRoomId);
  };

  const handleEditCinemaRoomCancel = () => {
    setEditingCinemaRoomId(null);
    fetchCinemaRooms(); 
  };

  const handleDeleteCinemaRoom = async (cinemaRoomId) => {
    try {
      await axios.delete(`http://localhost:5048/api/CinemaRoom/${cinemaRoomId}`);
      fetchCinemaRooms(); // Fetch updated list of cinema rooms after deletion
    } catch (error) {
      console.error('Error deleting cinema room:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Cinema Rooms</h2>
       {/* Render AddCinemaRoom component if showAddCinemaRoomForm is true */}
       {showAddCinemaRoomForm && (
        <div>
          <button onClick={() => setShowAddCinemaRoomForm(false)}>Go back</button>
          <AddCinemaRoom onSuccess={handleAddNewCinemaRoom} />
        </div>
      )}

      {/* Render button for adding new cinema room */}
      {!showAddCinemaRoomForm && (
        <button
          onClick={() => setShowAddCinemaRoomForm(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Add New Cinema Room
        </button>
      )}

      {/* Render list of cinema rooms */}
      <div>
        {cinemaRooms.map((cinemaRoom) => (
          <div key={cinemaRoom.id} className="border p-4 mb-4">
            <h3 className="text-xl font-bold mb-2">{cinemaRoom.name}</h3>
            <p>Room Number: {cinemaRoom.roomNumber}</p>
            <p>Location: {cinemaRoom.location}</p>
            <p>Number of Seats: {cinemaRoom.numberOfSeats}</p>
            <p>3D: {cinemaRoom.is3D ? 'Yes' : 'No'}</p>
            
            <div className="mt-2">
              {/* Render Edit button for each cinema room */}
              <button
                onClick={() => handleEditCinemaRoom(cinemaRoom.id)}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Edit
              </button>

              {/* Render Delete button for each cinema room */}
              <button
                onClick={() => handleDeleteCinemaRoom(cinemaRoom.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
            {/* Render EditCinemaRoom component if editingCinemaRoomId matches */}
            {editingCinemaRoomId === cinemaRoom.id && (
              <EditCinemaRoom cinemaRoomId={cinemaRoom.id} onCancel={handleEditCinemaRoomCancel} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCinemaRooms;
