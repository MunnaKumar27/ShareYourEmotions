import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null); // For error handling
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch post data when component mounts
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://shareyouremotion-backend.onrender.com/post/${id}`);
        if (!response.ok) {
          throw new Error('Post not found');
        }
        const postInfo = await response.json();
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      } catch (error) {
        setError('Failed to load post');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  async function updatePost(ev) {
    ev.preventDefault();

    // Ensure fields are not empty
    if (!title || !summary || !content) {
      alert('Please fill in all fields.');
      return;
    }

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);

    // Check if files exist before appending
    if (files?.[0]) {
      data.set('file', files?.[0]);
    }

    try {
      const response = await fetch('https://shareyouremotion-backend.onrender.com/post', {
        method: 'PUT',
        body: data,
        credentials: 'include',
      });

      if (response.ok) {
        setRedirect(true); // Redirect to the post page
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update post');
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
    }
  }

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={updatePost}>
      {error && <div style={{ color: 'red' }}>{error}</div>} {/* Show error message */}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={ev => setTitle(ev.target.value)}
      />
      <input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={ev => setSummary(ev.target.value)}
      />
      <input
        type="file"
        onChange={ev => setFiles(ev.target.files)}
      />
      <Editor onChange={setContent} value={content} />
      <button style={{ marginTop: '5px' }}>Update Post</button>
    </form>
  );
}
