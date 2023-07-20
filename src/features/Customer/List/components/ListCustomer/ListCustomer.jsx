import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoWarningOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineUserAdd,
} from "react-icons/ai";

const ListCustomer = ({ customers, removeCustomer }) => {
  const navigate = useNavigate();

  return customers?.length ? (
    <table className="list_table">
      <thead>
        <tr>
          <th>Ism</th>
          <th>Ma'lumot</th>
          <th>Tel. raqam</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {customers?.map((customer, index) => (
          <tr key={index + "-customer"}>
            <td>{Object.values(customer?.name).join(" ")}</td>
            <td>{customer?.info}</td>
            <td>{customer?.phone}</td>
            <td className="button_item">
              <button className="settings_btn">
                <BsThreeDotsVertical />
                <div className="dropdown">
                  <ul>
                    <li
                      onClick={() =>
                        navigate(`/customer/${customer?._id}/edit`)
                      }
                    >
                      <span>
                        <AiOutlineEdit />
                      </span>{" "}
                      O'zgartitrish
                    </li>
                    <li onClick={() => removeCustomer(customer?._id)}>
                      <span>
                        <AiOutlineDelete />
                      </span>{" "}
                      O'chirish
                    </li>
                    <li>
                      <span>
                        <AiOutlineUserAdd />
                      </span>{" "}
                      Qo'shish
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
        <p>Mijozlar mavjud emas</p>
      </h3>
    </div>
  );
};

export default ListCustomer;
