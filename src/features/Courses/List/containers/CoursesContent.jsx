import React, { startTransition, useEffect, useRef, useState } from "react";
import CoursesList from "../components/CoursesList/CoursesList";
import CoursesCards from "../components/CoursesCards/CoursesCards";
import { MAX_WIDTH_TABLET } from "../../../../constants";
import "./CoursesContent.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { deleteCourseApi, getAllCoursesApi } from "../../api";
import { Loader, Modal } from "../../../../components";
import { BsDot, BsPlusLg } from "react-icons/bs";
import { errorAtom, warningAtom } from "../../../../app/atoms";
import { useAtom } from "jotai";

const CoursesContent = () => {
  // component helpers
  const dialog = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // atoms
  const [warning, setWarning] = useAtom(warningAtom);
  const [error, setError] = useAtom(errorAtom);

  // data variables
  const [courses, setCourses] = useState([]);
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
        const data = await getAllCoursesApi(controller);
        setCourses(data);

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

  const removeCourse = (id, name) => {
    document.activeElement.blur();
    dialog?.current?.showModal();
    setToDelete({ name, _id: id });
  };

  const onRemoveSubmit = async () => {
    const controller = new AbortController();

    try {
      const message = await deleteCourseApi(toDelete?._id, controller);

      if (message) {
        setTimeout(() => {
          setWarning("");
        }, 5000);
        setWarning(message);
      }

      const filteredCourses = courses.filter((s) => s._id !== toDelete?._id);

      setError("");
      setCourses([...filteredCourses]);
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
    <div className="courses_list">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="list_head">
            <div className="head_content">
              <h1 className="list_title">Kurslar</h1>
              <ul className="head_links">
                <li>
                  <NavLink to={`/dashboard`}>Dashboard</NavLink>
                </li>
                <li className="link_spot">
                  <BsDot />
                </li>
                <li>
                  <NavLink to={`/course/list`}>Ro'yxat</NavLink>
                </li>
              </ul>
            </div>
            <button
              className="list_button"
              onClick={() => navigate("/course/new")}
            >
              <span>
                <BsPlusLg />
              </span>{" "}
              Kurs qo'shish
            </button>
          </div>
          <div className="list_body">
            {listEnable ? (
              <CoursesList courses={courses} removeCourse={removeCourse} />
            ) : (
              <CoursesCards courses={courses} removeCourse={removeCourse} />
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
            Kurs <span>"{toDelete.name}"</span> ni o'chirishni xohlaysizmi?
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

export default CoursesContent;
