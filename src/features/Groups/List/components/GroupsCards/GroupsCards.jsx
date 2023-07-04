import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { FaLayerGroup } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const GroupsCards = ({ groups, removeGroup }) => {
  const navigate = useNavigate();

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
              Dars kuni:&nbsp;<span> {group.day}</span>
            </h4>
            <h4>
              Dars vaqti:&nbsp;<span> {group.time}</span>
            </h4>
          </div>
          <div className="card_footer">
            <button onClick={() => navigate(`/groups/${group._id}/edit`)}>
              <AiOutlineEdit />
            </button>
            <button onClick={() => removeGroup(group._id)}>
              <AiOutlineDelete />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupsCards;
