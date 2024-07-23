import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AllBookings = () => {
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                const userId = decodedToken.nameid;

                const response = await axios.get('http://localhost:5048/api/Booking', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                // Filter bookings where userId matches the one from the token
                const userBookings = response.data.filter(booking => booking.userId === userId);
                
                setBookings(userBookings);
            } catch (error) {
                console.error('Failed to fetch bookings', error);
            }
        };

        fetchBookings();
    }, [navigate]);

    return (
        <div className="">
            <h1 className="text-4xl font-bold text-center mb-8">All Bookings</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {bookings.map(booking => (
                    <div key={booking.id} className="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300">
                        <h2 className="text-2xl font-semibold mb-2">{booking.Id}</h2>
                        <p className="text-gray-400 mb-4">{new Date(booking.screening.startTime).toLocaleString()}</p>
                        <p className="text-lg"> Movie :{booking.screening.movie.movieName}</p>
                        <p className="text-lg"> Salla :{booking.screening.cinemaRoom.name}</p>
                        <p className="text-lg">Tickets: {booking.numberOfTickets}</p>
                        <p>Price: {booking.numberOfTickets * booking.screening.price}$</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllBookings;
