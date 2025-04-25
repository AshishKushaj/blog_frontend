import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../services/signup';  
import { loginUser } from '../services/login';

const Signup = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); 
        setErrorMessage('');

        try {
            const res = await signupUser(formData); 
            console.log(res.ok)

            if (res.ok) {
                await loginUser(formData.email,formData.password);


                navigate('/');
                window.location.reload();

            }
        } catch (error) {
            setErrorMessage(error.message); 
        }
        finally {
            setLoading(false); 
        }
    };


    const handleAdminSignupClick = () => {
        navigate('/admin/signup'); 
    };
    

    return (
        <div className="signup-container">
            <h2>User Signup</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        minLength={8}
                        required
                        disabled={loading}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Signing Up...' : 'Sign Up'}
                </button>

            </form>


            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <p>Are you an admin?</p>
                <button
                    type="button" 
                    onClick={handleAdminSignupClick}
                    disabled={loading}
                >
                    Admin Sign Up
                </button>
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

export default Signup;
