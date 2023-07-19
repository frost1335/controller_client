import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { formatter } from "../../../../../assets/scripts";

const StudentsList = ({ students, removeStudent }) => {
  const navigate = useNavigate();

  return (
    <table className="list_table">
      <thead>
        <tr>
          <th>Ism</th>
          <th>Tel. raqam</th>
          <th>Guruh</th>
          <th>O'qituvchi</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, index) => (
          <tr key={index}>
            <td>
              <Link
                className="table_link"
                to={`/student/detail/${student._id}`}
              >
                {student?.name}
              </Link>
            </td>
            <td>{student?.phone}</td>
            <td>{student?.group}</td>
            <td>{student?.teacher}</td>
            <td className="button_item">
              <button className="settings_btn">
                <BsThreeDotsVertical />
                <div className="dropdown">
                  <ul>
                    <li
                      onClick={() => navigate(`/student/${student?._id}/edit`)}
                    >
                      O'zgartitrish
                    </li>
                    <li onClick={() => removeStudent(student?._id)}>
                      O'chirish
                    </li>
                    <li>Balans</li>
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

export default StudentsList;
