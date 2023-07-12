import React, { useEffect, useState } from "react";
import CourseInfo from "../components/CourseInfo/CourseInfo";
import "./CourseDetailContent.scss";
import { Loader } from "../../../../components";
import { getCourseApi } from "../../api";
import { useParams } from "react-router-dom";

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
  }, []);

  return (
    <div className="course_detail_content">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="content_item">
            <CourseInfo course={course} />
          </div>
        </>
      )}
    </div>
  );
};

export default CourseDetailContent;
