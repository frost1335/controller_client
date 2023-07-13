import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { createCourseApi, editCourseApi, getCourseApi } from "../api";
import "./Form.scss";
import { BsDot } from "react-icons/bs";

const Form = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [info, setInfo] = useState("");
  const { courseId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (courseId) {
          setLoading(true);
          const data = await getCourseApi(courseId);

          setName(data?.name || "");
          setPrice(data?.price || "");
          setInfo(data?.info || "");
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (courseId) {
        await editCourseApi({ name, price, info }, courseId);
      } else {
        await createCourseApi({ name, price, info });
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
    navigate(-1);
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
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nomi"
              disabled={loading}
            />
          </div>
          <div className="input_form">
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Narxi"
              disabled={loading}
            />
          </div>
          <div className="input_form">
            <input
              type="text"
              value={info}
              onChange={(e) => setInfo(e.target.value)}
              placeholder="Ma'lumot"
              disabled={loading}
            />
          </div>
          <div className="submit_form">
            <input
              disabled={loading}
              type="submit"
              value={courseId ? "O`zgartirish" : "Qo`shish"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
