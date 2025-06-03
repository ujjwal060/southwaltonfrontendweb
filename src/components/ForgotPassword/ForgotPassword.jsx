import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.scss';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();
  
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post('http://44.196.64.110:5001/api/auth/send-email', { email });
      setMessage('OTP sent to your email successfully!');
      setIsOtpSent(true); // Show OTP input field
    } catch (error) {
      setMessage('Error sending email. Please try again.');
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://44.196.64.110:5001/api/auth/verify-otp', { email, otp });
      
      if (response.status === 200) {
        // Redirect to resetPassword page with token as a query parameter
        navigate('/change-password', { state: { email:email } });
      }
    } catch (error) {
      setMessage('Invalid or expired OTP. Please try again.');
    }
  };

  return (
    <div className='forget'>
      <h2>Forgot Password?</h2>
      {!isOtpSent ? (
        <form onSubmit={handleEmailSubmit}>
          <div className="form-group">
            <label htmlFor="email"><i className="fa-solid fa-envelope" /> Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="forgot-btn">
              <button type="submit">Submit</button>
            </div>
          </div>
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit}>
          <div className="form-group">
            <label htmlFor="otp"><i className="fa-solid fa-key" /> Enter OTP</label>
            <input
              type="text"
              id="otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <div className="forgot-btn">
              <button type="submit">Verify OTP</button>
            </div>
          </div>
        </form>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}

export default ForgotPassword;
