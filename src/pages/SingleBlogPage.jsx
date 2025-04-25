// SingleBlogPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { getBlogById } from '../services/blogService'; 
import './SingleBlogPage.css'; 

const SingleBlogPage = () => {
    const { id } = useParams();

    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const fetchedBlog = await getBlogById(id);
                setBlog(fetchedBlog);

            } catch (err) {
                console.error(`Error fetching blog ${id}:`, err);
                setError(err.message || 'Failed to load blog post'); 

            } finally {
                setLoading(false); 
            }
        };

        if (id) {
            fetchBlog();
        } else {
            setError('Blog ID is missing.');
            setLoading(false);
        }

    }, [id]); 


    if (loading) {
        return <div className="loading-message">Loading blog post...</div>;
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    if (!blog) {
        return <div className="error-message">Blog post not found.</div>;
    }


    return (
        <div className="single-blog-container">
            <h2>{blog.title}</h2>
            <p className="single-blog-meta">
                by {blog.author ? blog.author.name : 'Unknown Author'} {/* Assuming author is populated or has a name field */}
                {blog.createdAt && ` on ${new Date(blog.createdAt).toLocaleDateString()}`}
            </p>
            <div className="single-blog-content">
                {blog.content}
            </div>
        </div>
    );
};

export default SingleBlogPage;
