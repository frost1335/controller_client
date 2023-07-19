import React, { useEffect, useRef, useState } from "react";
import { CalendarDate } from "calendar-date";
import "./GroupAttendance.scss";
import { Link, useParams } from "react-router-dom";
import {
  addLessonApi,
  deleteLessonApi,
  editStudentStatus,
  getAttendance,
  initAttendance,
  refreshAttendance,
} from "../../../api";
import Loader from "../../../../../components/Loader/Loader";
import { IoWarningOutline } from "react-icons/io5";
import { MdRestartAlt } from "react-icons/md";
import { BsPlusLg, BsThreeDots } from "react-icons/bs";
import { FiDelete } from "react-icons/fi";
import Modal from "../../../../../components/Modal/Modal";

const GroupAttendance = ({ group }) => {
  const dialog1 = useRef(null);
  const dialog2 = useRef(null);
  const { groupId } = useParams();
  const [loading, setLoading] = useState(true);
  const [currentAttendance, setCurrentAttendance] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");

  const [attendance, setAttendance] = useState("");
  const [addLesson, setAddLesson] = useState("");
  const [lessonWarning, setLessonWarning] = useState("");
  const [deleteData, setDeleteData] = useState("");

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
  }, [currentAttendance, group.students]);

  const onInitAttendance = async () => {
    try {
      await initAttendance(groupId);
      setCurrentAttendance("changed");
    } catch (e) {
      console.log(e);
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

    setCurrentMonth({ ...newMonth });
    try {
      await editStudentStatus(groupId, {
        studentId,
        status,
        date,
        month,
      });
    } catch (e) {
      console.log(e);
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
      console.log(groupId, addLesson, currentMonth?.month);
      await addLessonApi(
        { date: addLesson, month: currentMonth?.month },
        groupId
      );

      setAddLesson("");
      setCurrentAttendance(rand);
    } catch (e) {
      console.log(e);
    }
  };

  const onDeleteLesson = (month, date) => {
    document.activeElement.blur();
    dialog2?.current?.showModal();
    setDeleteData({ month, date, day: new CalendarDate(date).day });
  };

  const onDeleteSubmit = async (rand = Math.floor(Math.random * 1000)) => {
    try {
      await deleteLessonApi(
        { month: deleteData.month, date: deleteData.date },
        groupId
      );

      setDeleteData("");
      setCurrentAttendance(rand);
    } catch (e) {
      console.log(e);
    }
  };

  const onCloseDelete = () => {
    dialog2?.current?.close();
    setDeleteData("");
  };

  const onRefresh = async (rand = Math.floor(Math.random * 1000)) => {
    try {
      await refreshAttendance(groupId);

      setCurrentAttendance(rand);
    } catch (e) {
      console.log(e);
    }
  };

  const onChangeAttendance = (month) => {
    let newMonth = attendance.find((table) => table.monthIndex === month);
    setCurrentMonth(newMonth);
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
                      onClick={() => onChangeAttendance(table.monthIndex)}
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
                          <p>
                            {new CalendarDate(lesson.date).day}-
                            {currentMonth?.month}
                          </p>
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
                  {currentMonth?.studentList?.map((item, index) => (
                    <tr key={index + "-client"}>
                      <td>{index + 1}.</td>
                      <td>
                        <div className="name_box">
                          <Link to={`/student/detail/${item?.student?._id}`}>
                            {item?.student?.name}
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
                              {lesson.status === null ? null : lesson.status ? (
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
                                      month: currentMonth.month,
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
                                      month: currentMonth.month,
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
                  ))}
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
              value={addLesson}
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
            </span>
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

export default GroupAttendance;
