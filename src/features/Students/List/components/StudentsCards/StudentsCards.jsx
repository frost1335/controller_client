import React from "react";
import { FaUserGraduate } from "react-icons/fa";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { IoWarningOutline } from "react-icons/io5";

const ClientsCards = ({ students, removeStudent }) => {
  const navigate = useNavigate();

  return students?.length ? (
    <div className="list_cards">
      {students.map((student, index) => (
        <div className="card" key={index + "-client"}>
          <div className="card_head">
            <div className="card_icon">
              <FaUserGraduate />
            </div>
            <h3>
              <Link to={`/student/detail/${student?._id}`}>
                {Object.values(student?.name).join(" ")}
              </Link>
            </h3>
          </div>
          <div className="card_body">
            <p>{student?.group}</p>
            <p>{Object.values(student?.teacher || "").join(" ")}</p>
            <span>{student?.phone}</span>
          </div>
          <div className="card_footer">
            <button onClick={() => navigate(`/student/${student?._id}/edit`)}>
              <AiOutlineEdit />
            </button>
            <button
              onClick={() =>
                removeStudent(
                  student?._id,
                  Object.values(student?.name || "").join(" ")
                )
              }
            >
              <AiOutlineDelete />
            </button>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="empty_list">
      <h3>
        <span className="empty_icon">
          <IoWarningOutline />
        </span>
        <p>O'quvchilar mavjud emas</p>
      </h3>
    </div>
  );
};

export default ClientsCards;
