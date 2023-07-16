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

  const [attendance, setAttendance] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getAttendance(groupId);
        setAttendance(data?.attendance);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  console.log(new Date().getFullYear());

  const onInitAttendance = async () => {
    try {
      const data = await initAttendance(
        { students: group.students, days: group.days },
        groupId
      );

      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="group_attendance">
      {loading ? (
        <Loader />
      ) : attendance ? (
        <>
          <div className="attendance_head">
            <div className="head_content">
              <h2>O'quvchilar yo'qlamasi</h2>
            </div>
            <button>Yangilash</button>
          </div>
          <div className="attendance_body">
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
