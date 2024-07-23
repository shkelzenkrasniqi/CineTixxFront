import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllMovies } from '../services/movieService';

const MovieList = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await getAllMovies();
                setMovies(data);
            } catch (error) {
                console.error('Failed to fetch movies', error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className="bg-gray-900 min-h-screen text-white p-8">
            <h1 className="text-4xl font-bold text-center mb-8">Now Showing</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {movies.map(movie => (
                    <Link to={`/screenings/${movie.id}`} key={movie.id}>
                        <div className="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300">
                            {movie.photos && movie.photos.length > 0 && (
                                <img
                                    src={`data:${movie.photos[0].contentType};base64,${movie.photos[0].photoData}`}
                                    alt={movie.movieName}
                                    className="w-full h-ull object-cover rounded-md mb-4"
                                />
                            )}
                            <h2 className="text-2xl font-semibold mb-2">{movie.movieName}</h2>
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold">{movie.movieTrailer} min</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            
        </div>
    );
};

export default MovieList;
