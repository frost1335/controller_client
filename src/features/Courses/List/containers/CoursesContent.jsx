import React, { startTransition, useEffect, useState } from "react";
import CoursesList from "../components/CoursesList/CoursesList";
import CoursesCards from "../components/CoursesCards/CoursesCards";
import { MAX_WIDTH_TABLET } from "../../../../constants";
import "./CoursesContent.scss";
import { useNavigate } from "react-router-dom";
import { deleteCourseApi, getAllCoursesApi } from "../../api";
import { Loader } from "../../../../components";

const CoursesContent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
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
        const data = await getAllCoursesApi();
        setCourses(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  const removeCourse = (id) => {
    try {
      startTransition(async () => {
        await deleteCourseApi(id);
      });
      const filteredCourses = courses.filter((c) => c._id !== id);
      setCourses(filteredCourses);
      document.activeElement.blur();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="courses_list">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="list_head">
            <h1 className="list_title">Kurslar</h1>
            <button
              className="list_button"
              onClick={() => navigate("/courses/new")}
            >
              <span>+</span> Kurs qo'shish
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
    </div>
  );
};

export default CoursesContent;
