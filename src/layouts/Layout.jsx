import React, { useEffect, useRef, useState } from "react";
import "./Layout.scss";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { HiBars3CenterLeft } from "react-icons/hi2";
import { GrClose } from "react-icons/gr";
import { BsSearch } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { TbHexagonLetterM } from "react-icons/tb";
import {
  MdAccountBox,
  MdCheckCircle,
  MdHistory,
  MdInfo,
  MdLayers,
  MdLogout,
  MdMenuBook,
  MdOutlineChecklist,
  MdPerson,
  MdSchool,
  MdSupervisedUserCircle,
  MdWarning,
} from "react-icons/md";
import { useAtom } from "jotai";
import {
  errorAtom,
  infoAtom,
  successAtom,
  user,
  warningAtom,
} from "../app/atoms";
import { GlobalLoader, Payments, Search } from "../components";
import { getAuthUser } from "../features/Users/api";

const Layout = () => {
  // component helpers
  const dialog = useRef(null);

  const [loader, setLoader] = useState(true);
  const [links, setLinks] = useState([
    {
      path: "/customer/list",
      text: "Mijozlar",
      icon: <MdAccountBox />,
    },
    {
      path: "/student/list",
      text: "O'quvchilar",
      icon: <MdSchool />,
    },
    {
      path: "/teacher/list",
      text: "O`qituvchilar",
      icon: <MdPerson />,
    },
    {
      path: "/group/list",
      text: "Guruhlar",
      icon: <MdLayers />,
    },
    {
      path: "/attendance/list",
      text: "Yo'qlamalar",
      icon: <MdOutlineChecklist />,
    },
    {
      path: "/course/list",
      text: "Kurslar",
      icon: <MdMenuBook />,
    },
    {
      path: "/user/list",
      text: "Foydalanuvchilar",
      icon: <MdSupervisedUserCircle />,
    },
  ]);
  const [paySidebar, setPaySidebar] = useState(false);
  const navigate = useNavigate();

  // search utils

  const [sidebar, setSidebar] = useState(false);

  // atom values
  const [info, setInfo] = useAtom(infoAtom);
  const [success, setSuccess] = useAtom(successAtom);
  const [warning, setWarning] = useAtom(warningAtom);
  const [error, setError] = useAtom(errorAtom);
  const [authUser, setAuthUser] = useAtom(user);

  // alert variable
  const [alert, setAlert] = useState({
    status: "",
    message: "",
    icon: "",
  });

  useEffect(() => {
    setLoader(true);
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const data = await getAuthUser(controller);

        if (!data?.owner === true) {
          let newLinks = [...links];
          newLinks.pop(1);
          setLinks([...newLinks]);
        }

        setAuthUser(data);
        setLoader(false);
      } catch (e) {
        if (e.response) {
          setTimeout(() => {
            setError("");
          }, 5000);
          setError(e?.response?.data?.error || errorMessage);
          setLoader(false);
          setAuthUser(null);
          localStorage.setItem("authToken", null);
          navigate("/auth/login");
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (info) {
      setAlert({
        status: "info",
        message: info,
        icon: <MdInfo />,
      });
    } else if (success) {
      setAlert({
        status: "success",
        message: success,
        icon: <MdCheckCircle />,
      });
    } else if (warning) {
      setAlert({
        status: "warning",
        message: warning,
        icon: <MdWarning />,
      });
    } else if (error) {
      setAlert({
        status: "error",
        message: error,
        icon: <MdInfo />,
      });
    } else {
      setAlert({
        status: "",
        message: "",
        icon: "",
      });
    }
  }, [info, success, warning, error]);

  const closeAlert = () => {
    setAlert({
      status: "",
      message: "",
      icon: "",
    });
    setInfo("");
    setSuccess("");
    setWarning("");
    setError("");
  };

  const logoutHandler = () => {
    localStorage.setItem("authToken", null);
    navigate("/auth/login");
  };

  return loader ? (
    <GlobalLoader />
  ) : (
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
              <div className="logo">
                <Link to={"/dashboard"} onClick={() => setSidebar(() => false)}>
                  <span>
                    <TbHexagonLetterM />
                  </span>
                  aximal
                </Link>
              </div>
            </li>
            {links.map((link, index) => (
              <li key={index + "-link"} onClick={() => setSidebar(() => false)}>
                <NavLink to={link.path}>
                  <span>{link.icon}</span>
                  {link.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="layout_container">
          <div className="sidebar">
            <ul>
              <li>
                <div className="logo">
                  <Link to={"/dashboard"}>
                    <span>
                      <TbHexagonLetterM />
                    </span>
                    aximal
                  </Link>
                </div>
              </li>
              {links.map((link, index) => (
                <li key={index + "-link"}>
                  <NavLink to={link.path}>
                    <span>{link.icon}</span>
                    {link.text}
                  </NavLink>
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
                <button onClick={() => dialog?.current?.showModal()}>
                  <BsSearch />
                </button>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  className="payment_history"
                  onClick={() => setPaySidebar(true)}
                >
                  <span>
                    <MdHistory />
                  </span>
                </div>
                <div className="account">
                  <button className="user_icon">
                    {authUser?.name?.first[0] + authUser?.name?.last[0]}
                    <div className="account_dropdown">
                      <ul>
                        <li>
                          <pre>
                            <span>
                              <MdPerson />
                            </span>{" "}
                            {Object.values(authUser?.name || "").join(" ")}
                          </pre>
                        </li>
                        <li onClick={logoutHandler}>
                          <span>
                            <MdLogout />
                          </span>{" "}
                          Chiqish
                        </li>
                      </ul>
                    </div>
                  </button>
                </div>
              </div>
            </nav>
            <main>
              <Outlet />
            </main>
          </div>
        </div>
      </div>

      <Search dialog={dialog} />
      <Payments open={paySidebar} setOpen={setPaySidebar} />

      <div
        className={`message_alert ${
          alert.status && alert.message ? `${alert.status} open` : null
        }`}
      >
        <div className="alert_icon">{alert.icon || <MdInfo />}</div>
        <p className="alert_message">{alert.message}</p>
        <div className="alert_close" onClick={closeAlert}>
          <RxCross1 />
        </div>
      </div>
    </>
  );
};

export default Layout;
