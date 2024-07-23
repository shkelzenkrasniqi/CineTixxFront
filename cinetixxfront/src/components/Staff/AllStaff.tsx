import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddStaff from './AddStaff';
import EditStaff from './EditStaff';

const AllStaff = () => {
    const [staffList, setStaffList] = useState([]);
    const [showAddStaffForm, setShowAddStaffForm] = useState(false);
    const [editingStaffId, setEditingStaffId] = useState(null);

    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        try {
            const response = await axios.get('http://localhost:5048/api/Staff');
            setStaffList(response.data);
        } catch (error) {
            console.error('Error fetching staff:', error);
        }
    };

    const handleAddNewStaff = async () => {
        try {
            await fetchStaff();
            setShowAddStaffForm(false);
        } catch (error) {
            console.error('Error adding new staff:', error);
            alert('Failed to add staff. Please try again later.');
        }
    };

    const handleEditStaff = (staffId) => {
        setEditingStaffId(staffId);
    };

    const handleEditStaffCancel = () => {
        setEditingStaffId(null);
        fetchStaff();
    };

    const handleDeleteStaff = async (staffId) => {
        try {
            await axios.delete(`http://localhost:5048/api/Staff/${staffId}`);
            fetchStaff();
        } catch (error) {
            console.error('Error deleting staff:', error);
        }
    };

    return (
        <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-4">All Staff</h2>
            {showAddStaffForm && (
                <div>
                    <button onClick={() => setShowAddStaffForm(false)}>Go back</button>
                    <AddStaff onSuccess={handleAddNewStaff} />
                </div>
            )}
            {!showAddStaffForm && (
                <button
                    onClick={() => setShowAddStaffForm(true)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                >
                    Add New Staff
                </button>
            )}
            <div>
                {staffList.map((staff) => (
                    <div key={staff.uniqueId} className="border p-4 mb-4">
                        <h3 className="text-xl font-bold mb-2">{staff.name}</h3>
                        <p>Department: {staff.department}</p>
                        <p>Salary: {staff.salary}</p>
                        <p>Address: {staff.address}</p>
                        
                        <div className="mt-2">
                            <button
                                onClick={() => handleEditStaff(staff.uniqueId)}
                                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteStaff(staff.uniqueId)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Delete</button>
                        </div>
                        {editingStaffId === staff.uniqueId && (
                            <EditStaff staffId={staff.uniqueId} onCancel={handleEditStaffCancel} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllStaff;