import React, { useState, useEffect } from 'react';
import './Checkout.scss';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
// import { useSearchParams } from "react-router-dom";
import axios from 'axios';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    bname: '',
    bphone: '',
    vehiclesId: '',
    bemail: '',
    bsize: '',
    baddress: '',
    baddressh: '',
    drivers: [{
      dname: '',
      dphone: '',
      demail: '',
      dlicense: null,
      dpolicy: null,
      dexperience: ''
    }]
  });

  const [reservationId, setReservationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [passengerSize, setPassengerSize] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { season, day } = location.state || {};

  useEffect(() => {
    const id = localStorage.getItem('reservationId');
    const passenger = localStorage.getItem('passenger');
    const vehicleId = searchParams.get("vehicleId");
    if (id) {
      setReservationId(id); // Set the reservation ID into state
    }
    if (passenger) {
      setPassengerSize(passenger); // Set the passenger size 
    }

    
    // Fetch vehicle size 
  if (vehicleId) {
    axios.get(`http://44.196.64.110:8132/api/vehicle/${vehicleId}`)
      .then(response => {
        const size = response.data.passenger;
        setPassengerSize(size); 
        setFormData(prevData => ({
          ...prevData,
          vehiclesId: vehicleId,
          bsize: size
        }));
        // console.log("size data", size);
      })
      .catch(error => {
        console.error("Error fetching vehicle size:", error);
      });
  }
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDriverChange = (index, e) => {
    const { name, value } = e.target;
    const updatedDrivers = [...formData.drivers];
    updatedDrivers[index][name] = value;
    setFormData({
      ...formData,
      drivers: updatedDrivers
    });
  };

  const handleFileChange = (index, fileType, event) => {
    const file = event.target.files[0];
    if (file) {
      const newDrivers = [...formData.drivers];
      newDrivers[index][fileType] = file;
      setFormData({ ...formData, drivers: newDrivers });
    }
  };

  const addDriver = () => {
    setFormData({
      ...formData,
      drivers: [...formData.drivers, {
        dname: '',
        dphone: '',
        demail: '',
        dlicense: null,
        dpolicy: null,
        dexperience: ''
      }]
    });
  };

  const removeDriver = (index) => {
    const updatedDrivers = formData.drivers.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      drivers: updatedDrivers
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const formDataToSubmit = new FormData();

    // Append booking details
    formDataToSubmit.append('bname', formData.bname);
    formDataToSubmit.append('bphone', formData.bphone);
    formDataToSubmit.append('bemail', formData.bemail);
    formDataToSubmit.append('bsize', formData.bsize);
    formDataToSubmit.append('baddress', formData.baddress);
    formDataToSubmit.append('baddressh', formData.baddressh);

    // Convert drivers array to JSON string and append
    const driversPayload = formData.drivers.map((driver) => ({
      dname: driver.dname,
      dphone: driver.dphone,
      demail: driver.demail,
      dexperience: driver.dexperience,
    }));
    formDataToSubmit.append('customerDrivers', JSON.stringify(driversPayload));

    // Append files (policy and license)
    formData.drivers.forEach((driver) => {
      if (driver.dpolicy) {
        formDataToSubmit.append('dpolicy', driver.dpolicy); // Binary file for policy
      }
      if (driver.dlicense) {
        formDataToSubmit.append('dlicense', driver.dlicense); // Binary file for license
      }
    });

    try {
      const response = await axios.post('http://44.196.64.110:5001/api/book/create', formDataToSubmit, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setLoading(false);
      // localStorage.setItem('bookFormId', response.data.bookingId);
      const bookingId = response.data.bookingId;
      setSuccessMessage(response.data.message);
      navigate(`/agreement?bookingId=${bookingId}`);
      localStorage.removeItem("vehicleId");
    } catch (err) {
      setLoading(false);
      setErrorMessage(err.response ? err.response.data.message : 'Something went wrong.');
    }
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <h1 style={{paddingTop:'3%'}}>Enter Your Booking Details</h1>

      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <div className="form-grid">
        <div className="form-group">
          <label><i className="fa-solid fa-person"></i> Name</label>
          <input type="text" name="bname" placeholder="Enter Your Name" value={formData.bname} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label><i className="fa-solid fa-phone"></i> Phone Number</label>
          <input type="Number" name="bphone" placeholder="Enter Phone Number" value={formData.bphone} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label><i className="fa-solid fa-envelope"></i> Email</label>
          <input type="email" name="bemail" placeholder="Enter Email Address" value={formData.bemail} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label><i className="fa-solid fa-cart-shopping"></i> Size of Cart</label>
          <input
            type="text"
            name="bsize"
            placeholder="Enter Cart Size"
            value={passengerSize}
            readOnly 
          />
        </div>
        <div className="form-group">
          <label><i className="fa-solid fa-house"></i> Rental Address</label>
          <input type="text" name="baddress" placeholder="Enter Rental Address" value={formData.baddress} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label><i className="fa-solid fa-house"></i> Home Address</label>
          <input type="text" name="baddressh" placeholder="Enter Home Address" value={formData.baddressh} onChange={handleInputChange} />
        </div>
      </div>

      <div className="drivers-section">
        {formData.drivers.map((driver, index) => (
          <div key={index} className="driver-details">
            <div className="form-grid">
              <div className="form-group">
                <label><i className="fa-solid fa-person"></i> Driver Name</label>
                <input type="text" name="dname" placeholder="Enter Driver Name" value={driver.dname} onChange={(e) => handleDriverChange(index, e)} />
              </div>
              <div className="form-group">
                <label><i className="fa-solid fa-phone"></i> Phone Number</label>
                <input type="number" name="dphone" placeholder="Enter Phone Number" value={driver.dphone} onChange={(e) => handleDriverChange(index, e)} />
              </div>
              <div className="form-group">
                <label><i className="fa-solid fa-envelope"></i> Email</label>
                <input type="email" name="demail" placeholder="Enter Email Address" value={driver.demail} onChange={(e) => handleDriverChange(index, e)} />
              </div>
              <div className="form-group">
                <label><i className="fa-solid fa-id-card"></i> License</label>
                <input type="file" onChange={(e) => handleFileChange(index, 'dlicense', e)} />
              </div>
              <div className="form-group">
                <label><i className="fa-solid fa-id-card"></i> Policy</label>
                <input type="file" onChange={(e) => handleFileChange(index, 'dpolicy', e)} />
              </div>
              <div className="form-group">
                <label><i className="fa-solid fa-trophy"></i> Experience</label>
                <input type="text" name="dexperience" placeholder="Enter Experience" value={driver.dexperience} onChange={(e) => handleDriverChange(index, e)} />
              </div>
            </div>

            {/* <button type="button" className="remove-driver" onClick={() => removeDriver(index)}>Remove Driver</button> */}
          </div>
        ))}

        {/* <button type="button" className="add-driver" onClick={addDriver}>Add Driver</button> */}
      </div>
      <div className="checkout-button">
        <button type="submit" className="submit-button submit-check" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Booking'}
        </button>
      </div>

    </form>
  );
};

export default BookingForm;