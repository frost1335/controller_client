import React, { useEffect, useRef, useState } from "react";
import PaymentHistory from "../components/PaymentHistory/PaymentHistory";
import StudentInfo from "../components/StudentInfo/StudentInfo";

import "./StudentDetailContent.scss";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { deleteStudentApi, getStudentApi } from "../../api";
import { Loader, Modal } from "../../../../components";
import { BsDot } from "react-icons/bs";
import { useAtom } from "jotai";
import { errorAtom, warningAtom } from "../../../../app/atoms";

const StudentDetailContent = () => {
  // component helpers
  const dialog = useRef(null);
  const navigate = useNavigate();
  const { studentId } = useParams();
  const [loading, setLoading] = useState(true);

  // atoms
  const [warning, setWarning] = useAtom(warningAtom);
  const [error, setError] = useAtom(errorAtom);

  // data variables
  const [student, setStudent] = useState({});
  const [currentGroup, setCurrentGroup] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getStudentApi(studentId, controller);
        setStudent(data);

        setError("");
        setLoading(false);
      } catch (e) {
        if (e.response) {
          setTimeout(() => {
            setError("");
          }, 5000);
          setError(e?.response?.data?.error || errorMessage);
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, [currentGroup, studentId]);

  const removeStudent = () => {
    document.activeElement.blur();
    dialog?.current?.showModal();
  };

  const onRemoveSubmit = async () => {
    const controller = new AbortController();

    try {
      const message = await deleteStudentApi(student?._id, controller);

      if (message) {
        setTimeout(() => {
          setWarning("");
        }, 5000);
        setWarning(message);
      }

      setError("");
    } catch (e) {
      if (e.response) {
        setTimeout(() => {
          setError("");
        }, 5000);
        setError(e?.response?.data?.error || errorMessage);
      }
    }

    controller.abort();
    navigate("/student/list");
  };

  const onRemoveClose = () => {
    dialog?.current?.close();
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
            removeStudent={removeStudent}
            setCurrentGroup={setCurrentGroup}
          />
        </div>
        <div className="content_item">
          <PaymentHistory history={student?.paymentHistory} />
        </div>
      </div>
      <Modal
        dialog={dialog}
        onClose={onRemoveClose}
        style={{ width: 450, height: 300 }}
      >
        <h3>O'chirish</h3>
        <form className="delete_form" onSubmit={onRemoveSubmit} method="dialog">
          <p>
            O'quvchi{" "}
            <span>"{Object.values(student?.name || "").join(" ")}"</span>
            ni o'chirishni xohlaysizmi?
          </p>
          <div className="submit_form">
            <button type="submit">O'chirish</button>
            <button onClick={onRemoveClose} type="button">
              Bekor qilish
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default StudentDetailContent;
