import React, { useState } from 'react';
import axios from 'axios';

const EditComingSoon = ({ comingSoon, onUpdate, onCancel }) => {
    const [title, setTitle] = useState(comingSoon.title);
    const [description, setDescription] = useState(comingSoon.description);
    const [releaseDate, setReleaseDate] = useState(new Date(comingSoon.releaseDate).toISOString().substr(0, 10));

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedComingSoon = {
                id: comingSoon.id,
                title,
                description,
                releaseDate,
            };
            await axios.put(`http://localhost:5048/api/ComingSoon/${comingSoon.id}`, updatedComingSoon);
            onUpdate(updatedComingSoon);
        } catch (error) {
            console.error('Error updating coming soon:', error);
            alert('Failed to update coming soon. Please try again later.');
        }
    };

    const handleCancel = () => {
        onCancel();
    };

    return (
        <div className="border p-4 mb-4">
            <h3 className="text-xl font-bold mb-2">Edit Coming Soon</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
                    <input
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Release Date:</label>
                    <input
                        type="date"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={releaseDate}
                        onChange={(e) => setReleaseDate(e.target.value)}
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Update
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditComingSoon;
