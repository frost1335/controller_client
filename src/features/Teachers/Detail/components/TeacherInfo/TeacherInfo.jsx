import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";

import "./TeacherInfo.scss";

const TeacherInfo = ({ teacher, removeTeacher }) => {
  const navigate = useNavigate();
  const { teacherId } = useParams();

  return (
    <div className="teacher_info">
      <div className="info_left">
        <h2 className="teacher_name">
          {Object.values(teacher?.name).join(" ")}
        </h2>
        <p className="teacher_phone">
          O'qituvchi tel. raqami: &nbsp; <span>{teacher?.phone}</span>
        </p>
        <p className="teacher_phone">
          O'qituvchi haqida ma'lumot: &nbsp; <span>{teacher?.info}</span>
        </p>
        <div className="info_buttons">
          <button onClick={() => navigate(`/teacher/${teacherId}/edit`)}>
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
