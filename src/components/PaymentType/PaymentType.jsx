import React, { useState, useEffect } from 'react';
import './PaymentType.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PaymentForm = () => {
    const [selectedPaymentType, setSelectedPaymentType] = useState('Type');
    const [amount, setAmount] = useState({ price: '' });

    const handleSelect = (type) => {
        setSelectedPaymentType(type);
    };

    const getAmount = async () => {
        try {
            const vehicleId = localStorage.getItem('vehicleId');
            const response = await axios.get(`http://98.85.246.54:5001/api/vehicle/vehicles/${vehicleId}`);
            const data = response.data;
            console.log('response', data);
            setAmount({ price: data.vprice });
        } catch (error) {
            console.log("Error fetching vehicle details", error);
        }
    };

    useEffect(() => {
        getAmount();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAmount(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div className="payment-form-container">
            <form className="payment-form">
                <div className="form-group">
                    <label htmlFor="amount">Payment</label>
                    <div className="dropdown">
                        <button className="dropbtn">{selectedPaymentType}</button>
                        <div className="dropdown-content">
                            <a href="#" onClick={() => handleSelect('Credit Card')}>Credit Card</a>
                            <a href="#" onClick={() => handleSelect('Debit Card')}>Debit Card</a>
                            <a href="#" onClick={() => handleSelect('PayPal')}>PayPal</a>
                            <a href="#" onClick={() => handleSelect('Cash')}>Cash</a>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    
                    <input
                        type="text"
                        id="amount"
                        name="price"
                        placeholder="Enter amount"
                        
                        value={amount.price}
                        onChange={handleInputChange}
                        readOnly
                    />
                </div>
                <div className="payment-button">
                    <Link to='/payment' style={{ textDecoration: "none" }}>
                        <button type="submit">Next</button>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default PaymentForm;
