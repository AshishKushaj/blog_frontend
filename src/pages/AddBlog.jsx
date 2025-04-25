import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBlog } from '../services/blogService'; 
import './AddBlog.css'; 

const AddBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const userInfoString = localStorage.getItem('userInfo');
        let isAdmin = false;
        if (userInfoString) {
            try {
                const userInfo = JSON.parse(userInfoString);
                if (userInfo.role === 'admin') {
                    isAdmin = true;
                }
            } catch (e) {
                console.error("Failed to parse userInfo from localStorage", e);
            }
        }

        if (!isAdmin) {
            console.warn("Non-admin user attempted to access Add Blog page.");
            navigate('/');
        }
    }, [navigate]); 


    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true); 
        setError(null); 
        setSuccess(false); 

        const token = localStorage.getItem('jwtToken');

        if (!title || !content) {
            setError('Title and Content are required.');
            setLoading(false);
            return;
        }

        if (!token) {
            setError('You must be logged in to add a blog.');
            setLoading(false);
            return;
        }

        try {
            const newBlog = await createBlog({ title, content }, token);

            console.log('Blog created successfully:', newBlog);

            setSuccess(true);
            setTitle('');
            setContent('');

            setTimeout(() => {
                navigate(`/blog/${newBlog._id}`);
            }, 1000); 


        } catch (err) {
            console.error('Failed to create blog:', err);
            setError(err.message || 'An error occurred while creating the blog.');

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-blog-container">
            <h2>Add New Blog Post</h2>

            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">Blog post created successfully!</p>}

            <form onSubmit={handleSubmit} className="add-blog-form">
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        disabled={loading} 
                    />
                </div>
                <div>
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        disabled={loading} 
                    ></textarea>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Blog'}
                </button>
            </form>
        </div>
    );
};

export default AddBlog;
