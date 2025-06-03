// CartModels.js
import React from 'react';
import './Checkout1.scss';
import car1 from './img/car1.png';
import car2 from './img/car2.png';
import car3 from './img/car3.png';
import { Link } from 'react-router-dom';


const CartModels = () => {
  const models = [
    { id: 1, name: 'E.L Model', price: '$ 900', imageUrl: car1, passengers: 4, rating: 5 },
    { id: 2, name: 'Gas Model', price: '$ 1000', imageUrl: car2, passengers: 6, rating: 4.5 },
    { id: 3, name: 'E.U Model', price: '$ 1500', imageUrl: car3, passengers: 4, rating: 5 },
  ];

  return (
    <div className="cart-models">
      {models.map(model => (
        <div key={model.id} className="cart-card">
          <img src={model.imageUrl} alt={model.name} className="cart-image" />
          <div className="cart-details">
            <div className="cart-passengers">{model.passengers} Passengers</div>
            <div className="cart-name">{model.name}</div>
            <div className="cart-price"> Price {model.price}</div>
            <Link to='/payment'>
            <button className="continue-button">Continue</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartModels;
