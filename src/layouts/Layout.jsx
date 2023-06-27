import React, { useState } from "react";
import "./Layout.scss";
import { NavLink, Outlet } from "react-router-dom";
import { HiBars3CenterLeft } from "react-icons/hi2";
import { GrClose } from "react-icons/gr";

const links = [
  {
    path: "/lids",
    text: "Lidlar",
  },
  {
    path: "/students",
    text: "Studentlar",
  },
  {
    path: "/teachers",
    text: "O`qituvchilar",
  },
  {
    path: "/groups",
    text: "Guruhlar",
  },
];

const Layout = () => {
  const [sidebar, setSidebar] = useState(false);

  return (
    <div className="layout">
      <div className={`${sidebar ? "open" : ""} mobile_sidebar`}>
        <div className="close_icon">
          <button onClick={() => setSidebar(() => false)}>
            <GrClose />
          </button>
        </div>
        <ul>
          <li>
            <div className="logo">Work Fly</div>
          </li>
          {links.map((link, index) => (
            <li key={index + "-link"} onClick={() => setSidebar(() => false)}>
              <NavLink to={link.path}>{link.text}</NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="layout_container">
        <div className="sidebar">
          <ul>
            <li>
              <div className="logo">Work Fly</div>
            </li>
            {links.map((link, index) => (
              <li key={index + "-link"}>
                <NavLink to={link.path}>{link.text}</NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="layout_content">
          <nav>
            <div
              className="sidebar_icon"
              onClick={() => setSidebar(() => true)}
            >
              <HiBars3CenterLeft />
            </div>
            <div className="search">
              <input type="text" placeholder="Studentlarni qidirish" />
            </div>
            <div className="account">
              <div className="user_icon">RD</div>
            </div>
          </nav>
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
