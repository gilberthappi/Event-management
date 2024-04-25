import React, { useState, useEffect } from "react";
import logoImage from "../assets/logo-icon.svg";
import abtBigImage from "../assets/aboutEventUs.jpeg";
import abtSmallImage from "../assets/aboutEventUs1.jpeg";
import waveDesign from "../assets/wave-design.jpg";
import whiteMap from "../assets/white-map.png";
import destination1 from "../assets/destination-img1.jpg";
import destination2 from "../assets/destination-img2.jpg";
import destination3 from "../assets/destination-img3.jpg";
import destination4 from "../assets/destination-img4.jpg";
import offerImg1 from "../assets/offer-img1.jpg";
import offerImg2 from "../assets/offer-img2.jpg";
import offerImg3 from "../assets/offer-img3.jpg";
import offerImg4 from "../assets/offer-img4.jpg";
import offerImg5 from "../assets/offer-img5.jpg";
import highlightVid from "../assets/highlight-video.mp4";
import highlightBg from "../assets/highlight-image.jpg";
import tourIcon1 from "../assets/tour-service-icon1.svg";
import tourIcon2 from "../assets/tour-service-icon2.svg";
import tourIcon3 from "../assets/tour-service-icon3.svg";
import tourBoxImage1 from "../assets/tour-box-image1.jpg";
import tourBoxImage2 from "../assets/tour-box-image2.jpg";
import tourBoxImage3 from "../assets/tour-box-image3.jpg";
import tourBoxImage4 from "../assets/tour-box-image4.jpg";
import testimonialQuote from "../assets/testimonial-quote.svg";
import blogImage1 from "../assets/blog-image1.jpg";
import blogImage2 from "../assets/blog-image2.jpg";
import blogImage3 from "../assets/blog-image3.jpg";
import instagramImage1 from "../assets/instagram-image1.jpg";
import instagramImage2 from "../assets/instagram-image2.jpg";
import instagramImage3 from "../assets/instagram-image3.jpg";
import instagramImage4 from "../assets/instagram-image4.jpg";
import instagramImage5 from "../assets/instagram-image5.jpg";
import instagramImage6 from "../assets/instagram-image6.jpg";
import partnerLogo1 from "../assets/partners-logo1.png";
import partnerLogo4 from "../assets/partners-logo4.png";
import partnerLogo2 from "../assets/partners-logo2.png";
import partnerLogo3 from "../assets/partners-logo3.png";

import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaFlag,
  FaCaretDown,
  FaClock,
  FaUserFriends,
  FaStar,
  FaInstagram,
} from "react-icons/fa";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";
import "swiper/css";

import bannerSlide1 from "../assets/event1.jpeg";
import bannerSlide2 from "../assets/event3.png";
import bannerSlide3 from "../assets/event2.jpeg";

import Header from "./header";
import Footer from "./footer";
import { height } from "@fortawesome/free-brands-svg-icons/fa42Group";

