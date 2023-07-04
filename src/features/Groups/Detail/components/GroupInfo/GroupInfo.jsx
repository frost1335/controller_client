import React from "react";
import "./GroupInfo.scss";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const GroupInfo = () => {
  return (
    <div className="student_info">
      <h2 className="student_name">Alfreds Futterkiste</h2>
      <p className="student_phone">
        O'qituvchi tel. raqami: &nbsp; <span>+998-93-189-73-18</span>
      </p>
      <p className="student_group">
        O'qituvchi kursi: &nbsp; <span>Web dasturlash</span>
      </p>
      <p className="student_teacher">
        Studentlar soni: &nbsp; <span>34</span>
      </p>
      <p className="student_teacher">
        Dars kunlari: &nbsp; <span> Sha-Yak</span>
      </p>
      <p className="student_teacher">
        Dars vaqti: &nbsp; <span> 18:00-20:00</span>
      </p>
      <div className="info_buttons">
        <button>
          <AiOutlineEdit />
        </button>
        <button>
          <AiOutlineDelete />
        </button>
      </div>
    </div>
  );
};

export default GroupInfo;
