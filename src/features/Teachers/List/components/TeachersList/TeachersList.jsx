import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoWarningOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const TeachersList = ({ teachers, removeTeacher }) => {
  const navigate = useNavigate();

  return teachers?.length ? (
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
              <Link
                className="table_link"
                to={`/teacher/detail/${teacher?._id}`}
              >
                {Object.values(teacher?.name).join(" ")}
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
                      onClick={() => navigate(`/teacher/${teacher?._id}/edit`)}
                    >
                      O'zgartitrish
                    </li>
                    <li
                      onClick={() =>
                        removeTeacher(
                          teacher?._id,
                          Object.values(teacher?.name || "").join(" ")
                        )
                      }
                    >
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
        <p>O'qituvchilar mavjud emas</p>
      </h3>
    </div>
  );
};

export default TeachersList;
