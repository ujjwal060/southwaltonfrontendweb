import React from 'react';
import './About.scss';
import logo from './img/logo.png';
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <>
      <div className="breadcrumb-container">
        <div className="breadcrumb-overlay">
          <h2>About Us</h2>
          <p>
            <Link to="/">Home</Link> / <span>About Us</span>
          </p>
        </div>
      </div>
      <div className="about-us1 container">
        {/* <h1 className='about-heading'>About Us</h1> */}
        <div className="about-content">
          <div className="text-content">
            <h2 className="text-heading-content1">About South Walton Golf Cart Rentals</h2>
            <h3 className="text-heading-content2">Family owned and operated</h3>
            <p className='about-para'>
              <strong>South Walton Golf Cart Rentals</strong> was started in 2011 and has been expanding ever since. We are mainly a street legal golf cart rental company, delivering golf carts right to your vacation rental.
            </p>
            <p className='about-para'>
              We are now offering sales of new and used carts and are a licensed dealer and lsv manufacturer.
            </p>
            <p className='about-para'>
              In 2016 we started offering service calls, golf cart repairs, and customizations to your personal golf carts.
            </p>
          </div>
          <div className="image-content">
            <img src={logo} alt="SWC Logo" />
          </div>
        </div>
      </div>
      <div className="about-us2 container">
        <h1 className='terms-condition mb-0'>Terms & Conditions</h1>
        <div className="first">
          <p className='tc-para'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
        </div>
        <div className="first">
          <p className='tc-para'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
        </div>

      </div>
    </>
  );
};

export default AboutUs;