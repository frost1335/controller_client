import React, { useRef } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BiBook, BiEditAlt } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { FaUserTie } from "react-icons/fa";

import "./GroupInfo.scss";
import { useNavigate } from "react-router-dom";
import { formatter } from "../../../../../assets/scripts";
import { Modal } from "../../../../../components";

const GroupInfo = ({ group }) => {
  const dialog1 = useRef(null);
  const dialog2 = useRef(null);
  const navigate = useNavigate();

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
              kunlari: &nbsp;<span>24-07-2023</span>
            </p>
          </div>
          <div className="card" onClick={() => dialog2?.current?.showModal()}>
            <p>
              Vaqti: &nbsp;<span>16:00-18:00</span>
            </p>
          </div>
        </div>

        {/* modal boxes */}
        <div>
          <Modal dialog={dialog1}>modal for days</Modal>
          <Modal dialog={dialog2}>modal for time</Modal>
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
              <BiEditAlt />
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
              <BiEditAlt />
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
