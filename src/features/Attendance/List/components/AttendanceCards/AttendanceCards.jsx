import React from "react";
import { FaLayerGroup } from "react-icons/fa";
import { Link } from "react-router-dom";

const AttendanceCards = ({ attendances }) => {
  return attendances?.length ? (
    <div className="list_cards">
      {attendances.map((attendance, index) => (
        <div className="card" key={index + "-client"}>
          <div className="card_head">
            <div className="card_icon">
              <FaLayerGroup />
            </div>
            <h3>
              <Link to={`/attendance/detail/${attendance?._id}`}>
                {attendance?.name}
              </Link>
            </h3>
          </div>
          <div className="card_body">
            <p>{attendance?.course}</p>
            <span>{Object.values(attendance?.teacher || "").join(" ")}</span>
            <h4>
              Dars kuni:&nbsp;<span> {attendance?.days?.join(", ")}</span>
            </h4>
            <h4>
              O'quvchilar soni:&nbsp;
              <span> {attendance?.studentsCount} ta</span>
            </h4>
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
        <p>Yo'qlamalar mavjud emas</p>
      </h3>
    </div>
  );
};

export default AttendanceCards;
