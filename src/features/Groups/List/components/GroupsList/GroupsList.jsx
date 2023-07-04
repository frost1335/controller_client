import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";

const GroupsList = ({ groups }) => {
  return (
    <table className="list_table">
      <thead>
        <tr>
          <th>Guruh nomi</th>
          <th>Kurs</th>
          <th>O'qituvchi</th>
          <th>Kunlari</th>
          <th>Vaqti</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {groups.map((group, index) => (
          <tr key={index + "-group"}>
            <td>
              <Link className="table_link" to="/groups/detail/24126">
                {group.name}
              </Link>
            </td>
            <td>{group.course}</td>
            <td>{group.teacher}</td>
            <td>{group.day}</td>
            <td>{group.time}</td>
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

export default GroupsList;
