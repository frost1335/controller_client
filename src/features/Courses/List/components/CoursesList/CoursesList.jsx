import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { formatter } from "../../../../../assets/scripts";
import { IoWarningOutline } from "react-icons/io5";

const CoursesList = ({ courses, removeCourse }) => {
  const navigate = useNavigate();

  return courses?.length ? (
    <table className="list_table">
      <thead>
        <tr>
          <th>Kurs nomi</th>
          <th>Narxi</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((course, index) => (
          <tr key={index + "-course"}>
            <td>
              <Link className="table_link" to={`/course/detail/${course?._id}`}>
                {course?.name}
              </Link>
            </td>
            <td>{formatter.format(course?.price)}</td>
            <td className="button_item">
              <button className="settings_btn">
                <BsThreeDotsVertical />
                <div className="dropdown">
                  <ul>
                    <li onClick={() => navigate(`/course/${course?._id}/edit`)}>
                      O'zgartitrish
                    </li>
                    <li onClick={() => removeCourse(course?._id, course?.name)}>
                      O'chirish
                    </li>
                  </ul>
                </div>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
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

export default CoursesList;
