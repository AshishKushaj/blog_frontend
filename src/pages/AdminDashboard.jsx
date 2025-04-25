import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAdminBlogs, deleteBlog, updateBlog } from '../services/blogService';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [editingBlog, setEditingBlog] = useState(null);
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedContent, setUpdatedContent] = useState('');
    const [updateLoading, setUpdateLoading] = useState(false);
    const [updateError, setUpdateError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdminBlogs = async () => {
            try {
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
                    console.warn("Non-admin user attempted to access Admin Dashboard.");
                    navigate('/');
                    return;
                }

                const adminBlogs = await getAdminBlogs();
                setBlogs(adminBlogs);

            } catch (err) {
                console.error('Error fetching admin blogs:', err);
                setError(err.message || 'Failed to load your blog posts.');
            } finally {
                setLoading(false);
            }
        };

        fetchAdminBlogs();
    }, [navigate]);


    const handleAddNewBlog = () => {
        navigate('/add-blog');
    };

    const handleEditClick = (blog) => {
        setEditingBlog(blog);
        setUpdatedTitle(blog.title);
        setUpdatedContent(blog.content);
        setUpdateError(null);
    };

    const handleCancelEdit = () => {
        setEditingBlog(null);
        setUpdatedTitle('');
        setUpdatedContent('');
        setUpdateError(null);
    };

    const handleSaveEdit = async () => {
        if (!editingBlog) return;

        setUpdateLoading(true);
        setUpdateError(null);

        if (!updatedTitle || !updatedContent) {
            setUpdateError('Title and Content cannot be empty.');
            setUpdateLoading(false);
            return;
        }

        try {
            const updatedBlogData = {
                title: updatedTitle,
                content: updatedContent,
            };

            const result = await updateBlog(editingBlog._id, updatedBlogData);

            console.log('Blog updated successfully:', result);

            setBlogs(blogs.map(blog =>
                blog._id === result._id ? result : blog
            ));

            handleCancelEdit();

        } catch (err) {
            console.error('Error updating blog:', err);
            setUpdateError(err.message || 'Failed to update blog.');
        } finally {
            setUpdateLoading(false);
        }
    };


    const handleDeleteClick = async (blogId) => {
        if (window.confirm('Are you sure you want to delete this blog post?')) {
            try {
                const result = await deleteBlog(blogId);

                console.log('Blog deleted successfully:', result);

                setBlogs(blogs.filter(blog => blog._id !== blogId));

            } catch (err) {
                console.error('Error deleting blog:', err);
                setError(err.message || 'Failed to delete blog post.');
            }
        }
    };


    if (loading) {
        return <div className="loading-message">Loading admin dashboard...</div>;
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    return (
        <div className="admin-dashboard-container">
            <h2>Admin Dashboard</h2>

            <button className="add-new-blog-button" onClick={handleAddNewBlog}>
                Add New Blog
            </button>

            {updateError && <p className="error-message">{updateError}</p>}

            <div className="admin-blog-list">
                {blogs.length === 0 ? (
                    <p>You haven't created any blog posts yet.</p>
                ) : (
                    blogs.map(blog => (
                        <div key={blog._id} className="admin-blog-item">
                            <div className="blog-details">
                                <Link to={`/blog/${blog._id}`} className="blog-item-title">{blog.title}</Link>
                                <p className="blog-item-date">Created: {new Date(blog.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className="blog-actions">
                                <button
                                    className="edit-button"
                                    onClick={() => handleEditClick(blog)}
                                    disabled={updateLoading}
                                >
                                    Edit
                                </button>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDeleteClick(blog._id)}
                                    disabled={updateLoading}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {editingBlog && (
                <div className="edit-blog-modal">
                    <div className="modal-content">
                        <h3>Edit Blog Post</h3>
                        {updateError && <p className="error-message">{updateError}</p>}
                        <form onSubmit={(e) => { e.preventDefault(); handleSaveEdit(); }}>
                            <div>
                                <label htmlFor="edit-title">Title:</label>
                                <input
                                    type="text"
                                    id="edit-title"
                                    value={updatedTitle}
                                    onChange={(e) => setUpdatedTitle(e.target.value)}
                                    required
                                    disabled={updateLoading}
                                />
                            </div>
                            <div>
                                <label htmlFor="edit-content">Content:</label>
                                <textarea
                                    id="edit-content"
                                    value={updatedContent}
                                    onChange={(e) => setUpdatedContent(e.target.value)}
                                    required
                                    disabled={updateLoading}
                                ></textarea>
                            </div>
                            <div className="modal-actions">
                                <button type="button" onClick={handleCancelEdit} disabled={updateLoading}>
                                    Cancel
                                </button>
                                <button type="submit" disabled={updateLoading}>
                                    {updateLoading ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AdminDashboard;
