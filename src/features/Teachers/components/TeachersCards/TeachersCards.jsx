import React from "react";
import { FaUserTie } from "react-icons/fa";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";

const TeachersCards = ({ teachers }) => {
  return (
    <div className="list_cards">
      {teachers.map((teacher, index) => (
        <div className="card" key={index + "-client"}>
          <div className="card_head">
            <div className="card_icon">
              <FaUserTie />
            </div>
            <h3>
              <Link to="/teachers/detail/123249">{teacher.name}</Link>
            </h3>
          </div>
          <div className="card_body">
            <p>{teacher.group}</p>
            <span>{teacher.phone}</span>
          </div>
          <div className="card_footer">
            <button>
              <AiOutlineEdit />
            </button>
            <button>
              <AiOutlineDelete />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeachersCards;
