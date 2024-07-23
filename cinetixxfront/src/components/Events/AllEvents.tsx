import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddEvent from './AddEvent';
import EditEvent from './EditEvent';

const AllEvents = () => {
    const [eventList, setEventList] = useState([]);
    const [editingEventId, setEditingEventId] = useState(null);

    useEffect(() => {
        fetchEventList();
    }, []);

    const fetchEventList = async () => {
        try {
            const response = await axios.get('http://localhost:5048/api/event');
            setEventList(response.data);
        } catch (error) {
            console.error('Error fetching event list:', error);
        }
    };

    const handleAddEvent = (newEvent) => {
        setEventList([...eventList, newEvent]);
    };

    const handleEditEvent = (eventId) => {
        setEditingEventId(eventId);
    };

    const handleUpdateEvent = () => {
        setEditingEventId(null);
        fetchEventList();
    };

    const handleDeleteEvent = async (eventId) => {
        try {
            await axios.delete(`http://localhost:5048/api/event/${eventId}`);
            setEventList(eventList.filter(event => event.id !== eventId));
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    return (
        <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-4">All Events</h2>
            <AddEvent onAdd={handleAddEvent} />

            <div>
                {eventList.map((event, index) => (
                    <div key={event.id || index} className="border p-4 mb-4">
                        {editingEventId === event.id ? (
                            <EditEvent
                                event={event}
                                onUpdate={handleUpdateEvent} onCancel={undefined}                            />
                        ) : (
                            <>
                                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                                <p>{event.description}</p>
                                <p>
                                    From: {event.fromDate && !isNaN(Date.parse(event.fromDate)) ? new Date(event.fromDate).toLocaleDateString() : "Not Provided"}
                                </p>
                                <p>
                                    To: {event.toDate && !isNaN(Date.parse(event.toDate)) ? new Date(event.toDate).toLocaleDateString() : "Not Provided"}
                                </p>
                                <div className="mt-2">
                                    <button
                                        onClick={() => handleEditEvent(event.id)}
                                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteEvent(event.id)}
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

export default AllEvents;
