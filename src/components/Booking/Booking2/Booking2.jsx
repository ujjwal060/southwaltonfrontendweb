import React, { useState, useEffect } from 'react';
import './Booking2.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CombinedComponent = () => {
  const [models, setModels] = useState([]);
  const navigate = useNavigate();

  const fetchModels = async () => {
    try {
      const response = await axios.get(`http://18.209.91.97:5001/api/vehicle/`);
      console.log('response', response.data);
      setModels(response.data);
    } catch (error) {
      console.error('Error fetching models:', error);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  const removecart = async (id, status) => {
    try {
      console.log(id, status);
      await axios.put(`http://18.209.91.97:5001/api/vehicle/removecart/${id}`, { status });
      fetchModels();
    } catch (error) {
      console.log('Error changing Status', error);
    }
  };

  const handleContinue = (id) => {
    const token = localStorage.getItem('token'); // Check for the token in localStorage
    if (token) {
      console.log("id", id);
      localStorage.setItem('vehicle_Id', id);
      console.log('Stored ID in localStorage:', localStorage.getItem('vehicle_Id'));
      navigate('/checkout'); // Navigate to checkout if token exists
    } else {
      navigate('/login'); // Redirect to login page if token does not exist
    }
  };

  useEffect(() => {
    console.log('Updated models:', models);
  }, [models]);

  return (
    <div className="combined-container">
      {models.map((model) => {
        if (model.Addtocart) {  // Check if addToCart is true
          return (
            <div key={model.id} className="cart-model">
              <div className="cart-card">
                <img src={`${model.image}`} alt={model.vname} className="cart-image" />
                <div className="cart-details">
                  <div className="cart-passengers">{model.vseats} Passengers</div>
                  <div className="cart-name">{model.vname}</div>
                  <div className="cart-price">Price ${model.vprice}</div>
                  {/* <button className="remove" onClick={() => removecart(model._id, model.Addtocart)}>Remove</button> */}
                  <button className='Continue' onClick={() => handleContinue(model._id)}> Continue</button>
                </div>
              </div>
            </div>
          );
        }
        return null; // Return null if the condition is not met
      })}
    </div>
  );
};

export default CombinedComponent;
