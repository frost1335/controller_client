import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createStudentApi, editStudentApi, getStudentApi } from "../api";
import "./Form.scss";

const Form = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { studentId } = useParams();

  useEffect(() => {
    if (studentId) {
      setLoading(true);
      const fetchData = async () => {
        try {
          const data = await getStudentApi(studentId);

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
      if (studentId) {
        await editStudentApi({ name, phone }, studentId);
      } else {
        await createStudentApi({ name, phone });
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
        <h1>{studentId ? "Student o`zgartirish" : "Student qo`shish"}</h1>
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
              value={studentId ? "O`zgartirish" : "Qo`shish"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
