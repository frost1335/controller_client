import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { FaLayerGroup } from "react-icons/fa";
import { Link } from "react-router-dom";

const GroupsCards = ({ groups }) => {
  return (
    <div className="list_cards">
      {groups.map((group, index) => (
        <div className="card" key={index + "-client"}>
          <div className="card_head">
            <div className="card_icon">
              <FaLayerGroup />
            </div>
            <h3>
              <Link to="/groups/detail/123249">{group.name}</Link>
            </h3>
          </div>
          <div className="card_body">
            <p>{group.course}</p>
            <span>{group.teacher}</span>
            <h4>
              Dars kuni:&nbsp;<h5> {group.day}</h5>
            </h4>
            <h4>
              Dars vaqti:&nbsp;<h5> {group.time}</h5>
            </h4>
          </div>
          <div className="card_footer">
            <button>
              <AiOutlineEdit />
            </button>
            <button>
              <AiOutlineDelete />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupsCards;
