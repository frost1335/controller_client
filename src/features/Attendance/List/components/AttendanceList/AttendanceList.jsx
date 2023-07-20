import React from "react";
import { Link } from "react-router-dom";

const AttendanceList = ({ attendances }) => {
  return (
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
  );
};

export default AttendanceList;
