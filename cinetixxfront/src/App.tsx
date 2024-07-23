import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';
import MovieDetail from './components/MovieDetail';
import Booking from './components/Booking.tsx';
import PrivateRoute from './components/PrivateRoute';
import TokenExpirationHandler from './components/TokenExpirationHandler';
import ComingSoonList from './components/ComingSoonList'; // Import the ComingSoonList component
import EventList from './components/EventList.tsx';
import EventDetails from './components/EventDetails.tsx';
import Services from './pages/Services.tsx';

function App() {
    return (
        <BrowserRouter>
            <TokenExpirationHandler />
            <Routes>
                <Route index element={<Home />} />
                <Route path="/dashboard" element={<PrivateRoute>{({ role }) => <Admin role={role} />}</PrivateRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/screenings/:movieId" element={<MovieDetail />} />
                <Route path="/booking/:screeningId" element={<Booking />} />
                <Route path="/coming-soon" element={<ComingSoonList />} /> // Adjusted the route to use ComingSoonList
                <Route path="/events" element={<EventList />} />
                <Route path="/event/:eventId" element={<EventDetails />} />
                <Route path="/services" element={<Services />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
