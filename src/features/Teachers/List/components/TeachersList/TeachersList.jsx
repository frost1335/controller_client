import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";

const TeachersList = ({ teachers }) => {
  return (
    <table className="list_table">
      <thead>
        <tr>
          <th>Ism</th>
          <th>Kurs</th>
          <th>Tel. raqam</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {teachers.map((teacher, index) => (
          <tr key={index + "-teacher"}>
            <td>
              <Link className="table_link" to="/teachers/detail/123249">
                Alfreds Futterkiste
              </Link>
            </td>
            <td>Web dasturlash</td>
            <td>+998-93-189-73-18</td>
            <td className="button_item">
              <button className="settings_btn">
                <BsThreeDotsVertical />
                <div className="dropdown">
                  <ul>
                    <li>O'zgartitrish</li>
                    <li>O'chirish</li>
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
