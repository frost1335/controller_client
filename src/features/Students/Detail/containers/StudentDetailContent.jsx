import React, { startTransition, useEffect, useState } from "react";
import PaymentHistory from "../components/PaymentHistory/PaymentHistory";
import StudentInfo from "../components/StudentInfo/StudentInfo";

import "./StudentDetailContent.scss";
import { useNavigate, useParams } from "react-router-dom";
import { deleteStudentApi, getStudentApi } from "../../api";
import { Loader } from "../../../../components";

const StudentDetailContent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState({});
  const [currentGroup, setCurrentGroup] = useState("");
  const { studentId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getStudentApi(studentId);
        console.log(data);
        setStudent(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [currentGroup]);

  const removeStudent = () => {
    startTransition(async () => {
      await deleteStudentApi(student?._id);
    });
    navigate("/students");
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="student_detail_content">
      <div className="content_item">
        <StudentInfo
          setStudent={setStudent}
          student={student}
          removeStudent={removeStudent}
          setCurrentGroup={setCurrentGroup}
        />
      </div>
      <div className="content_item">
        <PaymentHistory history={student?.paymentHistory} />
      </div>
    </div>
  );
};

export default StudentDetailContent;
