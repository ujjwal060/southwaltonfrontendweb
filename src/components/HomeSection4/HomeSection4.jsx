import React from 'react'
import './HomeSection4.scss'
import h1 from './img/h1.png'
import h2 from './img/h2.png'
import h3 from './img/h3.png'
import h4 from './img/h4.png'
import { Link } from 'react-router-dom'


const HomeSection4 = () => {
  return (
    <div className='home-section4'>
      <div className="service-areas">
        <h2>Our Service Areas</h2>
        <div className="areas">
          <div className="area">
            <img src={h1} alt="Area 1" />
            <p>Area 1</p>
          </div>
          <div className="area">
            <img src={h2} alt="Area 2" />
            <p>Area 2</p>
          </div>
          <div className="area">
            <img src={h3} alt="Area 3" />
            <p>Area 3</p>
          </div>
          <div className="area">
            <img src={h4} alt="Area 4" />
            <p>Area 4</p>
          </div>
        </div>
        {/* <Link to='/cart'>
          <button className="see-all">See All Areas ➔</button>
        </Link> */}
      </div>

    </div>
  )
}

export default HomeSection4
