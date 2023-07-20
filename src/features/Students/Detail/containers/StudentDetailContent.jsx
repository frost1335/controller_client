import React, { startTransition, useEffect, useState } from "react";
import PaymentHistory from "../components/PaymentHistory/PaymentHistory";
import StudentInfo from "../components/StudentInfo/StudentInfo";

import "./StudentDetailContent.scss";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { deleteStudentApi, getStudentApi } from "../../api";
import { Loader } from "../../../../components";
import { BsDot } from "react-icons/bs";

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
        setStudent(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [currentGroup, studentId]);

  const removesStudent = () => {
    startTransition(async () => {
      await deleteStudentApi(student?._id);
    });
    navigate("/student/list");
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="student_detail_content">
      <div className="content_head">
        <div className="head_content">
          <h1 className="list_title">O'quvchi haqida batafsil</h1>
          <ul className="head_links">
            <li>
              <NavLink to={`/dashboard`}>Dashboard</NavLink>
            </li>
            <li className="link_spot">
              <BsDot />
            </li>
            <li>
              <NavLink to={`/student/list`}>O'quvchilar ro'yxati</NavLink>
            </li>
            <li className="link_spot">
              <BsDot />
            </li>
            <li>
              <NavLink to={`/student/detail/${studentId}`}>
                O'quvchi tafsiloti
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="detail_body">
        <div className="content_item">
          <StudentInfo
            setStudent={setStudent}
            student={student}
            removeStudent={removesStudent}
            setCurrentGroup={setCurrentGroup}
          />
        </div>
        <div className="content_item">
          <PaymentHistory history={student?.paymentHistory} />
        </div>
      </div>
    </div>
  );
};

export default StudentDetailContent;
