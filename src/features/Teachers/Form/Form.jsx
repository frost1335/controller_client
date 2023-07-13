import React, { useEffect, useState } from "react";
import "./Form.scss";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { editTeacherApi, getTeacherApi, createTeacherApi } from "../api";
import { BsDot } from "react-icons/bs";

const Form = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { teacherId } = useParams();

  useEffect(() => {
    if (teacherId) {
      setLoading(true);
      const fetchData = async () => {
        try {
          const data = await getTeacherApi(teacherId);

          setName(data?.name || "");
          setPhone(data?.phone || "");
          setLoading(false);
        } catch (e) {
          console.log(e);
        }
      };

      fetchData();
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (teacherId) {
        await editTeacherApi({ name, info }, teacherId);
      } else {
        await createTeacherApi({ name, info });
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
    navigate("/teachers");
  };

  return (
    <div className="teacher_form">
      <div className="form_head">
        <div className="head_content">
          <h1>{teacherId ? "O'qituvchi o`zgartirish" : "Yangi o'qituvchi"}</h1>
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
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ism"
              disabled={loading}
            />
          </div>
          <div className="input_form">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Tel. raqam"
              disabled={loading}
            />
          </div>
          <div className="submit_form">
            <input
              disabled={loading}
              type="submit"
              value={teacherId ? "O`zgartirish" : "Qo`shish"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
