import React, { useState, useEffect } from 'react';
import Modal from '../utils/Model'; 
import '../App.css'; 
import './Home.css';
import { useNavigate } from 'react-router-dom';
import BlogCard from '../components/BlogCard'; 
import { getBlogs } from '../services/blogService'; 

const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const [blogs, setBlogs] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [isAdmin, setIsAdmin] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const isFirstVisit = localStorage.getItem('firstVisit');
        if (!isFirstVisit) {
            setShowModal(true);
            localStorage.setItem('firstVisit', 'true');
        }
    }, []);


    useEffect(() => {
        const userInfoString = localStorage.getItem('userInfo');
        if (userInfoString) {
            try {
                const userInfo = JSON.parse(userInfoString);
                if (userInfo.role === 'admin') {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            } catch (e) {
                console.error("Failed to parse userInfo from localStorage", e);
                setIsAdmin(false);
            }
        } else {
            setIsAdmin(false);
        }
    }, []);



    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const fetchedBlogs = await getBlogs();
                setBlogs(fetchedBlogs);
            } catch (err) {
                setError(err.message || 'Failed to load blogs');
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []); 


    

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSignUp = () => {
        console.log('Redirecting to signup...');
        setShowModal(false);
        navigate('/signup');
    };

    const handleAddBlogClick = () => {
        navigate('/add-blog');
    };


    return (
        <div className="home-container">
            <h1>Home</h1>

            {isAdmin && (
                <button className="add-blog-button" onClick={handleAddBlogClick}>
                    Add Blog
                </button>
            )}

            {loading && <p>Loading blogs...</p>}
            {error && <p style={{ color: 'red' }}>{'Please login/signup'}</p>}

            {!loading && !error && (
                <div className="blog-grid">
                    {blogs.map(blog => (
                        <BlogCard key={blog._id} blog={blog} />
                    ))}
                </div>
            )}


            {showModal && <Modal onClose={handleCloseModal} onSignUp={handleSignUp} />}
        </div>
    );
};

export default Home;
