import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/login';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();


    const handleSubmit = async(e) => {
        e.preventDefault();

        setLoading(true);
        setError(null);


        try {
            const userData = await loginUser(email, password);
            console.log('Login successful', userData);
            
            navigate('/');
            window.location.reload();

            setEmail('');
            setPassword('');

        } catch (error) {
            console.error('Login failed', error);
            setError(error.message || 'An unexpected error occurred during login.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
                
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging In...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default Login;