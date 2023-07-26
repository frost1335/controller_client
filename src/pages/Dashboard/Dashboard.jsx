import React from "react";
import { dashboardDraw } from "../../assets/images";

import "./Dashboard.scss";
import { user } from "../../app/atoms";
import { useAtom } from "jotai";

const Dashboard = () => {
  const [currentUser] = useAtom(user);

  return (
    <div className="dashboard">
      <main className="dashboard_body">
        <h1 className="dashboard_title">Dashboard</h1>
        <p className="dashboard_greeting">
          Tizimga Xush Kelibsiz{" "}
          <span>{Object.values(currentUser.name || "").join(" ")}</span>👋
        </p>
        <div className="dashboard_text">
          <img src={dashboardDraw} alt="dashboard-draw" />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
