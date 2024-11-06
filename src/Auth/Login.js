// src/LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    app: process.env.REACT_APP_NAME,
  });
  const [message, setMessage] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(apiUrl + '/login', credentials);
      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      login(access_token);
      setMessage(response.data.message);
      navigate('/'); // Redirect to dashboard
    } catch (error) {
      setMessage(error.response?.data?.error || 'An error occurred.');
    }
  };

  return (
    <div className="d-flex container justify-content-center my-4" style={{ minHeight: '100vh' }}>
      <div>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3" controlId="formEmail">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3" controlId="formPassword">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button variant="primary" type="submit" >
            Submit
          </button>
        </form>

       
      </div>
    </div>
  );
};

export default LoginForm;