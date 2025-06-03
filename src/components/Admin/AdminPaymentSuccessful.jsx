import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './AdminPaymentSuccessful.scss';
import payment from './img/payment.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const InvoiceDetails = () => {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [error, setError] = useState('');

    useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      const emailParam = searchParams.get('email');
      const amountParam = searchParams.get('amount');
      const transactionIdParam = searchParams.get('transactionId');
  
      if (emailParam) setEmail(decodeURIComponent(emailParam));
      if (amountParam) setAmount(amountParam);
      if (transactionIdParam) setTransactionId(transactionIdParam);
    }, [location.search]);
  
    const handleChange = () => {
      navigate('/');
    };

  return (
    <>
      <div className="invoice-container">
        <div className="icon-section">
          <img src={payment} alt="Success" />
        </div>
        <div className="details-section">
          <p><strong>Payment Method</strong> : Net Banking</p>
          <p><strong>Payment Type</strong> : Stripe</p>
          <p><strong>Mobile</strong> : N/A</p>
          <p><strong>Email</strong> : {email || 'Not Available'}</p>
          <p><strong>Amount Paid</strong> : ${amount || 'Not Available'}</p>
          <p><strong>Transaction ID</strong> : {transactionId || 'Not Available'}</p>
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