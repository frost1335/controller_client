import React, { useEffect, useRef, useState } from "react";
import {
  addLessonApi,
  deleteLessonApi,
  editStudentStatus,
  getAttendance,
  initAttendance,
  refreshAttendance,
} from "../../../api";
import { Loader, Modal } from "../../../../../components";
import { BsPlusLg, BsThreeDots } from "react-icons/bs";
import { FiDelete } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { IoWarningOutline } from "react-icons/io5";
import { CalendarDate } from "calendar-date";
import { MdRestartAlt } from "react-icons/md";

import "./AttendanceTable.scss";
import {
  errorAtom,
  infoAtom,
  successAtom,
  warningAtom,
} from "../../../../../app/atoms";
import { useAtom } from "jotai";

const AttendanceTable = () => {
  // atoms
  const [infoMsg, setInfoMsg] = useAtom(infoAtom);
  const [success, setSuccess] = useAtom(successAtom);
  const [error, setError] = useAtom(errorAtom);
  const [warning, setWarning] = useAtom(warningAtom);

  const dialog1 = useRef(null);
  const dialog2 = useRef(null);
  const { attendanceId } = useParams();
  const [loading, setLoading] = useState(true);
  const [currentAttendance, setCurrentAttendance] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");
  const [groupDetail, setGroupDetail] = useState("");

  const [attendance, setAttendance] = useState("");
  const [addLesson, setAddLesson] = useState("");
  const [lessonWarning, setLessonWarning] = useState("");
  const [deleteData, setDeleteData] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getAttendance(attendanceId, controller);
        setCurrentMonth(data?.attendance?.find((m) => m.current));
        setGroupDetail({
          name: data?.name,
          _id: data?._id,
        });
        setAttendance(data?.attendance);
        setLoading(false);
        setError("");
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
  }, [currentAttendance]);

  const onInitAttendance = async (rand = Math.floor(Math.random * 1000)) => {
    try {
      const message = await initAttendance(attendanceId);

      if (message) {
        setTimeout(() => {
          setInfoMsg("");
        }, 5000);
        setInfoMsg(message);
      }

      setError("");
      setCurrentAttendance(rand);
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

  const onEditStatus = async ({
    studentIndex,
    lessonIndex,
    studentId,
    status,
    date,
    month,
  }) => {
    document.activeElement.blur();

    let newMonth = structuredClone(currentMonth);

    newMonth.studentList[studentIndex].lessons[lessonIndex].status = status;

    let newAttendance = attendance?.map((table) =>
      table?.monthIndex === newMonth?.monthIndex ? newMonth : table
    );

    setAttendance([...newAttendance]);
    setCurrentMonth({ ...newMonth });
    try {
      await editStudentStatus(attendanceId, {
        studentId,
        status,
        date,
        month,
      });

      setError("");
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

  const onClose = () => {
    dialog1?.current?.close();
    setAddLesson("");
  };

  const onLessonAdd = (value) => {
    setLessonWarning("");

    const isLesson = currentMonth?.studentList?.[0]?.lessons.find(
      (l) => l.date === value
    );

    if (isLesson) {
      setLessonWarning(true);
    }

    setAddLesson(value);
  };

  const onLessonSubmit = async (rand = Math.floor(Math.random * 1000)) => {
    try {
      const message = await addLessonApi(
        { date: addLesson, month: currentMonth?.month },
        attendanceId
      );

      if (message) {
        setTimeout(() => {
          setSuccess("");
        }, 5000);
        setSuccess(message);
      }

      setError("");
      setAddLesson("");
      setCurrentAttendance(rand);
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

  const onDeleteLesson = (month, date) => {
    document.activeElement.blur();
    dialog2?.current?.showModal();
    setDeleteData({ month, date, day: new CalendarDate(date).day });
  };

  const onDeleteSubmit = async (rand = Math.floor(Math.random * 1000)) => {
    try {
      const message = await deleteLessonApi(
        { month: deleteData.month, date: deleteData.date },
        attendanceId
      );

      if (message) {
        setTimeout(() => {
          setWarning("");
        }, 5000);
        setWarning(message);
      }

      setError("");
      setDeleteData("");
      setCurrentAttendance(rand);
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

  const onCloseDelete = () => {
    dialog2?.current?.close();
    setDeleteData("");
  };

  const onRefresh = async (rand = Math.floor(Math.random * 1000)) => {
    try {
      const message = await refreshAttendance(attendanceId);

      if (message) {
        setTimeout(() => {
          setInfoMsg("");
        }, 5000);
        setInfoMsg(message);
      }

      setError("");
      setCurrentAttendance(rand);
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

  const onChangeAttendance = (month) => {
    let newMonth = attendance.find((table) => table.monthIndex === month);
    setCurrentMonth(newMonth);
  };

  return (
    <div className="attendance_details">
      {loading ? (
        <Loader />
      ) : attendance.length ? (
        <>
          <div className="attendance_head">
            <div className="head_content">
              <h2>
                <Link to={`/group/detail/${groupDetail?._id}`}>
                  {groupDetail?.name}
                </Link>{" "}
                o'quvchilar yo'qlamasi
              </h2>
              <div className="month_list">
                <ul>
                  {attendance?.map((table, index) => (
                    <li key={index}>
                      <button
                        className={
                          currentMonth?.monthIndex === table.monthIndex
                            ? "active"
                            : ""
                        }
                        onClick={() => onChangeAttendance(table.monthIndex)}
                      >
                        {table?.month}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button onClick={onRefresh}>
              <span>
                <MdRestartAlt />
              </span>{" "}
              Yangilash
            </button>
          </div>
          <div className="attendance_body">
            {currentMonth ? (
              <table className="attendance_table">
                <thead>
                  <tr>
                    <th>№</th>
                    <th>Ism</th>
                    {currentMonth?.studentList?.[0]?.lessons.map(
                      (lesson, index) => (
                        <th key={index + "-day"}>
                          <span>{lesson.weekDay}</span>
                          <pre>
                            {new CalendarDate(lesson.date).day}-
                            {currentMonth?.month}
                          </pre>
                          <button className="day_control">
                            <span>
                              <BsThreeDots />
                            </span>
                            <div className="dropdown">
                              <span
                                onClick={() =>
                                  onDeleteLesson(
                                    currentMonth?.month,
                                    lesson.date
                                  )
                                }
                              >
                                <FiDelete />
                              </span>
                            </div>
                          </button>
                        </th>
                      )
                    )}
                    <th>
                      <p>Dars qo'shish</p>
                      <button onClick={() => dialog1?.current?.showModal()}>
                        <BsPlusLg />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentMonth?.studentList?.map((item, index) => {
                    if (item?.student && item?.student?.name) {
                      return (
                        <tr key={index + "-client"}>
                          <td>{index + 1}.</td>
                          <td>
                            <div className="name_box">
                              <Link
                                to={`/student/detail/${item?.student?._id}`}
                              >
                                <pre>
                                  {Object.values(
                                    item?.student?.name || ""
                                  ).join(" ")}
                                </pre>
                              </Link>
                              <pre>{`${item?.student?.phone}`}</pre>
                            </div>
                          </td>
                          {item?.lessons?.map((lesson, idx) => (
                            <td key={idx}>
                              <div className="select_status">
                                <button
                                  className={`set_status ${
                                    lesson.status !== null ? "modified" : ""
                                  }`}
                                >
                                  {lesson.status ===
                                  null ? null : lesson.status ? (
                                    <span className="positive">Bor</span>
                                  ) : (
                                    <span className="negative">Yo'q</span>
                                  )}
                                  <div className="dropdown">
                                    <span
                                      onClick={() =>
                                        onEditStatus({
                                          ...lesson,
                                          status: true,
                                          studentIndex: index,
                                          lessonIndex: idx,
                                          month: currentMonth?.month,
                                          studentId: item?.student?._id,
                                        })
                                      }
                                      className="pos"
                                    >
                                      Keldi
                                    </span>
                                    <span
                                      onClick={() =>
                                        onEditStatus({
                                          ...lesson,
                                          status: false,
                                          studentIndex: index,
                                          lessonIndex: idx,
                                          month: currentMonth?.month,
                                          studentId: item?.student?._id,
                                        })
                                      }
                                      className="neg"
                                    >
                                      Kelmadi
                                    </span>
                                    <span
                                      onClick={() =>
                                        onEditStatus({
                                          ...lesson,
                                          status: null,
                                          studentIndex: index,
                                          lessonIndex: idx,
                                          month: currentMonth?.month,
                                          studentId: item?.student?._id,
                                        })
                                      }
                                    >
                                      Noma'lum
                                    </span>
                                  </div>
                                </button>
                              </div>
                            </td>
                          ))}
                        </tr>
                      );
                    } else {
                      return null;
                    }
                  })}
                </tbody>
              </table>
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

      {/* modal */}
      <Modal
        dialog={dialog1}
        onClose={onClose}
        style={{ width: 450, height: 300 }}
      >
        <h3>Yo'qlamaga dars qo'shish</h3>
        <form
          onSubmit={onLessonSubmit}
          className="attendance_form"
          method="dialog"
        >
          <div className="input_form">
            <label htmlFor="date">Sana tanlang:</label>
            <input
              onChange={(e) => onLessonAdd(e.target.value)}
              value={
                addLesson ||
                new CalendarDate(
                  currentMonth?.year || new Date().getFullYear(),
                  currentMonth?.monthIndex + 1 || new Date().getMonth() + 1,
                  1
                ).toFormat("yyyy-MM-dd")
              }
              type="date"
              name="date"
              id="date"
            />
          </div>

          {lessonWarning ? (
            <div className="warning">
              <span>
                <IoWarningOutline />
              </span>
              <p>Bu sanada dars mavjud</p>
            </div>
          ) : null}

          <div className="submit_form">
            <button disabled={lessonWarning} type="submit">
              Davom etish
            </button>
            <button onClick={onClose} type="button">
              Bekor qilish
            </button>
          </div>
        </form>
      </Modal>
      <Modal
        dialog={dialog2}
        onClose={onCloseDelete}
        style={{ width: 450, height: 300 }}
      >
        <h3>Darsni o'chirish</h3>
        <form
          className="delete_lesson_form"
          method="dialog"
          onSubmit={onDeleteSubmit}
        >
          <p>
            <span>
              "{deleteData.day}-{deleteData.month}"
            </span>{" "}
            dagi darsni o'chirishni tasdiqlaysizmi?
          </p>
          <div className="submit_form">
            <button type="submit">Davom etish</button>
            <button onClick={onCloseDelete} type="button">
              Bekor qilish
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AttendanceTable;
