import React, { useEffect, useState } from "react";
import "./StudentsContent.scss";
import StudentsList from "../components/StudentsList/StudentsList";
import StudentsCards from "../components/StudentsCards/StudentsCards";
import { MAX_WIDTH_TABLET } from "../../../constants";

const StudentsContent = () => {
  const [students, setStudents] = useState([
    {
      name: "Alfreds Futterkiste",
      phone: "+998-93-189-73-18",
      group: "Web dasturlash",
      teacher: "Javlonbek Mirzaabdullayev",
      balance: 800000,
    },
    {
      name: "Alfreds Futterkiste 2",
      phone: "+998-93-189-73-18",
      group: "SMM",
      teacher: "Raximov Dilrozbek",
      balance: 600000,
    },
  ]);
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

  return (
    <div className="students_list">
      <div className="list_head">
        <h1 className="list_title">Studentlar</h1>
        <button className="list_button">
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
