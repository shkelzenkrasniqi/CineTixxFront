import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddComingSoon from './AddComingSoon';
import EditComingSoon from './EditComingSoon';

const AllComingSoon = () => {
    const [comingSoonList, setComingSoonList] = useState([]);
    const [editingComingSoonId, setEditingComingSoonId] = useState(null);

    useEffect(() => {
        fetchComingSoonList();
    }, []);

    const fetchComingSoonList = async () => {
        try {
            const response = await axios.get('http://localhost:5048/api/ComingSoon');
            setComingSoonList(response.data);
        } catch (error) {
            console.error('Error fetching coming soon list:', error);
        }
    };

    const handleAddComingSoon = (newComingSoon) => {
        setComingSoonList([...comingSoonList, newComingSoon]);
    };

    const handleEditComingSoon = (comingSoonId) => {
        setEditingComingSoonId(comingSoonId);
    };

    const handleUpdateComingSoon = () => {
        setEditingComingSoonId(null);
        fetchComingSoonList();
    };

    const handleDeleteComingSoon = async (comingSoonId) => {
        try {
            await axios.delete(`http://localhost:5048/api/ComingSoon/${comingSoonId}`);
            setComingSoonList(comingSoonList.filter(comingSoon => comingSoon.id !== comingSoonId));
        } catch (error) {
            console.error('Error deleting coming soon:', error);
        }
    };

    return (
        <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-4">All Coming Soon</h2>
            <AddComingSoon onAdd={handleAddComingSoon} />

            <div>
                {comingSoonList.map((comingSoon, index) => (
                    <div key={comingSoon.id || index} className="border p-4 mb-4">
                        {editingComingSoonId === comingSoon.id ? (
                            <EditComingSoon
                                comingSoon={comingSoon}
                                onUpdate={handleUpdateComingSoon} onCancel={undefined}                            />
                        ) : (
                            <>
                                <h3 className="text-xl font-bold mb-2">{comingSoon.title}</h3>
                                <p>{comingSoon.description}</p>
                                <p>Release Date: {comingSoon.releaseDate && !isNaN(Date.parse(comingSoon.releaseDate)) ? new Date(comingSoon.releaseDate).toLocaleDateString() : "Not Provided"}</p>
                                <div className="mt-2">
                                    <button
                                        onClick={() => handleEditComingSoon(comingSoon.id)}
                                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteComingSoon(comingSoon.id)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllComingSoon;
