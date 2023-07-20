import React from "react";
import AttendanceTable from "../components/AttendanceTable/AttendanceTable";
import "./AttendanceContentDetail.scss";
import { NavLink, useParams } from "react-router-dom";
import { BsDot } from "react-icons/bs";

const AttendanceContentDetail = () => {
  const { attendanceId } = useParams();

  return (
    <div className="attendance_detail_content">
      <div className="content_head">
        <div className="head_content">
          <h1 className="list_title">To'liq yo'qlama</h1>
          <ul className="head_links">
            <li>
              <NavLink to={`/dashboard`}>Dashboard</NavLink>
            </li>
            <li className="link_spot">
              <BsDot />
            </li>
            <li>
              <NavLink to={`/attendance/list`}>Yo'qlamalar ro'yxati</NavLink>
            </li>
            <li className="link_spot">
              <BsDot />
            </li>
            <li>
              <NavLink to={`/attendance/detail/${attendanceId}`}>
                Yo'qlamani tahrirlash
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="detail_body">
          <AttendanceTable />
      </div>
    </div>
  );
};

export default AttendanceContentDetail;
