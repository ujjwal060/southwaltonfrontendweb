import React from 'react'
import Booking1 from '../Booking1/Booking1'
import HomeSection3 from '../../HomeSection3/HomeSection3';
import Booking2 from '../Booking2/Booking2';
import Booking3 from '../Booking3/Booking3';
import Booking4 from '../Booking4/Booking4';
import './Booking.scss'
import { Link } from 'react-router-dom';


const Booking = () => {
  return (
    <div>
      <Booking1 />

      <Booking2 />
    </div>
  )
}

export default Booking
