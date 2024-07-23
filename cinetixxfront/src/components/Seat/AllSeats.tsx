import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddSeat from './AddSeat';
import EditSeat from './EditSeat';

const AllSeats = () => {
  const [seats, setSeats] = useState([]);
  const [showAddSeatForm, setShowAddSeatForm] = useState(false);
  const [editingSeatId, setEditingSeatId] = useState(null);

  useEffect(() => {
    fetchSeats();
  }, []);

  const fetchSeats = async () => {
    try {
      const response = await axios.get('http://localhost:5048/api/Seat');
      setSeats(response.data);
    } catch (error) {
      console.error('Error fetching seats:', error);
    }
  };

  const handleAddNewSeat = async () => {
    try {
      await fetchSeats(); 
      setShowAddSeatForm(false);
    } catch (error) {
      console.error('Error adding new seat:', error);
      alert('Failed to add seat. Please try again later.');
    }
  };
  
  const handleEditSeat = (seatId) => {
    setEditingSeatId(seatId);
  };

  const handleEditSeatCancel = () => {
    setEditingSeatId(null);
    fetchSeats(); 
  };

  const handleDeleteSeat = async (seatId) => {
    try {
      await axios.delete(`http://localhost:5048/api/Seat/${seatId}`);
      fetchSeats(); // Fetch updated list of seats after deletion
    } catch (error) {
      console.error('Error deleting seat:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Seats</h2>
       {/* Render AddSeat component if showAddSeatForm is true */}
       {showAddSeatForm && (
        <div>
          <button onClick={() => setShowAddSeatForm(false)}>Go back</button>
          <AddSeat onSuccess={handleAddNewSeat} />
        </div>
      )}

      {/* Render button for adding new seat */}
      {!showAddSeatForm && (
        <button
          onClick={() => setShowAddSeatForm(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Add New Seat
        </button>
      )}

      {/* Render list of seats */}
      <div>
        {seats.map((seat) => (
          <div key={seat.id} className="border p-4 mb-4">
            <h3 className="text-xl font-bold mb-2">Seat {seat.seatNumber}</h3>
            
            <div className="mt-2">
              {/* Render Edit button for each seat */}
              <button
                onClick={() => handleEditSeat(seat.id)}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Edit
              </button>

              {/* Render Delete button for each seat */}
              <button
                onClick={() => handleDeleteSeat(seat.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
            {/* Render EditSeat component if editingSeatId matches */}
            {editingSeatId === seat.id && (
              <EditSeat seatId={seat.id} onCancel={handleEditSeatCancel} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllSeats;
