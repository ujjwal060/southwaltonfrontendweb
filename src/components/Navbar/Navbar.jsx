import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button, Dropdown } from "react-bootstrap";
import Logout from "../Logout/Logout";
import image1 from "./img/image1.png";
import "./Navbar.scss";
import { FaSignInAlt, FaUserPlus, FaUser } from "react-icons/fa";

const CustomNavbar = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
    setExpanded(false);
  };

  const confirmLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("vehicleId");
    localStorage.removeItem("reservationId");
    localStorage.removeItem("user");
    localStorage.clear();
    setIsLogoutModalOpen(false);
    navigate("/login");
  };

  const closeModal = () => setIsLogoutModalOpen(false);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="custom-navbar sticky-top"
      bg="white"
      variant="light"
      expanded={expanded}
    >
      <Container className="my-0 py-0" fluid>
        <Navbar.Brand as={Link} to="/">
          <img
            src={image1}
            alt="Logo"
            width="70"
            className="img-nav-logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setExpanded(expanded ? false : true)}
        />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav className="gap-3 align-items-center">
            <Nav.Link
              as={Link}
              to="/"
              className="nav-link-custom"
              style={{ fontSize: "17px" }}
              onClick={() => setExpanded(false)}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/about"
              className="nav-link-custom"
              style={{ fontSize: "17px" }}
              onClick={() => setExpanded(false)}
            >
              About Us
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contact"
              className="nav-link-custom"
              style={{ fontSize: "17px" }}
              onClick={() => setExpanded(false)}
            >
              Contact Us
            </Nav.Link>
            {isLoggedIn ? (
              <Nav.Link className="nav-link-custom">
                <Dropdown>
                  <Dropdown.Toggle
                    variant="light"
                    id="dropdown-basic"
                    className="profile-dropdown button-custom"
                  >
                    <FaUser size={20} /> My Profile
                  </Dropdown.Toggle>
                  <Dropdown.Menu align="end">
                    <Dropdown.Item
                      as={Link}
                      to="/profile"
                      onClick={() => setExpanded(false)}
                    >
                      My Account
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={Link}
                      to="/booking"
                      onClick={() => setExpanded(false)}
                    >
                      My Bookings
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav.Link>
            ) : (
              <>
                <Button
                  as={Link}
                  to="/login"
                  className="button-custom"
                  style={{ fontSize: "17px" }}
                  onClick={() => setExpanded(false)}
                >
                  Login <FaSignInAlt />
                </Button>
                <Button
                  as={Link}
                  to="/sign-up"
                  className="button-custom"
                  style={{ fontSize: "17px" }}
                  onClick={() => setExpanded(false)}
                >
                  Sign Up <FaUserPlus />
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      {isLogoutModalOpen && (
        <Logout
          isOpen={isLogoutModalOpen}
          onClose={closeModal}
          onLogout={confirmLogout}
        />
      )}
    </Navbar>
  );
};

export default CustomNavbar;
