import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './Payment.scss';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [reservationId, setReservationId] = useState('');
    const [price, setPrice] = useState('');
    const [searchParams] = useSearchParams();


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user details
                const userId = localStorage.getItem('user');
                if (userId) {
                    const userResponse = await axios.get(`http://98.85.246.54:5001/api/user/${userId}`);
                    setEmail(userResponse.data.data.email);
                    setPhone(userResponse.data.data.phoneNumber);
                } else {
                    throw new Error('User ID not found');
                }


                // price fetching from api
                const reservationId = localStorage.getItem("reservationId");

                if (!reservationId) {
                    setError("No reservation ID found in localStorage.");
                    navigate("/home");
                    return;
                }

                // Build the API URL dynamically
                const apiURL = `http://98.85.246.54:5001/api/reserve/reservation/${reservationId}`;

                const fetchPrice = async () => {
                    try {
                        const response = await axios.get(apiURL);
                        setPrice(response.data.reserveAmount);
                        // console.log(response.data.reserveAmount);
                    } catch (err) {
                        console.error("Error fetching the price:", err);
                        setError("Failed to fetch the price. Please try again later.");
                    }
                };

                fetchPrice();

                // Fetch reservation ID
                const reservation = localStorage.getItem('reservationId');
                if (reservation) {
                    setReservationId(reservation);
                } else {
                    throw new Error('Reservation ID not found');
                }

            } catch (err) {
                console.error(err);
                setError(err.message || 'An error occurred');
            }
        };
        fetchData();
    }, []);


    const sendPaymentDetails = async (transactionId, userId, reservationId) => {
        const bookingId = searchParams.get("bookingId");
        try {
            console.log('Sending payment details:', { transactionId, userId, email, phone, price, bookingId, reservationId });
            const response = await axios.post('http://98.85.246.54:5001/api/pay/register', {
                transactionId,
                userId,
                email,
                phone,
                bookingId,
                reservation: reservationId,  
                amount: price,
                fromAdmin : false,
            });
            console.log('Payment details sent successfully.');

            const { _id } = response.data;
            return _id;  // Return the paymentId immediately
        } catch (error) {
            console.error('Error sending payment details:', error);
            setError('Failed to send payment details');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements || !price) {
            setMessage('Stripe has not loaded or amount is missing.');
            return;
        }

        const cardNumberElement = elements.getElement(CardNumberElement);
        const cardExpiryElement = elements.getElement(CardExpiryElement);
        const cardCvcElement = elements.getElement(CardCvcElement);

        setLoading(true);

        try {
            // Create payment intent
            const { data } = await axios.post('http://98.85.246.54:5001/api/payment/create-payment-intent', {
                amountInDollars: price
            });
            const { clientSecret, transactionId } = data;

            // Confirm card payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardNumberElement,
                    billing_details: { email }
                }
            });

            if (result.error) {
                setMessage(result.error.message);
            } else if (result.paymentIntent.status === 'succeeded') {
                const userId = localStorage.getItem('user');
                localStorage.removeItem('price')
                const bookingId = localStorage.getItem('bookFormId');
                const paymentId = await sendPaymentDetails(transactionId, userId, reservationId);

                // Step 4: Call Send-Invoice API
                try {
                    const invoiceResponse = await axios.post(`http://98.85.246.54:5001/api/pay/send-invoice/${paymentId}`);

                    if (invoiceResponse.data.success) {
                        navigate('/payment-successfully', { state: { transactionId, amount: price } });
                    } else {
                        setMessage('Invoice could not be sent. Please contact support.');
                    }
                } catch (invoiceError) {
                    console.error('Error sending invoice:', invoiceError);
                    setMessage('Payment successful, but invoice could not be sent.');
                }
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            setMessage('Payment failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='Payment'>
            <div className="payment-container">
                <div className="input-container">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        readOnly
                        required
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="amount">Amount (in USD)</label>
                    <input
                        id="amount"
                        type="number"
                        value={price}
                        readOnly
                        placeholder="Amount will be fetched"
                    />
                </div>

                <div className="input-container">
                    <label>Card Number</label>
                    <div className="stripe-input">
                        <CardNumberElement
                            options={{ style: { base: { fontSize: '16px', color: '#424770', '::placeholder': { color: '#aab7c4' } }, invalid: { color: '#9e2146' } } }}
                        />
                    </div>
                </div>

                <div className="input-container">
                    <div className="split-input">
                        <label>Expiry Date</label>
                        <div className="stripe-input">
                            <CardExpiryElement
                                options={{ style: { base: { fontSize: '16px', color: '#424770', '::placeholder': { color: '#aab7c4' } }, invalid: { color: '#9e2146' } } }}
                            />
                        </div>
                    </div>

                    <div className="split-input">
                        <label>CVC</label>
                        <div className="stripe-input">
                            <CardCvcElement
                                options={{ style: { base: { fontSize: '16px', color: '#424770', '::placeholder': { color: '#aab7c4' } }, invalid: { color: '#9e2146' } } }}
                            />
                        </div>
                    </div>
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Processing...' : 'Pay'}
                </button>

                {message && <div className="message">{message}</div>}
                {error && <div className="error">{error}</div>}
            </div>
        </form>
    );
};

const PaymentForm = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};

export default PaymentForm;
