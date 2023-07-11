import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

const GroupsList = ({ groups, removeGroup }) => {
  const navigate = useNavigate();

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
              <Link className="table_link" to={`/groups/detail/${group?._id}`}>
                {group?.name}
              </Link>
            </td>
            <td>{group?.course}</td>
            <td>{group?.teacher}</td>
            <td>{group?.days?.join(", ")}</td>
            <td>{group?.time?.join("-")}</td>
            <td className="button_item">
              <button className="settings_btn">
                <BsThreeDotsVertical />
                <div className="dropdown">
                  <ul>
                    <li onClick={() => navigate(`/groups/${group?._id}/edit`)}>
                      O'zgartitrish
                    </li>
                    <li onClick={() => removeGroup(group?._id)}>O'chirish</li>
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
