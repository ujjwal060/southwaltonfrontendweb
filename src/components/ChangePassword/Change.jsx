import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Change.scss';
import { useNavigate, useLocation } from 'react-router-dom';

const Change = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // For navigation after successful password reset
  const location = useLocation();
  const email = location.state?.email; // Handle token from URL or state

  useEffect(() => {
    if (!email) {
      setMessage('Reset token is missing or invalid.');
    }
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://18.209.91.97:5001/api/auth/resetPassword', {
      email:  email,
        password,
      });

      if (response.status === 200) {
        setMessage('Password reset successfully!');
        navigate('/login');
      } else {
        setMessage('Password reset failed. Please try again.');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage('Error resetting password. Please try again.');
    }
  };



  return (
    <div className='change'>
      <h2>Reset Your Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="password"><i className="fa-solid fa-lock" /> Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="confirmPassword"><i className="fa-solid fa-lock" /> Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <div className="forgot-btn">
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Change;
