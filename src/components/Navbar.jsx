import React, { useState, useEffect } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => { 
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const navigate = useNavigate(); 
    
    
    
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        const userInfoString = localStorage.getItem('userInfo');

        if (token) {
            setIsLoggedIn(true);  
            if (userInfoString) {
                try {
                    const userInfo = JSON.parse(userInfoString);
                    setIsAdmin(userInfo.role === 'admin'); 
                } catch (e) {
                    console.error("Failed to parse userInfo from localStorage", e);
                    localStorage.removeItem('userInfo'); 
                    setIsAdmin(false);
                }
            } else {
                setIsAdmin(false); 
            }
        } else {
            setIsLoggedIn(false); 
            setIsAdmin(false); 
        }


    }, []);
    


    const handleLogout = () => {
        localStorage.removeItem('jwtToken'); 
        localStorage.removeItem('userInfo'); 

        setIsLoggedIn(false);
        setIsAdmin(false);

        navigate('/login');
    };


    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    Blog Platform
                </Link>

                <ul className="nav-links">
                    <li>
                        <Link to="/">Home</Link>
                    </li>

                    {!isLoggedIn && (
                        <> 
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/signup">Signup</Link>
                            </li>
                        </>
                    )}

                    {isLoggedIn && isAdmin && ( 
                        <li>
                            <Link to="/admin/dashboard">Admin Dashboard</Link>
                        </li>
                    )}

                    {isLoggedIn && (
                        <li>
                            <button onClick={handleLogout} className="nav-logout-button">
                                Logout
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar; 