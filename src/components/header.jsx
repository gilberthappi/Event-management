import React, { useState } from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaChevronDown,
} from "react-icons/fa";
import logoImage from "../assets/logo.png";
import profilepng from "../assets/spongeBob.png";
import { useAuth } from "./AuthContext";

function Header() {
  const { isLoggedIn, logout, userToken } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const profileImageStyle = {
    width: "50px", // Set width
    height: "50px", // Set height
    borderRadius: "50%", // Make it a circle
    marginRight: "10px", // Add some margin to the right
    cursor: "pointer", // Add cursor pointer
    border: "2px solid #ffffff", // Add border
    overflow: "hidden", // Hide overflow to ensure circular shape
  };
  

  const dropdownStyle = {
    position: "absolute",
    top: "50px",
    right: "10px",
    zIndex: "1000",
    backgroundColor: "var(--white-color)",
    color: "var(--black-color)",
    borderRadius: "5px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    padding: "10px",
    display: dropdownOpen ? "block" : "none",
    alginItems: "center",
  };

  return (
    <header className="site-header">
      <div className="top-header">
        <div className="container">
          <div className="row">
            <div className="two-col">
              <ul className="contact-list-item">
                <li>
                  <a href="mailto:eventplanner@gmail.com">
                    <span className="icon">
                      <FaEnvelope />
                    </span>
                    <span className="text">eventplanners@gmail.com</span>
                  </a>
                </li>
                <li>
                  <a href="tel:1234567890">
                    <span className="icon">
                      <FaPhoneAlt />
                    </span>
                    <span className="text">123 456 7890</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="two-col">
              <ul className="header-social">
                <li>
                  <a href="https://facebook.com">
                    <span className="icon">
                      <FaFacebookF />
                    </span>
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com">
                    <span className="icon">
                      <FaInstagram />
                    </span>
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com">
                    <span className="icon">
                      <FaTwitter />
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-header">
        <div className="container bottom-header-container">
          <div className="bottom-header-content">
            <div className="row">
              <div className="two-col">
                <div className="site-branding">
                  <a href="/">
                    <img src={logoImage} alt="Logo" />
                  </a>
                </div>
              </div>
              <div className="two-col" style={{ position: "relative" }}>
                {isLoggedIn ? (
                  <div className="profile-section">
                    <img
                      src={profilepng}
                      alt="Profile"
                      style={profileImageStyle}
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    />
                    <div style={dropdownStyle}>
                      <button><a href="/dashboard">Dashboard</a></button>
                      <button onClick={logout}>Logout</button>
                    </div>
                  </div>
                ) : (
                  <div className="reserve-button">
                    <a href="/login" className="btn">
                      Login
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
