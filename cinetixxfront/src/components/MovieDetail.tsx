import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getScreeningsForMovie, getMovieDetails } from '../services/movieService';
import Header from "../components/Header";
import Footer from "../components/Footer";

const MovieDetail = () => {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const [screenings, setScreenings] = useState([]);
    const [movie, setMovie] = useState(null);  
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0); // Track the index of the selected photo

    useEffect(() => {
        const fetchScreenings = async () => {
            try {
                const data = await getScreeningsForMovie(movieId);
                setScreenings(data);
            } catch (error) {
                console.error('Failed to fetch screenings', error);
            }
        };

        const fetchMovieDetails = async () => {
            try {
                const data = await getMovieDetails(movieId);
                setMovie(data);
            } catch (error) {
                console.error('Failed to fetch movie details', error);
            }
        };

        fetchScreenings();
        fetchMovieDetails();
    }, [movieId]);

    const handleScreeningClick = (screeningId) => {
        navigate(`/booking/${screeningId}`);
    };

    const handlePhotoClick = (index) => {
        setSelectedPhotoIndex(index);
    };

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
            <div className="bg-gray-900 min-h-screen text-white p-8">
                <div className="flex flex-col md:flex-row mb-8">
                    <div className="md:w-1/3 p-4">
                        <img
                            src={`data:${movie.photos[selectedPhotoIndex].contentType};base64,${movie.photos[selectedPhotoIndex].photoData}`}
                            alt={movie.title}
                            className="w-full h-auto object-cover rounded-lg shadow-lg"
                        />
                        <div className="flex mt-4">
                            {movie.photos.map((photo, index) => (
                                <img
                                    key={index}
                                    src={`data:${photo.contentType};base64,${photo.photoData}`}
                                    alt={movie.title}
                                    className={`w-16 h-16 object-cover rounded-lg shadow-lg cursor-pointer mr-2 ${index === selectedPhotoIndex ? 'border-2 border-blue-500' : ''}`}
                                    onClick={() => handlePhotoClick(index)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="md:w-2/3 p-4 flex flex-col justify-center">
                        <h1 className="text-4xl font-bold mb-4">{movie.movieName}</h1>
                        <p className="text-lg mb-4">{movie.movieDescription}</p>
                        <span className="text-lg font-bold">Duration: {movie.movieTrailer} minutes</span>
                    </div>
                </div>
                <h1 className="text-4xl font-bold text-center mb-8">Screenings</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {screenings.map(screening => (
                        <button
                            key={screening.id}
                            className="bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer focus:outline-none relative"
                            onClick={() => handleScreeningClick(screening.id)}
                        >
                            <h2 className="text-2xl font-semibold mb-2">Koha e Fillimit : <br />{new Date(screening.startTime).toLocaleString()}</h2>
                            <p className="text-gray-400 mb-4"> Koha e Mbarimit <br />{new Date(screening.endTime).toLocaleString()}</p>
                            <span className="text-lg font-bold">Price of the Ticket :{screening.price}$</span><br />
                            <span className="text-lg font-bold">Salla :{screening.cinemaRoom.name}</span>
                            <div>
                            <span className="text-sm ml-2 bg-blue-500 px-2 py-1 rounded-lg absolute bottom-4 left-4 sm:left-auto sm:right-4">Book a Ticket</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MovieDetail;
