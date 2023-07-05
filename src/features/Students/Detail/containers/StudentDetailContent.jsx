import React, { startTransition, useEffect, useState } from "react";
import PaymentHistory from "../components/PaymentHistory/PaymentHistory";
import StudentInfo from "../components/StudentInfo/StudentInfo";

import "./StudentDetailContent.scss";
import { useNavigate, useParams } from "react-router-dom";
import { deleteStudentApi, getStudentApi } from "../../api";

const StudentDetailContent = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState({});
  const { studentId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStudentApi(studentId);
        setStudent(data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  const removeStudent = () => {
    startTransition(async () => {
      await deleteStudentApi(student?._id);
    });
    navigate("/students");
  };

  return (
    <div className="student_detail_content">
      <div className="left_content">
        <StudentInfo
          setStudent={setStudent}
          student={student}
          removeStudent={removeStudent}
        />
      </div>
      <div className="right_content">
        <PaymentHistory history={student?.paymentHistory} />
      </div>
    </div>
  );
};

export default StudentDetailContent;
