import React from "react";
import CourseInfo from "../components/CourseInfo/CourseInfo";
import "./CourseDetailContent.scss";

const CourseDetailContent = () => {
  return (
    <div className="course_detail_content">
      <div className="content_item">
        <CourseInfo />
      </div>
    </div>
  );
};

export default CourseDetailContent;
