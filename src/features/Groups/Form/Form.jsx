import React, { useEffect, useState } from "react";
import "./Form.scss";
import { useNavigate, useParams } from "react-router-dom";
import { getGroupApi, editGroupApi, createGroupApi } from "../api";

const Form = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [teacher, setTeacher] = useState("");
  const [days, setDays] = useState([]);
  const [time, setTime] = useState("");
  const { groupId } = useParams();

  useEffect(() => {
    if (groupId) {
      setLoading(true);
      const fetchData = async () => {
        try {
          const data = await getGroupApi(groupId);

          setName(data?.name || "");
          setCourse(data?.course || "");
          setTeacher(data?.teacher || "");
          setDays(data?.days || "");
          setTime(data?.time || "");
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
      if (groupId) {
        await editGroupApi({ name, course, teacher, days, time }, groupId);
      } else {
        await createGroupApi({ name, course, teacher, days, time });
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
    clear();
    navigate("/groups");
  };

  const clear = () => {
    setName("");
    setCourse("");
    setTeacher("");
    setDays("");
    setTime("");
  };

  return (
    <div className="group_form">
      <div className="form_head">
        <h1>{groupId ? "Guruh o`zgartirish" : "Guruh qo`shish"}</h1>
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
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              placeholder="Kurs"
              disabled={loading}
            />
          </div>
          <div className="input_form">
            <input
              type="text"
              value={teacher}
              onChange={(e) => setTeacher(e.target.value)}
              placeholder="O'qituvchi"
              disabled={loading}
            />
          </div>
          <div className="input_form">
            <input
              type="text"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              placeholder="Kunlar"
              disabled={loading}
            />
          </div>
          <div className="input_form">
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="Vaqt"
              disabled={loading}
            />
          </div>
          <div className="submit_form">
            <input
              disabled={loading}
              type="submit"
              value={groupId ? "O`zgartirish" : "Qo`shish"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
