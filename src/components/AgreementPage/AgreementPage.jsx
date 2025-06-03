import React, { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import SignatureCanvas from "react-signature-canvas";
import { useNavigate, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { PDFDocument, rgb } from "pdf-lib";
import AgreementPDF from "./Agreement.pdf";

const AgreementPage = () => {
  const sigCanvas = useRef({});
  const [isSigned, setIsSigned] = useState(false);
  const [signerName, setSignerName] = useState("");
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

  const handleSubmit = async () => {
    if (!signerName.trim()) {
      alert("Please enter your name before submitting.");
      return;
    }

    const signatureData = sigCanvas.current.toDataURL("image/png");

    try {
      // Fetch the existing PDF
      const pdfBytes = await fetch(AgreementPDF).then((res) =>
        res.arrayBuffer()
      );

      // Load the PDF
      const pdfDoc = await PDFDocument.load(pdfBytes);

      // Embed the signature image
      const signatureImage = await pdfDoc.embedPng(signatureData);

      // Get the last page of the PDF
      const pages = pdfDoc.getPages();
      const lastPage = pages[pages.length - 1];

      const { width, height } = lastPage.getSize();

      const signatureWidth = 300;
      const signatureHeight = 100;
      const nameFontSize = 15;

      // Draw the signature image (centered horizontally with margin from bottom)
      lastPage.drawImage(signatureImage, {
        x: (width - signatureWidth) / 2,
        y: 50, // increased margin from bottom
        width: signatureWidth,
        height: signatureHeight,
      });

      // Draw the signer's name (centered below signature)
      lastPage.drawText(signerName, {
        x: (width - signerName.length * (nameFontSize * 0.6)) / 2, // approximate center
        y: 50, // just below the signature image
        size: nameFontSize,
        color: rgb(0, 0, 0),
      });

      // Save modified PDF
      const modifiedPdfBytes = await pdfDoc.save();
      const modifiedPdfBlob = new Blob([modifiedPdfBytes], {
        type: "application/pdf",
      });
      // ✅ Create a URL and open in a new tab
      
      // Upload to server
      const formData = new FormData();
      formData.append("pdf", modifiedPdfBlob, "SignedAgreement.pdf");
      formData.append("userId", userId);

      const response = await fetch("http://18.209.91.97:5001/api/sign/send", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Signature saved successfully!");
        handleProceedPayment();
      } else {
        const errorText = await response.text();
        console.error("Signature save failed:", errorText);
        alert("Failed to save signature");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save signature");
    }
  };

  const handleProceedPayment = async () => {
    try {
      const stripe = await loadStripe(
        "pk_test_51QV6moK0VXG1vNgVD9gZwP9UC2dR2ztmamIu1r8kMvNMWq5sy3TFwTdZXoGaAXCU4f23Ug7OOn81zPLcWWljboe0000j4sl0Qi"
      );

      const response = await axios.post(
        "http://18.209.91.97:5001/api/payment/create-payment-intent",
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
        alert("Payment failed: " + result.error.message);
      } else {
        navigate("/payment-successfully");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <h3 className="text-center">Rental Agreement</h3>

          <iframe
            src={AgreementPDF}
            width="100%"
            height="600px"
            style={{ border: "1px solid #ccc" }}
            title="Agreement PDF"
          ></iframe>

          <div
            style={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h5>Please sign below to confirm your agreement:</h5>

            <SignatureCanvas
              ref={sigCanvas}
              penColor="black"
              canvasProps={{
                width: 600,
                height: 200,
                className: "sigCanvas bg-light",
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

          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <Button variant="secondary" onClick={handleClear}>
              Clear
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={!isSigned}
            >
              Save Signature & Proceed to Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgreementPage;
