import React from "react";
import { FaUserGraduate } from "react-icons/fa";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { TbReportMoney } from "react-icons/tb";
import { formatter } from "../../../../assets/scripts";
import { Link } from "react-router-dom";

const ClientsCards = ({ students }) => {
  return (
    <div className="list_cards">
      {students.map((student, index) => (
        <div className="card" key={index + "-client"}>
          <div className="card_head">
            <div className="card_icon">
              <FaUserGraduate />
            </div>
            <h3>
              <Link to="/students/detail/24126">{student.name}</Link>
            </h3>
          </div>
          <div className="card_body">
            <p>{student.group}</p>
            <p>{student.teacher}</p>
            <span>{student.phone}</span>
            <h4>{formatter.format(student.balance)}</h4>
          </div>
          <div className="card_footer">
            <button>
              <AiOutlineEdit />
            </button>
            <button>
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
