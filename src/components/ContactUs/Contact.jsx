import React, { useState } from "react";
import "./Contact.scss";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Contact = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    startDate: "",
    enddate: "",
    comments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Collect missing fields
    let missingFields = [];
    if (!userData.name) missingFields.push("Name");
    if (!userData.email) missingFields.push("Email");
    if (!userData.startDate) missingFields.push("Start Date");
    if (!userData.enddate) missingFields.push("End Date");

    // Show error message if any field is missing
    if (missingFields.length > 0) {
      toast.error(`Please fill out: ${missingFields.join(", ")}`);
      return;
    }

    const userDataToSend = { ...userData };

    try {
      const response = await axios.post(
        `http://52.20.55.193:5001/api/create/creeate`,
        userDataToSend,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("User request updated:", response.data);
      toast.success("Query sent successfully!");

      // Reset the form after successful submission
      setUserData({
        name: "",
        email: "",
        startDate: "",
        enddate: "",
        comments: "",
      });
    } catch (error) {
      console.error("Error sending query", error);
      toast.error("Error sending query. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="breadcrumb-container">
        <div className="breadcrumb-overlay">
          <h2>Contact Us</h2>
          <p>
            <Link to="/">Home</Link> / <span>Contact Us</span>
          </p>
        </div>
      </div>
      <div className="contactus">
        <div className="page">
          <div className="part-1">
            <img
              src="https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg?ga=GA1.1.2076956031.1739515128&semt=ais_authors_boost"
              alt="Customer Support"
            />
          </div>
          <div className="part-2">
            <form onSubmit={handleSubmit}>
              <div className="fields">
                <p>Name</p>
                <input
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="fields">
                <p>Email</p>
                <input
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="time">
                <div>
                  <p>Start Time</p>
                  <input
                    type="date"
                    placeholder="Start Time"
                    name="startDate"
                    value={userData.startDate}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <p>End Time</p>
                  <input
                    type="date"
                    placeholder="End Time"
                    name="enddate"
                    value={userData.enddate}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="fields">
                <p>Comments</p>
                <textarea
                  placeholder="Comments"
                  name="comments"
                  value={userData.comments}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="Submit">
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
