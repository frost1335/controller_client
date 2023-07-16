import React, { useEffect } from "react";
import { CalendarDate } from "calendar-date";
import { Calendar } from "calendar-base";
import "./GroupAttendance.scss";
import { useParams } from "react-router-dom";
import { initAttendance } from "../../../api";

const GroupAttendance = ({ studentsArr, lessonDays }) => {
  const { groupId } = useParams();

  console.log(CalendarDate.nowLocal());
  console.log(new Calendar().getCalendar(2023, 6));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await initAttendance(groupId);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="group_attendance">
      <div className="attendance_head">
        <div className="head_content">
          <h2>O'quvchilar yo'qlamasi</h2>
        </div>
        <button>Yangilash</button>
      </div>
      <table className="attendance_table">
        <thead>
          <tr>
            <th>№</th>
            <th>Ism</th>
            {new Array(9).fill("day").map((day, index) => (
              <th key={index + "-day"}>{index + 1}-kun</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[0, 1].map((client, index) => (
            <tr key={index + "-client"}>
              <td>{index + 1}.</td>
              <td>Alfreds Futterkiste</td>
              {new Array(9).fill("day").map((day, index) => (
                <td key={index}>
                  <button>+</button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GroupAttendance;
