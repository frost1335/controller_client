import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createCourseApi, editCourseApi, getCourseApi } from "../api";
import "./Form.scss";

const Form = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [group, setGroup] = useState("");
  const [price, setPrice] = useState("");
  const [info, setInfo] = useState("");
  const { courseId } = useParams();

  useEffect(() => {
    if (courseId) {
      setLoading(true);
      const fetchData = async () => {
        try {
          const data = await getCourseApi(courseId);

          setName(data?.name || "");
          setGroup(data?.group || "");
          setPrice(data?.price || "");
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
      if (courseId) {
        await editCourseApi({ name, group, price, info }, courseId);
      } else {
        await createCourseApi({ name, group, price, info });
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
    clear();
    navigate("/courses");
  };

  const clear = () => {
    setName("");
    setGroup("");
    setPrice("");
    setInfo("");
  };

  return (
    <div className="course_form">
      <div className="form_head">
        <h1>{courseId ? "Kurs o`zgartirish" : "Kurs qo`shish"}</h1>
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
              value={group}
              onChange={(e) => setGroup(e.target.value)}
              placeholder="Guruh"
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
