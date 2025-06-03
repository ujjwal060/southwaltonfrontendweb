import React from 'react';
import './DownloadApp.scss';
import appstore from './img/appstore.png'; // Path to your App Store image
import googleplay from './img/googleplay.png'; // Path to your Google Play image
import d1 from './img/d1.png'; // Path to your first app preview image
import d2 from './img/d2.png'; // Path to your second app preview image
import { Link } from 'react-router-dom';


const PromoSection = () => {
  return (

    <div className="promo-container">
      
      <div className="promo-text">
        <h1>Download Our Mobile App to</h1>
        <h2>Track Rental Cart</h2>
        <div className="app-buttons">
          <a href="/logout" className="app-store">
            <img src={appstore} alt="Download on the App Store" />
          </a>
          <a href="/logout" className="google-play">
            <img src={googleplay} alt="Get it on Google Play" />
          </a>
        </div>
      </div>
      <div className="app-preview">
      <Link to='/logout'>
        <img src={d1} alt="App Preview 1" />
        </Link>
      </div>
      <div className="app-preview">
        <Link to='/logout'>
        <img src={d2} alt="App Preview 2" />
        </Link>
      </div>
    
    </div>
  );
};

export default PromoSection;
