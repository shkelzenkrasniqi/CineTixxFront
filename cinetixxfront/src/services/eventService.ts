import axios from 'axios';

export const getAllEvents = async () => {
    try {
        const response = await axios.get('http://localhost:5048/api/event'); // Update to your actual endpoint
        return response.data;
    } catch (error) {
        console.error('Failed to fetch events', error);
        throw error;
    }
};
export const getEventById = async (eventId) => {
    const response = await fetch(`http://localhost:5048/api/event/${eventId}`); // Update URL as necessary
    if (!response.ok) {
      throw new Error('Failed to fetch event');
    }
    return response.json();
  };
