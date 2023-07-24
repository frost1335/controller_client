import React from "react";
import { MdDeleteOutline } from "react-icons/md";

const UsersList = ({ users, removeUser }) => {
  return (
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
  );
};

export default UsersList;
