import React from "react";
import "./StudentsList.scss";
import GroupAttendance from "../GroupAttendance/GroupAttendance";

const StudentsList = () => {
  const arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  return (
    <div className="students_detail_list">
      <h2>Studentlar ro'yhati</h2>
      <GroupAttendance studentsArr={arr} lessonDays={13} />
    </div>
  );
};

export default StudentsList;
