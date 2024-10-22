import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

function Signup({ setUser }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const handleSignup = (e) => {
    e.preventDefault();
    
    try {
      // Get existing users or initialize empty array
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      
      // Check if username already exists
      if (storedUsers.some(user => user.username === formData.username)) {
        setError('Username already exists');
        return;
      }

      // Validate input
      if (!formData.username || !formData.password) {
        setError('Please enter both username and password');
        return;
      }

      // Create new user
      const newUser = {
        username: formData.username,
        password: formData.password,
        createdAt: new Date().toISOString()
      };

      // Add to users array
      storedUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(storedUsers));

      // Set active user session
      localStorage.setItem('currentUser', JSON.stringify({
        username: newUser.username,
        loginTime: new Date().toISOString()
      }));

      setUser(newUser.username);
      navigate('/');
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Signup error:', err);
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      {error && <div className="auth-error">{error}</div>}
      <form onSubmit={handleSignup}>
        <input
          type="text"
          name="username"
          placeholder="Create username"
          value={formData.username}
          onChange={handleChange}
          className="auth-input"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Create password"
          value={formData.password}
          onChange={handleChange}
          className="auth-input"
          required
        />
        <button type="submit" className="auth-button">Signup</button>
      </form>
    </div>
  );
}
export default Signup