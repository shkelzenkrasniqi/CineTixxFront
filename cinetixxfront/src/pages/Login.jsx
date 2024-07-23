import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        try {
            const response = await fetch('http://localhost:5048/api/account/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                const currentTimestamp = Math.floor(Date.now() / 1000); // Current time in seconds
                const decodedToken = JSON.parse(atob(data.token.split('.')[1])); // Parse the token

                console.log(decodedToken); // Log the decoded token to check its structure

                // Modify the token payload
                decodedToken.exp = currentTimestamp + 10; // Set expiration time to 10 seconds from now

                // Encode the modified payload back into a token string
                const modifiedToken = `${data.token.split('.')[0]}.${btoa(JSON.stringify(decodedToken))}.${data.token.split('.')[2]}`;

                localStorage.setItem('token', modifiedToken);

                if (decodedToken.role === 'User') {
                    navigate('/');
                } else {
                    navigate('/dashboard');
                }
            } else {
                const errorData = await response.json().catch(() => ({ message: 'Login failed' }));
                setError(errorData.message || 'Login failed');
            }
        } catch (err) {
            setError('Login failed');
        }
    };

    return (
        <div>
            <Header/>
        <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-50">Sign in to your account</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Email"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        />
                    </div>
                    <div>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Password"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        />
                    </div>
                    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                    <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            {/* Heroicon name: lock-closed */}
                            <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M3 8v6a5 5 0 0010 0V8a3 3 0 00-6 0V6a3 3 0 00-6 0v2a3 3 0 006 0z" />
                            </svg>
                        </span>
                        Sign in
                    </button>
                    <div className="mt-6">
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
        <Footer/>
        </div>
    );
};

export default Login;
