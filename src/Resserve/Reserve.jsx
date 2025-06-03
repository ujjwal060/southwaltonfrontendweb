import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import homebg1 from "./img/homebg1.jpg";
import Group from "./img/Group.png";
import { Link } from "react-router-dom";
import "./Reserve.scss";
import {
  CheckCircle,
  MapPin,
  Calendar,
  DollarSign,
  ShieldAlert,
} from "lucide-react";

const Reserve = ({ hideContent }) => {
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [reservationDates, setReservationDates] = useState(null);
  const canvasRef = useRef(null);
  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { season, day, vehicleId } = location.state || {};
  const [reservationId, setReservationId] = useState(
    localStorage.getItem("reservationId") || ""
  );
  const [calcPrice, setCalcPrice] = useState("");
  const [baseRental, setBaseRental] = useState(null);
  // useEffect to set reservationId from localStorage
  useEffect(() => {
    const storedReservationId = localStorage.getItem("reservationId"); // Retrieve the value
    if (storedReservationId) {
      setReservationId(storedReservationId); // Update state with the retrieved value
    }
  }, []);

  // useEffect to fetch reservation dates
  useEffect(() => {
    if (reservationId) {
      // console.log("Fetching data for reservation ID:", reservationId); // Debugging log
      fetch(
        `http://18.209.91.97:5001/api/reserve/reservation/${reservationId}`
      )
        .then((response) => response.json())
        .then((data) => setReservationDates(data))
        .catch((error) =>
          console.error("Error fetching reservation dates:", error)
        );
    } else {
      console.log("No reservation ID available yet.");
    }
  }, [reservationId]);

  // Helper function to format dates
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Fetch vehicle details
  useEffect(() => {
    if (vehicleId && reservationDates?.pickdate && reservationDates?.dropdate) {
      const pickdate = reservationDates.pickdate;
      const dropdate = reservationDates.dropdate;

      fetch(
        `http://18.209.91.97:8132/api/newVehicle/getVehicleWithPriceById/${vehicleId}?pickdate=${pickdate}&dropdate=${dropdate}`
      )
        .then((response) => response.json())
        .then((responseData) => {
          const data = responseData?.data;
          if (data) {
            setVehicleDetails(data);
            localStorage.setItem("vname", data.vname);
            localStorage.setItem("vprice", data.totalPrice?.replace("$", ""));
            localStorage.setItem("vehicleId", vehicleId);
          }
        })
        .catch((error) =>
          console.error("Error fetching new vehicle details:", error)
        );
    }
  }, [vehicleId, reservationDates]);

  // Calculate price and store in localStorage
  useEffect(() => {
    if (vehicleDetails && reservationDates) {
      const base = parseFloat(
        vehicleDetails.totalPrice.replace(/[^0-9.]/g, "")
      );
      setBaseRental(base); // <-- Set baseRental state

      const rentalWithFees = base * 1.12;
      const reservationPrice = 100 * 1.12;
      const totalAmount = rentalWithFees + reservationPrice;

      const formattedTotal = totalAmount.toFixed(2);
      setCalcPrice(formattedTotal);

      localStorage.setItem("totalAmount", formattedTotal);
    }
  }, [vehicleDetails, reservationDates]);

  // Update canvas with vehicle image
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Ensure the canvas exists

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const image = new Image();

    const canvasWidth = 300;
    const canvasHeight = 200;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    image.src = vehicleDetails?.image || Group;
    image.onload = () => {
      const aspectRatio = image.width / image.height;
      let renderWidth, renderHeight, offsetX, offsetY;

      if (aspectRatio > canvasWidth / canvasHeight) {
        renderWidth = canvasWidth;
        renderHeight = renderWidth / aspectRatio;
        offsetX = 0;
        offsetY = (canvasHeight - renderHeight) / 2;
      } else {
        renderHeight = canvasHeight;
        renderWidth = renderHeight * aspectRatio;
        offsetX = (canvasWidth - renderWidth) / 2;
        offsetY = 0;
      }

      // Clear canvas and draw the image
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(image, offsetX, offsetY, renderWidth, renderHeight);
    };
  }, [vehicleDetails]);

  const handleCheckoutClick = async () => {
    if (!vehicleId || !reservationId) {
      alert("Vehicle ID or Reservation ID is missing.");
      return;
    }

    try {
      const response = await fetch(
        `http://18.209.91.97:5001/api/reserve/reservation/${reservationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            vehicleId,
            reserveAmount: calcPrice,
            vehicleAmount: baseRental,
          }),
        }
      );

      if (response.ok) {
        const storedVehicleId = localStorage.getItem("vehicleId");
        const token = localStorage.getItem("token");

        if (reservationId && storedVehicleId && token) {
          navigate(`/checkout?vehicleId=${storedVehicleId}`);
        } else {
          navigate(`/login`);
        }

        localStorage.removeItem("price");
      } else {
        console.error("Failed to update reservation:", response.statusText);
        alert("Failed to update the reservation. Please try again.");
      }
    } catch (error) {
      console.error("Error in handleCheckoutClick:", error);
      alert(`An unexpected error occurred: ${error.message}`);
    }
  };

  // const calculateDateDifference = (start, end) => {
  //     const startDate = new Date(start);
  //     const endDate = new Date(end);
  //     const differenceInTime = endDate.getTime() - startDate.getTime();
  //     const differenceInDays = differenceInTime / (1000 * 3600 * 24); // Convert milliseconds to days
  //     return differenceInDays;
  // };
  const formatPassengerText = (passenger) => {
    if (passenger === "fourPassenger") return "4 Passenger";
    if (passenger === "sixPassenger") return "6 Passenger";
    if (passenger === "eightPassenger") return "8 Passenger";
    return passenger;
  };

  return hideContent ? (
    <div className="row align-items-center">
      <div className="col-md-6">
        <div className="canvas-container text-center rounded">
          <canvas
            ref={canvasRef}
            className="img-booking-cart w-100 rounded"
          ></canvas>
        </div>
      </div>
      <div className="col-md-6">
        {reservationDates && (
          <div className="date-details mt-4">
            <h4 className="mb-3 d-flex align-items-center">
              <Calendar size={20} className="me-2 text-primary" /> Reservation
              Details
            </h4>
            <table className="table table-striped table-bordered">
              <tbody>
                <tr>
                  <td>
                    <strong>
                      <MapPin size={16} className="me-1 text-danger" /> Delivery
                      Location
                    </strong>
                  </td>
                  <td className="text-end">
                    {reservationDates.drop || "Not specified"}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>
                      <MapPin size={16} className="me-1 text-success" /> Pickup
                      Location
                    </strong>
                  </td>
                  <td className="text-end">
                    {reservationDates.pickup || "Not specified"}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>
                      <Calendar size={16} className="me-1 text-warning" /> Start
                      Date
                    </strong>
                  </td>
                  <td className="text-end">
                    {formatDate(reservationDates.pickdate)}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>
                      <Calendar size={16} className="me-1 text-info" /> End Date
                    </strong>
                  </td>
                  <td className="text-end">
                    {formatDate(reservationDates.dropdate)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  ) : (
    <>
      <section className="py-2">
        <div className="container">
          {/* <h5 className="mb-3 d-flex align-items-center text-primary">
            <Calendar size={20} className="me-2" /> Reservation Details
          </h5> */}
          <div className="col-md-12 py-4 bg-checkout-main shadow-sm">
            <h3 className="text-center">Reservation Details</h3>
            <div className="row justify-content-center align-items-center">
              {/* Left Column - Canvas */}
              <div className="col-md-5">
                <div className="canvas-container text-center rounded p-4">
                  <canvas
                    ref={canvasRef}
                    className="img-booking-cart rounded"
                  ></canvas>
                </div>
              </div>

              <div className="col-md-5">
                <div className="date-details rounded p-4">
                  {reservationDates && (
                    <>
                      <div className="d-flex flex-column gap-3">
                        <div className="d-flex align-items-center p-3 bg-light rounded">
                          <MapPin size={18} className="me-2 text-danger" />
                          <strong>Delivery Location:</strong>
                          <span className="ms-auto text-muted">
                            {reservationDates.drop || "Not specified"}
                          </span>
                        </div>

                        <div className="d-flex align-items-center p-3 bg-light rounded">
                          <MapPin size={18} className="me-2 text-success" />
                          <strong>Pickup Location:</strong>
                          <span className="ms-auto text-muted">
                            {reservationDates.pickup || "Not specified"}
                          </span>
                        </div>

                        <div className="d-flex align-items-center p-3 bg-light rounded">
                          <Calendar size={18} className="me-2 text-warning" />
                          <strong>Start Date:</strong>
                          <span className="ms-auto text-muted">
                            {formatDate(reservationDates.pickdate)}
                          </span>
                        </div>

                        <div className="d-flex align-items-center p-3 bg-light rounded">
                          <Calendar size={18} className="me-2 text-info" />
                          <strong>End Date:</strong>
                          <span className="ms-auto text-muted">
                            {formatDate(reservationDates.dropdate)}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Right Column - Vehicle Details */}
              <div className="col-md-10">
                <div className="vehicle-details rounded p-4 pt-0">
                  {vehicleDetails && (
                    <>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="vehicle-name mb-0 d-flex align-items-center">
                          {vehicleDetails.vname || "Vehicle Name"}
                          <span className="badge bg-secondary ms-2">
                            {formatPassengerText(
                              vehicleDetails.passenger || "4 Passenger"
                            )}
                          </span>
                        </h6>

                        <h5 className="mb-0 d-flex align-items-center">
                          <DollarSign size={18} className="me-2" />
                          Pricing Details
                        </h5>
                      </div>

                      <div className="d-flex flex-column gap-3">
                        <div className="d-flex justify-content-between align-items-start flex-column p-3 bg-light rounded">
                          <div className="d-flex justify-content-between align-items-center w-100 mb-3">
                            <div>
                              <h6 className="mb-1 fw-bold">Vehicle Rental</h6>
                              <small>
                                Vehicle Price: {vehicleDetails.totalPrice},
                                Florida Tax: 7%, Online Convenience Fee: 5%
                              </small>
                            </div>
                            <h6 className="fw-bold text-success">
                              $
                              {(
                                parseFloat(
                                  vehicleDetails.totalPrice.replace("$", "")
                                ) * 1.12
                              ).toFixed(2)}
                            </h6>
                          </div>

                          <div className="d-flex justify-content-between align-items-center w-100">
                            <div>
                              <h6 className="mb-0 fw-bold">
                                Reservation Price
                              </h6>
                              <small>
                                Reservation Amount:$100, Florida Tax: 7%, Online
                                Convenience Fee: 5%
                              </small>
                            </div>
                            <h6 className="fw-bold text-primary">
                              ${(100 * 1.12).toFixed(2)}
                            </h6>
                          </div>
                        </div>

                        <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded">
                          <div>
                            <h6 className="mb-1 fw-bold">
                              Damage Deposit (Refundable)
                            </h6>
                            <small>
                              Damage Amount: $250, Florida Tax: 7%, Online
                              Convenience Fee: 5%
                            </small>
                          </div>
                          <h6 className="fw-bold text-danger">
                            ${(250 * 1.12).toFixed(2)}
                          </h6>
                        </div>

                        <div className="d-flex justify-content-between align-items-center p-3 bg-dark text-white rounded">
                          <h6 className="mb-0 fw-bold">Total Amount (USD)</h6>
                          <h6 className="fw-bold">
                            {/* Calculate total amount */}$
                            {vehicleDetails?.totalPrice &&
                              (
                                parseFloat(
                                  vehicleDetails?.totalPrice.replace("$", "")
                                ) *
                                  1.12 +
                                100 * 1.12 +
                                250 * 1.12
                              ).toFixed(2)}
                          </h6>
                        </div>
                      </div>

                      {/* Terms and Request Booking Button */}
                      <div className="d-flex flex-wrap gap-3 mt-4 p-3 border rounded align-items-center justify-content-between bg-light">
                        <div className="form-check align-items-center justify-content-center">
                          <input
                            type="checkbox"
                            className="form-check-input me-2"
                            id="termsCheckbox"
                            checked={isChecked}
                            onChange={(e) => setIsChecked(e.target.checked)}
                          />
                          <label
                            className="form-check-label text-danger d-flex align-items-center"
                            htmlFor="termsCheckbox"
                          >
                            <ShieldAlert
                              size={16}
                              className="me-1 text-danger"
                            />
                            I agree that $100 is non-refundable and wish to
                            proceed.
                          </label>
                        </div>

                        <button
                          className="choose-button btn btn-dark py-2 fw-bold"
                          onClick={handleCheckoutClick}
                          disabled={!isChecked}
                          style={{
                            transition: "0.3s ease-in-out",
                            minWidth: "200px",
                          }}
                        >
                          <CheckCircle size={18} className="me-2" /> Request
                          Booking
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Reserve;
