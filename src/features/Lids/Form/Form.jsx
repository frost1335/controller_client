import React, { useState } from "react";
import "./Form.scss";

const Form = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [info, setInfo] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const lid = {
      name,
      phone,
      info,
    };
    console.log(import.meta.env.BASE_URL);
    try {
      const { data } = await fetch("http://localhost:3000/api/lids", {
        method: "POST",
        body: JSON.stringify(lid),
      }).then((res) => res.json());

      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="lid_form">
      <div className="form_head">
        <h1>Lid qo'shish</h1>
      </div>
      <div className="form_box">
        <form onSubmit={submitHandler}>
          <div className="input_form">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ism"
            />
          </div>
          <div className="input_form">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Tel. raqam"
            />
          </div>
          <div className="input_form">
            <input
              type="text"
              value={info}
              onChange={(e) => setInfo(e.target.value)}
              placeholder="Ma'lumot"
            />
          </div>
          <div className="submit_form">
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
