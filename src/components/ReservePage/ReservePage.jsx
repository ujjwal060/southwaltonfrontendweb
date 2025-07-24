import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Group from "./img/Group.png";
import "./Reserve.scss";
import {
    CheckCircle,
    MapPin,
    Calendar,
    DollarSign,
    ShieldAlert,
} from "lucide-react";
import moment from "moment";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const ReservePage = ({ hideContent }) => {
    const [vehicleDetails, setVehicleDetails] = useState(null);
    const [reservationDates, setReservationDates] = useState(null);
    const canvasRef = useRef(null);
    const [isChecked, setIsChecked] = useState(false);
    const [showTax, setShowTax] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { season, day, vehicleId } = location.state || {};
    const [reservationId, setReservationId] = useState(
        localStorage.getItem("reservationId") || ""
    );
    const [calcPrice, setCalcPrice] = useState("");
    const [baseRental, setBaseRental] = useState(null);
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (reservationDates?.pickdate) {
            const today = moment().startOf("day");
            const pickDate = moment(reservationDates.pickdate).startOf("day");
            setShowTax(pickDate.isSame(today));
        }
    }, [reservationDates]);

    const deposit = 100;
    const depositTax = showTax ? deposit * 0.07 : 0;
    const depositSubtotal = deposit + depositTax;

    useEffect(() => {
        localStorage.setItem("RservationDepositAmount", deposit.toFixed(2));
    }, [showTax]);

    useEffect(() => {
        const storedReservationId = localStorage.getItem("reservationId");
        if (storedReservationId) {
            setReservationId(storedReservationId);
        }
    }, []);

    useEffect(() => {
        if (reservationId) {
            fetch(
                `http://98.85.246.54:5001/api/reserve/reservation/${reservationId}`
            )
                .then((response) => response.json())
                .then((data) => setReservationDates(data))
                .catch((error) =>
                    console.error("Error fetching reservation dates:", error)
                );
        }
    }, [reservationId]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    useEffect(() => {
        if (vehicleId && reservationDates?.pickdate && reservationDates?.dropdate) {
            const pickdate = reservationDates.pickdate;
            const dropdate = reservationDates.dropdate;

            fetch(
                `http://98.85.246.54:8132/api/newVehicle/getVehicleWithPriceById/${vehicleId}?pickdate=${pickdate}&dropdate=${dropdate}`
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

    useEffect(() => {
        if (vehicleDetails && reservationDates) {
            const base = parseFloat(
                vehicleDetails.totalPrice.replace(/[^0-9.]/g, "")
            );
            setBaseRental(base);

            const rentalWithFees = base * 1.12;
            const totalAmount = rentalWithFees;
            const formattedTotal = totalAmount.toFixed(2);
            setCalcPrice(formattedTotal);

            localStorage.setItem("totalAmount", formattedTotal);
        }
    }, [vehicleDetails, reservationDates, showTax]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

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

            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.drawImage(image, offsetX, offsetY, renderWidth, renderHeight);
        };
    }, [vehicleDetails]);

    const handleProceedPayment = async () => {
    if (!isChecked) {
        alert("Please agree to the terms before proceeding.");
        return;
    }

    // Get and validate all required data
    const userId = localStorage.getItem('user');
    if (!userId) {
        alert("Please login to proceed with payment");
        navigate('/login');
        return;
    }

    const depositAmount = parseFloat(localStorage.getItem("RservationDepositAmount") || "100.00");
    if (isNaN(depositAmount)) {
        alert("Invalid deposit amount");
        return;
    }

    if (!reservationId) {
        alert("Missing reservation information");
        return;
    }

    setIsProcessing(true);
    
    try {
        // Prepare payment payload with exact field names and types
        const paymentPayload = {
            userId: userId, 
            bookingId: "68517d004a24723b3b590286", 
            reservation: true, 
            amountInDollars: depositAmount,
            fromAdmin: false,
            paymentType: "Reservation" 
        };

        console.log("Payment payload:", paymentPayload); // Debug log

        // First update reservation
        const updateResponse = await fetch(
            `http://98.85.246.54:5001/api/reserve/reservation/${reservationId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    vehicleId,
                    reserveAmount: calcPrice,
                    vehicleAmount: baseRental,
                    reservationId,
                    depositAmount: depositAmount.toFixed(2),
                }),
            }
        );

        if (!updateResponse.ok) {
            throw new Error("Failed to update reservation");
        }

        // Then process payment
        const stripe = await loadStripe("pk_test_51QV6moK0VXG1vNgVD9gZwP9UC2dR2ztmamIu1r8kMvNMWq5sy3TFwTdZXoGaAXCU4f23Ug7OOn81zPLcWWljboe0000j4sl0Qi");

        const paymentResponse = await axios.post(
            "http://98.85.246.54:5001/api/payment/create-payment-intent",
            paymentPayload,
            {
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            }
        );

        const sessionId = paymentResponse.data.session.id;
        const result = await stripe.redirectToCheckout({ sessionId });

        if (result.error) {
            alert(`Payment Error: ${result.error.message}`);
        }
    } catch (error) {
        console.error("Full payment error:", {
            error: error.message,
            response: error.response?.data,
            request: error.config?.data
        });
        
        alert(`Payment failed: ${error.response?.data?.message || error.message || "Unknown error"}`);
    } finally {
        setIsProcessing(false);
    }
};

    const formatPassengerText = (passenger) => {
        if (passenger === "fourPassenger") return "4 Passenger";
        if (passenger === "sixPassenger") return "6 Passenger";
        if (passenger === "eightPassenger") return "8 Passenger";
        return passenger;
    };

    // Rest of your component remains the same...
    return hideContent ? (
        <div className="row align-items-center">
            {/* Your hideContent JSX */}
        </div>
    ) : (
        <>
            <section className="py-2">
                <div className="container">
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
                                            <div className="d-flex justify-content-between align-items-center mb-3 bg-light p-3">
                                                <h6 className="vehicle-name mb-0 d-flex align-items-center"><span>Vehicle Name: {vehicleDetails.vname || "Vehicle Name"}</span>

                                                    <span className="badge bg-secondary ms-2">
                                                        {formatPassengerText(vehicleDetails.passenger || "4 Passenger")}
                                                    </span>
                                                </h6>
                                                <h5 className="mb-0 d-flex align-items-center fw-bold">
                                                    <DollarSign size={18} className="me-1" />
                                                    Pricing Details
                                                </h5>
                                            </div>

                                            <div className="d-flex flex-column gap-3">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="p-3 bg-light rounded h-100">
                                                            <h5 className="fw-bold mb-3 text-end">Reservation Deposit</h5>
                                                            <div className="d-flex flex-column">
                                                                <div className="d-flex justify-content-end mb-2">
                                                                    <span className="fw-bold">Deposit Amount:</span>
                                                                    <span className="text-end fw-bold" style={{ minWidth: "80px" }}>
                                                                        ${deposit.toFixed(2)}
                                                                    </span>
                                                                </div>

                                                                <div className="d-flex justify-content-end border-top pt-2">
                                                                    <span className="fw-bold">Subtotal:</span>
                                                                    <span className="fw-bold text-success text-end" style={{ minWidth: "80px" }}>
                                                                        ${deposit.toFixed(2)}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <small className="text-muted d-block text-end mt-1">(Non-Refundable)</small>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="p-3 bg-dark text-white rounded">
                                                    <div className="d-flex flex-column">
                                                        <div className="d-flex justify-content-end">
                                                            <h6 className="mb-0 fw-bold me-auto">Total Amount (USD)</h6>
                                                            <h5 className="fw-bold mb-0 text-end" style={{ minWidth: "80px" }}>
                                                                ${deposit.toFixed(2)}
                                                            </h5>
                                                        </div>
                                                        <small className="text-white text-end">Including all taxes and fees</small>
                                                    </div>
                                                </div>
                                            </div>

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
                                                        <ShieldAlert size={16} className="me-1 text-danger" />
                                                        I agree that $100 is non-refundable and wish to proceed.
                                                    </label>
                                                </div>

                                                <button
                                                    className="choose-button btn btn-dark py-2 fw-bold"
                                                    onClick={handleProceedPayment}
                                                    disabled={!isChecked || isProcessing}
                                                    style={{
                                                        transition: "0.3s ease-in-out",
                                                        minWidth: "200px",
                                                    }}
                                                >
                                                    {isProcessing ? (
                                                        <>
                                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                            Processing...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <CheckCircle size={18} className="me-2" /> Request Reservation
                                                        </>
                                                    )}
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

export default ReservePage;