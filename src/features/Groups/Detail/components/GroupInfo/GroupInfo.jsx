import React, { useTransition, useEffect, useRef, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BiBook } from "react-icons/bi";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { BsCheck2, BsCircle, BsPlusLg } from "react-icons/bs";
import { FaUserTie } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";

import "./GroupInfo.scss";
import { useNavigate, useParams } from "react-router-dom";
import { formatter } from "../../../../../assets/scripts";
import { Modal } from "../../../../../components";
import { WEEKS_IN_MONTH, weekdays } from "../../../../../constants";
import { detachTeacherField, editGroupApi } from "../../../api";
import { getAllTeachersApi } from "../../../../Teachers/api";
import { getAllCoursesApi } from "../../../../Courses/api";

const GroupInfo = ({ group, setGroup }) => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [isPending, startTransition] = useTransition();

  const dialog1 = useRef(null);
  const dialog2 = useRef(null);
  const dialog3 = useRef(null);
  const dialog4 = useRef(null);

  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [teacher, setTeacher] = useState(group?.teacher);
  const [course, setCourse] = useState(group?.course);
  const [days, setDays] = useState([...group?.days]);
  const lessonsInMonth = [
    Math.floor(days?.length * WEEKS_IN_MONTH),
    Math.ceil(days?.length * WEEKS_IN_MONTH),
  ];

  const [startTime, setStartTime] = useState(group?.time?.[0] || "00:00");
  const [endTime, setEndTime] = useState(group?.time?.[1] || "00:00");

  useEffect(() => {
    try {
      startTransition(async () => {
        const teachers = await getAllTeachersApi();
        const courses = await getAllCoursesApi();

        setTeachers([...teachers]);
        setCourses([...courses]);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const onDayHandler = (day) => {
    const isDay = days.find((d) => d === day);
    let newDays = [...days];
    if (isDay) {
      newDays = newDays.filter((d) => d !== day);
    } else {
      newDays.push(day);
    }
    newDays = weekdays.map((d) =>
      newDays.includes(d.short) ? d.short : false
    );
    newDays = newDays.filter((d) => d);
    setDays([...newDays]);
  };

  const onUpdateSubmit = (e) => {
    try {
      startTransition(async () => {
        await editGroupApi(
          { days: [...days], time: [startTime, endTime] },
          groupId
        );
      });
      setGroup({ ...group, days: [...days], time: [startTime, endTime] });
    } catch (e) {
      console.log(data);
    }
  };

  const onClose = () => {
    dialog1?.current?.close();
    dialog2?.current?.close();
    setDays([...group?.days]);
    setStartTime(group?.time[0]);
    setEndTime(group?.time[1]);
  };

  const onTeacherClose = () => {
    dialog3?.current?.close();
    dialog4?.current?.close();
    setTeacher(group?.teacher);
    setCourse(group?.course);
  };

  const onTeacherSubmit = () => {
    try {
      startTransition(async () => {
        if (teacher) {
          await editGroupApi(
            {
              teacher: teacher?._id,
            },
            groupId
          );
        }
        if (!teacher) {
          await detachTeacherField({ teacher: "" }, groupId);
        }
      });
      setGroup({ ...group, teacher });
    } catch (e) {
      console.log(e);
    }
  };

  const onCourseSubmit = () => {
    try {
      startTransition(async () => {
        if (course) {
          await editGroupApi(
            {
              course: course?._id,
            },
            groupId
          );
        }
        if (!course) {
          await detachTeacherField({ course: "" }, groupId);
        }
        setGroup({ ...group, course });
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="student_info group_info">
      <div className="info_left">
        <h2 className="student_name">{group?.name}</h2>
        <p className="student_teacher">
          Studentlar soni: &nbsp; <span>{group?.students?.length}</span>
        </p>
        <h4 className="info_text">
          Ma'lumot: &nbsp;
          <p>{group?.info}</p>
        </h4>
        <div className="date">
          <div className="card" onClick={() => dialog1?.current?.showModal()}>
            <p>
              kunlari: &nbsp;
              <span>{days.length ? days.join(", ") : "Belgilanmagan"}</span>
            </p>
          </div>
          <div className="card" onClick={() => dialog2?.current?.showModal()}>
            <p>
              Vaqti: &nbsp;
              <span>
                {!startTime || !endTime
                  ? "Belgilanmagan"
                  : `${startTime} - ${endTime}`}
              </span>
            </p>
          </div>
        </div>

        {/* date and time modal boxes */}
        <div>
          <Modal onClose={onClose} dialog={dialog1}>
            <h3>Dars kunlarini belgilang</h3>
            <form
              method="dialog"
              onSubmit={onUpdateSubmit}
              className="day_form"
            >
              <h4>Hafta kunlari: </h4>
              <ul>
                {weekdays.map((day, index) => (
                  <li key={index} onClick={() => onDayHandler(day.short)}>
                    <span>
                      {days?.includes(day.short) ? <BsCheck2 /> : null}
                    </span>
                    <p>{day.name}</p>
                  </li>
                ))}
              </ul>
              <div className="form_info">
                <p>
                  Dars kunlari: &nbsp; <span>{days.join(", ")}</span>
                </p>
                <p>
                  Oyiga: &nbsp;{" "}
                  <span>
                    {lessonsInMonth[0]} yoki {lessonsInMonth[1]} ta dars
                  </span>
                </p>
              </div>
              <div className="submit_form">
                <button type="submit">Davom etish</button>
                <button onClick={onClose} type="button">
                  Bekor qilish
                </button>
              </div>
            </form>
          </Modal>
          <Modal
            onClose={onClose}
            dialog={dialog2}
            style={{ width: 600, height: "50%" }}
          >
            <h3>Dars vaqtini belgilang</h3>
            <form
              method="dialog"
              onSubmit={onUpdateSubmit}
              className="time_form"
            >
              <div className="time_inputs">
                <div className="input_form">
                  <label htmlFor="start">Boshlanish vaqti: </label>
                  <input
                    timeformat="24h"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    type="time"
                    id="start"
                  />
                </div>
                <div className="input_form">
                  <label htmlFor="end">Tugash vaqti: </label>
                  <input
                    timeformat="24h"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    type="time"
                    id="end"
                  />
                </div>
              </div>
              <div className="submit_form">
                <button type="submit">Davom etish</button>
                <button onClick={onClose} type="button">
                  Bekor qilish
                </button>
              </div>
            </form>
          </Modal>
        </div>

        <div className="info_buttons">
          <button onClick={() => navigate(`/groups/${group?._id}/edit`)}>
            <AiOutlineEdit />
          </button>
          <button>
            <AiOutlineDelete />
          </button>
        </div>
      </div>
      <div className="info_right">
        {teacher ? (
          <div className="info_card">
            <div className="card_head">
              <div className="card_icon">
                <FaUserTie />
              </div>
              <h3>{teacher?.name}</h3>
              <span>O'qituvchi </span>
            </div>
            <p>Tel. raqam - &nbsp; {teacher?.phone}</p>
            <div className="card_footer">
              <button onClick={() => dialog3?.current?.showModal()}>
                <LiaExchangeAltSolid />
              </button>
              <button
                onClick={() => navigate(`/teachers/detail/${teacher?._id}`)}
              >
                <AiOutlineInfoCircle />
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => dialog3?.current?.showModal()}
            className="alternate_card"
          >
            <div className="card_head">
              <BsPlusLg />
            </div>
            <div className="card_content">
              <h3>Ustoz qo'shish</h3>
              <p>Bu guruhda ustoz yo'q</p>
            </div>
          </div>
        )}
        {course ? (
          <div className="info_card">
            <div className="card_head">
              <div className="card_icon">
                <BiBook />
              </div>
              <h3>{course?.name}</h3>
              <span>Kurs</span>
            </div>
            <p>Kurs narxi - &nbsp; {formatter.format(course?.price)}</p>
            <div className="card_footer">
              <button onClick={() => dialog4?.current?.showModal()}>
                <LiaExchangeAltSolid />
              </button>
              <button
                onClick={() => navigate(`/courses/detail/${course?._id}`)}
              >
                <AiOutlineInfoCircle />
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => dialog4?.current?.showModal()}
            className="alternate_card"
          >
            <div className="card_head">
              <BsPlusLg />
            </div>
            <div className="card_content">
              <h3>Kurs qo'shish</h3>
              <p>Bu guruhga kurs biriktirilmagan</p>
            </div>
          </div>
        )}
      </div>

      {/* teacher and course modal boxes */}
      <div>
        {isPending ? null : (
          <>
            <Modal onClose={onTeacherClose} dialog={dialog3}>
              <h3>Guruh o'qituvchisini belgilang</h3>
              <form
                onSubmit={onTeacherSubmit}
                className="teacher_form"
                method="dialog"
              >
                <h4>O'qituvchilar ro'yxati: </h4>
                {teachers.length ? (
                  <ul>
                    {teachers?.map((teacherEl, index) => (
                      <li key={index} onClick={() => setTeacher(teacherEl)}>
                        <span>
                          {teacherEl._id === teacher?._id ? <BsCircle /> : null}
                        </span>
                        <div className="item_content">
                          <p>{teacherEl?.name}</p>
                          <h5>{teacherEl?.phone}</h5>
                        </div>
                      </li>
                    ))}
                    <li
                      onClick={() => setTeacher(null)}
                      className={!teacher ? "no-elem" : null}
                    >
                      <span>{!teacher ? <RxCross1 /> : null}</span>
                      <div className="item_content">
                        <p>O'qituvchi tanlamaslik</p>
                        <h5>Va saqlash</h5>
                      </div>
                    </li>
                  </ul>
                ) : (
                  <p>O'qituvchilar hali qo'shilmagan</p>
                )}

                <div className="submit_form">
                  <button type="submit">Davom etish</button>
                  <button onClick={onTeacherClose} type="button">
                    Bekor qilish
                  </button>
                </div>
              </form>
            </Modal>
            <Modal onClose={onTeacherClose} dialog={dialog4}>
              <h3>Guruh kursini belgilang</h3>
              <form
                onSubmit={onCourseSubmit}
                className="course_form"
                method="dialog"
              >
                <h4>Kurslar ro'yxati: </h4>
                {courses.length ? (
                  <ul>
                    {courses?.map((courseEl, index) => (
                      <li key={index} onClick={() => setCourse(courseEl)}>
                        <span>
                          {courseEl._id === course?._id ? <BsCircle /> : null}
                        </span>
                        <div className="item_content">
                          <p>{courseEl?.name}</p>
                          <h5>{formatter.format(courseEl?.price)}</h5>
                        </div>
                      </li>
                    ))}
                    <li
                      onClick={() => setCourse(null)}
                      className={!course ? "no-elem" : null}
                    >
                      <span>{!course ? <RxCross1 /> : null}</span>
                      <div className="item_content">
                        <p>Kurs tanlamaslik</p>
                        <h5>Va saqlash</h5>
                      </div>
                    </li>
                  </ul>
                ) : (
                  <p>Kurslar hali qo'shilmagan</p>
                )}

                <div className="submit_form">
                  <button type="submit">Davom etish</button>
                  <button onClick={onTeacherClose} type="button">
                    Bekor qilish
                  </button>
                </div>
              </form>
            </Modal>
          </>
        )}
      </div>
    </div>
  );
};

export default GroupInfo;
