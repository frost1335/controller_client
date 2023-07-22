import React, { useEffect, useState } from "react";
import AttendanceList from "../components/AttendanceList/AttendanceList";
import AttendanceCards from "../components/AttendanceCards/AttendanceCards";
import { Loader } from "../../../../components";
import { MAX_WIDTH_TABLET } from "../../../../constants";
import { getAllAttendance } from "../../api";
import { NavLink } from "react-router-dom";
import { BsDot } from "react-icons/bs";
import "./AttendanceContent.scss";
import { errorAtom } from "../../../../app/atoms";
import { useAtom } from "jotai";

const AttendanceContent = () => {
  const [error, setError] = useAtom(errorAtom);
  const [loading, setLoading] = useState(true);
  const [attendances, setAttendances] = useState([]);
  const [listEnable, setListEnable] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    if (windowWidth > MAX_WIDTH_TABLET) {
      setListEnable(true);
    } else {
      setListEnable(false);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getAllAttendance(controller);

        setAttendances(data);
        setError("");
        setLoading(false);
      } catch (e) {
        if (e.response) {
          setTimeout(() => {
            setError("");
          }, 5000);
          setError(e?.response?.data?.error || errorMessage);
        }
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="attendance_list">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="list_head">
            <div className="head_content">
              <h1 className="list_title">Yo'qlamalar</h1>
              <ul className="head_links">
                <li>
                  <NavLink to={`/dashboard`}>Dashboard</NavLink>
                </li>
                <li className="link_spot">
                  <BsDot />
                </li>
                <li>
                  <NavLink to={`/attendance/list`}>Ro'yxat</NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="list_body">
            {listEnable ? (
              <AttendanceList attendances={attendances} />
            ) : (
              <AttendanceCards attendances={attendances} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AttendanceContent;
