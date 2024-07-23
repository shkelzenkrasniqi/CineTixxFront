import React, { useState } from 'react';
import axios from 'axios';

const AddPosition = ({ onSuccess }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [shift, setShift] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5048/api/Position', {
                positionName: name,
                positionDescription: description,
                shift: shift
            });
            onSuccess();
        } catch (error) {
            console.error('Error adding position:', error);
            alert('Failed to add position. Please try again later.');
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-8 p-8 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Add Position</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Description:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label className="block mb-1">Shift:</label>
                    <input
                        type="text"
                        value={shift}
                        onChange={(e) => setShift(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
                >
                    Add Position
                </button>
            </form>
        </div>
    );
};

export default AddPosition;
