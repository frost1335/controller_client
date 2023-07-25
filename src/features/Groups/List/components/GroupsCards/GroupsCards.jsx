import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { FaLayerGroup } from "react-icons/fa";
import { IoWarningOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const GroupsCards = ({ groups, removeGroup }) => {
  const navigate = useNavigate();

  return groups?.length ? (
    <div className="list_cards">
      {groups.map((group, index) => (
        <Link className="card_link" to={`/group/detail/${group?._id}`}>
          <div className="card" key={index + "-client"}>
            <div className="card_head">
              <div className="card_icon">
                <FaLayerGroup />
              </div>
              <h3>
                <Link to={`/group/detail/${group?._id}`}>{group?.name}</Link>
              </h3>
            </div>
            <div className="card_body">
              <p>{group?.course}</p>
              <span>{Object.values(group?.teacher || "").join(" ")}</span>
              <h4>
                Dars kuni:&nbsp;<span> {group?.days?.join(", ")}</span>
              </h4>
              <h4>
                Dars vaqti:&nbsp;<span> {group?.time?.join("-")}</span>
              </h4>
              <h4>
                O'quvchilar soni:&nbsp;
                <span> {group?.studentsCount} ta</span>
              </h4>
            </div>
            <div className="card_footer">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/group/${group?._id}/edit`);
                }}
              >
                <AiOutlineEdit />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  removeGroup(group?._id, group?.name);
                }}
              >
                <AiOutlineDelete />
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  ) : (
    <div className="empty_list">
      <h3>
        <span className="empty_icon">
          <IoWarningOutline />
        </span>
        <p>Guruhlar mavjud emas</p>
      </h3>
    </div>
  );
};

export default GroupsCards;
