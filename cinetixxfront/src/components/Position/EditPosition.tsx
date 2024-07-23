import { useState, useEffect } from 'react';
import axios from 'axios';

const EditPosition = ({ positionId, onCancel }) => {
    const [position, setPosition] = useState({
        positionName: '',
        positionDescription: '',
        shift: ''
    });

    useEffect(() => {
        fetchPosition();
    }, [positionId]);

    const fetchPosition = async () => {
        try {
            const response = await axios.get(`http://localhost:5048/api/Position/${positionId}`);
            setPosition(response.data);
        } catch (error) {
            console.error('Error fetching position:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPosition((prevPosition) => ({
            ...prevPosition,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5048/api/Position/${positionId}`, position);
            onCancel();
            alert('Position updated successfully!');
        } catch (error) {
            console.error('Error updating position:', error);
            alert('Failed to update position. Please try again later.');
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-8 p-8 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Edit Position</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Position Name:</label>
                    <input
                        type="text"
                        name="positionName"
                        value={position.positionName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Position Description:</label>
                    <input
                        type="text"
                        name="positionDescription"
                        value={position.positionDescription}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Shift:</label>
                    <input
                        type="text"
                        name="shift"
                        value={position.shift}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
                >
                    Update Position
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

export default EditPosition;
