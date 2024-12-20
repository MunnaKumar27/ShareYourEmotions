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
  // const handleDelete = async (postId) => {
  //   if (window.confirm("Are you sure you want to delete this post?")) {
  //     try {
  //       await axios.delete(`https://syeb.onrender.com/api/posts/${postId}`);
  //       setPosts(posts.filter(post => post._id !== postId)); // Remove deleted post from state
  //       alert('Post deleted successfully!');
  //     } catch (error) {
  //       console.error('Error deleting post:', error);
  //       alert('Failed to delete post!');
  //     }
  //   }
  // };

  // Copy post content as plain text (stripping out HTML tags)
  const handleCopy = (content) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;  // Set HTML content into a temporary div
    const plainText = tempDiv.innerText || tempDiv.textContent;  // Extract plain text

    navigator.clipboard.writeText(plainText)  // Copy plain text to clipboard
      .then(() => {
        alert('Content copied to clipboard!');
      })
      .catch((error) => {
        alert('Failed to copy content!');
        console.error('Copy failed:', error);
      });
  };

  // Share the post using Web Share API (for supported browsers)
  const handleShare = (post) => {
    const { title, content } = post;  // Extract title and content of the current post
    if (navigator.share) {
      navigator.share({        // Share post content
        url: window.location.href,  // Share the current page URL
      }).then(() => {
        console.log('Post shared successfully');
      }).catch((error) => {
        console.error('Error sharing post:', error);
        alert('Failed to share the post');
      });
    } else {
      alert('Share not supported in your browser.');
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
      <h1 style={styles.header}>Share Your Emotions &#x2665; </h1>

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
                  onError={(e) => e.target.src = 'https://images.pexels.com/photos/2260959/pexels-photo-2260959.jpeg?cs=srgb&dl=pexels-arthurbrognoli-2260959.jpg&fm=jpg'}
                />
              )}

              {/* Render content as HTML using dangerouslySetInnerHTML */}
              <div
                style={styles.content}
                dangerouslySetInnerHTML={{ __html: post.content }} // Render HTML content
              />

              <div style={styles.buttonGroup}>
                <button
                  style={styles.copyButton}
                  onClick={() => handleCopy(post.content)} // Copy content on button click
                >
                  Copy &#x1F600;
                </button>

                <button
                  style={styles.deleteButton}
                  // onClick={() => handleDelete(post._id)} // Delete post on button click
                >
                  Delete Post  &#x1F621;
                </button>

                <button
                  style={styles.shareButton}
                  onClick={() =>handleShare(post)} // Share post
                >
                  Share Post &#x1F4AC;
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={styles.noPosts}>No posts found.</p>
        )}
      </div>
    </div>
  );
};

// Inline CSS styles (same as before)
const styles = {
  container: {
    maxWidth: '900px',
    margin: '20px auto',
    padding: '10px',
    backgroundColor: 'rgb(255, 140, 0)',
    borderRadius: '10px',
    border: '2px solid white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
  },
  buttonGroup: {
    marginTop: '10px',
    display: 'flex',
    gap: '10px',
  },
  copyButton: {
    padding: '10px 20px',
    backgroundColor: 'rgb(0, 128, 38)',
    color: 'black',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '.8rem',
    transition: 'background-color 0.3s ease',
    fontFamily: 'Georgia, serif',
    fontWeight: '800',
  },
  deleteButton: {
    padding: '10px 20px',
    backgroundColor: 'rgb(229, 55, 55)',
    color: 'black',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '.8rem',
    transition: 'background-color 0.3s ease',
    fontFamily: 'Georgia, serif',
    fontWeight: '900',
  },
  shareButton: {
    padding: '10px 20px',
    backgroundColor: 'rgb(54, 199, 71)',
    color: 'black',
    // border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '.8rem',
    transition: 'background-color 0.3s ease',
    fontFamily: 'Georgia, serif',
    fontWeight: '900',
  },
  header: {
    textAlign: 'center',
    fontSize: '2rem',
    marginTop: '15px',
    color: 'rgb(113, 4, 4)',
    fontFamily: 'cursive',
    marginBottom: '20px',
    fontWeight:'bold',
  },
  tagContainer: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  tagHeader: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#333',
    fontFamily: 'Georgia, serif',
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
    backgroundColor: 'rgb(236, 97, 51)',
    color: 'black',
    border:'1px solid rgb(0, 0, 0)',
    // border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '.8rem',
    transition: 'background-color 0.3s ease',
    fontFamily: 'cursive',
    fontWeight: '900'
  },
  postsContainer: {
    marginTop: '20px',
  },
  postCard: {
    backgroundColor: 'rgb(245, 208, 152)',
    marginBottom: '20px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(239, 183, 16, 0.1)',
    transition: 'all 0.3s ease',
    border:'1px solid rgb(185, 49, 185)',
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
    color: 'black',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    marginTop: '20px',
  },
  noPosts: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#888',
  },
  loading: {
    fontSize: '1.5rem',
    textAlign: 'center',
    marginTop: '50px',
    color:'white',
    fontSize: '2rem',
    transition: 'background-color 0.3s ease',
    fontFamily: 'Georgia, serif',
    fontWeight: '900',
  },
  '@media (max-width: 768px)': {
    header: {
      fontSize: '2rem',
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
    }
  }
};

export default Home;
