// import React, { useState } from 'react';
// import './Navbar.scss';
// import image1 from './img/image1.png'; // Adjust the path to your logo file
// import { Link, useNavigate } from 'react-router-dom';

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const navigate = useNavigate();
//   const isLoggedIn = !!localStorage.getItem('token');

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setIsMenuOpen(false); // Close menu after logout
//     navigate('/login'); // Redirect to login page
//   };

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const handleContactUs = () => {
//     setIsMenuOpen(false); // Close menu
//     navigate('/contact');
//   };

//   const handleMenuClick = () => {
//     setIsMenuOpen(false); // Close menu on any menu item click
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-logo">
//         <Link to="/" onClick={handleMenuClick}>
//           <img src={image1} alt="Logo" />
//         </Link>
//       </div>
//       <button className="menu-toggle" onClick={toggleMenu}>
//         ☰
//       </button>
//       <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
//         <Link to="/about" onClick={handleMenuClick}>About Us</Link>
//         <Link to="/cart" onClick={handleMenuClick}>Cart</Link>
//         {isLoggedIn ? (
//           <button className="login-button" onClick={handleLogout}>
//             Logout
//           </button>
//         ) : (
//           <>
//             <Link to="/login" onClick={handleMenuClick}>
//               <button className="login-button">Login</button>
//             </Link>
//             <Link to="/sign-up" onClick={handleMenuClick}>
//               <button className="signup-button">Sign Up</button>
//             </Link>
//           </>
//         )}
//         <button className="contact-button" onClick={handleContactUs}>
//           Contact Us
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState } from 'react';
import './Navbar.scss';
import image1 from './img/image1.png'; // Adjust the path to your logo file
import { Link, useNavigate } from 'react-router-dom';
import Logout from '../Logout/Logout'; // Import the LogoutModal component

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // State for modal visibility
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    // Show the logout modal instead of logging out directly
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    // Perform actual logout
    localStorage.removeItem('token');
    localStorage.removeItem('vehicleId');
    localStorage.removeItem('reservationId')
    localStorage.removeItem('user');
    setIsMenuOpen(false); // Close menu after logout
    setIsLogoutModalOpen(false); // Close modal after logout
    navigate('/login'); // Redirect to login page
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleContactUs = () => {
    setIsMenuOpen(false); // Close menu
    navigate('/contact');
  };

  const handleMenuClick = () => {
    setIsMenuOpen(false); // Close menu on any menu item click
  };

  const closeModal = () => {
    setIsLogoutModalOpen(false); // Close the modal without logging out
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" onClick={handleMenuClick}>
          <img src={image1} alt="Logo" />
        </Link>
      </div>
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/about" onClick={handleMenuClick} className='about-nav'>About Us</Link>
        {/* <Link to="/cart" onClick={handleMenuClick}>Cart</Link> */}
        {isLoggedIn ? (
          <button className="login-button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" onClick={handleMenuClick}>
              <button className="login-button">Login</button>
            </Link>
            <Link to="/sign-up" onClick={handleMenuClick}>
              <button className="signup-button">Sign Up</button>
            </Link>
          </>
        )}
        <button className="contact-button" onClick={handleContactUs}>
          Contact Us
        </button>
      </div>

      {/* Render the LogoutModal */}
      {isLogoutModalOpen && (
        <Logout
          isOpen={isLogoutModalOpen}
          onClose={closeModal}
          onLogout={confirmLogout}
        />
      )}
    </nav>
  );
};

export default Navbar;
