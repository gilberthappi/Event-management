import React from "react";
import { BsGrid } from "react-icons/bs";
import { FaAngleRight, FaCalendarCheck, FaUsers, FaCalendarPlus, FaGem, FaHome } from "react-icons/fa";
import logoImg from "../assets/logo.png";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

function DashboardNav() {
  const { isLoggedIn, logout, userToken } = useAuth();
  return (
    <header className="dashboard-nav">
      <div className="container">
        <div className="row">
          <div className="logo-image">
            <a href="/"><img src={logoImg} alt="" /></a>
          </div>
          <div className="dashboard-nav-title">
            <h3 className="nav-title">main menu</h3>
          </div>
          <div className="dashboard-navlink-wp">
           
          <div className="dashboard-navlink">
              <Link to="/">
                <FaHome /> <span>Home</span> <FaAngleRight />
              </Link>
            </div>
            <div className="dashboard-navlink">
              <Link to="/dashboard">
                <BsGrid /> <span>dashboard</span> <FaAngleRight />
              </Link>
            </div>
            <div className="dashboard-navlink">
              <Link to="/event">
                <FaCalendarPlus /> <span>Event</span> <FaAngleRight />
              </Link>
            </div>
            <div className="dashboard-navlink">
              <Link to="/bookings">
                <FaCalendarCheck /> <span>bookings</span> <FaAngleRight />
              </Link>
            </div>
            <div className="dashboard-navlink">
              <Link to="/users"> 
                <FaUsers /> <span>users</span> <FaAngleRight />
              </Link>
            </div>
          </div>
          <div className="navlog" >
            <a href="/login" onClick={logout}>
              <BiLogOut /> <span>Logout</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default DashboardNav;