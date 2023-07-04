import React from "react";

import "./TeacherInfo.scss";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const TeacherInfo = () => {
  return (
    <div className="student_info">
      <h2 className="student_name">Alfreds Futterkiste</h2>
      <p className="student_phone">
        O'qituvchi tel. raqami: &nbsp; <span>+998-93-189-73-18</span>
      </p>
      <p className="student_group">
        O'qituvchi guruhlari: &nbsp; <span>Web dasturlash</span>
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

export default TeacherInfo;
