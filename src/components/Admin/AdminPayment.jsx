import React, { useState, useEffect } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./AdminPayment.scss";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [reservationId, setReservationId] = useState("");
  const [bookingIdValue, setBookingIdValue] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();

  // Extract and set data from URL parameters
  useEffect(() => {
    const reserveAmount = searchParams.get("reserveAmount");
    const emailParam = searchParams.get("email");
    const reservationId = searchParams.get("reservationId");
    const bookingId = searchParams.get("bookingId");

    if (reserveAmount) setAmount(reserveAmount);
    if (reservationId) setReservationId(reservationId);
    if (bookingId) setBookingIdValue(bookingId);
    if (emailParam) setEmail(decodeURIComponent(emailParam));
  }, [searchParams]);

  const sendPaymentDetails = async (
    transactionId,
    email,
    reservationId,
    bookingId,
    amount
  ) => {
    try {
      const response = await axios.post(
        "http://98.85.246.54:5001/api/pay/register",
        {
          transactionId,
          email,
          bookingId,
          reservation: reservationId,
          amount: amount,
          fromAdmin : true,
        }
      );
      console.log("Payment details sent successfully.");

      const { _id } = response.data; // Extract paymentId from the response
      return _id; // Return the paymentId immediately
    } catch (error) {
      console.error("Error sending payment details:", error);
      setError("Failed to send payment details");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !amount) {
      setMessage("Stripe has not loaded or amount is missing.");
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);

    setLoading(true);

    try {
      // Create payment intent
      const { data } = await axios.post(
        "http://98.85.246.54:5001/api/payment/create-payment-intent",
        {
          amountInDollars: amount,
        }
      );
      const { clientSecret, transactionId } = data;

      // Confirm card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardNumberElement,
          billing_details: { email },
        },
      });

      if (result.error) {
        setMessage(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        const paymentId = await sendPaymentDetails(
          transactionId,
          email,
          reservationId,
          bookingIdValue,
          amount
        );

        // Step 4: Call Send-Invoice API
        try {
          const invoiceResponse = await axios.post(
            `http://98.85.246.54:5001/api/pay/send-invoice/${paymentId}`
          );

          if (invoiceResponse.data.success) {
            // Navigate to the success page and include the transactionId in the URL
            navigate(
              `/paymentsuccessful-admin?amount=${amount}&email=${encodeURIComponent(
                email
              )}&transactionId=${transactionId}`,
              {
                state: { transactionId, amount },
              }
            );
          } else {
            setMessage("Invoice could not be sent. Please contact support.");
          }
        } catch (invoiceError) {
          console.error("Error sending invoice:", invoiceError);
          setMessage("Payment successful, but invoice could not be sent.");
        }
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      setMessage("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="Payment">
      <div className="payment-container">
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="input-container">
          <label htmlFor="amount">Amount (in USD)</label>
          <input
            id="amount"
            type="number"
            value={amount}
            readOnly
            placeholder="Amount will be fetched"
          />
        </div>

        <div className="input-container">
          <label>Card Number</label>
          <div className="stripe-input">
            <CardNumberElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": { color: "#aab7c4" },
                  },
                  invalid: { color: "#9e2146" },
                },
              }}
            />
          </div>
        </div>

        <div className="input-container">
          <div className="split-input">
            <label>Expiry Date</label>
            <div className="stripe-input">
              <CardExpiryElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": { color: "#aab7c4" },
                    },
                    invalid: { color: "#9e2146" },
                  },
                }}
              />
            </div>
          </div>

          <div className="split-input">
            <label>CVC</label>
            <div className="stripe-input">
              <CardCvcElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": { color: "#aab7c4" },
                    },
                    invalid: { color: "#9e2146" },
                  },
                }}
              />
            </div>
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Pay"}
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
