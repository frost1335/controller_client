import React, { useEffect, useState } from "react";
import "./Form.scss";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { createCustomerApi, editCustomerApi, getCustomerApi } from "../api";
import { BsDot } from "react-icons/bs";
import { errorMessage } from "../../../constants";
import { useAtom } from "jotai";
import { errorAtom, infoAtom, successAtom } from "../../../app/atoms";
import ReactInputMask from "react-input-mask";

const Form = () => {
  // atoms
  const [infoMsg, setInfoMsg] = useAtom(infoAtom);
  const [success, setSuccess] = useAtom(successAtom);
  const [error, setError] = useAtom(errorAtom);

  // component tools
  const navigate = useNavigate();
  const { customerId } = useParams();
  const [loading, setLoading] = useState(false);

  // form variables
  const [name, setName] = useState({
    first: "",
    last: "",
  });
  const [phone, setPhone] = useState("");
  const [info, setInfo] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    if (customerId) {
      setLoading(true);
      const fetchData = async () => {
        try {
          const data = await getCustomerApi(customerId, controller);

          setName(
            data?.name || {
              first: "",
              last: "",
            }
          );
          setPhone(data?.phone || "");
          setInfo(data?.info || "");

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
      };

      fetchData();
    }

    return () => controller.abort();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const controller = new AbortController();

    try {
      if (customerId) {
        const message = await editCustomerApi(
          { name, phone, info },
          customerId,
          controller
        );

        if (message) {
          setTimeout(() => {
            setInfoMsg("");
          }, 5000);
          setInfoMsg(message);
        }
      } else {
        const message = await createCustomerApi(
          { name, phone, info },
          controller
        );

        if (message) {
          setTimeout(() => {
            setSuccess("");
          }, 5000);
          setSuccess(message);
        }
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
    navigate("/customer/list");
  };

  return (
    <div className="customer_form">
      <div className="form_head">
        <div className="head_content">
          <h1 className="list_title">Mijoz formasi</h1>
          <ul className="head_links">
            <li>
              <NavLink to={`/dashboard`}>Dashboard</NavLink>
            </li>
            <li className="link_spot">
              <BsDot />
            </li>
            <li>
              <NavLink to={`/customer/list`}>Mijozlar ro'yxati</NavLink>
            </li>
            <li className="link_spot">
              <BsDot />
            </li>
            <li>
              {customerId ? (
                <NavLink to={`/customer/${customerId}/edit`}>
                  Mijozni o'zgartirish
                </NavLink>
              ) : (
                <NavLink to={`/customer/new`}>Yangi mijoz</NavLink>
              )}
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
              required
            />
          </div>
          <div className="input_form">
            <label htmlFor="lastName">Familiya:</label>
            <input
              type="text"
              id="lastName"
              value={name.last}
              onChange={(e) => setName({ ...name, last: e.target.value })}
              placeholder="Familya"
              disabled={loading}
              required
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
            <label htmlFor="info">Ma'lumot:</label>
            <textarea
              type="text"
              id="info"
              value={info}
              onChange={(e) => setInfo(e.target.value)}
              placeholder="Ma'lumot"
              disabled={loading}
              rows={5}
            />
          </div>
          <div className="submit_form">
            <input
              disabled={loading}
              type="submit"
              value={customerId ? "O`zgartirish" : "Qo`shish"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
