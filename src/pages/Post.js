import React, { useEffect, useState } from "react";
import axios from "axios";

const Post = ({ match }) => {
    const [post, setPost] = useState(null);

    useEffect(() => {
        axios.get(`https://syeb.onrender.com/api/posts/${match.params.id}`)
            .then(response => setPost(response.data))
            .catch(error => console.error(error));
    }, [match.params.id]);

    if (!post) return <div>Loading...</div>;

    return (
        <div className="post">
            <h1>{post.title}</h1>
            {post.image && <img src={`https://syeb.onrender.com/${post.image}`} alt={post.title} />}
            <p>{post.content}</p>
            <p className="post-date">Posted on: {new Date(post.date).toLocaleDateString()}</p>
        </div>
    );
};

export default Post;
