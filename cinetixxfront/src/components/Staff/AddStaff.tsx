
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddStaff = ({ onSuccess }) => {
    const [department, setDepartment] = useState('');
    const [salary, setSalary] = useState('');
    const [address, setAddress] = useState('');
    const [positions, setPositions] = useState([]); // To store positions fetched from the server
    const [selectedPosition, setSelectedPosition] = useState('');

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5048/api/Staff', {
                department,
                salary,
                address,
                positionId: selectedPosition,
            });
            onSuccess();
        } catch (error) {
            console.error('Error adding staff:', error);
            alert('Failed to add staff. Please try again later.');
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-8 p-8 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Add Staff</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Department:</label>
                    <input
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Salary:</label>
                    <input
                        type="number"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Address:</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Position:</label>
                    <select
                        value={selectedPosition}
                        onChange={(e) => setSelectedPosition(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                        required
                    >
                        <option value="">Select Position</option>
                        {positions.map((position) => (
                            <option key={position.id} value={position.id}>
                                {position.positionName}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
                >
                    Add Staff
                </button>
            </form>
        </div>
    );
};

export default AddStaff;
