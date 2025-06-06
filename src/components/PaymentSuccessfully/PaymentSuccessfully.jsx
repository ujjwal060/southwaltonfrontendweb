import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./PaymentSuccessfully.scss";
import successful1 from "./img/successful1.png";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

const InvoiceDetails = () => {
  const navigate = useNavigate();
  const [orderHistory, setOrderHistory] = useState({});
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [bookingId, setBookingId] = useState("");

  const [paymentLoading, setPaymentLoading] = useState(true); // API data loading
  const [userLoading, setUserLoading] = useState(true); // User data loading
  const [dataLoaded, setDataLoaded] = useState(false); // Ensure everything is loaded

  useEffect(() => {
    if (sessionId) {
      const fetchPaymentDetails = async () => {
        try {
          const response = await axios.get(
            `http://18.209.91.97:5001/api/pay/complete-payment?session_id=${sessionId}`
          );
          if (response.status === 200) {
            setOrderHistory(response.data.data);
            setPrice(
              response.data.data.paymentDetails.transactionDetails.amount / 100
            );
            setBookingId(response.data.data.bookingId);
          }
        } catch (error) {
          console.error("Error fetching payment details:", error);
          setError("Failed to fetch payment details");
        } finally {
          setPaymentLoading(false);
        }
      };
      fetchPaymentDetails();
    }
  }, [sessionId]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("user");
      if (!userId) {
        setError("User ID not found");
        setUserLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          `http://18.209.91.97:5001/api/user/${userId}`
        );
        setEmail(response.data.data.email);
        setPhone(response.data.data.phoneNumber);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError("Failed to fetch user details");
      } finally {
        setUserLoading(false);
      }
    };
    fetchUserDetails();
  }, []);

  // ✅ Ensure everything is fully loaded before showing data
  useEffect(() => {
    if (!paymentLoading && !userLoading) {
      setDataLoaded(true);
    }
  }, [paymentLoading, userLoading]);

  const handleNext = () => {
    navigate("/");
  };

  return (
    <div className="invoice-container container pt-2">
      <div className="row">
        {/* Left Side - Always Visible */}
        <div className="col-md-6">
          <div className="icon-section">
            <img className="image" src={successful1} alt="Success" />
          </div>
          <h2>
            <strong>
              Congratulations! Your Payment for Reservation is done Successfully
            </strong>
          </h2>

          <div className="note">
            <div className="note-content text-muted fs-6 text-danger">
              **NOTE: A mail has been sent to your email address. Please check
              your inbox for the app link and follow the instructions provided
              to proceed with the next steps.
            </div>
          </div>
        </div>

        {/* Right Side - Conditional */}
        <div className="col-md-6">
          {!dataLoaded ? (
            <div className="text-center pt-5">
              <h5>
                <FaSpinner className="spinner-icon me-2" spin /> Loading Payment
                Details... Please Wait
              </h5>
            </div>
          ) : (
            <table className="details-table table table-striped table-bordered">
              <tbody>
                <tr>
                  <td>Amount Paid</td>
                  <td>{`$${price || "N/A"}`}</td>
                </tr>
                <tr>
                  <td>Payment Method</td>
                  <td>{orderHistory.paymentDetails?.paymentMethod || "N/A"}</td>
                </tr>
                <tr>
                  <td>Payment Type</td>
                  <td>Stripe</td>
                </tr>
                <tr>
                  <td>Payment ID</td>
                  <td>{orderHistory.paymentDetails?.paymentId || "N/A"}</td>
                </tr>
                <tr>
                  <td>Booking ID</td>
                  <td>{bookingId || "N/A"}</td>
                </tr>
                <tr>
                  <td>Transaction ID</td>
                  <td>
                    {orderHistory.paymentDetails?.transactionDetails?.id ||
                      "N/A"}
                  </td>
                </tr>
                <tr>
                  <td>Mobile</td>
                  <td>{phone || "N/A"}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{email || "N/A"}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>

      <button className="next-button" onClick={handleNext}>
        Back to Home
      </button>
    </div>
  );
};

export default InvoiceDetails;
