import React from "react";
import { formatter } from "../../../../assets/scripts";

import "./StudentInfo.scss";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { TbReportMoney } from "react-icons/tb";

const StudentInfo = () => {
  return (
    <div className="student_info">
      <h2 className="student_name">Alfreds Futterkiste</h2>
      <p className="student_phone">
        Student tel. raqami: &nbsp; <span>+998-93-189-73-18</span>
      </p>
      <p className="student_group">
        Student guruhi: &nbsp; <span>Web dasturlash</span>
      </p>
      <p className="student_teacher">
        Student o'qituvchisi: &nbsp; <span>Javlonbek Mirzaabdullayev</span>
      </p>
      <h4 className="student_balance">
        Student balansi: &nbsp; <span>{formatter.format(800000)}</span>
      </h4>
      <div className="info_buttons">
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
  );
};

export default StudentInfo;
