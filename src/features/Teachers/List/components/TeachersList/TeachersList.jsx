import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

const TeachersList = ({ teachers, removeTeacher }) => {
  const navigate = useNavigate();

  return (
    <table className="list_table">
      <thead>
        <tr>
          <th>Ism</th>
          <th>Guruhlar</th>
          <th>Tel. raqam</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {teachers.map((teacher, index) => (
          <tr key={index + "-teacher"}>
            <td>
              <Link className="table_link" to="/teachers/detail/123249">
                {teacher?.name}
              </Link>
            </td>
            <td>{teacher?.groupsCount} ta</td>
            <td>{teacher?.phone}</td>
            <td className="button_item">
              <button className="settings_btn">
                <BsThreeDotsVertical />
                <div className="dropdown">
                  <ul>
                    <li
                      onClick={() => navigate(`/teachers/${teacher?._id}/edit`)}
                    >
                      O'zgartitrish
                    </li>
                    <li onClick={() => removeTeacher(teacher?._id)}>
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
  );
};

export default TeachersList;
