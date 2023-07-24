import React, { useEffect, useState } from "react";
import "./Form.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { BsDot } from "react-icons/bs";
import { errorAtom, infoAtom, successAtom } from "../../../app/atoms";
import { useAtom } from "jotai";
import ReactInputMask from "react-input-mask";
import { createUser } from "../api";

const Form = () => {
  // component helpers
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // atoms
  const [infoMsg, setInfoMsg] = useAtom(infoAtom);
  const [success, setSuccess] = useAtom(successAtom);
  const [error, setError] = useAtom(errorAtom);

  // form variables
  const [name, setName] = useState({
    first: "",
    last: "",
  });
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const controller = new AbortController();

    try {
      const message = await createUser({ name, phone, password }, controller);

      if (message) {
        setTimeout(() => {
          setSuccess("");
        }, 5000);
        setSuccess(message);
      }

      setError("");
      setLoading(false);
    } catch (e) {
      if (e.response) {
        setTimeout(() => {
          setError("");
        }, 5000);
        setError(e?.response?.data?.error || errorMessage);
      }
    }

    controller.abort();
    navigate(-1);
  };

  return (
    <div className="user_form">
      <div className="form_head">
        <div className="head_content">
          <h1 className="list_title">Yangi foydalanuvchi</h1>
          <ul className="head_links">
            <li>
              <NavLink to={`/dashboard`}>Dashboard</NavLink>
            </li>
            <li className="link_spot">
              <BsDot />
            </li>
            <li>
              <NavLink to={`/user/list`}>Foydalanuvchilar ro'yxati</NavLink>
            </li>
            <li className="link_spot">
              <BsDot />
            </li>
            <li>
              <NavLink to={`/user/new`}>Yangi o'qituvchi</NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="form_box">
        <form onSubmit={submitHandler}>
          <div className="input_form">
            <label htmlFor="firstName">Ism:</label>
            <input
              type="text"
              id="firstName"
              value={name.first}
              onChange={(e) => setName({ ...name, first: e.target.value })}
              placeholder="Ism"
              disabled={loading}
            />
          </div>
          <div className="input_form">
            <label htmlFor="lastName">Familiya:</label>
            <input
              type="text"
              id="lastName"
              value={name.last}
              onChange={(e) => setName({ ...name, last: e.target.value })}
              placeholder="Familiya"
              disabled={loading}
            />
          </div>
          <div className="input_form">
            <label htmlFor="phone">Tel. raqam:</label>
            <ReactInputMask
              mask={`+999(99)-999-99-99`}
              value={phone}
              id="phone"
              maskChar={null}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Tel. raqam"
              disabled={loading}
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
              disabled={loading}
              minLength={6}
              required
            />
          </div>
          <div className="submit_form">
            <input disabled={loading} type="submit" value={"Yaratish"} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
