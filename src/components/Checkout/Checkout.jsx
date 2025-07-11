import React, { useState, useEffect } from "react";
import "./Checkout.scss";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    bname: "",
    bphone: "",
    vehicleId: "",
    bemail: "",
    bsize: "",
    baddress: {
      street: "",
      city: "",
      state: "",
      zipcode: "",
    },
    baddressh: {
      street: "",
      city: "",
      state: "",
      zipcode: "",
    },
    drivers: [
      {
        dname: "",
        dphone: "",
        demail: "",
        dexperience: "",
        dpolicy: null,
        dlicense: null,
      },
    ],
    maxDrivers: 3,
  });

  const [reservationId, setReservationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [passengerSize, setPassengerSize] = useState("");
  const [vname, setvname] = useState("");
  const [model, setmodel] = useState("");
  const [tagNumber, settagNumber] = useState("");

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { season, day } = location.state || {};

  useEffect(() => {
    const id = localStorage.getItem("reservationId");
    const passenger = localStorage.getItem("passenger");
    const storedVname = localStorage.getItem("vname");
    const storedModel = localStorage.getItem("model");
    const storedTagnumber = localStorage.getItem("tagnumber");
    const vehicleId = searchParams.get("vehicleId");
    if (id) {
      setReservationId(id);
    }
    if (passenger) {
      setPassengerSize(passenger);
    }
    if (storedVname) {
      setvname(storedVname);
    }
    if (storedModel) {
      setmodel(storedModel);
    }

    if (storedTagnumber) {
      settagNumber(storedTagnumber);
    }

    // Fetch vehicle size
    if (vehicleId) {
      axios
        .get(`http://52.20.55.193:8132/api/newVehicle/vehicleData/${vehicleId}`)
        .then((response) => {
          const size = response.data.passenger;
          const name = response.data.vname;
          const modelName = response.data.model;
          const tagNumber = response.data.tagNumber;
          setPassengerSize(size);
          setvname(name);
          setmodel(modelName);
          settagNumber(tagNumber);
          setFormData((prevData) => ({
            ...prevData,
            vehicleId: vehicleId,
            bsize: size,
          }));
        })
        .catch((error) => {
          console.error("Error fetching vehicle size:", error);
        });
    }
  }, []);

  useEffect(() => {
    if (errorMessage) {
      alert(errorMessage); // Show alert for errors
    }
    if (successMessage) {
      alert(successMessage); // Show alert for success
    }
  }, [errorMessage, successMessage]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInputChangeAddress = (e, addressType) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [addressType]: {
        ...prevState[addressType],
        [name]: value,
      },
    }));
  };

  // Handle input changes for driver fields
  const handleDriverChange = (index, e) => {
    const { name, value } = e.target;
    const updatedDrivers = [...formData.drivers];
    updatedDrivers[index][name] = value;
    setFormData({ ...formData, drivers: updatedDrivers });
  };

  // Handle file input changes
  const handleFileChange = (index, fieldName, e) => {
    const file = e.target.files[0];
    const updatedDrivers = [...formData.drivers];
    updatedDrivers[index][fieldName] = file;
    setFormData({ ...formData, drivers: updatedDrivers });
  };

  // Add a new driver
  const addDriver = () => {
    if (formData.drivers.length < formData.maxDrivers) {
      const newDriver = {
        dname: "",
        dphone: "",
        demail: "",
        dlicense: null,
        dpolicy: null,
        dexperience: "",
      };
      setFormData({ ...formData, drivers: [...formData.drivers, newDriver] });
    }
  };

  // Remove a driver
  const removeDriver = (index) => {
    if (formData.drivers.length > 1) {
      const newDrivers = [...formData.drivers];
      newDrivers.splice(index, 1);
      setFormData({ ...formData, drivers: newDrivers });
    }
  };

  const formDataToSubmit = new FormData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(""); // Clear previous errors
    setSuccessMessage(""); // Clear previous success messages

    let missingFields = [];

    // Validate required fields
    if (!formData.bname) missingFields.push("Name");
    if (!formData.bphone) missingFields.push("Phone Number");
    if (!formData.bemail) missingFields.push("Email");

    // Validate business address fields (Required)
    if (!formData.baddress.street)
      missingFields.push("Home Street Address");
    if (!formData.baddress.city) missingFields.push("Home City");
    if (!formData.baddress.state) missingFields.push("Home State");
    if (!formData.baddress.zipcode) missingFields.push("Home Zipcode");

    // Validate business Zipcode format
    if (
      formData.baddress.zipcode &&
      !/^\d{5,6}$/.test(formData.baddress.zipcode)
    ) {
      missingFields.push("Valid Business Zipcode");
    }

    // Validate home address fields (Required)
    if (!formData.baddressh.street) missingFields.push("Rental Street Address");
    if (!formData.baddressh.city) missingFields.push("Rental City");
    if (!formData.baddressh.state) missingFields.push("Rental State");
    if (!formData.baddressh.zipcode) missingFields.push("Rental Zipcode");

    // Validate home Zipcode format
    if (
      formData.baddressh.zipcode &&
      !/^\d{5,6}$/.test(formData.baddressh.zipcode)
    ) {
      missingFields.push("Valid Home Zipcode");
    }

    // If any required fields are missing, display them
    if (missingFields.length > 0) {
      const errorMsg = `Please fill in the following fields: ${missingFields.join(
        ", "
      )}`;
      setErrorMessage(errorMsg);
      alert(errorMsg); // Show alert
      setLoading(false);
      return;
    }

    const formDataToSubmit = new FormData();

    // Append booking details
    formDataToSubmit.append("bname", formData.bname);
    formDataToSubmit.append("bphone", formData.bphone);
    formDataToSubmit.append("bemail", formData.bemail);
    formDataToSubmit.append("bsize", formData.bsize);
    formDataToSubmit.append('reservationId',reservationId);

    // Format and append business address (Required)
    const { street, city, state, zipcode } = formData.baddress;
    const formattedAddress = `${street}, ${city}, ${state}, ${zipcode}`;
    formDataToSubmit.append("baddress", formattedAddress);

    // Format and append home address (Required)
    const {
      street: hStreet,
      city: hCity,
      state: hState,
      zipcode: hZipcode,
    } = formData.baddressh;
    const formattedHomeAddress = `${hStreet}, ${hCity}, ${hState}, ${hZipcode}`;
    formDataToSubmit.append("baddressh", formattedHomeAddress);

    const driversPayload = formData.drivers
      .filter(
        (driver) =>
          driver.dname || driver.dphone || driver.demail || driver.dexperience
      )
      .map((driver) => ({
        dname: driver.dname,
        dphone: driver.dphone,
        demail: driver.demail,
        dexperience: driver.dexperience,
      }));

    formDataToSubmit.append("customerDrivers", JSON.stringify(driversPayload));

    // Append drivers
    formData.drivers.forEach((driver, index) => {
      if (driver.dpolicy) {
        formDataToSubmit.append(`dpolicy[${index}]`, driver.dpolicy);
      }
      if (driver.dlicense) {
        formDataToSubmit.append(`dlicense[${index}]`, driver.dlicense);
      }
    });

    try {
      const response = await axios.post(
        "http://52.20.55.193:5001/api/book/create",
        formDataToSubmit,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setLoading(false);
      localStorage.setItem("bookFormId", response.data.bookingId);
      const bookingId = response.data.bookingId;
      setSuccessMessage(response.data.message);
      console.log("bookingid", bookingId);

      navigate(`/thankyou?bookingId=${bookingId}`);
      localStorage.removeItem("vehicleId");
    } catch (err) {
      setLoading(false);
      setErrorMessage(
        err.response ? err.response.data.message : "Something went wrong."
      );
    }
  };
  const formatPassengerText = (passenger) => {
    if (passenger === "fourPassenger") return "4 Passenger";
    if (passenger === "sixPassenger") return "6 Passenger";
    if (passenger === "eightPassenger") return "8 Passenger";
    return passenger;
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <h1 style={{ paddingTop: "3%" }}>Enter Your Booking Details</h1>
      {/* {errorMessage && <div className="error-message">{errorMessage}</div>} */}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      <div className="row gy-4 px-lg-4">
        <div className="form-group col-lg-3">
          <label>
            <i className="fa-solid fa-person"></i> Name*
          </label>
          <input
            type="text"
            name="bname"
            placeholder="Enter Your Name"
            value={formData.bname}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group col-lg-3">
          <label>
            <i className="fa-solid fa-phone"></i> Phone Number*
          </label>
          <input
            type="Number"
            name="bphone"
            placeholder="Enter Phone Number"
            value={formData.bphone}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group col-lg-3">
          <label>
            <i className="fa-solid fa-envelope"></i> Email*
          </label>
          <input
            type="email"
            name="bemail"
            placeholder="Enter Email Address"
            value={formData.bemail}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group col-lg-3">
          <label>
            <i className="fa-solid fa-cart-shopping"></i> Size of Cart
          </label>
          <input
            type="text"
            name="bsize"
            placeholder="Enter Cart Size"
            value={`${formatPassengerText(
              passengerSize
            )} ${model} ${tagNumber}`}
            readOnly
          />
        </div>

        {/* Home address */}
        <div className="form-group col-lg-6">
          <label>
            <i className="fa-solid fa-house"></i> Home Address
          </label>
          <Accordion defaultActiveKey="" flush className="w-100">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Home Address</Accordion.Header>
              <Accordion.Body>
                <div className="collapsible-address mt-3 row gy-4">
                  <div className="form-group col-lg-6">
                    <label>Street</label>
                    <input
                      type="text"
                      name="street"
                      placeholder="Enter Street"
                      value={formData.baddress.street}
                      onChange={(e) => handleInputChangeAddress(e, "baddress")}
                    />
                  </div>
                  <div className="form-group col-lg-6">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      placeholder="Enter City"
                      value={formData.baddress.city}
                      onChange={(e) => handleInputChangeAddress(e, "baddress")}
                    />
                  </div>
                  <div className="form-group col-lg-6">
                    <label>State</label>
                    <input
                      type="text"
                      name="state"
                      placeholder="Enter State"
                      value={formData.baddress.state}
                      onChange={(e) => handleInputChangeAddress(e, "baddress")}
                    />
                  </div>
                  <div className="form-group col-lg-6">
                    <label>Zipcode</label>
                    <input
                      type="number"
                      name="zipcode"
                      placeholder="Enter Zipcode"
                      value={formData.baddress.zipcode}
                      onChange={(e) => handleInputChangeAddress(e, "baddress")}
                    />
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>

        {/* rental address */}
        <div className="form-group col-lg-6">
          <label>
            <i className="fa-solid fa-house"></i> Rental Address
          </label>
          <Accordion defaultActiveKey="" flush className="w-100">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Rental Address</Accordion.Header>
              <Accordion.Body>
                <div className="collapsible-address mt-3  row gy-4">
                  <div className="form-group col-lg-6">
                    <label>Street</label>
                    <input
                      type="text"
                      name="street"
                      placeholder="Enter Street"
                      value={formData.baddressh.street}
                      onChange={(e) => handleInputChangeAddress(e, "baddressh")}
                    />
                  </div>
                  <div className="form-group col-lg-6">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      placeholder="Enter City"
                      value={formData.baddressh.city}
                      onChange={(e) => handleInputChangeAddress(e, "baddressh")}
                    />
                  </div>
                  <div className="form-group col-lg-6">
                    <label>State</label>
                    <input
                      type="text"
                      name="state"
                      placeholder="Enter State"
                      value={formData.baddressh.state}
                      onChange={(e) => handleInputChangeAddress(e, "baddressh")}
                    />
                  </div>
                  <div className="form-group col-lg-6">
                    <label>Zipcode</label>
                    <input
                      type="number"
                      name="zipcode"
                      placeholder="Enter Zipcode"
                      value={formData.baddressh.zipcode}
                      onChange={(e) => handleInputChangeAddress(e, "baddressh")}
                    />
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
      <div className="drivers-section">
        {formData.drivers.map((driver, index) => (
          <div key={index} className="driver-details">
            {/* Existing code for driver details */}
            <h3
              style={{
                margin: "5%",
                marginBottom: "3%",
                textDecoration: "underline",
              }}
            >
              {" "}
              Driver Details:{" "}
            </h3>

            <div className="form-grid">
              <div className="form-group">
                <label>
                  <i className="fa-solid fa-person"></i> Driver Name
                </label>
                <input
                  type="text"
                  name="dname"
                  placeholder="Enter Driver Name"
                  value={driver.dname}
                  onChange={(e) => handleDriverChange(index, e)}
                />
              </div>

              <div className="form-group">
                <label>
                  <i className="fa-solid fa-phone"></i> Phone Number
                </label>
                <input
                  type="number"
                  name="dphone"
                  placeholder="Enter Phone Number"
                  value={driver.dphone}
                  onChange={(e) => handleDriverChange(index, e)}
                />
              </div>

              <div className="form-group">
                <label>
                  <i className="fa-solid fa-envelope"></i> Email
                </label>
                <input
                  type="email"
                  name="demail"
                  placeholder="Enter Email Address"
                  value={driver.demail}
                  onChange={(e) => handleDriverChange(index, e)}
                />
              </div>

              <div className="form-group">
                <label>
                  <i className="fa-solid fa-id-card"></i> License
                </label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(index, "dlicense", e)}
                />
              </div>

              <div className="form-group">
                <label>
                  <i className="fa-solid fa-id-card"></i> Policy
                </label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(index, "dpolicy", e)}
                />
              </div>
            </div>

            {/* Conditionally render the Remove Driver button */}
            {formData.drivers.length > 1 && (
              <button
                type="button"
                className="remove-driver"
                onClick={() => removeDriver(index)}
              >
                Remove Driver
              </button>
            )}
          </div>
        ))}

        {formData.drivers.length <= 2 && (
          <button type="button" className="add-driver" onClick={addDriver}>
            + Add More Driver
          </button>
        )}
      </div>
      <div className="checkout-button">
        <button
          type="submit"
          className="submit-button submit-check"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Booking"}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
