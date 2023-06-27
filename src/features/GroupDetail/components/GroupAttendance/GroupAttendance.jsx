import React from "react";
import CalendarDates from "calendar-dates";
import "./GroupAttendance.scss";

const calendarDates = new CalendarDates();

const GroupAttendance = ({ studentsArr, lessonDays }) => {
  const fetDate = async () => {
    console.log(await calendarDates.getMatrix(new Date()));
  };

  fetDate();

  return (
    <div className="group_attendance">
      <table className="attendance_table">
        <thead>
          <tr>
            <th>№</th>
            <th>Ism</th>
            {new Array(9).fill("day").map(() => (
              <th>1-kun</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {studentsArr.map((client, index) => (
            <tr key={index + "-client"}>
              <td>{index + 1}.</td>
              <td>Alfreds Futterkiste</td>
              {new Array(9).fill("day").map(() => (
                <td>
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
