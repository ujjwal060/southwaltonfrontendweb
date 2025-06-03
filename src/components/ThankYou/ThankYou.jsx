import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ThankYou.scss";
import ThankYou1 from "./image/agreement.png";
import Reserve from "../../Resserve/Reserve";

const ThankYou = () => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const bookingId = queryParams.get("bookingId");
  const reservation = localStorage.getItem("reservationId");
  const userId = localStorage.getItem("user");
  const totalAmount = localStorage.getItem("totalAmount");
  const amountInDollars = parseFloat(totalAmount);

  const handleCheckboxChange = () => {
    setShowDisclaimer(true);
  };

  const handleNavigateToAgreement = () => {
    navigate(
      `/agreementpage?bookingId=${bookingId}&reservation=${reservation}&userId=${userId}&totalAmount=${amountInDollars}`
    );
  };

  return (
    <div className="container">
      <div className="row align-items-center justify-content-center">
        <div className="col-md-7">
          <Reserve hideContent={true} />
        </div>
        <div className="col-md-5 invoice-container-new">
          <div className="row mb-4">
            <div className="col-md-12 mt-4">
              <div className="icon-section">
                <img
                  className="image img-fluid w-50"
                  src={ThankYou1}
                  alt="Success"
                />
              </div>
            </div>
            <div className="col-md-12 text-center">
              <h6>
                <strong>
                  Thank you for choosing South Walton Golf Cart Rentals <br />your
                  adventure is just a ride away! ⛳
                </strong>
              </h6>
            </div>
            <div className="col-md-12 mt-2 text-center">
              <h6>To confirm your reservation, read our Rental agreement</h6>
              <button
                className="view-agreement-button btn btn-primary mt-2"
                onClick={handleNavigateToAgreement}
              >
                View Rental Agreement and Proceed to Sign
              </button>
            </div>
          </div>

          {/* <div className="checkbox-section">
            <input
              type="checkbox"
              id="agreement-checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="agreement-checkbox">
              <strong>Click here</strong> to read Disclaimer before proceeding.
            </label>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
