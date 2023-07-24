import React from "react";
import { IoWarningOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";

const UsersList = ({ users, removeUser }) => {
  return users?.length ? (
    <table className="list_table">
      <thead>
        <tr>
          <th>Ism</th>
          <th>Tel. raqam</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index + "-user"}>
            <td>{Object.values(user?.name).join(" ")}</td>
            <td>{user?.phone}</td>
            <td className="button_item">
              <button
                className="settings_btn"
                onClick={() =>
                  removeUser(
                    user?._id,
                    Object.values(user?.name || "").join(" ")
                  )
                }
              >
                <MdDeleteOutline />
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
        <p>Foydalanuvchilar mavjud emas</p>
      </h3>
    </div>
  );
};

export default UsersList;
