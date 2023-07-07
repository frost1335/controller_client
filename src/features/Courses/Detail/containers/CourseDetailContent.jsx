import React, { useState } from "react";
import CourseInfo from "../components/CourseInfo/CourseInfo";
import "./CourseDetailContent.scss";
import { Loader } from "../../../../components";

const CourseDetailContent = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="course_detail_content">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="content_item">
            <CourseInfo />
          </div>
        </>
      )}
    </div>
  );
};

export default CourseDetailContent;
