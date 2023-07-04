import React from "react";
import TeacherInfo from "../components/TeacherInfo/TeacherInfo";
import TeacherGroups from "../components/TeacherGroups/TeacherGroups";

const TeacherDetailContent = () => {
  return (
    <div className="student_detail_content">
      <div className="left_content">
        <TeacherInfo />
      </div>
      <div className="right_content">
        <TeacherGroups />
      </div>
    </div>
  );
};

export default TeacherDetailContent;