function home() {
  const slides = [
    {
      image: bannerSlide1,
      heading: "Get Ready to Connet",
      subheading: "The World.",
      paragraph:
        "Unforgettable Moments Await! Book Your Next Event with Us Today.",
    },
    {
      image: bannerSlide2,
      heading: "Enjoy The Travel With",
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

  // State for current slide
  const [currentSlide, setCurrentSlide] = useState(0);

  // Function to move to the next slide
  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % slides.length);
  };

  // Function to move to the previous slide
  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  //tour slider

  // Auto slide transition
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [currentSlide]);

  // Initialize Swiper
  const tourBoxStyle = {
    backgroundImage: `url(${tourBoxImage1})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
  };

  const tourBoxStyle1 = {
    backgroundImage: `url(${tourBoxImage2})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
  };

  const tourBoxStyle3 = {
    backgroundImage: `url(${tourBoxImage4})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
  };

  const tourBoxStyle4 = {
    backgroundImage: `url(${tourBoxImage4})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
  };

  const tourBoxStyle5 = {
    backgroundImage: `url(${tourBoxImage4})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
  };
  const tourStyle = {
    backgroundImage: `url(${whiteMap})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
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
                      <img src={abtBigImage} />
                    </div>
                  </div>
                  <div className="about-image-box small-img">
                    <div className="about-image back-image">
                      <img src={abtSmallImage} />
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
                    <h4 className="h4-title">Upcomming Event</h4>
                  </div>
                  <h2 className="h2-title">
                    Trending, <span>Best Selling Tickets</span> And High
                    Discount
                  </h2>
                </div>
              </div>
            </div>
            <div className="row tour-slider wow">
              <div className="col-4">
                <div className="tour-box">
                  <div
                    className="tour-box-image back-image"
                    style={tourBoxStyle}
                  ></div>
                  <div className="tour-box-content">
                    <div className="tour-box-label">
                      <div className="tour-box-inner-label">
                        <h4 className="h4-title">Italy</h4>
                      </div>
                    </div>
                    <div className="tour-box-title">
                      <h4 className="h4-title">
                        Holiday Planner is a World Leading Online Tour Booking
                        Platform
                      </h4>
                    </div>
                    <div className="tour-box-description">
                      <p>
                        Far far away, behind the word mountains, far from the
                        countries Vokalia and Consonantia, there live the blind
                        texts. Separated they live in Bookmarksgrove.
                      </p>
                    </div>
                    <div className="tour-info-box">
                      <div className="row">
                        <div className="col-6">
                          <div className="tour-info">
                            <div className="tour-info-icon">
                              <i>
                                <FaClock />
                              </i>
                            </div>
                            <div className="tour-info-content">
                              <h5 className="h6-title">Duration</h5>
                              <p>2 days</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="tour-info">
                            <div className="tour-info-icon">
                              <i>
                                <FaUserFriends />
                              </i>
                            </div>
                            <div className="tour-info-content">
                              <h5 className="h6-title">Group Size</h5>
                              <p>6 People</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tour-box-bottom">
                      <div className="tour-price">
                        <h3 className="h3-title">$1200</h3>
                      </div>
                      <div className="book-now-button">
                        {/* <a href={`/tour/${tour._id}`} className="btn">Book Now</a> */}
                        <a href="" className="btn">
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="tour-box">
                  <div
                    className="tour-box-image back-image"
                    style={tourBoxStyle1}
                  >
                    <span className="discount-label">15% Off</span>
                  </div>
                  <div className="tour-box-content">
                    <div className="tour-box-label">
                      <div className="tour-box-inner-label">
                        <h4 className="h4-title">Greece</h4>
                      </div>
                    </div>
                    <div className="tour-box-title">
                      <h4 className="h4-title">
                        Holiday Planner is a World Leading Online Tour Booking
                        Platform
                      </h4>
                    </div>
                    <div className="tour-box-description">
                      <p>
                        Far far away, behind the word mountains, far from the
                        countries Vokalia and Consonantia, there live the blind
                        texts. Separated they live in Bookmarksgrove.
                      </p>
                    </div>
                    <div className="tour-info-box">
                      <div className="row">
                        <div className="col-6">
                          <div className="tour-info">
                            <div className="tour-info-icon">
                              <i>
                                <FaClock />
                              </i>
                            </div>
                            <div className="tour-info-content">
                              <h5 className="h6-title">Duration</h5>
                              <p>6 days 3 hours</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="tour-info">
                            <div className="tour-info-icon">
                              <i>
                                <FaUserFriends />
                              </i>
                            </div>
                            <div className="tour-info-content">
                              <h5 className="h6-title">Group Size</h5>
                              <p>15+ People</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tour-box-bottom">
                      <div className="tour-price">
                        <h3 className="h3-title">$2500</h3>
                      </div>
                      <div className="book-now-button">
                        {/* <a href={`/tour/${tour._id}`} className="btn">Book Now</a> */}
                        <a href="" className="btn">
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="tour-box">
                  <div
                    className="tour-box-image back-image"
                    style={tourBoxStyle1}
                  >
                    <span className="discount-label">15% Off</span>
                  </div>
                  <div className="tour-box-content">
                    <div className="tour-box-label">
                      <div className="tour-box-inner-label">
                        <h4 className="h4-title">Greece</h4>
                      </div>
                    </div>
                    <div className="tour-box-title">
                      <h4 className="h4-title">
                        Holiday Planner is a World Leading Online Tour Booking
                        Platform
                      </h4>
                    </div>
                    <div className="tour-box-description">
                      <p>
                        Far far away, behind the word mountains, far from the
                        countries Vokalia and Consonantia, there live the blind
                        texts. Separated they live in Bookmarksgrove.
                      </p>
                    </div>
                    <div className="tour-info-box">
                      <div className="row">
                        <div className="col-6">
                          <div className="tour-info">
                            <div className="tour-info-icon">
                              <i>
                                <FaClock />
                              </i>
                            </div>
                            <div className="tour-info-content">
                              <h5 className="h6-title">Duration</h5>
                              <p>6 days 3 hours</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="tour-info">
                            <div className="tour-info-icon">
                              <i>
                                <FaUserFriends />
                              </i>
                            </div>
                            <div className="tour-info-content">
                              <h5 className="h6-title">Group Size</h5>
                              <p>15+ People</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tour-box-bottom">
                      <div className="tour-price">
                        <h3 className="h3-title">$2500</h3>
                      </div>
                      <div className="book-now-button">
                        {/* <a href={`/tour/${tour._id}`} className="btn">Book Now</a> */}
                        <a href="" className="btn">
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="tour-box">
                  <div
                    className="tour-box-image back-image"
                    style={tourBoxStyle4}
                  >
                    <span className="discount-label">15% Off</span>
                  </div>
                  <div className="tour-box-content">
                    <div className="tour-box-label">
                      <div className="tour-box-inner-label">
                        <h4 className="h4-title">Greece</h4>
                      </div>
                    </div>
                    <div className="tour-box-title">
                      <h4 className="h4-title">
                        Holiday Planner is a World Leading Online Tour Booking
                        Platform
                      </h4>
                    </div>
                    <div className="tour-box-description">
                      <p>
                        Far far away, behind the word mountains, far from the
                        countries Vokalia and Consonantia, there live the blind
                        texts. Separated they live in Bookmarksgrove.
                      </p>
                    </div>
                    <div className="tour-info-box">
                      <div className="row">
                        <div className="col-6">
                          <div className="tour-info">
                            <div className="tour-info-icon">
                              <i>
                                <FaClock />
                              </i>
                            </div>
                            <div className="tour-info-content">
                              <h5 className="h6-title">Duration</h5>
                              <p>6 days 3 hours</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="tour-info">
                            <div className="tour-info-icon">
                              <i>
                                <FaUserFriends />
                              </i>
                            </div>
                            <div className="tour-info-content">
                              <h5 className="h6-title">Group Size</h5>
                              <p>15+ People</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tour-box-bottom">
                      <div className="tour-price">
                        <h3 className="h3-title">$2500</h3>
                      </div>
                      <div className="book-now-button">
                        {/* <a href={`/tour/${tour._id}`} className="btn">Book Now</a> */}
                        <a href="" className="btn">
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="tour-box">
                  <div
                    className="tour-box-image back-image"
                    style={tourBoxStyle5}
                  >
                    <span className="discount-label">38% Off</span>
                  </div>
                  <div className="tour-box-content">
                    <div className="tour-box-label">
                      <div className="tour-box-inner-label">
                        <h4 className="h4-title">Jaisalmer</h4>
                      </div>
                    </div>
                    <div className="tour-box-title">
                      <h4 className="h4-title">
                        Holiday Planner is a World Leading Online Tour Booking
                        Platform
                      </h4>
                    </div>
                    <div className="tour-box-description">
                      <p>
                        Far far away, behind the word mountains, far from the
                        countries Vokalia and Consonantia, there live the blind
                        texts. Separated they live in Bookmarksgrove.
                      </p>
                    </div>
                    <div className="tour-info-box">
                      <div className="row">
                        <div className="col-6">
                          <div className="tour-info">
                            <div className="tour-info-icon">
                              <i>
                                <FaClock />
                              </i>
                            </div>
                            <div className="tour-info-content">
                              <h5 className="h6-title">Duration</h5>
                              <p>1 days 8 hours</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="tour-info">
                            <div className="tour-info-icon">
                              <i>
                                <FaUserFriends />
                              </i>
                            </div>
                            <div className="tour-info-content">
                              <h5 className="h6-title">Group Size</h5>
                              <p>50+ People</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tour-box-bottom">
                      <div className="tour-price">
                        <h3 className="h3-title">$750</h3>
                      </div>
                      <div className="book-now-button">
                        {/* <a href={`/tour/${tour._id}`} className="btn">Book Now</a> */}
                        <a href="" className="btn">
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="tour-box">
                  <div
                    className="tour-box-image back-image"
                    style={tourBoxStyle3}
                  ></div>
                  <div className="tour-box-content">
                    <div className="tour-box-label">
                      <div className="tour-box-inner-label">
                        <h4 className="h4-title">Switzerland</h4>
                      </div>
                    </div>
                    <div className="tour-box-title">
                      <h4 className="h4-title">
                        Holiday Planner is a World Leading Online Tour Booking
                        Platform
                      </h4>
                    </div>
                    <div className="tour-box-description">
                      <p>
                        Far far away, behind the word mountains, far from the
                        countries Vokalia and Consonantia, there live the blind
                        texts. Separated they live in Bookmarksgrove.
                      </p>
                    </div>
                    <div className="tour-info-box">
                      <div className="row">
                        <div className="col-6">
                          <div className="tour-info">
                            <div className="tour-info-icon">
                              <i>
                                <FaClock />
                              </i>
                            </div>
                            <div className="tour-info-content">
                              <h5 className="h6-title">Duration</h5>
                              <p>7 days 8 hours</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="tour-info">
                            <div className="tour-info-icon">
                              <i>
                                <FaUserFriends />
                              </i>
                            </div>
                            <div className="tour-info-content">
                              <h5 className="h6-title">Group Size</h5>
                              <p>50+ People</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tour-box-bottom">
                      <div className="tour-price">
                        <h3 className="h3-title">$750</h3>
                      </div>
                      <div className="book-now-button">
                        {/* <a href={`/tour/${tour._id}`} className="btn">Book Now</a> */}
                        <a href="" className="btn">
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </main>
  );
}

export default home;
