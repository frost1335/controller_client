import React, { useState } from "react";
import "./Layout.scss";
import { NavLink, Outlet } from "react-router-dom";
import { HiBars3CenterLeft } from "react-icons/hi2";
import { GrClose } from "react-icons/gr";
import { BsSearch } from "react-icons/bs";
import Modal from "../components/Modal/Modal";

const links = [
  {
    path: "/customer/list",
    text: "Mijozlar",
  },
  {
    path: "/student/list",
    text: "O'quvchilar",
  },
  {
    path: "/teacher/list",
    text: "O`qituvchilar",
  },
  {
    path: "/group/list",
    text: "Guruhlar",
  },
  {
    path: "/course/list",
    text: "Kurslar",
  },
];

const Layout = () => {
  const [sidebar, setSidebar] = useState(false);

  return (
    <>
      <div className="layout">
        <div
          onClick={() => setSidebar(false)}
          className={`${sidebar ? "open" : ""} sidebar_bg`}
        />

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
                <button>
                  <BsSearch />
                </button>
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

      <Modal>
        <div className="search_content">
          <div className="content_head">
            <div className="head_input">
              <span>
                <BsSearch />
              </span>
              <input type="text" placeholder="Qidirish..." />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Layout;
