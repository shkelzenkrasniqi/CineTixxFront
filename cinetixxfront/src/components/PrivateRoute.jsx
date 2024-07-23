
import { Navigate, useNavigate } from 'react-router-dom';
import { getRoleFromToken } from '../utils/auth';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    if (!token) {
        return <Navigate to="/login" />;
    }

    try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        if (decodedToken.exp * 1000 < Date.now()) {
            localStorage.removeItem('token');
            navigate('/login');
            return null;
        }

        const role = decodedToken.role;
        return children({ role });
    } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
        return <Navigate to="/login" />;
    }
};

export default PrivateRoute;
