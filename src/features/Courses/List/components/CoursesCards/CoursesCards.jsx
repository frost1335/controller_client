import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { FaLayerGroup } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { formatter } from "../../../../../assets/scripts";
import { IoWarningOutline } from "react-icons/io5";

const CoursesCards = ({ courses, removeCourse }) => {
  const navigate = useNavigate();

  return courses?.length ? (
    <div className="list_cards">
      {courses.map((course, index) => (
        <Link className="card_link" to={`/course/detail/${course?._id}`}>
          <div className="card" key={index + "-client"}>
            <div className="card_head">
              <div className="card_icon">
                <FaLayerGroup />
              </div>
              <h3>
                <Link to={`/course/detail/${course?._id}`}>{course?.name}</Link>
              </h3>
            </div>
            <div className="card_body">
              <p>{course?.info}</p>
              <h4>{formatter.format(course?.price)}</h4>
            </div>
            <div className="card_footer">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/course/${course?._id}/edit`);
                }}
              >
                <AiOutlineEdit />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  removeCourse(course?._id, course?.name);
                }}
              >
                <AiOutlineDelete />
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  ) : (
    <div className="empty_list">
      <h3>
        <span className="empty_icon">
          <IoWarningOutline />
        </span>
        <p>Kurslar mavjud emas</p>
      </h3>
    </div>
  );
};

export default CoursesCards;
