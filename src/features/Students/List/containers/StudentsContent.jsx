import React, { useEffect, useState } from "react";
import "./StudentsContent.scss";
import StudentsList from "../components/StudentsList/StudentsList";
import StudentsCards from "../components/StudentsCards/StudentsCards";
import { MAX_WIDTH_TABLET } from "../../../../constants";
import { getAllStudentsApi } from "../../api";
import { useNavigate } from "react-router-dom";

const StudentsContent = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
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
      try {
        const data = await getAllStudentsApi();
        setStudents(data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="students_list">
      <div className="list_head">
        <h1 className="list_title">Studentlar</h1>
        <button
          className="list_button"
          onClick={() => navigate("/students/new")}
        >
          <span>+</span> O'quvchi qo'shish
        </button>
      </div>
      <div className="list_body">
        {listEnable ? (
          <StudentsList students={students} />
        ) : (
          <StudentsCards students={students} />
        )}
      </div>
    </div>
  );
};

export default StudentsContent;
