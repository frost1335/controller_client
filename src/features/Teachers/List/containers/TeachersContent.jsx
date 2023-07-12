import React, { startTransition, useEffect, useState } from "react";
import TeachersCards from "../components/TeachersCards/TeachersCards";
import TeachersList from "../components/TeachersList/TeachersList";
import { MAX_WIDTH_TABLET } from "../../../../constants";

import "./TeachersContent.scss";
import { useNavigate } from "react-router-dom";
import { deleteTeacherApi, getAllTeachersApi } from "../../api";
import { Loader } from "../../../../components";

const TeachersContent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [teachers, setTeachers] = useState([]);
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
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getAllTeachersApi();
        setTeachers(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  const removeTeacher = (id) => {
    try {
      startTransition(async () => {
        await deleteTeacherApi(id);
      });
      const filteredTeachers = teachers.filter((t) => t._id !== id);
      setTeachers([...filteredTeachers]);
      document.activeElement.blur();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="teachers_list">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="list_head">
            <h1 className="list_title">O'qituvchilar</h1>
            <button
              className="list_button"
              onClick={() => navigate("/teachers/new")}
            >
              <span>+</span> O'qituvchi qo'shish
            </button>
          </div>
          <div className="list_body">
            {listEnable ? (
              <TeachersList teachers={teachers} removeTeacher={removeTeacher} />
            ) : (
              <TeachersCards
                teachers={teachers}
                removeTeacher={removeTeacher}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TeachersContent;
