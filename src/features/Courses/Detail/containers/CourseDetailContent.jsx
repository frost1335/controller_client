import React, { useEffect, useRef, useState } from "react";
import CourseInfo from "../components/CourseInfo/CourseInfo";
import "./CourseDetailContent.scss";
import { Loader, Modal } from "../../../../components";
import { deleteCourseApi, getCourseApi } from "../../api";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { BsDot } from "react-icons/bs";
import { errorAtom, warningAtom } from "../../../../app/atoms";
import { useAtom } from "jotai";

const CourseDetailContent = () => {
  const dialog = useRef(null);
  const navigate = useNavigate();

  // atoms
  const [warning, setWarning] = useAtom(warningAtom);
  const [error, setError] = useAtom(errorAtom);

  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState("");

  const { courseId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getCourseApi(courseId);
        setLoading(false);
        setCourse({ ...data });
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [courseId]);

  const removeCourse = () => {
    document.activeElement.blur();
    dialog?.current?.showModal();
  };

  const onRemoveSubmit = async () => {
    const controller = new AbortController();

    try {
      const message = await deleteCourseApi(course?._id, controller);

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
    navigate("/course/list");
  };

  const onRemoveClose = () => {
    dialog?.current?.close();
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="course_detail_content">
      <div className="content_head">
        <div className="head_content">
          <h1 className="list_title">Kurs haqida batafsil</h1>
          <ul className="head_links">
            <li>
              <NavLink to={`/dashboard`}>Dashboard</NavLink>
            </li>
            <li className="link_spot">
              <BsDot />
            </li>
            <li>
              <NavLink to={`/course/list`}>Kurslar ro'yxati</NavLink>
            </li>
            <li className="link_spot">
              <BsDot />
            </li>
            <li>
              <NavLink to={`/course/detail/${courseId}`}>
                O'quvchi tafsiloti
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="detail_body">
        <div className="content_item">
          <CourseInfo removeCourse={removeCourse} course={course} />
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
            Kurs <span>"{course.name}"</span>
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

export default CourseDetailContent;
