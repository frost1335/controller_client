import React from "react";
import { FaUserGraduate } from "react-icons/fa";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { TbReportMoney } from "react-icons/tb";
import { formatter } from "../../../../../assets/scripts";
import { Link, useNavigate } from "react-router-dom";

const ClientsCards = ({ students, removeStudent }) => {
  const navigate = useNavigate();

  return (
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
            <button onClick={() => removeStudent(student?._id)}>
              <AiOutlineDelete />
            </button>
            <button>
              <TbReportMoney />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClientsCards;
