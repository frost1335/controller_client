import React from "react";
import { FaUserTie } from "react-icons/fa";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const TeachersCards = ({ teachers, removeTeacher }) => {
  const navigate = useNavigate();

  return (
    <div className="list_cards">
      {teachers.map((teacher, index) => (
        <div className="card" key={index + "-client"}>
          <div className="card_head">
            <div className="card_icon">
              <FaUserTie />
            </div>
            <h3>
              <Link to={`/teacher/detail/${teacher?._id}`}>
                {Object.values(teacher?.name).join(" ")}
              </Link>
            </h3>
          </div>
          <div className="card_body">
            <span>{teacher?.phone}</span>
            <h4>
              Guruhlar:&nbsp;<span>{teacher?.groupsCount} ta</span>
            </h4>
          </div>
          <div className="card_footer">
            <button onClick={() => navigate(`/teacher/${teacher._id}/edit`)}>
              <AiOutlineEdit />
            </button>
            <button
              onClick={() =>
                removeTeacher(
                  teacher?._id,
                  Object.values(teacher?.name || "").join(" ")
                )
              }
            >
              <AiOutlineDelete />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeachersCards;
