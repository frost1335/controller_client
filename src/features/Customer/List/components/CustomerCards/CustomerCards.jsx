import React from "react";
import { BiUser } from "react-icons/bi";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { IoWarningOutline } from "react-icons/io5";

const CustomerCards = ({ customers, removeCustomer }) => {
  const navigate = useNavigate();

  return customers?.length ? (
    <div className="list_cards">
      {customers.map((customer, index) => (
        <div className="card" key={index + "-customer"}>
          <div className="card_head">
            <div className="card_icon">
              <BiUser />
            </div>
            <h3>{customer?.name}</h3>
          </div>
          <div className="card_body">
            <p>{customer?.info}</p>
            <span>{customer?.phone}</span>
          </div>
          <div className="card_footer">
            <button onClick={() => navigate(`/customer/${customer?._id}/edit`)}>
              <AiOutlineEdit />
            </button>
            <button onClick={() => removeCustomer(customer?._id)}>
              <AiOutlineDelete />
            </button>
            <button>
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
