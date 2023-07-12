import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { formatter } from "../../../../../assets/scripts";

const CoursesList = ({ courses, removeCourse }) => {
  const navigate = useNavigate();

  return (
    <table className="list_table">
      <thead>
        <tr>
          <th>Kurs nomi</th>
          <th>Guruh</th>
          <th>Narxi</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((course, index) => (
          <tr key={index + "-course"}>
            <td>
              <Link
                className="table_link"
                to={`/courses/detail/${course?._id}`}
              >
                {course?.name}
              </Link>
            </td>
            <td>Not selected</td>
            <td>{formatter.format(course?.price)}</td>
            <td className="button_item">
              <button className="settings_btn">
                <BsThreeDotsVertical />
                <div className="dropdown">
                  <ul>
                    <li
                      onClick={() => navigate(`/courses/${course?._id}/edit`)}
                    >
                      O'zgartitrish
                    </li>
                    <li onClick={() => removeCourse(course?._id)}>O'chirish</li>
                  </ul>
                </div>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CoursesList;
