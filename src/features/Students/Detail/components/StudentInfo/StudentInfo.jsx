import React from "react";
import { formatter } from "../../../../../assets/scripts";

import "./StudentInfo.scss";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { TbReportMoney } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const StudentInfo = ({ student, removeStudent }) => {
  const navigate = useNavigate();

  return (
    <div className="student_info">
      <h2 className="student_name">{student?.name}</h2>
      <p className="student_phone">
        Student tel. raqami: &nbsp; <span>{student?.phone}</span>
      </p>
      <p className="student_group">
        Student guruhi: &nbsp;{" "}
        <span>
          {student?.group ? student.group : <button>Add to group</button>}
        </span>
      </p>
      <p className="student_teacher">
        Student o'qituvchisi: &nbsp;{" "}
        <span>
          {student?.group ? (
            student?.teacher ? (
              student?.teacher
            ) : (
              <button>Go to group settings</button>
            )
          ) : (
            <button>Add to group</button>
          )}
        </span>
      </p>
      <h4 className="student_balance">
        Student balansi: &nbsp;{" "}
        <span>{formatter.format(student?.balance)}</span>
      </h4>
      <div className="info_buttons">
        <button onClick={() => navigate(`/students/${student?._id}/edit`)}>
          <AiOutlineEdit />
        </button>
        <button onClick={removeStudent}>
          <AiOutlineDelete />
        </button>
        <button>
          <TbReportMoney />
        </button>
      </div>
    </div>
  );
};

export default StudentInfo;
