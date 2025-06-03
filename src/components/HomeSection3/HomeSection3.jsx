import React, { useState, useRef, useEffect, useCallback } from "react";
import "./HomeSection3.scss";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart1 from "./img/1.jpg";
import Cart2 from "./img/2.jpg";
import Cart3 from "./img/3.jpg";
import Cart4 from "./img/4.jpg";
import Cart5 from "./img/5.jpg";

const libraries = ["places"];

const CartDetails = () => {
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [numOfDays, setNumOfDays] = useState(0);

  const deliveryRef = useRef(null);
  const pickupRef = useRef(null);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const passenger = searchParams.get("passenger");

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const cartImages = {
    sixPassenger: Cart1,
    fourPassenger: Cart2,
    fourPassengerGas: Cart3,
    sixPassengerGas: Cart4,
    eightPassenger: Cart5,
  };

  const selectedCartImage = cartImages[passenger] || Cart1;

  const handlePlaceChanged = useCallback((field, ref) => {
    if (ref.current) {
      const place = ref.current.getPlace();
      if (place) {
        const address = place.formatted_address || place.name;
        field === "delivery"
          ? setDeliveryLocation(address)
          : setPickupLocation(address);
      }
    }
  }, []);

  const calculateDaysBetween = useCallback((start, end) => {
  if (!start || !end) return 0;
  const startDateObj = new Date(start);
  const endDateObj = new Date(end);
  const differenceInTime = endDateObj - startDateObj;
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)) + 1;
  return differenceInDays > 0 ? differenceInDays : 0;
}, []);


  useEffect(() => {
    const days = calculateDaysBetween(startDate, endDate);
    setNumOfDays(days);
  }, [startDate, endDate, calculateDaysBetween]);

  const handleFindCartClick = async () => {
    if (!pickupLocation || !deliveryLocation || !startDate || !endDate) {
      toast.error("Please fill all the fields!");
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      toast.error("End Date must be after Start Date.");
      return;
    }

    // const userId = localStorage.getItem('user');
    const data = {
      pickup: pickupLocation,
      drop: deliveryLocation,
      pickdate: startDate,
      dropdate: endDate,
      days: numOfDays.toString(),
      // userId,
    };

    try {
      const response = await fetch(
        "http://18.209.91.97:5001/api/reserve/reservation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) throw new Error("Failed to submit reservation");

      const result = await response.json();
      const { id } = result;
      console.log(id, "reservationId");

      if (id) {
        localStorage.setItem("reservationId", id);
        toast.success("Reservation successful!");
        navigate(`/cart?passenger=${passenger}`);
      } else {
        toast.error("Reservation failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  if (loadError) return <div>Error loading maps: {loadError.message}</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="text-center mb-4">
          <h1 className="fw-bold">Cart Details</h1>
        </div>
        <div className="row align-items-center">
          <div className="col-md-6 p-4 rounded shadow-lg">
            <div className="mb-3">
              <label className="form-label fw-semibold">
                <i className="fa-solid fa-location-dot text-danger"></i>{" "}
                Delivery Location
              </label>
              <Autocomplete
                onLoad={(ref) => (deliveryRef.current = ref)}
                onPlaceChanged={() =>
                  handlePlaceChanged("delivery", deliveryRef)
                }
              >
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Your Delivery Location"
                  value={deliveryLocation}
                  onChange={(e) => setDeliveryLocation(e.target.value)}
                />
              </Autocomplete>
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">
                <i className="fa-solid fa-location-dot text-success"></i> Pickup
                Location
              </label>
              <Autocomplete
                onLoad={(ref) => (pickupRef.current = ref)}
                onPlaceChanged={() => handlePlaceChanged("pickup", pickupRef)}
              >
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Your Pickup Location"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                />
              </Autocomplete>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">
                  <i className="fa-regular fa-calendar-days text-primary"></i>{" "}
                  Start Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  value={startDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">
                  <i className="fa-regular fa-calendar-days text-primary"></i>{" "}
                  End Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  value={endDate}
                  min={startDate || new Date().toISOString().split("T")[0]}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
            <div className="text-center mt-4">
              <button
                className="btn btn-dark px-4 py-2 shadow-sm"
                onClick={handleFindCartClick}
              >
                <i className="fa-solid fa-magnifying-glass"></i> Find Cart
              </button>
            </div>
          </div>
          <div className="col-md-6 text-center">
            <img
              src={selectedCartImage}
              alt="Cart"
              className="img-fluid rounded shadow-lg img-cart-details"
              
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDetails;
