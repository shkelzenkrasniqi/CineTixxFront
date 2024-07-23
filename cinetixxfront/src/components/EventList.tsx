import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getAllEvents } from '../services/eventService';

const EventList = () => {
    const navigate = useNavigate();
    const [eventList, setEventList] = useState([]);

    useEffect(() => {
        const fetchEventList = async () => {
            try {
                const data = await getAllEvents();
                setEventList(data);
            } catch (error) {
                console.error('Failed to fetch event list', error);
            }
        };

        fetchEventList();
    }, []);

    const handleEventClick = (eventId) => {
        navigate(`/event/${eventId}`);
    };

    const getFullPhotoUrl = (photoUrl) => {
        const baseUrl = "http://localhost:5048"; // Update to your actual backend URL
        return `${baseUrl}${photoUrl}`;
    };

    return (
        <div>
            <Header />
            <div className="bg-gray-900 min-h-screen text-white p-8">
                <h1 className="text-4xl font-bold text-center mb-8">Upcoming Events</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {eventList.map(event => (
                        <button
                            key={event.id}
                            className="bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer focus:outline-none relative"
                            onClick={() => handleEventClick(event.id)}
                        >
                            {event.photoUrl && (
                                <img
                                    src={getFullPhotoUrl(event.photoUrl)}
                                    alt={event.title}
                                    className="w-full h-48 object-cover rounded-t-lg mb-4"
                                />
                            )}
                            <h2 className="text-2xl font-semibold mb-2">{event.title}</h2>
                            <p className="text-lg font-bold">{new Date(event.fromDate).toLocaleDateString()} - {new Date(event.toDate).toLocaleDateString()}</p>
                        </button>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default EventList;
