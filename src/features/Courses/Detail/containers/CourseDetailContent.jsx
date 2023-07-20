import React, { useEffect, useState } from "react";
import CourseInfo from "../components/CourseInfo/CourseInfo";
import "./CourseDetailContent.scss";
import { Loader } from "../../../../components";
import { deleteCourseApi, getCourseApi } from "../../api";
import { NavLink, useParams } from "react-router-dom";
import { BsDot } from "react-icons/bs";

const CourseDetailContent = () => {
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
    startTransition(async () => {
      await deleteCourseApi(course?._id);
    });
    navigate("/course/list");
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
    </div>
  );
};

export default CourseDetailContent;
