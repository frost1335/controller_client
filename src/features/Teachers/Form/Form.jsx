import React, { useEffect, useState } from "react";
import "./Form.scss";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { editTeacherApi, getTeacherApi, createTeacherApi } from "../api";
import { BsDot } from "react-icons/bs";
import { errorAtom, infoAtom, successAtom } from "../../../app/atoms";
import { useAtom } from "jotai";
import ReactInputMask from "react-input-mask";
import { FormLoader } from "../../../components";

const Form = () => {
  // component helpers
  const navigate = useNavigate();
  const { teacherId } = useParams();
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
  const [info, setInfo] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    if (teacherId) {
      setLoading(true);
      const fetchData = async () => {
        try {
          const data = await getTeacherApi(teacherId, controller);

          setName(
            data?.name || {
              first: "",
              last: "",
            }
          );
          setPhone(data?.phone || "");
          setInfo(data?.info || "");

          setLoading(false);
        } catch (e) {
          if (e.response) {
            setTimeout(() => {
              setError("");
            }, 5000);
            setError(e?.response?.data?.error || errorMessage);
            setLoading(false);
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
      if (teacherId) {
        const message = await editTeacherApi(
          { name, phone, info },
          teacherId,
          controller
        );

        if (message) {
          setTimeout(() => {
            setInfoMsg("");
          }, 5000);
          setInfoMsg(message);
        }
      } else {
        const message = await createTeacherApi(
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

      setLoading(false);
    } catch (e) {
      if (e.response) {
        setTimeout(() => {
          setError("");
        }, 5000);
        setError(e?.response?.data?.error || errorMessage);
        setLoading(false);
      }
    }

    controller.abort();
    navigate(-1);
  };

  return (
    <div className="teacher_form">
      <div className="form_head">
        <div className="head_content">
          <h1 className="list_title">
            {teacherId ? "O'qituvchi o`zgartirish" : "Yangi o'qituvchi"}
          </h1>
          <ul className="head_links">
            <li>
              <NavLink to={`/dashboard`}>Dashboard</NavLink>
            </li>
            <li className="link_spot">
              <BsDot />
            </li>
            <li>
              <NavLink to={`/teacher/list`}>O'qituvchilar ro'yxati</NavLink>
            </li>
            <li className="link_spot">
              <BsDot />
            </li>
            <li>
              {teacherId ? (
                <NavLink to={`/teacher/${teacherId}/edit`}>
                  O'qituvchini o'zgartirish
                </NavLink>
              ) : (
                <NavLink to={`/teacher/new`}>Yangi o'qituvchi</NavLink>
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
              maxLength={22}
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
              placeholder="Familiya"
              disabled={loading}
              maxLength={22}
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
              maxLength={25}
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
              maxLength={160}
              rows={5}
            />
          </div>
          <div className="submit_form">
            <input
              disabled={loading}
              type="submit"
              value={teacherId ? "O`zgartirish" : "Qo`shish"}
            />
            {loading ? (
              <span>
                <FormLoader />
              </span>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
