import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Booking.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { FaUser } from "react-icons/fa";

const Booking = () => {
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalAction, setModalAction] = useState(null);

  const navigate = useNavigate();
  const limit = 3;

  const fetchBookings = async (page) => {
    setLoading(true);
    const user = localStorage.getItem("user");

    if (!user) {
      setError("User not logged in.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `http://98.85.246.54:5001/api/book/history/${user}?page=${page}&limit=${limit}&search=`
      );
      setRecentBookings(response.data.data.data);
      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      setError("Failed to fetch bookings. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings(currentPage);
  }, [currentPage]);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleCancel = (bookingId) => {
    setModalTitle("Warning");
    setModalMessage("Are you sure you want to cancel this booking? Note: The $100 Reservation Deposit Ami is non-refundable.");
    setModalAction(() => async () => {
      setShowModal(false);
      try {
        await axios.put(`http://98.85.246.54:5001/api/book/cancel/${bookingId}`);
        setModalTitle("Success");
        setModalMessage("Booking cancelled successfully.");
        setShowModal(true);
        fetchBookings(currentPage);
      } catch {
        setModalTitle("Error");
        setModalMessage("Failed to cancel booking. Try again.");
        setShowModal(true);
      }
    });
    setShowModal(true);
  };


  const handlePay = (bookingId) => {
    const booking = recentBookings.find(b => b._id === bookingId);
    if (booking) {
      navigate(`/reservePage2`, {
        state: {
          vehicleId: booking.reservationDetails.vehicleId,
          reservationId: booking.reservationDetails._id,
          bookingDetails: booking.bookingDetails
        },
      });
    } else {
      setModalTitle("Error");
      setModalMessage("Missing booking information.");
      setShowModal(true);
    }
  };

  return (
    <>
      {/* Breadcrumb Section */}
      <div className="breadcrumb-container">
        <div className="breadcrumb-overlay">
          <h2>My Profile</h2>
          <p>
            <Link to="/">Home</Link> / <span>My Recent Bookings</span>
          </p>
        </div>
      </div>

      {/* Booking Section */}
      <div className="container mt-4">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-danger">{error}</p>
        ) : recentBookings.length === 0 ? (
          <p className="text-center">No recent bookings found.</p>
        ) : (
          <>
            <div className="row justify-content-center">
              <h1>My Reservations</h1>
              {recentBookings.map((booking, index) => (
                <div className="col-lg-4 col-md-12 mb-4" key={index}>

                  <div className="card shadow-lg border-0 bg-light rounded-lg overflow-hidden h-100">
                    <div className="card-header bg-dark text-center p-2">
                      <h6 className="text-white mb-0">
                        {booking.bookingDetails?.bname || "N/A"}
                      </h6>
                    </div>

                    <div className="card-body d-flex flex-column">
                      <div className="text-center">
                        {booking.reservationDetails.vehicleDetails?.image && (
                          <img
                            src={booking.reservationDetails.vehicleDetails.image}
                            className="img-fluid rounded shadow-sm"
                            style={{
                              background: "#fff",
                              width: "100%",
                              height: "100%",
                              maxHeight: "180px",
                            }}
                            alt="Vehicle"
                          />
                        )}
                      </div>

                      <div className="mt-3">
                        <p className="card-text">
                          <strong>🚘 Cart Name:</strong>{" "}
                          {booking.reservationDetails.vehicleDetails?.vname || "N/A"}
                        </p>
                        <p className="card-text">
                          <strong>📍 Pickup:</strong>{" "}
                          {booking.reservationDetails.pickup || "N/A"}
                        </p>
                        <p className="card-text">
                          <strong>📍 Drop-off:</strong>{" "}
                          {booking.reservationDetails.drop || "N/A"}
                        </p>
                        <p className="card-text">
                          <strong>📅 Booking Date:</strong>{" "}
                          {new Date(booking.reservationDetails.pickdate).toLocaleDateString()} -{" "}
                          {new Date(booking.reservationDetails.dropdate).toLocaleDateString()}
                        </p>
                        <p className="card-text">
                          <strong>💰 Reservation Amount Paid: </strong>${100}
                        </p>
                        <p className="card-text">
                          <strong>💳 Amount Remaining:</strong> $
                          {booking.amount ? (booking.amount - 100).toFixed(2) : "N/A"}
                        </p>

                        <div className="d-flex justify-content-center mt-2 me-2">
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleCancel(booking._id)}
                          >
                            Cancel
                          </button>
                          <button
                            className="btn btn-success btn-sm ms-2"
                            onClick={() => handlePay(booking._id)}
                          >
                            Book
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-center mt-3">
                <button
                  className="btn btn-primary me-2"
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="align-self-center">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="btn btn-primary ms-2"
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <hr />
      <div className="container mt-4">
        {loading ? (
          <p className="text-center"></p>
        ) : error ? (
          <p className="text-center text-danger">{error}</p>
        ) : recentBookings.length === 0 ? (
          <p className="text-center">No recent bookings found.</p>
        ) : (
          <>
            <div className="row justify-content-center">
              <h1>My Bookings</h1>
              {recentBookings.map((booking, index) => (
                <div className="col-lg-4 col-md-12 mb-4" key={index}>
                  <div className="card shadow-lg border-0 bg-light rounded-lg overflow-hidden h-100">
                    <div className="card-header bg-dark text-center p-2">
                      <h6 className="text-white mb-0">
                        {booking.bookingDetails?.bname || "N/A"}
                      </h6>
                    </div>

                    <div className="card-body d-flex flex-column">
                      <div className="text-center">
                        {booking.reservationDetails.vehicleDetails?.image && (
                          <img
                            src={booking.reservationDetails.vehicleDetails.image}
                            className="img-fluid rounded shadow-sm"
                            style={{
                              background: "#fff",
                              width: "100%",
                              height: "100%",
                              maxHeight: "180px",
                            }}
                            alt="Vehicle"
                          />
                        )}
                      </div>

                      <div className="mt-3">
                        <p className="card-text">
                          <strong>🚘 Cart Name:</strong>{" "}
                          {booking.reservationDetails.vehicleDetails?.vname || "N/A"}
                        </p>
                        <p className="card-text">
                          <strong>📍 Pickup:</strong>{" "}
                          {booking.reservationDetails.pickup || "N/A"}
                        </p>
                        <p className="card-text">
                          <strong>📍 Drop-off:</strong>{" "}
                          {booking.reservationDetails.drop || "N/A"}
                        </p>
                        <p className="card-text">
                          <strong>📅 Booking Date:</strong>{" "}
                          {new Date(booking.reservationDetails.pickdate).toLocaleDateString()} -{" "}
                          {new Date(booking.reservationDetails.dropdate).toLocaleDateString()}
                        </p>
                        <p className="card-text">
                          <strong>💰 Total Booking Amount Paid: </strong>${booking.amount || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-center mt-3">
                <button
                  className="btn btn-primary me-2"
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="align-self-center">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="btn btn-primary ms-2"
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered dialogClassName="custom-modal">
        <div
          className={`top-section ${modalTitle === "Success"
            ? "success-top"
            : modalTitle === "Warning"
              ? "warning-top"
              : "error-top"
            }`}
        >
          {modalTitle === "Success" ? (
            <i className="bi bi-check-circle-fill success-icon"></i>
          ) : modalTitle === "Warning" ? (
            <i className="bi bi-exclamation-circle-fill warning-icon"></i>
          ) : (
            <i className="bi bi-exclamation-triangle-fill error-icon"></i>
          )}
        </div>
        <div className="modal-body text-center">
          <h4>{modalTitle}!</h4>
          <p>{modalMessage}</p>
          <button
            className={`modal-button ${modalTitle === "Success"
              ? "success-btn"
              : modalTitle === "Warning"
                ? "warning-btn"
                : "error-btn"
              }`}
            onClick={() => {
              setShowModal(false);
              if (modalAction) modalAction();
            }}
          >
            {modalTitle === "Success"
              ? "Continue"
              : modalTitle === "Warning"
                ? "Yes, Cancel"
                : "Try again"}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Booking;
