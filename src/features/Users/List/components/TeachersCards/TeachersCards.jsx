import React from "react";
import { FaUserTie } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const UsersCards = ({ users, removeUser }) => {
  return (
    <div className="list_cards">
      {users.map((user, index) => (
        <div className="card" key={index + "-user"}>
          <div className="card_head">
            <div className="card_icon">
              <FaUserTie />
            </div>
            <h3>{Object.values(user?.name || "").join(" ")}</h3>
          </div>
          <div className="card_body">
            <span>{user?.phone}</span>
          </div>
          <div className="card_footer">
            <button
              onClick={() =>
                removeUser(user?._id, Object.values(user?.name || "").join(" "))
              }
            >
              <MdDeleteOutline />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersCards;
