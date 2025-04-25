// SignupAdmin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupAdmin } from '../services/signupAdmin'; 
import './SignupAdmin.css'; 
import { loginUser } from '../services/login';

const SignupAdmin = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); 
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
        setSuccessMessage(''); 

        try {
            const data = await signupAdmin(formData);
            console.log('Admin signup successful', data);

            setSuccessMessage('Admin account created successfully!');
            setFormData({ name: '', email: '', password: '' });
            
            await loginUser(formData.email,formData.password)
            
            navigate('/')
            window.location.reload();
            
        } catch (error) {
            console.error('Admin signup failed', error);
            setErrorMessage(error.message || 'Admin signup failed. Please try again.'); 

        } finally {
            setLoading(false); 
        }
    };

    const handleBackToUserSignup = () => {
        navigate('/signup'); 
    };


    return (
        <div className="signup-admin-container">
            <h2>Admin Signup</h2>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            <form onSubmit={handleSubmit} className="signup-admin-form">
                <div>
                    <label htmlFor="admin-name">Name:</label>
                    <input
                        type="text"
                        id="admin-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                </div>
                <div>
                    <label htmlFor="admin-email">Email:</label>
                    <input
                        type="email"
                        id="admin-email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                </div>
                <div>
                    <label htmlFor="admin-password">Password:</label>
                    <input
                        type="password"
                        id="admin-password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        minLength={8} 
                        required
                        disabled={loading}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Signing Up Admin...' : 'Sign Up Admin'}
                </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button
                    type="button"
                    onClick={handleBackToUserSignup}
                    disabled={loading}
                    className="back-to-user-signup" 
                >
                    Back to User Signup
                </button>
            </div>
        </div>
    );
};

export default SignupAdmin;
