import React, { useState } from "react";
import Modal from "react-modal";
import {
  FaYoutube,
  FaEnvelope,
  FaTwitter,
  FaPhoneAlt,
  FaFacebookF,
  FaInstagram,
  FaSearch,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";
import logoImage from "../assets/logo.png";
import whiteLogo from "../assets/logo.png";
import logoIconWhite from "../assets/logo-icon-white.svg";

function Header() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleDropdownClick = (event, index) => {
    event.preventDefault();
    toggleDropdown(index);
  };

  const toggleDropdown = (index) => {
    if (activeDropdown === index) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(index);
    }
  };

  const menuItems = [
    { title: "Home", link: "/" },
    { title: "About", link: "/" },
  ];

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const customStyles = {
    content: {
      position: "absolute",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      border: "none",
      background: "#2b2b2b",
      overflow: "auto",
      outline: "none",
      padding: "20px",
    },
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
                  <a href="/"><img src={logoImage} alt="Logo" /></a>
                </div>
              </div>
              <div className="two-col">
                <div className="reserve-button">
                  <a href="/login" className="btn">
                    login
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
