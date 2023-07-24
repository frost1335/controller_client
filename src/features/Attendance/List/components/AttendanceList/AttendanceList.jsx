import React from "react";
import { IoWarningOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const AttendanceList = ({ attendances }) => {
  return attendances?.length ? (
    <table className="list_table">
      <thead>
        <tr>
          <th>Guruh nomi</th>
          <th>Kurs</th>
          <th>O'qituvchi</th>
          <th>Kunlari</th>
          <th>O'quvchilar</th>
        </tr>
      </thead>
      <tbody>
        {attendances.map((attendance, index) => (
          <tr key={index + "-group"}>
            <td>
              <Link
                className="table_link"
                to={`/attendance/detail/${attendance?._id}`}
              >
                {attendance?.name}
              </Link>
            </td>
            <td>{attendance?.course}</td>
            <td>{Object.values(attendance?.teacher || "").join(" ")}</td>
            <td>{attendance?.days?.join(", ")}</td>
            <td>{attendance?.studentsCount} ta</td>
          </tr>
        ))}
      </tbody>
    </table>
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

export default AttendanceList;
