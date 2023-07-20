import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { createStudentApi, editStudentApi, getStudentApi } from "../api";
import "./Form.scss";
import { BsDot } from "react-icons/bs";

const Form = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState({
    first: "",
    last: "",
  });
  const [phone, setPhone] = useState("");
  const [info, setInfo] = useState("");
  const { studentId } = useParams();

  useEffect(() => {
    if (studentId) {
      setLoading(true);
      const fetchData = async () => {
        try {
          const data = await getStudentApi(studentId);

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
      if (studentId) {
        await editStudentApi({ name, phone, info }, studentId);
      } else {
        await createStudentApi({ name, phone, info });
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
    navigate(-1);
  };

  return (
    <div className="student_form">
      <div className="form_head">
        <div className="head_content">
          <h1 className="list_title">O'quvchi formasi</h1>
          <ul className="head_links">
            <li>
              <NavLink to={`/dashboard`}>Dashboard</NavLink>
            </li>
            <li className="link_spot">
              <BsDot />
            </li>
            <li>
              <NavLink to={`/student/list`}>O'quvchilar ro'yxati</NavLink>
            </li>
            <li className="link_spot">
              <BsDot />
            </li>
            <li>
              {studentId ? (
                <NavLink to={`/student/${studentId}/edit`}>
                  O'quvchini o'zgartirish
                </NavLink>
              ) : (
                <NavLink to={`/student/new`}>Yangi o'quvchi</NavLink>
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
              value={name.first}
              onChange={(e) => setName({ ...name, first: e.target.value })}
              placeholder="Ism"
              disabled={loading}
              required
            />
          </div>
          <div className="input_form">
            <input
              type="text"
              value={name.last}
              onChange={(e) => setName({ ...name, last: e.target.value })}
              placeholder="Familiya"
              disabled={loading}
              required
            />
          </div>
          <div className="input_form">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Tel. raqam"
              disabled={loading}
              required
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
              value={studentId ? "O`zgartirish" : "Qo`shish"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
