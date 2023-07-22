import React, { useEffect, useRef, useState } from "react";
import "./StudentsContent.scss";
import StudentsList from "../components/StudentsList/StudentsList";
import StudentsCards from "../components/StudentsCards/StudentsCards";
import { MAX_WIDTH_TABLET } from "../../../../constants";
import { deleteStudentApi, getAllStudentsApi } from "../../api";
import { NavLink, useNavigate } from "react-router-dom";
import { Loader, Modal } from "../../../../components";
import { BsDot, BsPlusLg } from "react-icons/bs";
import { useAtom } from "jotai";
import { errorAtom, warningAtom } from "../../../../app/atoms";

const StudentsContent = () => {
  // component helpers
  const dialog = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // atoms
  const [warning, setWarning] = useAtom(warningAtom);
  const [error, setError] = useAtom(errorAtom);

  // data variables
  const [students, setStudents] = useState([]);
  const [toDelete, setToDelete] = useState({ name: "", _id: "" });

  // ui settings
  const [listEnable, setListEnable] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    if (windowWidth > MAX_WIDTH_TABLET) {
      setListEnable(true);
    } else {
      setListEnable(false);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getAllStudentsApi(controller);
        setStudents(data);

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
  }, []);

  const removeStudent = (id, name) => {
    document.activeElement.blur();
    dialog?.current?.showModal();
    setToDelete({ name, _id: id });
  };

  const onRemoveSubmit = async () => {
    const controller = new AbortController();

    try {
      const message = await deleteStudentApi(toDelete?._id, controller);

      if (message) {
        setTimeout(() => {
          setWarning("");
        }, 5000);
        setWarning(message);
      }

      const filteredStudents = students.filter((s) => s._id !== toDelete?._id);

      setError("");
      setStudents([...filteredStudents]);
    } catch (e) {
      if (e.response) {
        setTimeout(() => {
          setError("");
        }, 5000);
        setError(e?.response?.data?.error || errorMessage);
      }
    }

    controller.abort();
  };

  const onRemoveClose = () => {
    dialog?.current?.close();
    setToDelete({ name: "", _id: "" });
  };

  return (
    <div className="students_list">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="list_head">
            <div className="head_content">
              <h1 className="list_title">O'quvchilar</h1>
              <ul className="head_links">
                <li>
                  <NavLink to={`/dashboard`}>Dashboard</NavLink>
                </li>
                <li className="link_spot">
                  <BsDot />
                </li>
                <li>
                  <NavLink to={`/student/list`}>Ro'yxat</NavLink>
                </li>
              </ul>
            </div>
            <button
              className="list_button"
              onClick={() => navigate("/student/new")}
            >
              <span>
                <BsPlusLg />
              </span>{" "}
              O'quvchi qo'shish
            </button>
          </div>
          <div className="list_body">
            {listEnable ? (
              <StudentsList students={students} removeStudent={removeStudent} />
            ) : (
              <StudentsCards
                students={students}
                removeStudent={removeStudent}
              />
            )}
          </div>
        </>
      )}
      <Modal
        dialog={dialog}
        onClose={onRemoveClose}
        style={{ width: 450, height: 300 }}
      >
        <h3>O'chirish</h3>
        <form className="delete_form" onSubmit={onRemoveSubmit} method="dialog">
          <p>
            O'quvchi <span>"{toDelete.name}"</span> ni o'chirishni xohlaysizmi?
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

export default StudentsContent;
