import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { createCourseApi, editCourseApi, getCourseApi } from "../api";
import "./Form.scss";
import { BsDot } from "react-icons/bs";
import { errorAtom, infoAtom, successAtom } from "../../../app/atoms";
import { useAtom } from "jotai";
import { FormLoader } from "../../../components";

const Form = () => {
  // component tools
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);

  // atoms
  const [infoMsg, setInfoMsg] = useAtom(infoAtom);
  const [success, setSuccess] = useAtom(successAtom);
  const [error, setError] = useAtom(errorAtom);

  // form faviables
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [info, setInfo] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        if (courseId) {
          setLoading(true);
          const data = await getCourseApi(courseId, controller);

          setName(data?.name || "");
          setPrice(data?.price || "");
          setInfo(data?.info || "");

          setLoading(false);
        }
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

    return () => controller.abort();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const controller = new AbortController();

    try {
      if (courseId) {
        const message = await editCourseApi(
          { name, price, info },
          courseId,
          controller
        );

        if (message) {
          setTimeout(() => {
            setInfoMsg("");
          }, 5000);
          setInfoMsg(message);
        }
      } else {
        const message = await createCourseApi(
          { name, price, info },
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
      navigate(-1);
    } catch (e) {
      if (e.response) {
        setTimeout(() => {
          setError("");
        }, 5000);
        setError(e?.response?.data?.error || errorMessage);
      }
      setLoading(false);
    }

    controller.abort();
  };

  return (
    <div className="course_form">
      <div className="form_head">
        <div className="head_content">
          <h1 className="list_title">Kurs formasi</h1>
          <ul className="head_links">
            <li>
              <NavLink to={`/dashboard`}>Dashboard</NavLink>
            </li>
            <li className="link_spot">
              <BsDot />
            </li>
            <li>
              <NavLink to={`/course/list`}>Kurslar ro'yxati</NavLink>
            </li>
            <li className="link_spot">
              <BsDot />
            </li>
            <li>
              {courseId ? (
                <NavLink to={`/course/${courseId}/edit`}>
                  Kursni o'zgartirish
                </NavLink>
              ) : (
                <NavLink to={`/course/new`}>Yangi kurs</NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="form_box">
        <form onSubmit={submitHandler}>
          <div className="input_form">
            <label htmlFor="courseName">Kurs nomi:</label>
            <input
              type="text"
              id="courseName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Kurs nomi"
              disabled={loading}
            />
          </div>
          <div className="input_form">
            <label htmlFor="price">Narxi:</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Narxi"
              disabled={loading}
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
              value={courseId ? "O`zgartirish" : "Qo`shish"}
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
