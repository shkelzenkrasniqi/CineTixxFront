import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditStaff = ({ staffId, onCancel }) => {
    const [staff, setStaff] = useState({
        department: '',
        salary: '',
        address: '',
        positionId: '',
        
    });

    useEffect(() => {
        fetchStaff();
    }, [staffId]);

    const fetchStaff = async () => {
        try {
            const response = await axios.get(`http://localhost:5048/api/Staff/${staffId}`);
            setStaff(response.data);
        } catch (error) {
            console.error('Error fetching staff:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStaff((prevStaff) => ({
            ...prevStaff,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5048/api/Staff/${staffId}`, staff);
            onCancel();
            alert('Staff updated successfully!');
        } catch (error) {
            console.error('Error updating staff:', error);
            alert('Failed to update staff. Please try again later.');
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-8 p-8 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Edit Staff Member</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Department:</label>
                    <input
                        type="text"
                        name="department"
                        value={staff.department}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Salary:</label>
                    <input
                        type="number"
                        name="salary"
                        value={staff.salary}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={staff.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Position ID:</label>
                    <input
                        type="text"
                        name="positionId"
                        value={staff.positionId}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                        required
                    />
                </div>
               
                <button
                    type="submit"
                    className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
                >
                    Update Staff Member
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

export default EditStaff;
