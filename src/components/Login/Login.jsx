import React, { useState } from 'react';
import axios from 'axios';
import './Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import OR from './img/OR.png';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const vehicleId = localStorage.getItem('vehicleId');


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');

      const response = await axios.post('http://98.85.246.54:5001/api/auth/login', formData);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', response.data.data._id);
      localStorage.setItem('vehicleId', vehicleId);
      toast.success('Login successful!');

      setTimeout(() => {
        const reservationId = localStorage.getItem('reservationId');
        const storedVehicleId = localStorage.getItem('vehicleId');
        const token = localStorage.getItem('token');

        if (reservationId && storedVehicleId && token) {
          navigate(`/checkout?vehicleId=${storedVehicleId}`);
        } else {
          navigate('/');
        }

        localStorage.removeItem('vehicleId');
      }, 1000);
    } catch (error) {
      console.error('There was an error logging in!', error);

      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Login failed. Please try again.');
      } else {
        setError('Login failed. Please check your credentials and try again.');
      }
      toast.error('Login failed. Please check your credentials and try again.');
    }
  };


  return (
    <div className='Payment container bg-light p-3'>
      <div className="row">
        <div className="col-md-6">
          <img src={"https://img.freepik.com/premium-vector/isometric-content-management-system-illustration_52683-55969.jpg?uid=R187744377&ga=GA1.1.2076956031.1739515128&semt=ais_authors_boost"} alt="" className='login-img' />
        </div>
        <div className="col-md-6"><div className="login-container">
          <h3 className='login'>Log In</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email"><i className="fa-solid fa-envelope" /> Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password"><i className="fa-solid fa-lock" /> Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            {/* <div className="form-group remember-me">
            <input
              type="checkbox"
              id="remember-me"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <label htmlFor="remember-me">Remember Me</label>
          </div> */}
            {error && <p className="error">{error}</p>}
            <div className="login-button">
              <button type="submit">Login</button>
            </div>
          </form>
          <div className="additional-options">
            <p>Not have any account? <Link to="/sign-up">Sign Up</Link></p>
            <img src={OR} alt="Or separator" />
            <p><Link to="/forgot-password">Forgot Password?</Link></p>
          </div>
        </div></div>
      </div>

      <ToastContainer /> {/* Ensure this is present */}
    </div>
  );
};

export default Login;
