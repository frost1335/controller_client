import React, { Suspense, useEffect, useRef, useState } from "react";
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
import Modal from "../components/Modal/Modal";
import { searchStudents } from "../api";
import Loader from "../components/Loader/Loader";
import parse from "html-react-parser";
import { useAtom } from "jotai";
import {
  errorAtom,
  infoAtom,
  successAtom,
  user,
  warningAtom,
} from "../app/atoms";
import { GlobalLoader } from "../components";
import { getAuthUser } from "../features/Users/api";

const getExactText = (text, search) => {
  let first = text.trim().toLowerCase().indexOf(search.trim().toLowerCase());

  let second = first + search.length;

  return text.trim().substring(first, second);
};

const markAreas = (arr, search) => {
  const re = new RegExp(search, "gi");

  if (arr.length && search) {
    return arr.map((item) => {
      let firstName = item.name.first;
      let lastName = item.name.last;
      let phone = item.phone;
      let info = item.info;

      let firstText = getExactText(firstName, search);
      let lastText = getExactText(lastName, search);
      let phoneText = getExactText(phone, search);
      let infoText = getExactText(info, search);

      let newFirstName = firstName.replace(re, `<mark>${firstText}</mark>`);
      let newLastName = lastName.replace(re, `<mark>${lastText}</mark>`);
      let newPhone = phone.replace(re, `<mark>${phoneText}</mark>`);
      let newInfo = info.replace(re, `<mark>${infoText}</mark>`);

      return {
        name: {
          first: newFirstName,
          last: newLastName,
        },
        phone: newPhone,
        info: newInfo,
        _id: item._id,
      };
    });
  } else {
    return [];
  }
};

const Layout = () => {
  // component helpers
  const dialog = useRef(null);
  const [loading, setLoading] = useState(false);
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
  const navigate = useNavigate();

  // search utils
  const [search, setSearch] = useState("");
  const [sidebar, setSidebar] = useState(false);
  const [searchData, setSearchData] = useState("");

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
        setError("");
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

  const onSearch = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = await searchStudents(search);

      const students = markAreas(data?.students, search);
      const teachers = markAreas(data?.teachers, search);

      setSearchData({ students, teachers });
      setLoading(false);
    } catch (e) {
      if (e.response) {
        setTimeout(() => {
          setError("");
        }, 5000);
        setError(e?.response?.data?.error || errorMessage);
      }
      setLoading(false);
    }
  };

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

  const onClose = () => {
    setSearch("");
    setSearchData("");
    dialog?.current?.close();
  };

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
            </nav>
            <main>
              <Outlet />
            </main>
          </div>
        </div>
      </div>

      <Modal dialog={dialog} onClose={onClose}>
        <div className="search_content">
          <div className="content_head">
            <form onSubmit={onSearch} className="head_input">
              <span>
                <BsSearch />
              </span>
              <input
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                type="text"
                placeholder="Qidirish..."
              />
              <button disabled={!search} type="submit">
                Qidirish
              </button>
            </form>
          </div>
          <div className="content_body">
            {loading ? (
              <Loader />
            ) : searchData?.teachers?.length || searchData?.students?.length ? (
              <div className="search_list">
                {searchData?.students.length ? (
                  <>
                    <h3>O'quvchilar:</h3>
                    <ul>
                      {searchData?.students.map((student, index) => (
                        <Link
                          key={index}
                          onClick={onClose}
                          to={`/student/detail/${student?._id}`}
                        >
                          <li>
                            <div className="item_head">
                              <span>
                                {parse(Object.values(student?.name).join(" "))}
                              </span>
                              <h5>{parse(student?.phone)}</h5>
                            </div>
                            <p>{parse(student?.info)}</p>
                          </li>
                        </Link>
                      ))}
                    </ul>
                  </>
                ) : null}
                {searchData?.teachers.length ? (
                  <>
                    <h3>O'qituvchilar:</h3>
                    <ul>
                      {searchData?.teachers.map((teacher, index) => (
                        <Link
                          onClick={onClose}
                          to={`/teacher/detail/${teacher?._id}`}
                          key={index}
                        >
                          <li>
                            <div className="item_head">
                              <span>
                                {parse(Object.values(teacher?.name).join(" "))}
                              </span>
                              <h5>{parse(teacher?.phone)}</h5>
                            </div>
                            <p>{parse(teacher?.info)}</p>
                          </li>
                        </Link>
                      ))}
                    </ul>
                  </>
                ) : null}
              </div>
            ) : (
              <div className="empty_body">
                <div className="empty_box">
                  <h2>Hech narsa toplimadi</h2>
                  <h4>Qidiruv bo'limlari:</h4>
                  <ul>
                    <li>
                      <Link onClick={onClose} to={"/student/list"}>
                        O'quvchilar
                      </Link>
                    </li>
                    <li>
                      <Link onClick={onClose} to={"/student/list"}>
                        O'qituvchilar
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>

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
