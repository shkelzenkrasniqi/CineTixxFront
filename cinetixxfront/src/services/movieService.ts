import axios from 'axios';

const API_URL = 'http://localhost:5048/api'; 

export const getAllMovies = async () => {
    const response = await axios.get(`${API_URL}/Movie`);
    return response.data;
};

export const getScreeningsForMovie = async (movieId) => {
    const response = await axios.get(`${API_URL}/Screening/movie/${movieId}`);
    return response.data;
};
export const getMovieDetails = async (movieId) => {
    const response = await axios.get(`${API_URL}/Movie/${movieId}`);
    return response.data;
};