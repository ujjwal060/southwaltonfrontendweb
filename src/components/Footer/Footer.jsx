import React from 'react';
import './Footer.scss'; // Ensure this path matches your project structur
import image1 from './img/image1.png'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about">
          <div className="logo">
            <img src={image1}alt="SWC Logo" />
          </div>
          <h2>Family owned and operated</h2>
          <p>South Walton Golf Cart Rentals was started in 2021 and has been expanding ever since. We are mainly a street legal golf cart rental company, delivering golf carts right to your vacation rental.</p>
        </div>
        <div className="footer-section links">
          <h2>Product</h2>
          <ul className='ui'>
            <li><a href="#">Carts</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Repairing</a></li>
            <li><a href="#">Damage</a></li>
            <li><a href="#">Drivers</a></li>
          </ul>
        </div>
        <div className="footer-section links">
          <h2 >Company</h2>
          <ul className='ui'>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Culture</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>
        <div className="footer-section links">
          <h2>Support</h2>
          <ul className='ui'>
            <li><a href="#">Getting started</a></li>
            <li><a href="#">Help center</a></li>
            <li><a href="#">Server status</a></li>
            <li><a href="#">Report a bug</a></li>
          </ul>
        </div>
        <div className="footer-section links">
          <h2>Downloads</h2>
          <ul className='ui'>
            <li><a href="#">iOS</a></li>
            <li><a href="#">Android</a></li>
            <li><a href="#">Mac</a></li>
            <li><a href="#">Windows</a></li>
            <li><a href="#">Chrome</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Copyright © 2024 South Walton | All Rights Reserved</p>
        <div className="socials">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-linkedin-in"></i></a>
          <a href="#"><i className="fab fa-youtube"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
