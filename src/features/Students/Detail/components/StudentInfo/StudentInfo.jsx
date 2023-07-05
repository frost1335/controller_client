import React, { useRef, useState } from "react";
import { formatter } from "../../../../../assets/scripts";

import "./StudentInfo.scss";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { TbReportMoney } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { GrClose } from "react-icons/gr";
import moment from "moment";
import { makePaymentApi } from "../../../api";

const StudentInfo = ({ student, setStudent, removeStudent }) => {
  const dialog = useRef(null);
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState("");
  const [info, setInfo] = useState("");
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  const onPaymentHandler = async (e) => {
    try {
      await makePaymentApi(
        {
          quantity,
          info,
          date,
        },
        student?._id
      );

      setStudent({ ...studentClone });

      clear();
    } catch (e) {
      console.log(e);
    }
  };

  const clear = () => {
    setQuantity("");
    setInfo("");
    setDate(moment().format("YYYY-MM-DD"));
  };

  return (
    <div className="student_info">
      <h2 className="student_name">{student?.name}</h2>
      <p className="student_phone">
        Student tel. raqami: &nbsp; <span>{student?.phone}</span>
      </p>
      <p className="student_group">
        Student guruhi: &nbsp;{" "}
        <span>
          {student?.group ? student.group : <button>Add to group</button>}
        </span>
      </p>
      <p className="student_teacher">
        Student o'qituvchisi: &nbsp;{" "}
        <span>
          {student?.group ? (
            student?.teacher ? (
              student?.teacher
            ) : (
              <button>Go to group settings</button>
            )
          ) : (
            <button>Add to group</button>
          )}
        </span>
      </p>
      <h4 className="student_balance">
        Student balansi: &nbsp;{" "}
        <span>{formatter.format(student?.balance)}</span>
      </h4>
      <div className="info_buttons">
        <button onClick={() => navigate(`/students/${student?._id}/edit`)}>
          <AiOutlineEdit />
        </button>
        <button onClick={removeStudent}>
          <AiOutlineDelete />
        </button>
        <button onClick={() => dialog?.current?.showModal()}>
          <TbReportMoney />
        </button>

        <dialog className="payment_modal" ref={dialog}>
          <div className="modal_box">
            <h3>To'lov qayd etish</h3>
            <button
              onClick={() => dialog?.current?.close()}
              className="close_button"
            >
              <GrClose />
            </button>
            <form method="dialog" onSubmit={onPaymentHandler}>
              <div className="input_form">
                <input
                  type="number"
                  placeholder="Miqdor"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="input_form">
                <input
                  type="text"
                  placeholder="Ma'lumot"
                  value={info}
                  onChange={(e) => setInfo(e.target.value)}
                />
              </div>
              <div className="input_form">
                <input
                  type="date"
                  placeholder="Sana"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="submit_form">
                <button type="submit">Davom etish</button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default StudentInfo;
