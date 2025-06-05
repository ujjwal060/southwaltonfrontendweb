import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Booking.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const Booking = () => {
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 2; 

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
        `http://18.209.91.97:5001/api/book/history/${user}?page=${page}&limit=${limit}&search=`
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
                        {booking.reservationDetails.vehicleDetails?.image?.[0] && (
                          <img
                            src={booking.reservationDetails.vehicleDetails.image[0]}
                            className="img-fluid rounded shadow-sm"
                            style={{
                              width: "100%",
                              height: "100%",
                              maxHeight: "150px",
                              objectFit: "cover",
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
                        <p className="text-success mb-0">
                          <strong>💰 Booking Amount: </strong>${booking.amount || "N/A"}
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
    </>
  );
};

export default Booking;
