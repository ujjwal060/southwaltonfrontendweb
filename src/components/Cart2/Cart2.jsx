import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Cart2.scss";
import Group3 from "./img/Group3.png";
import Popup from "../Popup/Popup";
import { useNavigate, useSearchParams } from "react-router-dom";

const Cart2 = () => {
  const [cardDetails, setCardDetails] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [error, setError] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [reservationDate, setReservationDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const fetchVehicledata = async (days, pickdate, dropdate) => {
    try {
      const response = await axios.get(
        "http://18.209.91.97:8132/api/newVehicle/vehicleData",
        {
          params: { days, pickdate, dropdate },
        }
      );
      console.log("vehicles", response.data?.results);
      return response.data?.results || [];
    } catch (error) {
      setError("Error fetching vehicle details");
      console.log("Error fetching details:", error);
      return [];
    }
  };

  const Card = ({
    image,
    passengers,
    vName,
    model,
    price,
    id,
    tagNumber,
    isAvailable,
    onChoose,
  }) => {
    const imageUrl = image || Group3;
    const formatPassengerText = (passenger) => {
      if (passenger === "fourPassenger") return "4 Passenger";
      if (passenger === "sixPassenger") return "6 Passenger";
      if (passenger === "eightPassenger") return "8 Passenger";
      return passenger;
    };
    return (
      <div className="col-lg-6 mb-4">
        <div className="card border-0 shadow h-100 hover-scale">
          <div className="row h-100 g-0">
            <div className="col-sm-6 bg-light">
              <img
                src={imageUrl}
                alt={`${vName} image`}
                className="card-image img-fluid h-100 w-100"
              />
            </div>
            <div className="col-sm-6">
              <div className="card-content p-4">
                <div className="manage">
                <h4 className="model fw-bold mb-2">{vName}</h4>
                <p className="passengers text-dark mb-2">
                    Model:{" "}
                    <span className="fw-bold">
                    {model}
                    </span>
                  </p>
                  <p className="passengers text-dark mb-2">
                    Capacity:{" "}
                    <span className="fw-bold">
                      {formatPassengerText(passengers)}
                    </span>
                  </p>
                  <p className="price mb-2">
                    Price: <span className="fw-bold">{price}</span>
                  </p>
                  <p className="tag-number text-dark mb-2">
                    Tag Number: <span className="fw-bold"> {tagNumber}</span>
                  </p>
                  <p
                    className={`availability mb-3 ${
                      isAvailable ? "text-success" : "text-danger"
                    }`}
                  >
                    <span className="fw-bold">
                      {isAvailable ? "Available" : "Unavailable"}
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => onChoose(id)}
                  className="choose-button w-100 fw-bold"
                >
                  Choose this cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CardList = ({ cardDetails, onChoose }) => {
    return (
      <>
        {cardDetails && cardDetails.length > 0 ? (
          cardDetails.map((card, index) => {
            const {
              image,
              passenger,
              vname,
              model,
              totalPrice,
              vehicleId,
              tagNumber,
              isAvailable,
            } = card;
            return (
              <Card
                key={vehicleId || index}
                image={image}
                passengers={passenger}
                vName={vname}
                model={model}
                price={totalPrice}
                id={vehicleId}
                tagNumber={tagNumber}
                isAvailable={isAvailable}
                onChoose={onChoose}
              />
            );
          })
        ) : (
          <h4>No vehicles found</h4>
        )}
      </>
    );
  };

  useEffect(() => {
    const reservationId = localStorage.getItem("reservationId");
    if (reservationId) {
      const fetchReservationData = async () => {
        try {
          setIsLoading(true); // Start loading
          const response = await axios.get(
            `http://18.209.91.97:5001/api/reserve/reservation/${reservationId}`
          );
          const reservationData = response.data;

          if (reservationData?.pickdate && reservationData?.dropdate) {
            const pickupDate = new Date(reservationData.pickdate);
            const dropoffDate = new Date(reservationData.dropdate);
            setReservationDate({ pickupDate, dropoffDate });

            const timeDiff = dropoffDate.getTime() - pickupDate.getTime();
            const days = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;

            const fetchedData = await fetchVehicledata(
              days,
              reservationData.pickdate,
              reservationData.dropdate
            );

            if (fetchedData.length > 0) {
              setCardDetails(fetchedData);

              const storedPassengerValue = searchParams.get("passenger");
              const filtered = fetchedData.filter(
                (card) => card.passenger === storedPassengerValue
              );
              setFilteredCards(filtered);
            } else {
              setError("No vehicles available for the selected dates.");
            }
          } else {
            setError("Reservation data is missing pickdate or dropdate.");
          }
        } catch (err) {
          setError("Error fetching reservation data");
          console.log("Error fetching reservation data:", err);
        } finally {
          setIsLoading(false); // Stop loading whether successful or not
        }
      };

      fetchReservationData();
    } else {
      setError("No reservation ID found");
      setIsLoading(false);
    }
  }, []);

  const initialCardCount = 5;
  const handleToggle = () => {
    setShowAll(!showAll);
  };

  const handleChoose = (id) => {
    localStorage.setItem("vehicleId", id);
    setSelectedCard(id);
    setPopupVisible(true);
  };

  const handlePopupClose = () => {
    setPopupVisible(false);
  };

  const handleBookClick = () => {
    const reserveId = localStorage.getItem("reservationId");
    const vehicleId = localStorage.getItem("vehicleId");
    if (reserveId) {
      setPopupVisible(false);
      navigate(`/reserve?vehicleId=${vehicleId}`, {
        state: { vehicleId },
      });
      localStorage.removeItem("price");
    } else {
      navigate("/home3");
    }
  };

  // Loader component
  const Loader = () => (
    <div className="text-center py-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-3">Loading vehicles...</p>
    </div>
  );

  return (
    <div className="Container">
      {error && <p className="error-message">{error}</p>}
      {isPopupVisible && (
        <Popup onClose={handlePopupClose} onBook={handleBookClick} />
      )}

      <div className="container">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="col-lg-12">
              <h2 className="text-center mb-4">Select Cart</h2>
              <div className="row gy-4">
                {filteredCards.length === 0 ? (
                  <h4 className="no-vehicle-text">No vehicle Available...</h4>
                ) : (
                  <CardList
                    cardDetails={filteredCards.slice(0, initialCardCount)}
                    onChoose={handleChoose}
                  />
                )}
              </div>

              <div className="col-lg-12 mt-4">
                <h2 className="text-center mb-4">Other Cart Suggestions</h2>
                <div className="row gy-4">
                  {cardDetails.length === 0 ? (
                    <h4 className="loading-text">No vehicles found</h4>
                  ) : (
                    <CardList cardDetails={cardDetails} onChoose={handleChoose} />
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart2;