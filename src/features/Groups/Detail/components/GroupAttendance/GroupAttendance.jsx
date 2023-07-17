import React, { useEffect, useState } from "react";
import { CalendarDate } from "calendar-date";
import { Calendar } from "calendar-base";
import "./GroupAttendance.scss";
import { useParams } from "react-router-dom";
import { getAttendance, initAttendance } from "../../../api";
import Loader from "../../../../../components/Loader/Loader";
import { IoWarningOutline } from "react-icons/io5";
import { BsPlusLg } from "react-icons/bs";

const GroupAttendance = ({ group }) => {
  const { groupId } = useParams();
  const [loading, setLoading] = useState(true);
  const [currentAttendance, setCurrentAttendance] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");

  const [attendance, setAttendance] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getAttendance(groupId);
        setCurrentMonth(data.find((m) => m.current));
        setAttendance(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [currentAttendance]);

  console.log(currentMonth);

  const onInitAttendance = async () => {
    try {
      await initAttendance(
        { students: group.students, days: group.days },
        groupId
      );
      setCurrentAttendance("changed");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="group_attendance">
      {loading ? (
        <Loader />
      ) : attendance.length ? (
        <>
          <div className="attendance_head">
            <div className="head_content">
              <h2>O'quvchilar yo'qlamasi</h2>
              <div className="month_list">
                <ul>
                  {attendance?.map((table, index) => (
                    <li
                      className={
                        currentMonth.monthIndex === table.monthIndex
                          ? "active"
                          : ""
                      }
                      key={index}
                    >
                      {table?.month}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button>Yangilash</button>
          </div>
          <div className="attendance_body">
            {currentMonth ? (
              <div className="body_tab">
                <table className="attendance_table">
                  <thead>
                    <tr>
                      <th>№</th>
                      <th>Ism</th>
                      {currentMonth?.studentList?.[0]?.lessons.map(
                        (lesson, index) => (
                          <th key={index + "-day"}>
                            <span>{lesson.weekDay}</span>
                            <p>{lesson.date}</p>
                            <button>...</button>
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {currentMonth?.studentList?.map((student, index) => (
                      <tr key={index + "-client"}>
                        <td>{index + 1}.</td>
                        <td>Alfreds Futterkiste</td>
                        {student?.lessons?.map((lesson, index) => (
                          <td key={index}>
                            <button>+ {`${lesson.status}`}</button>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </div>
        </>
      ) : (
        <div className="no_attendance">
          <p>
            <span>
              <IoWarningOutline />
            </span>{" "}
            Bu guruhda yo'qlama mavjud emas!
          </p>
          <button onClick={onInitAttendance}>
            <span>
              <BsPlusLg />
            </span>{" "}
            Yo'qlama qo'shish
          </button>
        </div>
      )}
    </div>
  );
};

export default GroupAttendance;
