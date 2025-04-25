import React from 'react';
import { Link } from 'react-router-dom';
import './BlogCard.css';

const BlogCard = ({ blog }) => {
    const getSnippet = (content, maxLength = 150) => {
        if (!content) return '';
        if (content.length <= maxLength) return content;
        return content.substring(0, maxLength) + '...';
    };

    return (
        <Link to={`/blog/${blog._id}`} className="blog-card">
            <h3 className="blog-card-title">{blog.title}</h3>
            <p className="blog-card-author">by {blog.author && blog.author.name ? blog.author.name : 'Unknown Author'}</p>
            <p className="blog-card-snippet">{getSnippet(blog.content)}</p>
        </Link>
    );
};

export default BlogCard;
