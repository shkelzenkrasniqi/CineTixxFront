import { useState, useEffect } from 'react';
import axios from 'axios';
import AddPosition from './AddPosition';
import EditPosition from './EditPosition';

const AllPositions = () => {
    const [positions, setPositions] = useState([]);
    const [showAddPositionForm, setShowAddPositionForm] = useState(false);
    const [editingPositionId, setEditingPositionId] = useState(null);

    useEffect(() => {
        fetchPositions();
    }, []);

    const fetchPositions = async () => {
        try {
            const response = await axios.get('http://localhost:5048/api/Position');
            setPositions(response.data);
        } catch (error) {
            console.error('Error fetching positions:', error);
        }
    };

    const handleAddNewPosition = async () => {
        try {
            await fetchPositions();
            setShowAddPositionForm(true);
        } catch (error) {
            console.error('Error adding new position:', error);
            alert('Failed to add position. Please try again later.');
        }
    };

    const handleEditPosition = (positionId) => {
        setEditingPositionId(positionId);
    };

    const handleEditPositionCancel = () => {
        setEditingPositionId(null);
        fetchPositions();
    };

    const handleDeletePosition = async (positionId) => {
        try {
            await axios.delete(`http://localhost:5048/api/Position/${positionId}`);
            fetchPositions(); // Fetch updated list of positions after deletion
        } catch (error) {
            console.error('Error deleting position:', error);
        }
    };

    return (
        <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-4">All Positions</h2>
            {/* Render AddPosition component if showAddPositionForm is true */}
            {showAddPositionForm && (
                <div>
                    <button onClick={() => setShowAddPositionForm(false)}>Go back</button>
                    <AddPosition onSuccess={handleAddNewPosition} />
                </div>
            )}

            {/* Render button for adding new position */}
            {!showAddPositionForm && (
                <button
                    onClick={() => setShowAddPositionForm(true)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                >
                    Add New Position
                </button>
            )}

            {/* Render list of positions */}
            <div>
                {positions.map((position) => (
                    <div key={position.id} className="border p-4 mb-4">
                        <h3 className="text-xl font-bold mb-2">{position.positionName}</h3>
                        <p>Description: {position.positionDescription}</p>
                        <p>Shift: {position.shift}</p>

                        <div className="mt-2">
                            {/* Render Edit button for each position */}
                            <button
                                onClick={() => handleEditPosition(position.id)}
                                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                            >
                                Edit
                            </button>

                            {/* Render Delete button for each position */}
                            <button
                                onClick={() => handleDeletePosition(position.id)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Delete
                            </button>
                        </div>
                        {/* Render EditPosition component if editingPositionId matches */}
                        {editingPositionId === position.id && (
                            <EditPosition positionId={position.id} onCancel={handleEditPositionCancel} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllPositions;
