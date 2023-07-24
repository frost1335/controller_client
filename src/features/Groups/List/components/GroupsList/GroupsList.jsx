import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoWarningOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const GroupsList = ({ groups, removeGroup }) => {
  const navigate = useNavigate();

  return groups?.length ? (
    <table className="list_table">
      <thead>
        <tr>
          <th>Guruh nomi</th>
          <th>Kurs</th>
          <th>O'qituvchi</th>
          <th>Kunlari</th>
          <th>Vaqti</th>
          <th>O'quvchilar</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {groups.map((group, index) => (
          <tr key={index + "-group"}>
            <td>
              <Link className="table_link" to={`/group/detail/${group?._id}`}>
                {group?.name}
              </Link>
            </td>
            <td>{group?.course}</td>
            <td>{Object.values(group?.teacher || "").join(" ")}</td>
            <td>{group?.days?.join(", ")}</td>
            <td>{group?.time?.join("-")}</td>
            <td>{group?.studentsCount} ta</td>
            <td className="button_item">
              <button className="settings_btn">
                <BsThreeDotsVertical />
                <div className="dropdown">
                  <ul>
                    <li onClick={() => navigate(`/group/${group?._id}/edit`)}>
                      O'zgartitrish
                    </li>
                    <li onClick={() => removeGroup(group?._id, group?.name)}>
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
        <p>Guruhlar mavjud emas</p>
      </h3>
    </div>
  );
};

export default GroupsList;
