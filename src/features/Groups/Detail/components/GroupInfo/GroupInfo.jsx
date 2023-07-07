import React, { startTransition, useRef, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BiBook } from "react-icons/bi";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { BsThreeDots, BsCheck2 } from "react-icons/bs";
import { FaUserTie } from "react-icons/fa";

import "./GroupInfo.scss";
import { useNavigate, useParams } from "react-router-dom";
import { formatter } from "../../../../../assets/scripts";
import { Modal } from "../../../../../components";
import { WEEKS_IN_MONTH, weekdays } from "../../../../../constants";
import { editGroupApi } from "../../../api";

const GroupInfo = ({ group, setGroup }) => {
  const dialog1 = useRef(null);
  const dialog2 = useRef(null);
  const navigate = useNavigate();
  const [days, setDays] = useState([...group?.days]);
  const lessonsInMonth = Math.floor(days.length * WEEKS_IN_MONTH);
  const { groupId } = useParams();
  const [startTime, setStartTime] = useState(group?.time[0] || "00:00");
  const [endTime, setEndTime] = useState(group?.time[1] || "00:00");

  console.log(startTime, endTime);

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
              kunlari: &nbsp;<span>{days.join(", ")}</span>
            </p>
          </div>
          <div className="card" onClick={() => dialog2?.current?.showModal()}>
            <p>
              Vaqti: &nbsp;
              <span>
                {startTime}-{endTime}
              </span>
            </p>
          </div>
        </div>

        {/* modal boxes */}
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
                  Oyiga: &nbsp; <span>{lessonsInMonth} ta dars</span>
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
          <Modal dialog={dialog2} style={{ width: 600, height: "50%" }}>
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
        <div className="info_card">
          <div className="card_head">
            <div className="card_icon">
              <FaUserTie />
            </div>
            <h3>{group?.teacher?.name}</h3>
            <span>O'qituvchi </span>
          </div>
          <p>Tel. raqam - &nbsp; {group?.teacher?.phone}</p>
          <div className="card_footer">
            <button>
              <LiaExchangeAltSolid />
            </button>
            <button
              onClick={() => navigate(`/teachers/detail/${group?.teacher}`)}
            >
              <BsThreeDots />
            </button>
          </div>
        </div>
        <div className="info_card">
          <div className="card_head">
            <div className="card_icon">
              <BiBook />
            </div>
            <h3>{group?.course?.name}</h3>
            <span>Kurs</span>
          </div>
          <p>Kurs narxi - &nbsp; {formatter.format(group?.course?.price)}</p>
          <div className="card_footer">
            <button>
              <LiaExchangeAltSolid />
            </button>
            <button
              onClick={() => navigate(`/courses/detail/${group?.course}`)}
            >
              <BsThreeDots />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupInfo;
