import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]); // To store all posts for filtering
  const [tags, setTags] = useState([]); // To store available tags
  const [selectedTag, setSelectedTag] = useState(""); // The tag currently selected by the user
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://syeb.onrender.com/api/posts');
        setAllPosts(response.data);
        setPosts(response.data); // Initially, show all posts
        setLoading(false);
        // Extract unique tags from posts
        const allTags = new Set(response.data.flatMap(post => post.tags));
        setTags([...allTags]);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleTagSelect = async (tag) => {
    setSelectedTag(tag);

    if (tag) {
      // Fetch posts related to the selected tag
      try {
        const response = await axios.get(`https://syeb.onrender.com/api/posts/tag/${tag}`);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts by tag:", error);
      }
    } else {
      // If no tag is selected, show all posts
      setPosts(allPosts);
    }
  };

  // Delete post handler
  const handleDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(`https://syeb.onrender.com/api/posts/${postId}`);
        setPosts(posts.filter(post => post._id !== postId)); // Remove deleted post from state
        alert('Post deleted successfully!');
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post!');
      }
    }
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        Loading posts...
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>ShareYourEmotions</h1>

      {/* Tag Filter Section */}
      <div style={styles.tagContainer}>
        <h3 style={styles.tagHeader}>Filter by Tags:</h3>
        <div style={styles.tagList}>
          <button
            style={styles.tagButton}
            onClick={() => handleTagSelect("")}
          >
            All
          </button>
          {tags.length > 0 ? (
            tags.map((tag) => (
              <button
                key={tag}
                style={styles.tagButton}
                onClick={() => handleTagSelect(tag)}
              >
                {tag}
              </button>
            ))
          ) : (
            <p style={styles.noTags}>No tags available</p>
          )}
        </div>
      </div>

      {/* Posts List */}
      <div style={styles.postsContainer}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} style={styles.postCard}>
              <h2 style={styles.title}>{post.title}</h2>
              <p style={styles.date}>Posted on {new Date(post.date).toLocaleDateString()}</p>
              {post.image && (
                <img
                  src={`https://syeb.onrender.com/${post.image}`}
                  alt={post.title}
                  style={styles.image}
                />
              )}

              {/* Render content as HTML using dangerouslySetInnerHTML */}
              <div
                style={styles.content}
                dangerouslySetInnerHTML={{ __html: post.content }} // Render HTML content
              />
              
              <button
                style={styles.deleteButton}
                onClick={() => handleDelete(post._id)} // Delete post on button click
              >
                Delete Post
              </button>
            </div>
          ))
        ) : (
          <p style={styles.noPosts}>No posts found.</p>
        )}
      </div>
    </div>
  );
};

// Inline CSS styles
const styles = {
  container: {
    maxWidth: '900px',
    margin: '20px auto',
    padding: '5px',
    backgroundColor:'rgb(189, 187, 219)',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
  },
  header: {
    textAlign: 'center',
    fontSize: '1.5rem',
    color:'rgb(236, 91, 0)',
    marginBottom: '20px',
  },
  tagContainer: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  tagHeader: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#333',
  },
  tagList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '10px',
  },
  tagButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
  },
  postsContainer: {
    marginTop: '20px',
  },
  postCard: {
    backgroundColor: '#fff',
    marginBottom: '20px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
  },
  title: {
    fontSize: '2rem',
    color: '#333',
    fontWeight: '600',
    marginBottom: '10px',
  },
  date: {
    fontSize: '0.9rem',
    color: '#777',
    marginBottom: '15px',
  },
  content: {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    color: '#555',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    marginTop: '20px',
  },
  deleteButton: {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginTop: '15px',
    transition: 'background-color 0.3s ease',
  },
  loading: {
    fontSize: '1.5rem',
    textAlign: 'center',
    marginTop: '50px',
  },
  noPosts: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#888',
  },
  noTags: {
    textAlign: 'center',
    fontSize: '1.1rem',
    color: '#888',
  },

  // Responsive styles for mobile view
  '@media (max-width: 768px)': {
    header: {
      fontSize: '1.5rem',
    },
    tagButton: {
      padding: '8px 16px',
      fontSize: '0.9rem',
    },
    title: {
      fontSize: '1.5rem',
    },
    content: {
      fontSize: '1rem',
    },
    deleteButton: {
      padding: '8px 16px',
      fontSize: '0.9rem',
    },
  },
};

export default Home;
