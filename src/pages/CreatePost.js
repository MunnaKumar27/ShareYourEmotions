import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(''); // Raw HTML content
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const tagArray = tags.split(',').map((tag) => tag.trim());

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content); // Send raw HTML content
    formData.append('image', image);
    formData.append('tags', JSON.stringify(tagArray));

    setLoading(true);

    try {
      const response = await axios.post('https://syeb.onrender.com/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Post created:', response.data);
      setLoading(false);

      // Redirect to Home page after post is created
      navigate('/'); // Navigates to the Home page ("/")
    } catch (error) {
      console.error('Error creating post:', error);
      setLoading(false);
    }
  };

  // Handle content formatting actions (bold, italic, etc.)
  const handleFormat = (e) => {
    document.execCommand(e.target.value, false, null);
  };

  // Adjust textarea height based on content
  const handleContentChange = (e) => {
    setContent(e.target.innerHTML);
    const contentDiv = e.target;
    contentDiv.style.height = 'auto'; // Reset the height
    contentDiv.style.height = `${contentDiv.scrollHeight}px`; // Adjust height based on content
  };

  return (
    <div style={styles.container}>
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="kuch relatable likh do"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="content">Content</label>
          <div
            id="content"
            contentEditable="true"
            placeholder="Start writing your content here..."
            onInput={handleContentChange}
            style={styles.textarea}
            required
          >
            {/* Placeholder text for the editable content */}
          </div>
        </div>

        <div style={styles.toolbar}>
          <button
            type="button"
            value="bold"
            onClick={handleFormat}
            style={styles.toolbarButton}
          >
            Bold
          </button>
          <button
            type="button"
            value="italic"
            onClick={handleFormat}
            style={styles.toolbarButton}
          >
            Italic
          </button>
          <button
            type="button"
            value="justifyLeft"
            onClick={handleFormat}
            style={styles.toolbarButton}
          >
            Left
          </button>
          <button
            type="button"
            value="justifyCenter"
            onClick={handleFormat}
            style={styles.toolbarButton}
          >
            Center
          </button>
          <button
            type="button"
            value="justifyRight"
            onClick={handleFormat}
            style={styles.toolbarButton}
          >
            Right
          </button>
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="tags">Tags (comma separated)</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. Insta post, poem, story"
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.submitButton} disabled={loading}>
          {loading ? 'Creating Post...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '20px',
    backgroundColor: 'rgb(240, 103, 57)',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  textarea: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    height: 'auto', // Start with auto height
    minHeight: '150px', // Minimum height for the content area
    overflow: 'hidden', // Prevent overflow from visible content
  },
  toolbar: {
    display: 'flex',
    gap: '10px',
    marginBottom: '10px',
  },
  toolbarButton: {
    padding: '5px 10px',
    fontSize: '1rem',
    backgroundColor: '#blue',
    border: '1px solid #ccc',
    borderRadius: '5px',
    color: 'black',
    cursor: 'pointer',
    backgroundColor: 'rgb(244, 72, 15)',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: 'rgb(244, 72, 15)',
    color: 'black',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1.5rem',
  },
};

export default CreatePost;
