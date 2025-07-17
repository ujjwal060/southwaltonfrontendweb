import React, { useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import SignatureCanvas from "react-signature-canvas";
import { useNavigate, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { PDFDocument, rgb } from "pdf-lib";
import AgreementPDF from "./Agreement.pdf";
import 'bootstrap-icons/font/bootstrap-icons.css'; // bootstrap icons
import './AgreementPage.css'; // custom styles for modal

const AgreementPage = () => {
  const sigCanvas = useRef({});
  const [isSigned, setIsSigned] = useState(false);
  const [signerName, setSignerName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalAction, setModalAction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const bookingId = queryParams.get("bookingId");
  const reservation = queryParams.get("reservation");
  const userId = queryParams.get("userId");
  const totalAmount = queryParams.get("totalAmount");
  const amountInDollars = parseFloat(totalAmount);

  const handleClear = () => {
    sigCanvas.current.clear();
    setIsSigned(false);
  };

  const handleEnd = () => {
    setIsSigned(!sigCanvas.current.isEmpty());
  };

  const showAlert = (title, message, action = null) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalAction(() => action);
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!signerName.trim()) {
      showAlert("Warning", "Please enter your name before submitting.");
      return;
    }

    setIsLoading(true);
    const signatureData = sigCanvas.current.toDataURL("image/png");

    try {
      const pdfBytes = await fetch(AgreementPDF).then((res) => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const signatureImage = await pdfDoc.embedPng(signatureData);
      const pages = pdfDoc.getPages();
      const lastPage = pages[pages.length - 1];
      const { width } = lastPage.getSize();

      const signatureWidth = 300;
      const signatureHeight = 100;
      const nameFontSize = 15;

      lastPage.drawImage(signatureImage, {
        x: (width - signatureWidth) / 2,
        y: 50,
        width: signatureWidth,
        height: signatureHeight,
      });

      lastPage.drawText(signerName, {
        x: (width - signerName.length * (nameFontSize * 0.6)) / 2,
        y: 30,
        size: nameFontSize,
        color: rgb(0, 0, 0),
      });

      const modifiedPdfBytes = await pdfDoc.save();
      const modifiedPdfBlob = new Blob([modifiedPdfBytes], { type: "application/pdf" });

      const formData = new FormData();
      formData.append("pdf", modifiedPdfBlob, "SignedAgreement.pdf");
      formData.append("userId", userId);

      const response = await fetch("http://98.82.228.18:5001/api/sign/send", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        showAlert("Success", "Your Signature was saved successfully, Please click on Continue to Proceed to Paytment", handleProceedPayment);
      } else {
        const errorText = await response.text();
        showAlert("Error", "Failed to save signature: Due to some Internal Server Error");
      }
    } catch (error) {
      console.error("Signature save error:", error);
      showAlert("Error", "Failed to save signature.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProceedPayment = async () => {
    try {
      const stripe = await loadStripe("pk_test_51QV6moK0VXG1vNgVD9gZwP9UC2dR2ztmamIu1r8kMvNMWq5sy3TFwTdZXoGaAXCU4f23Ug7OOn81zPLcWWljboe0000j4sl0Qi");

      const response = await axios.post(
        "http://98.82.228.18:5001/api/payment/create-payment-intent",
        {
          userId,
          bookingId,
          reservation,
          amountInDollars,
          fromAdmin: "false",
          paymentType: "Reservation",
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const sessionId = response.data.session.id;
      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        showAlert("Error", result.error.message);
      } else {
        navigate("/payment-successfully");
      }
    } catch (error) {
      console.error("Payment error:", error);
      showAlert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <h3 className="text-center mb-4">Rental Agreement</h3>
          <iframe
            src={AgreementPDF}
            width="100%"
            height="600px"
            style={{ border: "1px solid #ccc" }}
            title="Agreement PDF"
          ></iframe>

          <div className="mt-4 d-flex flex-column align-items-center">
            <h5>Please sign below to confirm your agreement:</h5>
            <SignatureCanvas
              ref={sigCanvas}
              penColor="black"
              canvasProps={{
                width: 600,
                height: 200,
                className: "sigCanvas bg-light border",
              }}
              onEnd={handleEnd}
            />
            <input
              type="text"
              value={signerName}
              onChange={(e) => setSignerName(e.target.value)}
              placeholder="Enter your full name"
              style={{
                marginTop: "10px",
                width: "300px",
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div className="d-flex justify-content-center gap-3 mt-3">
            <Button variant="secondary" onClick={handleClear}>Clear</Button>
            <Button variant="primary" onClick={handleSubmit} disabled={!isSigned || isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Saving...
                </>
              ) : (
                "Save Signature & Proceed to Payment"
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* ✅ Custom Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered dialogClassName="custom-modal">
        <div className={`top-section ${modalTitle === "Success" ? "success-top" : modalTitle === "Warning" ? "warning-top" : "error-top"}`}>
          {modalTitle === "Success" ? (
            <i className="bi bi-check-circle-fill success-icon"></i>
          ) : modalTitle === "Warning" ? (
            <i className="bi bi-exclamation-circle-fill warning-icon"></i>
          ) : (
            <i className="bi bi-exclamation-triangle-fill error-icon"></i>
          )}
        </div>
        <div className="modal-body">
          <h4>{modalTitle}!</h4>
          <p>{modalMessage}</p>
          <button
            className={`modal-button ${modalTitle === "Success" ? "success-btn" : modalTitle === "Warning" ? "warning-btn" : "error-btn"}`}
            onClick={() => {
              setShowModal(false);
              if (modalAction) modalAction();
            }}
          >
            {modalTitle === "Success" ? "Continue" : modalTitle === "Warning" ? "OK" : "Try again"}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AgreementPage;
