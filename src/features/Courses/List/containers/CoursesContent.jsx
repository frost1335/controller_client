import React, { useEffect, useState } from "react";
import CoursesList from "../components/CoursesList/CoursesList";
import CoursesCards from "../components/CoursesCards/CoursesCards";
import { MAX_WIDTH_TABLET } from "../../../../constants";
import './CoursesContent.scss'

const CoursesContent = () => {
  const [courses, setCourses] = useState([
    {
      name: "Alfreds Futterkiste",
      group: "3-guruh",
      price: 400000,
      info: "Bu kurs 4 oy davom etadi",
    },
    {
      name: "Arab tili",
      group: "6-guruh",
      price: 250000,
      info: "Bu kurs 7 oy davom etadi",
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
    <div className="courses_list">
      <div className="list_head">
        <h1 className="list_title">Kurslar</h1>
        <button className="list_button">
          <span>+</span> Kurs qo'shish
        </button>
      </div>
      <div className="list_body">
        {listEnable ? (
          <CoursesList courses={courses} />
        ) : (
          <CoursesCards courses={courses} />
        )}
      </div>
    </div>
  );
};

export default CoursesContent;
