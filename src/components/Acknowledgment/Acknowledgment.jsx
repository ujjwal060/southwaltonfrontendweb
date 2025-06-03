import React from 'react';
import './Acknowledgment.scss';
import { useNavigate } from 'react-router-dom';

const Acknowledgment = () => {
  const navigate=useNavigate();
  const token=localStorage.getItem('token');
 const handleChange=()=>{
  if(!token){
    navigate('/login')
}
else{
  navigate('/payment-type')
}
 }
 
  return (
    <div className="acknowledgment-container">
      <h1 className="title">Acknowledgment</h1>
      <div className="content-box">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing</p>
      </div>
      <button className="next-button" onClick={handleChange}>Next</button>
    </div>
  ); 
};
 
export default Acknowledgment;
