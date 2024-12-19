import React from "react";
import { Link } from "react-router-dom";

const BlogList = ({ posts }) => {
    return (
        <div className="post-list">
            {posts.map(post => (
                <div key={post._id} className="post-preview">
                    <div className="post">
                        <h2>{post.title}</h2>
                        <div className="post-image">
                            {post.image && <img src={`https://syeb.onrender.com/${post.image}`} alt={post.title} />}
                        </div>
                        <p>{post.content}</p>
                        <p className="post-date">Posted on: {new Date(post.date).toLocaleDateString()}</p>
                        <Link to={`/post/${post._id}`}>Read more</Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BlogList;
