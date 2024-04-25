import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Layout from "./components/layout";
import DashboardLayout from "./components/dashboardLayout";
import Home from "./components/home";
import Login from "./components/login";
import Signup from "./components/signup";
import Dashboard from "./components/dashboard";
import Event from "./components/event";

import "./style/styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          {/* <Route path="events" element={<Event />} /> */}
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/event" element={<Event />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
