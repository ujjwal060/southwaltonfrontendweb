import React from "react";
import "./HomeSection2.scss";
import Cart1 from "./img/1.jpg";
import Cart2 from "./img/2.jpg";
import Cart3 from "./img/3.jpg";
import Cart4 from "./img/4.jpg";
import Cart5 from "./img/5.jpg";
import { FaArrowRight } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const HomeSection4 = () => {
  const navigate = useNavigate();
  const handleClick = (passenger, cartImage) => {
    navigate(`/home3?passenger=${passenger}`);
  };
  return (
    <div className="home-section4">
      <div className="service-areas1">
        <h2>Our <span style={{ fontWeight: 600 }}>Street Legal Golf Carts</span></h2>
        <div className="areas">
          <div className="area">
            <img src={Cart1} alt="Area 1" />
            <button
              className="book-button"
              onClick={() => handleClick("sixPassenger", Cart1)}
            >
              Book Now <FaArrowRight style={{ marginLeft: "4px" }} />
            </button>{" "}
          </div>
          <div className="area">
            <img src={Cart2} alt="Area 1" />
            <button
              className="book-button"
              onClick={() => handleClick("fourPassenger", Cart2)}
            >
              Book Now <FaArrowRight style={{ marginLeft: "4px" }} />
            </button>
          </div>
          <div className="area">
            <img src={Cart3} alt="Area 1" />
            <button
              className="book-button"
              onClick={() => handleClick("fourPassengerGas", Cart3)}
            >
              Book Now <FaArrowRight style={{ marginLeft: "4px" }} />
            </button>
          </div>
        </div>
      </div>
      <div className="service-areas2">
        <div className="areas">
          <div className="area">
            <img src={Cart4} alt="Area 1" />
            <button
              className="book-button"
              onClick={() => handleClick("sixPassengerGas", Cart4)}
            >
              Book Now <FaArrowRight style={{ marginLeft: "4px" }} />
            </button>
          </div>
          <div className="area">
            <img src={Cart5} alt="Area 1" />
            <button
              className="book-button"
              onClick={() => handleClick("eightPassenger", Cart5)}
            >
              Book Now <FaArrowRight style={{ marginLeft: "4px" }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection4;
