import React, { useEffect, useState } from "react";
import "./Form.scss";
import { useNavigate, useParams } from "react-router-dom";
import { createLidApi, editLidApi, getLidApi } from "../api";

const Form = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [info, setInfo] = useState("");
  const { lidId } = useParams();

  useEffect(() => {
    if (lidId) {
      setLoading(true);
      const fetchData = async () => {
        try {
          const data = await getLidApi(lidId);

          setName(data?.name || "");
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
      if (lidId) {
        await editLidApi({ name, phone, info }, lidId);
      } else {
        await createLidApi({ name, phone, info });
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
    clear();
    navigate("/lids");
  };

  const clear = () => {
    setName("");
    setPhone("");
    setInfo("");
  };

  return (
    <div className="lid_form">
      <div className="form_head">
        <h1>{lidId ? "Lid o`zgartirish" : "Lid qo`shish"}</h1>
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
              value={lidId ? "O`zgartirish" : "Qo`shish"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
