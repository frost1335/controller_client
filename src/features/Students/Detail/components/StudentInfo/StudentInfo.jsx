import React, { startTransition, useEffect, useRef, useState } from "react";
import { formatter } from "../../../../../assets/scripts";

import "./StudentInfo.scss";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { TbReportMoney } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";

import moment from "moment";
import { makePaymentApi } from "../../../api";
import { Modal } from "../../../../../components";
import { getAllGroupsApi } from "../../../../Groups/api";

const StudentInfo = ({ student, setStudent, removeStudent }) => {
  const navigate = useNavigate();
  const dialog1 = useRef(null);
  const dialog2 = useRef(null);

  const [groupList, setGroupList] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [info, setInfo] = useState("");
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  useEffect(() => {
    startTransition(async () => {
      try {
        const data = await getAllGroupsApi();
        setGroupList([...data]);
      } catch (e) {
        console.log(e);
      }
    });
  }, []);

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

      setStudent(() => ({
        ...student,
        paymentHistory: [...student.paymentHistory, { quantity, info, date }],
      }));

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
      <div className="info_left">
        <h2 className="student_name">{student?.name}</h2>
        <p className="student_phone">
          Student tel. raqami: &nbsp; <span>{student?.phone}</span>
        </p>
        <h4 className="student_balance">
          Student balansi: &nbsp;{" "}
          <span>{formatter.format(student?.balance || 0)}</span>
        </h4>
        <div className="info_buttons">
          <button onClick={() => navigate(`/students/${student?._id}/edit`)}>
            <AiOutlineEdit />
          </button>
          <button onClick={removeStudent}>
            <AiOutlineDelete />
          </button>
          <button onClick={() => dialog1?.current?.showModal()}>
            <TbReportMoney />
          </button>
        </div>
      </div>
      <div className="info_right">
        <div className="info_card">
          <div className="card_item">
            <p>
              Guruh nomi:
              <span>
                <Link to={`/groups/detail/${student?.group?._id}`}>
                  {student?.group?.name}
                </Link>
              </span>
            </p>
            <p>
              Dars kunlari : <span>{student?.group?.days?.join(", ")}</span>
            </p>
            <p>
              Dars vaqti : <span>{student?.group?.time?.join("-")}</span>
            </p>
          </div>
          <div className="card_item">
            <p>
              O'qituvchi ismi:
              <span>
                <Link to={`/teachers/detail/${student?.teacher?._id}`}>
                  {student?.teacher?.name}
                </Link>
              </span>
            </p>
            <p>
              O'qituvchi tel. raqami : <span>{student?.teacher?.phone}</span>
            </p>
          </div>
          <div className="card_item">
            <p>
              Kurs nomi:
              <span>
                <Link to={`/courses/detail/${student?.course?._id}`}>
                  {student?.course?.name}
                </Link>
              </span>
            </p>
            <p>
              Kurs narxi :{" "}
              <span>{formatter.format(student?.course?.price || 0)}</span>
            </p>
          </div>
        </div>
      </div>

      <Modal dialog={dialog1}>
        <h3>To'lov qayd etish</h3>
        <form
          className="payment_form"
          method="dialog"
          onSubmit={onPaymentHandler}
        >
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
      </Modal>
      <Modal dialog={dialog2}>
        <h3>Guruhni tanlash</h3>
        <ul className="group_list">
          <li className="list_item">
            <h4>Guruh-6</h4>
            <p>21-o'quvchi mavjud</p>
            <p>400000 so'm</p>
            <p>Web dasturlash</p>
            <p>Dilrozbek</p>
            <p>Shan - Yak</p>
            <p>16:00 - 18:00</p>
          </li>
        </ul>
      </Modal>
    </div>
  );
};

export default StudentInfo;
