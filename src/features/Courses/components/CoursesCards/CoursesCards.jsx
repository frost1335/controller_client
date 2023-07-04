import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { FaLayerGroup } from "react-icons/fa";
import { Link } from "react-router-dom";
import { formatter } from "../../../../assets/scripts";

const CoursesCards = ({ courses }) => {
  return (
    <div className="list_cards">
      {courses.map((course, index) => (
        <div className="card" key={index + "-client"}>
          <div className="card_head">
            <div className="card_icon">
              <FaLayerGroup />
            </div>
            <h3>
              <Link to="/courses/detail/123249">{course.name}</Link>
            </h3>
          </div>
          <div className="card_body">
            <p>{course.info}</p>
            <span>{course.group}</span>
            <h4>{formatter.format(course.price)}</h4>
          </div>
          <div className="card_footer">
            <button>
              <AiOutlineEdit />
            </button>
            <button>
              <AiOutlineDelete />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoursesCards;
