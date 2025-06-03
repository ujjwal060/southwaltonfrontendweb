import React from 'react';
import './HomeSection1.scss';
import homebg2 from "./img/homebg2.png";
import Best from "./img/Best.jpg"
import { useNavigate } from 'react-router-dom';


const HomeSection1 = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    const userId = localStorage.getItem('user'); 
    navigate('/home3');
  };

  return (
    <div className='home1'>
      <div className="image-container">
        <img src={Best} alt="Background" className="background-image" />
        <div className="home1-btn">
        </div>
      </div>
    </div> 
  );
}

export default HomeSection1;
