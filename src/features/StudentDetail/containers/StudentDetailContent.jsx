import React from "react";
import PaymentHistory from "../components/PaymentHistory/PaymentHistory";
import StudentInfo from "../components/StudentInfo/StudentInfo";

import "./StudentDetailContent.scss";

const StudentDetailContent = () => {
  return (
    <div className="student_detail_content">
      <div className="left_content">
        <StudentInfo />
      </div>
      <div className="right_content">
        <PaymentHistory />
      </div>
    </div>
  );
};

export default StudentDetailContent;
