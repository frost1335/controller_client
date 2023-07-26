import React from "react";
import { FaLayerGroup } from "react-icons/fa";
import { Link } from "react-router-dom";

const AttendanceCards = ({ attendances }) => {
  return attendances?.length ? (
    <div className="list_cards">
      {attendances.map((attendance, index) => (
        <Link
          className="card_link"
          to={`/attendance/detail/${attendance?._id}`}
        >
          <div className="card" key={index + "-client"}>
            <div className="card_head">
              <div className="card_icon">
                <FaLayerGroup />
              </div>
              <h3>{attendance?.name}</h3>
            </div>
            <div className="card_body">
              <p className="card_text">
                Kurs: <span>{attendance?.course}</span>
              </p>
              <p className="card_text">
                O'qituvchi:
                <span>
                  {Object.values(attendance?.teacher || "").join(" ")}
                </span>
              </p>
              <p className="card_text">
                Dars kuni: <span>{attendance?.days?.join(", ")}</span>
              </p>
              <p className="card_text">
                O'quvchilar soni: <span>{attendance?.studentsCount}</span>
              </p>
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
        <p>Yo'qlamalar mavjud emas</p>
      </h3>
    </div>
  );
};

export default AttendanceCards;
