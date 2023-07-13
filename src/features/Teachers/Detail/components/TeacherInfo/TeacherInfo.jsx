import React from "react";

import "./TeacherInfo.scss";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const TeacherInfo = ({ teacher, removeTeacher }) => {
  const navigate = useNavigate();

  return (
    <div className="teacher_info">
      <div className="info_left">
        <h2 className="teacher_name">{teacher?.name}</h2>
        <p className="teacher_phone">
          O'qituvchi tel. raqami: &nbsp; <span>{teacher?.phone}</span>
        </p>
        <div className="info_buttons">
          <button onClick={() => navigate(`/teacher/${teacher?._id}/edit`)}>
            <AiOutlineEdit />
          </button>
          <button onClick={removeTeacher}>
            <AiOutlineDelete />
          </button>
        </div>
      </div>

      <div className="info_right">
        <p>
          Guruhlar soni: &nbsp; <span>{teacher?.groupsCount} ta</span>
        </p>
        <p>
          O'quvchilar soni: &nbsp; <span>{teacher?.studentsCount} ta</span>
        </p>
      </div>
    </div>
  );
};

export default TeacherInfo;
