import React from "react";
import { BiUser } from "react-icons/bi";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineUserAdd,
} from "react-icons/ai";

const ClientsCards = ({ clients }) => {
  return (
    <div className="list_cards">
      {clients.map((client, index) => (
        <div className="card" key={index + "-client"}>
          <div className="card_head">
            <div className="card_icon">
              <BiUser />
            </div>
            <h3>{client.name}</h3>
          </div>
          <div className="card_body">
            <p>{client.info}</p>
            <span>{client.phone}</span>
          </div>
          <div className="card_footer">
            <button>
              <AiOutlineEdit />
            </button>
            <button>
              <AiOutlineDelete />
            </button>
            <button>
              <AiOutlineUserAdd />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClientsCards;
