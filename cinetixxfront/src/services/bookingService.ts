// services/bookingService.js

import axios from 'axios';

const API_URL = 'http://localhost:5048/api';

export const getScreeningById = async (screeningId) => {
    const response = await axios.get(`${API_URL}/Screening/${screeningId}`);
    return response.data;
};

export const bookScreening = async (screeningId, numberOfTickets, userId) => {
    const response = await axios.post('http://localhost:5048/api/Booking', {
        screeningId,
        numberOfTickets,
        userId
    });
    return response.data;
};