import React from "react";
import { BiUser } from "react-icons/bi";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { IoWarningOutline } from "react-icons/io5";
import { textSub } from "../../../../../assets/scripts";

const CustomerCards = ({ customers, removeCustomer, toCreateStudent }) => {
  const navigate = useNavigate();

  return customers?.length ? (
    <div className="list_cards">
      {customers.map((customer, index) => (
        <div className="card" key={index + "-customer"}>
          <div className="card_head">
            <div className="card_icon">
              <BiUser />
            </div>
            <h3>{Object.values(customer?.name).join(" ")}</h3>
          </div>
          <div className="card_body">
            <p className="card_text">
              Tel. raqam: <span>{customer?.phone}</span>
            </p>
            <p className="card_text">
              Ma'lumot: <span>{textSub(customer?.info, 80)}</span>
            </p>
          </div>
          <div className="card_footer">
            <button onClick={() => navigate(`/customer/${customer?._id}/edit`)}>
              <AiOutlineEdit />
            </button>
            <button
              onClick={() =>
                removeCustomer(
                  customer?._id,
                  Object.values(customer?.name || "").join(" ")
                )
              }
            >
              <AiOutlineDelete />
            </button>
            <button onClick={() => toCreateStudent(customer)}>
              <AiOutlineUserAdd />
            </button>
          </div>
        </div>
      ))}
    </div>
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

export default CustomerCards;
