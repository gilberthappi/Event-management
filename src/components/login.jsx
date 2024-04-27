import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Notiflix from "notiflix";
import { useAuth } from "./AuthContext";

import { FaUserAlt, FaLock } from "react-icons/fa";
import loginBgImage from "../assets/highlight-image.jpg";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Access login function from useAuth hook

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: e.target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleLogin = () => {
    axios
      .post("https://event-management-api-svlr.onrender.com/api/v1/auth/login", formData)
      .then((response) => {
        const { access_token, USER } = response.data; // Assuming the token is returned in the response
        if (access_token) {
          Notiflix.Notify.success("LOGIN SUCCESSFULLY");
          login(access_token); // Call the login function from useAuth hook with the token
          console.log("User token:", access_token); // Log the token to the console
          navigate("/");
        } else {
          Notiflix.Notify.failure("Invalid email or password. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Login failed:", error);
        Notiflix.Notify.failure("Invalid email or password. Please try again.");
      });
  };

  
  return (
    <main className="login-page">
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-4 login-left">
              <div className="col-12">
                <div className="login-title">
                  <h2 className="h3-title">Login</h2>
                  <p>
                    Doesn't yet have an account?{" "}
                    <Link to="/signup">Create an account</Link>
                  </p>
                </div>
                <div className="col-12">
                  <label className="label-input">Email Address</label>
                  <span className="input-box no-arrow">
                    <span className="icon">
                      <i>
                        <FaUserAlt />
                      </i>
                    </span>
                    <input
                      type="text"
                      placeholder="you@example.com"
                      className="form-input"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </span>
                </div>
                <div className="col-12" style={{ marginBottom: "5px" }}>
                  <label className="label-input">Password</label>
                  <span className="input-box no-arrow">
                    <span className="icon">
                      <i>
                        <FaLock />
                      </i>
                    </span>
                    <input
                      type="password"
                      placeholder="Enter password"
                      className="form-input"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </span>
                </div>
                <div className="col-12">
                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      id="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                    />
                    <label className="check-box-label">Remember Me</label>
                  </div>
                </div>
                <div className="col-12 login-btn">
                  <button className="btn" onClick={handleLogin}>
                    Login
                  </button>
                </div>
                <div
                  className="col-12 login-line"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    margin: "10px 0",
                  }}
                ></div>
              </div>
            </div>

            <div
              className="col-8 login-right"
              style={{
                backgroundImage: `url(${loginBgImage})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              <div className="login-right-content">
                <h2 className="h2-title">Welcome to our Login Page</h2>
                <p>
                  Log in to your account to access all the amazing features and
                  services we offer.
                </p>
                <Link to="/">
                  <h3>Return to home</h3>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
