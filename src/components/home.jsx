import React, { useState, useEffect } from "react";
import axios from "axios";
import logoImage from "../assets/logo-icon.svg";
import abtBigImage from "../assets/aboutEventUs.jpeg";
import abtSmallImage from "../assets/aboutEventUs1.jpeg";
import whiteMap from "../assets/white-map.png";
import tourBoxImage1 from "../assets/tour-box-image1.jpg";
import { FaLocationDot } from "react-icons/fa6";
import { useAuth } from "./AuthContext";
import Notiflix from "notiflix";

import {
  FaUserFriends,
  FaCalendarAlt
} from "react-icons/fa";
import "swiper/swiper-bundle.css";
import "swiper/css";

import bannerSlide1 from "../assets/event1.jpeg";
import bannerSlide2 from "../assets/event3.png";
import bannerSlide3 from "../assets/event2.jpeg";

// CSS Styles for Popup Form
const popupContainerStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

const popupContentStyle = {
  textAlign: "center",
};

const closeButtonStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  cursor: "pointer",
  background: "var(--yellow-color)",
  color: "#fff",
  border: "none",
  // padding: "10px 20px",
  padding:"0px 5px 0px 5px",
  borderRadius: "5px",
};

const inputGroupStyle = {
  marginBottom: "10px",
  display: "flex",
  flexDirection: "row",
};

const inputStyle = {
  width: "50%",
  height: "25px",
  padding: "8px",
  boxSizing: "border-box",
  // marginBottom: "10px",
  marginLeft: "10px",
  // marginTop:"10px"
};

const bookButtonStyle = {
  background: "var(--yellow-color)",
  color: "#fff",
  border: "none",
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer",
  textTransform: "uppercase",
};

const errorMessageStyle = {
  color: "red",
};

const tourStyle = {
  backgroundImage: `url(${whiteMap})`,
  backgroundSize: "cover",
  backgroundPosition: "center center",
};


