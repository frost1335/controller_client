import React from "react";
import { formatter } from "../../../../../assets/scripts";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import "./CourseInfo.scss";
import { Link, useNavigate } from "react-router-dom";

const CourseInfo = ({ course }) => {
  const navigate = useNavigate();

  return (
    <div className="course_info">
      <div className="info_left">
        <h2 className="course_name">{course?.name}</h2>
        <p className="course_detail">
          Qisqacha ma'lumot:&nbsp;<span>{course?.info}</span>
        </p>

        <div className="info_buttons">
          <button onClick={() => navigate(`/courses/${course?._id}/edit`)}>
            <AiOutlineEdit />
          </button>
          <button>
            <AiOutlineDelete />
          </button>
        </div>
      </div>
      <div className="info_right">
        <h4 className="course_price">
          Kurs narxi : &nbsp;<span>{formatter.format(course?.price || 0)}</span>
        </h4>
        <p className="course_groups">
          Kurs guruhlari: &nbsp;
          {course?.groups?.length ? (
            course?.groups?.map((group, index) => (
              <Link key={index} to={`/groups/detail/${group?._id}`}>
                {group?.name}
              </Link>
            ))
          ) : (
            <p className="empty_groups">Bu kurs guruhlarga bog'lanmagan</p>
          )}
        </p>
      </div>
    </div>
  );
};

export default CourseInfo;
