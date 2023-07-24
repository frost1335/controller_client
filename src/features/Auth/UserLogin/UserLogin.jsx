import React, { useEffect, useState } from "react";
import { TbHexagonLetterM } from "react-icons/tb";
import "./UserLogin.scss";
import { illustration } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import ReactInputMask from "react-input-mask";
import { useAtom } from "jotai";
import {
  errorAtom,
  infoAtom,
  successAtom,
  user,
  warningAtom,
} from "../../../app/atoms";
import { authLogin, getAuthUser } from "../../Users/api";
import { MdCheckCircle, MdInfo, MdWarning } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { GlobalLoader } from "../../../components";
import { FormLoader } from "../../../components";

const UserLogin = () => {
  // component helpers
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [formLoading, setFormLoading] = useState(false);

  // data variables
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // atom values
  const [info, setInfo] = useAtom(infoAtom);
  const [success, setSuccess] = useAtom(successAtom);
  const [warning, setWarning] = useAtom(warningAtom);
  const [error, setError] = useAtom(errorAtom);
  const [authUser, setAuthUser] = useAtom(user);
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

        if (data) {
          setError("");
          navigate("/dashboard");
        }

        setAuthUser(data);
        setError("");
        setLoader(false);
      } catch (e) {
        if (e.response) {
          setLoader(false);
          setAuthUser(null);
          localStorage.setItem("authToken", null);
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, []);

  const onLoginSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    const controller = new AbortController();

    try {
      const data = await authLogin(
        {
          phone,
          password,
        },
        controller
      );

      if (data?.success) {
        localStorage.setItem("authToken", data?.accessToken);

        setTimeout(() => {
          setSuccess("");
        }, 5000);
        setSuccess(data?.message);

        setError("");
        navigate("/dashboard");
      }

      setFormLoading(false);
    } catch (e) {
      if (e.response) {
        setTimeout(() => {
          setError("");
        }, 5000);
        setError(e?.response?.data?.error || errorMessage);
        setLoader(false);
        setAuthUser(null);
        localStorage.setItem("authToken", null);
        setFormLoading(false);
      }
    }

    controller.abort();
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

  return loader ? (
    <GlobalLoader />
  ) : (
    <>
      <div className="user_login">
        <div className="login_content">
          <div className="content_head">
            <Link to={"/"} className="head_icon">
              <span>
                <TbHexagonLetterM />
              </span>
              aximal
            </Link>
          </div>
          <div className="content_body">
            <h1>Xush kelibsiz</h1>

            <div className="content_image">
              <img src={illustration} alt="login-overlay" />
            </div>
          </div>
        </div>
        <div className="login_content">
          <div className="content_head">
            <Link to={"/"} className="head_icon">
              <span>
                <TbHexagonLetterM />
              </span>
            </Link>
          </div>
          <form onSubmit={onLoginSubmit}>
            <h3>
              <span>Maximal</span>ga kirish
            </h3>

            <div className="input_list">
              <div className="input_form">
                <label htmlFor="phone">Tel. raqam:</label>
                <ReactInputMask
                  mask={`+999(99)-999-99-99`}
                  value={phone}
                  id="phone"
                  maskChar={null}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Tel. raqam"
                  required
                />
              </div>
              <div className="input_form">
                <label htmlFor="password">Parol:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Parol"
                  minLength={6}
                  required
                />
              </div>
            </div>
            <div className="submit_form">
              {formLoading ? (
                <span>
                  <FormLoader />
                </span>
              ) : (
                <input type="submit" value={"Kirish"} />
              )}
            </div>
          </form>
        </div>
      </div>
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

export default UserLogin;
