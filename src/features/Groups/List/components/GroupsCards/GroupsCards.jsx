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
              <h3>{group?.name}</h3>
            </div>
            <div className="card_body">
              <p className="card_text">
                Kurs: <span>{group?.course}</span>
              </p>
              <p className="card_text">
                O'qituvchi:{" "}
                <span>{Object.values(group?.teacher || "").join(" ")}</span>
              </p>
              <p className="card_text">
                Dars kuni: <span>{group?.days?.join(", ")}</span>
              </p>
              <p className="card_text">
                Dars vaqti: <span> {group?.time?.join("-")}</span>
              </p>
              <p className="card_text">
                O'quvchilar soni:
                <span> {group?.studentsCount} ta</span>
              </p>
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
