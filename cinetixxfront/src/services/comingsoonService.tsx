import axios from 'axios';

const API_URL = 'http://localhost:5048/api';

export const getAllComingSoon = async () => {
    const response = await axios.get(`${API_URL}/ComingSoon`);
    return response.data;
};

// Optionally, if you need to fetch a single coming soon movie by ID
export const getComingSoonById = async (comingSoonId) => {
    const response = await axios.get(`${API_URL}/ComingSoon/${comingSoonId}`);
    return response.data;
};

// You can add more functions here for CRUD operations if needed
