import React from "react";
import { BiUser } from "react-icons/bi";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const ClientsCards = ({ clients, removeLid }) => {
  const navigate = useNavigate();

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
            <button onClick={() => navigate(`/lids/${client._id}/edit`)}>
              <AiOutlineEdit />
            </button>
            <button onClick={(e) => removeLid(client._id)}>
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
