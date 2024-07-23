import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TokenExpirationHandler = () => {
  const [expired, setExpired] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkExpiration = () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds

        console.log('Expiration Time:', new Date(expirationTime));
        console.log('Current Time:', new Date());

        if (Date.now() >= expirationTime) {
          // Token expired, prompt user to extend session
          setExpired(true);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    };

    // Check expiration on mount
    checkExpiration();

    // Set an interval to check expiration every second
    const intervalId = setInterval(checkExpiration, 10000);

    // Clear the interval on unmount
    return () => clearInterval(intervalId);
  }, []);

 

  const handleExtendSession = () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const currentTimestamp = Math.floor(Date.now() / 1000);
      decodedToken.exp = currentTimestamp + 3 * 60 * 60; // Extend expiration time to 3 hours from now

      const updatedToken = [
        token.split('.')[0], 
        btoa(JSON.stringify(decodedToken)), 
        token.split('.')[2]
      ].join('.');

      localStorage.setItem('token', updatedToken);
      setExpired(false);
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  };

  const handleCancelSession = () => {
    localStorage.removeItem('token');
    navigate('/'); // Redirect to home
    window.location.reload(); // Refresh the page
  };

  return (
    <div>
      {expired && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="mb-4 text-lg font-semibold">Your session has expired. Would you like to extend it?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleExtendSession}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
              >
                Extend Session
              </button>
              <button
                onClick={handleCancelSession}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition"
              >
                Cancel Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenExpirationHandler;
