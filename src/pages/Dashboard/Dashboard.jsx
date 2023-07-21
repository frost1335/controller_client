import React from "react";
import { dashboardDraw } from "../../assets/images";

import "./Dashboard.scss";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <main className="dashboard_body">
        <h1 className="dashboard_title">Dashboard</h1>
        <div className="dashboard_text">
          <img src={dashboardDraw} alt="dashboard-draw" />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
