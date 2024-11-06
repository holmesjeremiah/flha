import React, { useState } from 'react';
import axios from 'axios';

const Registerform = () => {
  const [formData, setformData] = useState({
    name: '',
    email: '',
    password: '',
    app: process.env.REACT_APP_NAME,
  });
  const [message, setMessage] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirm) {
      setMessage('Passwords do not match.');
      return;
    }
    try {
      const response = await axios.post(apiUrl + '/register', formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || 'An error occurred.');
    }
  };

  return (
    <div className="d-flex container justify-content-center my-4" style={{ minHeight: '100vh' }}>
      <div>
        <h2 className="text-center mb-4">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3" controlId="formName">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-3" controlId="formEmail">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
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
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="mb-3" controlId="formPasswordConfirm">
            <label>Confirm Password</label>
            <input
              type="password"
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleChange}
              placeholder="Re-Enter your password"
              required
            />
          </div>


          <button variant="primary" type="submit">
            Register
          </button>
        </form>

        {message && (
          <div class="alert alert-primary" variant="info" className="mt-3">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Registerform;