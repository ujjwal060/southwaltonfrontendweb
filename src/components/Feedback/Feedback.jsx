import React from 'react';
import './Feedback.scss';
import feedback1 from './img/feedback1.png';
import { Link } from 'react-router-dom';


const Form = () => {
  return (
    <div className="feedback-container">
      <div className="illustration-section">
        <img src={feedback1} alt="Illustration" />
      </div>
      <div className="form-section">
        <form className="form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Enter Name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter Email" />
          </div>
          <div className="form-group time-period">
            <div>
              <label htmlFor="start-time">Start Time</label>
              <input type="time" id="start-time" />
            </div>
            <div>
              <label htmlFor="end-time">End Time</label>
              <input type="time" id="end-time" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="comments">Comments</label>
            <textarea id="comments" placeholder="Enter Detailed Comments"></textarea>
          </div>
          <div className="feedback-btn">
            <Link to ='/download'>
          <button type="submit">Submit</button>
            </Link>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
