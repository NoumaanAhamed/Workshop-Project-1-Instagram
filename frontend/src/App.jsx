import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css'; // Import the CSS file

const App = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ image: '', caption: '' });
  const [newComment, setNewComment] = useState({ postId: '', comment: '' });

  useEffect(() => {
    // Fetch all posts when the component mounts
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array ensures this effect runs once on mount

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleCreatePost = async () => {
    try {
      // Create a new post
      const response = await axios.post('http://localhost:3000/posts', newPost);
      setPosts([...posts, response.data]);
      setNewPost({ image: '', caption: '' });
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleLike = async (postId) => {
    try {
      // Like a post
      const response = await axios.put(`http://localhost:3000/posts/${postId}/like`);
      setPosts(posts.map(post => (post._id === postId ? response.data : post)));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleUnlike = async (postId) => {
    try {
      // Unlike a post
      const response = await axios.put(`http://localhost:3000/posts/${postId}/unlike`);
      setPosts(posts.map(post => (post._id === postId ? response.data : post)));
    } catch (error) {
      console.error('Error unliking post:', error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      // Delete a post
      await axios.delete(`http://localhost:3000/posts/${postId}`);
      setPosts(posts.filter(post => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleCommentInputChange = (event) => {
    const { name, value } = event.target;
    setNewComment({ ...newComment, [name]: value });
  };

  const handleComment = async (postId) => {
    try {
      // Comment on a post
      const response = await axios.put(`http://localhost:3000/posts/${postId}/comment`, { comment: newComment.comment });
      setPosts(posts.map(post => (post._id === postId ? response.data : post)));
      setNewComment({ postId: '', comment: '' });
    } catch (error) {
      console.error('Error commenting on post:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="header">Instagram Clone</h1>

      {/* Form for creating a new post */}
      <div>
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={newPost.image}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="caption"
          placeholder="Caption"
          value={newPost.caption}
          onChange={handleInputChange}
        />
        <button onClick={handleCreatePost}>Create Post</button>
      </div>

      {/* Display all posts */}
      <div>
        {posts.map(post => (
          <div key={post._id} className="post">
            <img
              src={post.image}
              alt={post.caption}
              className="post-image"
            />
            <div className="post-content">
              <p>{post.caption}</p>
              <p>Likes: {post.likes}</p>
              <p>Comments: {post.comments.join(', ')}</p>
              <div className="comment-form">
                <input
                  type="text"
                  name="comment"
                  placeholder="Add a comment"
                  value={newComment.comment}
                  onChange={handleCommentInputChange}
                />
                <button onClick={() => handleComment(post._id)}>Comment</button>
              </div>
            </div>
            <div className="post-actions">
              <button onClick={() => handleLike(post._id)}>Like</button>
              <button onClick={() => handleUnlike(post._id)}>Unlike</button>
              <button onClick={() => handleDelete(post._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
