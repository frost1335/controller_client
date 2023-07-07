import React, { useState } from "react";
import TeacherInfo from "../components/TeacherInfo/TeacherInfo";
import TeacherGroups from "../components/TeacherGroups/TeacherGroups";
import { Loader } from "../../../../components";

const TeacherDetailContent = () => {
  const [loading, setLoading] = useState(false);

  return loading ? (
    <Loader />
  ) : (
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
