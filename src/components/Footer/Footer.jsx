import React from "react";
import "./Footer.scss";
import image1 from "./img/image1.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="footer-section about">
              <div className="logo mb-2">
                <img src={image1} alt="SWC Logo" />
              </div>
              <h6 className="mb-0 fw-bold">Family Owned and Operated</h6>
              <p>
                South Walton Golf Cart Rentals was started <br />
                in 2012 and has been expanding ever since.
              </p>
            </div>
          </div>

          <div className="col-md-2 col-6">
            <div className="footer-section links">
              <h5>Quick Links</h5>
              <div className="divider"></div>
              <ul className="ui">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/contact">Contact Us</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-2 col-6">
            <div className="footer-section links">
              <h5>Company</h5>
              <div className="divider"></div>
              <ul className="ui">
                <li>
                  <Link to="/home2">Carts</Link>
                </li>

                <li>
                  <Link to="/testimonials">Testimonials</Link>
                </li>
                <li>
                  <Link to="/blog">Blogs</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-2 col-6">
            <div className="footer-section links">
              <h5>Support</h5>
              <div className="divider"></div>
              <ul className="ui">
                <li>
                  <Link to="/login">Getting Started</Link>
                </li>
                <li>
                  <Link to="/sign-up">Sign Up</Link>
                </li>
                <li>
                  <Link to="/contact">Help Center</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-2 col-6">
            <div className="footer-section links">
              <h5>Downloads</h5>
              <div className="divider"></div>
              <ul className="ui">
                <li>
                  <a
                    href="https://apps.apple.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                      alt="Download on the App Store"
                      style={{ width: "140px", height: "auto" }}
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="https://play.google.com/store/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/200px-Google_Play_Store_badge_EN.svg.png"
                      alt="Get it on Google Play"
                      style={{ width: "140px", height: "auto" }}
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="container mb-0">
        <div className="footer-bottom">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="socials align-items-center">
                <h6 className="text-white mb-0">Follow us on :</h6>
                <a
                  href="https://www.facebook.com/southwaltoncarts/"
                  target="_blank"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="https://www.instagram.com/southwaltoncarts/"
                  target="_blank"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="https://www.youtube.com/@southwaltoncarts"
                  target="_blank"
                >
                  <i className="fab fa-youtube"></i>
                </a>
                <a
                  href="https://www.google.com/search?q=south+walton+carts&rlz=1C1YTUH_en-GBIN1105IN1105&oq=south&gs_lcrp=EgZjaHJvbWUqBggCEEUYOzIGCAAQRRg8MgwIARBFGDkYsQMYgAQyBggCEEUYOzIKCAMQABixAxiABDIGCAQQRRg9MgYIBRBFGEEyBggGEEUYPDIGCAcQRRg80gEIMjgxMmowajeoAgiwAgHxBVHydJ9X6qDt&sourceid=chrome&ie=UTF-8"
                  target="_blank"
                >
                  <i className="fab fa-google"></i>
                </a>
              </div>
            </div>
            <div className="col-md-6 text-end">
              <p>Copyright © 2025 | South Walton | All Rights Reserved</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
