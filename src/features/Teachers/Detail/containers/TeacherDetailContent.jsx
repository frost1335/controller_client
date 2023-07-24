import React, { useEffect, useRef, useState } from "react";
import TeacherInfo from "../components/TeacherInfo/TeacherInfo";
import TeacherGroups from "../components/TeacherGroups/TeacherGroups";
import { Loader, Modal } from "../../../../components";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { deleteTeacherApi, getTeacherApi } from "../../api";
import { BsDot } from "react-icons/bs";
import { errorAtom, warningAtom } from "../../../../app/atoms";
import { useAtom } from "jotai";

const TeacherDetailContent = () => {
  // component helpers
  const navigate = useNavigate();
  const dialog = useRef(null);
  const { teacherId } = useParams();
  const [loading, setLoading] = useState(true);

  // atoms
  const [warning, setWarning] = useAtom(warningAtom);
  const [error, setError] = useAtom(errorAtom);

  // data variables
  const [teacher, setTeacher] = useState("");
  const [groups, setGroups] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getTeacherApi(teacherId, controller);
        setTeacher(data);
        setGroups(data.groups);

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
  }, [teacherId]);

  const removeTeacher = () => {
    document.activeElement.blur();
    dialog?.current?.showModal();
  };

  const onRemoveSubmit = async () => {
    const controller = new AbortController();

    try {
      const message = await deleteTeacherApi(teacher?._id, controller);

      if (message) {
        setTimeout(() => {
          setWarning("");
        }, 5000);
        setWarning(message);
      }
    } catch (e) {
      if (e.response) {
        setTimeout(() => {
          setError("");
        }, 5000);
        setError(e?.response?.data?.error || errorMessage);
      }
    }

    controller.abort();
    navigate("/teacher/list");
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
          <h1 className="list_title">O'qituvchi haqida batafsil</h1>
          <ul className="head_links">
            <li>
              <NavLink to={`/dashboard`}>Dashboard</NavLink>
            </li>
            <li className="link_spot">
              <BsDot />
            </li>
            <li>
              <NavLink to={`/teacher/list`}>O'qituvchilar ro'yxati</NavLink>
            </li>
            <li className="link_spot">
              <BsDot />
            </li>
            <li>
              <NavLink to={`/teacher/detail/${teacherId}`}>
                O'qituvchi tafsiloti
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="detail_body">
        <div className="content_item">
          <TeacherInfo removeTeacher={removeTeacher} teacher={teacher} />
        </div>
        <div className="content_item">
          <TeacherGroups groups={groups} setGroups={setGroups} />
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
            O'qituvchi{" "}
            <span>"{Object.values(teacher?.name || "").join(" ")}"</span>
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

export default TeacherDetailContent;
