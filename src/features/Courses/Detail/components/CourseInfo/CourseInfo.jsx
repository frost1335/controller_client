import React from "react";
import { formatter } from "../../../../../assets/scripts";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const CourseInfo = () => {
  return (
    <div className="student_info">
      <h2 className="student_name">Alfreds Futterkiste</h2>
      <p className="student_phone">
        Kurs guruhlari &nbsp; <span>3-guruh, 6-guruh</span>
      </p>
      <p className="student_group">
        Qisqacha ma'lumot : &nbsp;{" "}
        <span>Bu kurs tahminan 7 oy davom etadi</span>
      </p>
      <h4 className="student_balance">
        Kurs narxi : &nbsp; <span>{formatter.format(350000)}</span>
      </h4>
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

export default CourseInfo;
