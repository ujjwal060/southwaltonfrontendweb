import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './PaymentSuccessfully.scss';
import payment from './img/payment.png'; // Path to your check icon image
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const InvoiceDetails = () => {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const { transactionId } = location.state || {};

  const navigate = useNavigate();
  const handleChange = () => {
    navigate('/')
  }

  useEffect(() => {
    const reservationId = localStorage.getItem("reservationId");

    if (!reservationId) {
      setError("No reservation ID found in localStorage.");
      return;
    }

    localStorage.removeItem("reservationId");

    const apiURL = `http://44.196.64.110:5001/api/reserve/reservation/${reservationId}`;

    // Fetch the price from the API
    const fetchPrice = async () => {
      try {
        // Fetch data from the API using Axios
        const response = await axios.get(apiURL);
        setPrice(response.data.reserveAmount); // Assuming the API response contains a 'price' field
        console.log("Fetched Price:", response.data.reserveAmount);
      } catch (err) {
        console.error("Error fetching the price:", err);
        setError("Failed to fetch the price. Please try again later.");
      }
    };

    fetchPrice();
  }, []);


  const fetchUserDetails = async () => {
    const userId = localStorage.getItem('user');
    if (!userId) {
      setError("User Id not found")
      setLoading(false)
      return;
    }
    console.log(userId);
    try {

      const response = await axios.get(`http://44.196.64.110:5001/api/user/${userId}`);
      console.log('response', response);
      setEmail(response.data.data.email);
      setName(response.data.data.name);
      setPhone(response.data.data.phoneNumber);
    }
    catch (error) {
      console.error('Error fetching user details:', err);
      setError('Failed to fetch user details');
    }
  }
  const fetchVehicleDetails = async () => {

    const vehicle = localStorage.getItem('vehicleId');
    if (!vehicle) {
      setError('Vehicle not found')
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(`http://44.196.64.110:5001/api/vehicle/vehicles/${vehicle}`)
      setPrice(response.data.vprice);
      console.log(response);

    }
    catch (error) {
      console.error('Error fetching vehicle details:', err);
      setError('Failed to fetch vehicle details');
    }

  }

  useEffect(() => {
    fetchUserDetails();
    fetchVehicleDetails()
  }, [])

  return (
    <>
      <div className="invoice-container">
        <div className="icon-section">
          <img src={payment} alt="Success" />
        </div>
        <div className="details-section">
          <p><strong>Payment Method</strong> : Net Banking</p>
          <p><strong>Payment Type</strong> : Stripe</p>
          <p><strong>Mobile</strong> : {phone}</p>
          <p><strong>Email</strong> : {email}</p>
          <p><strong>Amount Paid</strong> : ${price}</p>
          <p><strong>Transaction ID</strong> : {transactionId || 'N/A'}</p>
          <button className="next-button" onClick={handleChange}>Next</button>
        </div>
      </div>

{/* note */}
      <div className='note'>    
        <div className='note-content'> **NOTE:  A mail has been sent to your email address. Please check your inbox for the app link and follow the instructions provided to proceed with the next steps.</div>
      </div>
    </>
  );
};

export default InvoiceDetails;     