function Home() {
  const slides = [
    {
      image: bannerSlide1,
      heading: "Get Ready to Connect",
      subheading: "The World.",
      paragraph:
        "Unforgettable Moments Await! Book Your Next Event with Us Today.",
    },
    {
      image: bannerSlide2,
      heading: "Enjoy The Event With",
      subheading: "Event Planners",
      paragraph:
        "Embark on a Journey of Unforgettable Events. Import Our Full Demo Content with Just One Click and Create a Showstopping Website for Your Event Management Business.",
    },
    {
      image: bannerSlide3,
      heading: "Explore new Opportunities",
      subheading: "The World is Wide.",
      paragraph:
        "Discover Endless Possibilities. Import Full Demo Content with One Click and Build an Unforgettable Event Booking Website",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [events, setEvents] = useState([]);
  const { userToken } = useAuth();
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [bookingError, setBookingError] = useState(null);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [currentSlide]);

  useEffect(() => {
    axios.get("http://localhost:100/api/v1/event/all")
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error("Error fetching events:", error);
      });
  }, []);


  const handleBooking = () => {
    const bookingData = {
      eventID: selectedEvent._id,
      UserID: userToken.id,
      numberOfTickets: numberOfTickets,
      paymentMethod: paymentMethod,
    };

    axios
      .post("http://localhost:100/api/v1/booking/book", bookingData)
      .then((response) => {
        Notiflix.Notify.success("Event booked successfully.");
        setPopupVisible(false);
        console.log("Booking successful:", response.data);
      })
      .catch((error) => {
        Notiflix.Notify.failure("Failed to book the event. Please try again.");
        console.error("Booking failed:", error);
        setBookingError("Failed to book the event. Please try again.");
      });
  };

  return (
    <main className="home-content">
      <section className="home-banner">
        <div className="banner-slider">
          <img src={slides[currentSlide].image} alt="Banner" />
          <div className="slider-text">
            <h1>
              {slides[currentSlide].heading}{" "}
              <p>
                <span className="empty-space"></span>
              </p>
              <span>{slides[currentSlide].subheading}</span>
            </h1>
            <p>{slides[currentSlide].paragraph}</p>
          </div>
        </div>
        <div className="swiper-button-prev" onClick={prevSlide}>
          <span className="btn">prev</span>
        </div>
        <div className="swiper-button-next" onClick={nextSlide}>
          <span className="btn">next</span>
        </div>
      </section>
      <section className="main-about common-sec">
        <div className="logo-icon">
          <img src={logoImage} alt="logo" />
        </div>
        <div className="abt-container">
          <div className="row">
            <div className="two-col col-6">
              <div className="abt-image">
                <div className="abt-img">
                  <div className="about-image-box big-img">
                    <div className="about-image back-image">
                      <img src={abtBigImage} alt="Big Image" />
                    </div>
                  </div>
                  <div className="about-image-box small-img">
                    <div className="about-image back-image">
                      <img src={abtSmallImage} alt="Small Image" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="two-col col-6">
              <div className="abt-content">
                <div className="line-title">
                  <h4 className="h4-title">About us</h4>
                </div>
                <h2 className="h2-title">
                  Book Your <span>Event</span> With <span>Us</span>
                </h2>
                <div className="about-content-text">
                  <p>
                    As Event Planner, we excel in event planning, offering comprehensive services to make your special occasions extraordinary. From weddings and corporate functions to private parties and community events, we handle every detail with precision and care. Our team of experienced professionals is dedicated to bringing your vision to life, ensuring seamless execution and unforgettable experiences. Let Event Planner be your trusted partner in creating moments that will be cherished for a lifetime.
                  </p>
                </div>
                <a href="/about" className="btn">
                  Read More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="main-tour bg-f6 back-image" style={tourStyle}>
        <div className="tour-sec pt-70">
          <div className="container">
            <div className="row">
              <div className="col-6">
                <div className="sec-title wow">
                  <div className="line-title">
                    <h4 className="h4-title">Upcoming Event</h4>
                  </div>
                  <h2 className="h2-title">
                    Trending, <span>Best Selling Tickets</span> And High Discount
                  </h2>
                </div>
              </div>
            </div>

            <div className="row tour-slider wow">
              {events.data && events.data.map(event => (
                <div className="col-4" key={event._id}>
                  <div className="tour-box">
                    <div
                      className="tour-box-image back-image"
                      style={{ backgroundImage: `url(${event.backdropImage || tourBoxImage1})` }}
                    ></div>
                    <div className="tour-box-content">
                      <div className="tour-box-label">
                        <div className="tour-box-inner-label">
                          <h4 className="h4-title">{event.title}</h4>
                        </div>
                      </div>
                      <div className="tour-box-title">
                        <h4 className="h4-title"><i><FaLocationDot/></i>{event.location}</h4>
                      </div>
                      <div className="tour-box-description">
                        <p>{event.description}</p>
                      </div>
                      <div className="tour-info-box">
                        <div className="row">
                          <div className="col-6">
                            <div className="tour-info">
                              <div className="tour-info-icon">
                                <i><FaCalendarAlt /></i>
                              </div>
                              <div className="tour-info-content">
                                <h5 className="h6-title">Date</h5>
                                <p>{event.date}</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="tour-info">
                              <div className="tour-info-icon">
                                <i><FaUserFriends /></i>
                              </div>
                              <div className="tour-info-content">
                                <h5 className="h6-title">Tickets</h5>
                                <p>{event.ticketsAvailable}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tour-box-bottom">
                        <div className="tour-price">
                          <h3 className="h3-title">${event.price}</h3>
                        </div>

                          <button style={bookButtonStyle} className="book-button" onClick={() => {
                            setSelectedEvent(event);
                            setPopupVisible(true);
                          }}>Book Now</button>

                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {bookingError && <p>{bookingError}</p>}
            </div>
          </div>
        </div>
      </section>
      {popupVisible && selectedEvent && (
        <div style={popupContainerStyle} className="popup-container">
          <div style={popupContentStyle} className="popup-content">
            <span style={closeButtonStyle} className="close" onClick={() => setPopupVisible(false)}>&times;</span>
            <h3>Book Event</h3>
            <h2 className="h4-title" style={{ textTransform: "uppercase"}} ><i>⭐️-{selectedEvent.title}-⭐️</i></h2>
            <div style={inputGroupStyle} className="input-group">
              <label htmlFor="numberOfTickets">Number of Tickets:</label>
              <input style={inputStyle} type="number" id="numberOfTickets" value={numberOfTickets} onChange={(e) => setNumberOfTickets(e.target.value)} />
            </div>
            <div style={inputGroupStyle} className="input-group">
              <label htmlFor="paymentMethod">$ Payment Method:</label>
               <input style={inputStyle} type="text" id="paymentMethod" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} />

            </div>
            <button style={bookButtonStyle} className="book-button" onClick={handleBooking}>Book</button>
            {bookingError && <p style={errorMessageStyle} className="error-message">{bookingError}</p>}
          </div>
        </div>
      )}
    </main>
  );
}

export default Home;
