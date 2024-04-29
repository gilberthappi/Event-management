import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  BsArrowRightShort,
} from "react-icons/bs";

import { BiTimer, BiCreditCard, BiSlider } from "react-icons/bi";
import {
  FaUmbrellaBeach,
  FaGem,
  FaUsers,
} from "react-icons/fa";
import {
  MdOutlineLightMode,
} from "react-icons/md";

import dbBg from "../assets/dashboard-div-bg.png";
import friend1 from "../assets/event1.jpeg";


import "../style/dashboard.css";

function Dashboard() {
  const [numUsers, setNumUsers] = useState(0);
  const [numberOfEvents, setNumberOfEvents] = useState(null);

  useEffect(() => {
    axios
      .get("https://event-management-api-svlr.onrender.com/api/v1/auth/users")
      .then((response) => {
        setNumUsers(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching number of users: ", error);
      });

    axios
      .get("https://event-management-api-svlr.onrender.com/api/v1/event/all")
      .then((response) => {
        setNumberOfEvents(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching number of events: ", error);
      });
  }, []);

  const [time, setTime] = useState({ hours: 16, minutes: 16, seconds: 30 });

  useEffect(() => {
    const interval = setInterval(() => {
      if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
        clearInterval(interval);
      } else {
        const newTime = { ...time };
        if (newTime.seconds > 0) {
          newTime.seconds -= 1;
        } else {
          if (newTime.minutes > 0) {
            newTime.minutes -= 1;
            newTime.seconds = 59;
          } else {
            newTime.hours -= 1;
            newTime.minutes = 59;
            newTime.seconds = 59;
          }
        }
        setTime(newTime);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  const formatTime = (time) => {
    const hoursStr = String(time.hours).padStart(2, "0");
    const minutesStr = String(time.minutes).padStart(2, "0");
    const secondsStr = String(time.seconds).padStart(2, "0");
    return `${hoursStr}:${minutesStr}:${secondsStr}`;
  };

  useEffect(() => {
    const canvas = document.getElementById("yourCanvasElement");

    if (canvas) {
      const chartInstance = new Chart(canvas, {
        type: "bar",
        data: {
          labels: ["January", "February", "March", "April", "May"],
          datasets: [
            {
              label: "Total expected events",
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
              data: [88, 66, 33, 55, 99],
            },
            {
              label: "Events done (occurred)",
              backgroundColor: "rgba(255, 99, 132, 0.6)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
              data: [32, 45, 25, 18, 36],
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      return () => {
        chartInstance.destroy();
      };
    }
  }, []);

  return (
    <main className="dashboard">
      <div className="main-content" style={{ marginLeft: "250px" }}>
        <div className="container">
          <div className="header-nav">
            <div className="row">
              <div className="user-greeting">
                <h3 className="h3-title">
                  Hello, <span className="username">Happi</span>
                </h3>
              </div>
              <div className="row right-header-nav">
                <div className="setting">
                  <span className="settings" style={{ color: "#924aef" }}>
                    <BiSlider />
                  </span>
                </div>
                <div className="theme" style={{ color: "#a5a5a5" }}>
                  <span className="light-them">
                    <MdOutlineLightMode />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="dashboard-content">
            <div className="row">
              <div className="middle-content">
                <div className="row">
                  <div className="booking-content">
                    <img src={dbBg} alt="Booking" />
                    <div className="booking-content-data">
                      <div className="upper-content-data">
                        <div className="row">
                          <div className="text1">
                            <h5 className="h5-title">Number of Users</h5>
                            <span className="booking-value">
                              {numUsers || "Loading .."}
                            </span>
                          </div>
                          <div className="side-icon">
                            <FaUsers style={{ color: "#a5a5a5" }} />
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="lower-content-data">
                        <a href="/">
                          see more <BsArrowRightShort />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="expense-content">
                    <img src={dbBg} alt="Expense" />
                    <div className="expense-content-data">
                      <div className="upper-content-data">
                        <div className="row">
                          <div className="text1">
                            <h5 className="h5-title">Total Events</h5>
                            <span className="expense-value">
                              {numberOfEvents || "Loading .."}
                            </span>
                          </div>
                          <div className="side-icon">
                            <FaUmbrellaBeach style={{ color: "#a5a5a5" }} />
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="lower-content-data">
                      <Link to="/event">
                          see more <BsArrowRightShort />
                      </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="payment-history">
                    <div className="container">
                      <div className="chart-container">
                        <canvas id="yourCanvasElement"></canvas>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              <div className="side-content">
                <div className="side-content-row">
                  <div className="friend">
                    <div className="container">
                      <div className="sec-title">
                        <h4 className="h4-title">Most Booked Event</h4>
                      </div>
                      <div className="friend-list">
                        <div className="friend-box">
                          <a href="/dashboard">
                            <div className="row">
                              <div className="friend-img">
                                <img src={friend1} />
                              </div>
                              <div className="friend-id">
                                <h6 className="h6-title">Junior Tech</h6>
                                <p>Kigali kv - Rwanda</p>
                              </div>
                              <div className="chat-icon">
                                <FaGem />
                              </div>
                            </div>
                          </a>
                        </div>
                        <div className="friend-box">
                          <a href="/dashboard">
                            <div className="row">
                              <div className="friend-img">
                                <img src={friend1} />
                              </div>
                              <div className="friend-id">
                                <h6 className="h6-title">Senior Tech</h6>
                                <p>Kampala - Uganda</p>
                              </div>
                              <div className="chat-icon">
                                <FaGem />
                              </div>
                            </div>
                          </a>
                        </div>
                        <div className="friend-box">
                          <a href="/dashboard">
                            <div className="row">
                              <div className="friend-img">
                                <img src={friend1} />
                              </div>
                              <div className="friend-id">
                                <h6 className="h6-title">Senior Tech</h6>
                                <p>Kampala - Uganda</p>
                              </div>
                              <div className="chat-icon">
                                <FaGem />
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="dashboard-cta-sec"
                    style={{ background: "#676767", marginTop: "15px" }}
                  >
                    <div className="container">
                      <div className="row time-rem" style={{ opacity: ".8" }}>
                        <p>
                          <BiTimer /> <span>Remaining time to buy:</span>
                        </p>
                        <span className="dash-btn">{formatTime(time)}</span>
                      </div>
                      <div className="row ship-country">
                        <div>
                       <center> <b><p>Peace Building Event</p></b></center>  
                        </div>
                      </div>
                      <div className="row user-card">
                        <h5 className="h5-title">
                          <FaUsers style={{ fontSize: "23px" }} />{" "}
                          <span>2 Seats</span>
                        </h5>
                        <span className="dash-btn">
                          <BiCreditCard
                            style={{
                              fontSize: "23px",
                              fontWeight: "100px",
                              marginRight: "5px",
                            }}
                          />{" "}
                          <span>$400</span>
                        </span>
                      </div>
                      <div className="btn dashboardbtn">go to Event</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;