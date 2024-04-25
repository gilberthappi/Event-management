import React from "react";
import { Outlet } from "react-router-dom";
import DashboardNav from "./dashboardNav";

function dashboardLayout() {
  return (
    <>
      <DashboardNav />
      <Outlet />
    </>
  );
}

export default dashboardLayout;
