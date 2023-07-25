import React, { startTransition, useEffect, useRef, useState } from "react";
import { formatter } from "../../../../../assets/scripts";

import "./StudentInfo.scss";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { TbReportMoney } from "react-icons/tb";
import { BsPlusLg, BsCircle } from "react-icons/bs";
import { IoWarningOutline } from "react-icons/io5";
import { LiaEdit } from "react-icons/lia";
import { Link, useNavigate } from "react-router-dom";

import moment from "moment";
import { makePaymentApi } from "../../../api";
import { Modal } from "../../../../../components";
import {
  addStudents,
  getAllGroupsApi,
  getMinGroups,
  removeStudent,
  replaceStudent,
} from "../../../../Groups/api";
import { useAtom } from "jotai";
import {
  errorAtom,
  infoAtom,
  successAtom,
  warningAtom,
} from "../../../../../app/atoms";

const StudentInfo = ({
  student,
  setStudent,
  removeStudent: removeOneStudent,
  setCurrentGroup,
}) => {
  // component utils
  const navigate = useNavigate();
  const dialog1 = useRef(null);
  const dialog2 = useRef(null);
  const dialog3 = useRef(null);

  // atoms
  const [warning, setWarning] = useAtom(warningAtom);
  const [error, setError] = useAtom(errorAtom);
  const [success, setSuccess] = useAtom(successAtom);
  const [infoMsg, setInfoMsg] = useAtom(infoAtom);

  // data variables
  const [group, setGroup] = useState(student?.group?._id);
  const [groupList, setGroupList] = useState([]);

  // form variables
  const [quantity, setQuantity] = useState("");
  const [method, setMethod] = useState("");
  const [info, setInfo] = useState("");
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        let data;
        if (group) {
          data = await getMinGroups(group, controller);
        } else {
          data = await getAllGroupsApi(controller);
        }
        setGroupList([...data]);

        setError("");
      } catch (e) {
        if (e.response) {
          setTimeout(() => {
            setError("");
          }, 5000);
          setError(e?.response?.data?.error || errorMessage);
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, []);

  const onPaymentHandler = async (e) => {
    const controller = new AbortController();

    try {
      const message = await makePaymentApi(
        {
          quantity,
          method,
          info,
          date,
        },
        student?._id,
        controller
      );

      if (message) {
        setTimeout(() => {
          setSuccess("");
        }, 5000);
        setSuccess(message);
      }

      const sortedPayments = [
        ...student.paymentHistory,
        { quantity, info, method, date },
      ].sort((a, b) => new Date(b.date) - new Date(a.date));

      setStudent(() => ({
        ...student,
        paymentHistory: sortedPayments,
      }));

      setError("");
      clear();
    } catch (e) {
      if (e.response) {
        setTimeout(() => {
          setError("");
        }, 5000);
        setError(e?.response?.data?.error || errorMessage);
      }
    }

    controller.abort();
  };

  const clear = () => {
    setQuantity("");
    setInfo("");
    setMethod("");
    setDate(moment().format("YYYY-MM-DD"));
  };

  const onGroupSubmit = async () => {
    const controller = new AbortController();

    try {
      const message = await addStudents([student?._id], group, controller);

      if (message) {
        setTimeout(() => {
          setSuccess("");
        }, 5000);
        setSuccess(message);
      }

      setError("");
      setCurrentGroup(group);
    } catch (e) {
      if (e.response) {
        setTimeout(() => {
          setError("");
        }, 5000);
        setError(e?.response?.data?.error || errorMessage);
      }
    }

    controller.abort();
  };

  const onChangeGroupSubmit = async () => {
    const controller = new AbortController();

    try {
      if (group === "delete") {
        const message = await removeStudent(
          { student: student?._id },
          student?.group?._id,
          controller
        );

        if (message) {
          setTimeout(() => {
            setWarning("");
          }, 5000);
          setWarning(message);
        }
      } else {
        const message = await replaceStudent(
          { newGroupId: group, studentId: student?._id },
          student?.group?._id,
          controller
        );

        if (message) {
          setTimeout(() => {
            setInfoMsg("");
          }, 5000);
          setInfoMsg(message);
        }
      }

      setCurrentGroup(group);
    } catch (e) {
      if (e.response) {
        setTimeout(() => {
          setError("");
        }, 5000);
        setError(e?.response?.data?.error || errorMessage);
      }
    }

    controller.abort();
  };

  const onClose = () => {
    dialog2?.current?.close();
    setGroup("");
  };

  const onChangeClose = () => {
    dialog3?.current?.close();
    setGroup("");
  };

  return (
    <div className="student_info">
      <div className="info_left">
        <h2 className="student_name">
          {Object.values(student?.name).join(" ")}
        </h2>
        <p className="student_phone">
          O'quvchi tel. raqami: &nbsp; <span>{student?.phone}</span>
        </p>
        <p className="student_phone">
          O'quvchi haqida ma'lumot: &nbsp; <span>{student?.info}</span>
        </p>
        <div className="info_buttons">
          <button onClick={() => navigate(`/student/${student?._id}/edit`)}>
            <AiOutlineEdit />
          </button>
          <button onClick={removeOneStudent}>
            <AiOutlineDelete />
          </button>
          <button onClick={() => dialog1?.current?.showModal()}>
            <TbReportMoney />
          </button>
        </div>
      </div>
      <div className="info_right">
        {student?.group ? (
          <div className="info_card">
            <div className="card_item">
              <p>
                Guruh nomi:
                <span>
                  <Link to={`/group/detail/${student?.group?._id}`}>
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
                  <Link to={`/teacher/detail/${student?.teacher?._id}`}>
                    {Object.values(student?.teacher?.name || "").join(" ")}
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
                  <Link to={`/course/detail/${student?.course?._id}`}>
                    {student?.course?.name}
                  </Link>
                </span>
              </p>
              <p>
                Kurs narxi :{" "}
                <span>{formatter.format(student?.course?.price || 0)}</span>
              </p>
            </div>
            <div className="card_footer">
              <button onClick={() => dialog3?.current?.showModal()}>
                <LiaEdit />
              </button>
            </div>
          </div>
        ) : (
          <div
            className="add_group"
            onClick={() => dialog2?.current?.showModal()}
          >
            <div className="add_icon">
              <BsPlusLg />
            </div>
            <div className="add_content">
              <h3>Guruhga qo'shish</h3>
              <p>O'quvchi hali guruhga qo'shilmagan!</p>
            </div>
          </div>
        )}
      </div>

      <Modal dialog={dialog1}>
        <h3>To'lov qayd etish</h3>
        <form
          className="payment_form"
          method="dialog"
          onSubmit={onPaymentHandler}
        >
          <div className="input_form">
            <label htmlFor="quantity">Miqdor:</label>
            <input
              type="number"
              id="quantity"
              placeholder="Miqdor"
              value={quantity}
              maxLength={22}
              required
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="input_form">
            <label htmlFor="method">Usul:</label>
            <select
              className="input_select"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              name="method"
              id="method"
              maxLength={16}
              required
              placeholder="Usul"
            >
              <option value="Bank">Bank</option>
              <option value="Karta">Karta</option>
              <option value="Click">Click</option>
              <option value="Naqd">Naqd</option>
            </select>
          </div>
          <div className="input_form">
            <label htmlFor="date">Sana:</label>
            <input
              type="date"
              id="date"
              placeholder="Sana"
              value={date}
              maxLength={16}
              required
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="input_form">
            <label htmlFor="info">Ma'lumot:</label>
            <textarea
              type="text"
              id="info"
              value={info}
              onChange={(e) => setInfo(e.target.value)}
              placeholder="Ma'lumot"
              maxLength={78}
              required
              rows={3}
            />
          </div>
          <div className="submit_form">
            <button type="submit">Davom etish</button>
          </div>
        </form>
      </Modal>
      <Modal onClose={onClose} dialog={dialog2}>
        <h3>Guruhni tanlash</h3>
        <form onSubmit={onGroupSubmit} className="group_add" method="dialog">
          <h4>Guruhlar ro'yxati</h4>
          <div className="groups_list">
            <ul>
              {groupList.map((groupEl, index) => (
                <li
                  onClick={() => setGroup(groupEl?._id)}
                  className="list_item"
                  key={index}
                >
                  <span className="item_icon">
                    {group === groupEl?._id ? <BsCircle /> : null}
                  </span>
                  <div className="item_content">
                    <h5>{groupEl?.name}</h5>
                    <div className="content_body">
                      <p>
                        Dars kunlari: <span>{groupEl?.days?.join(", ")}</span>
                      </p>
                      <p>
                        Dars vaqti: <span>{groupEl?.time?.join("-")}</span>
                      </p>
                      <p>
                        O'quvchilar soni:{" "}
                        <span>{groupEl?.studentsCount} ta</span>
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="submit_form">
            <button type="submit">Davom etish</button>
            <button onClick={onClose} type="button">
              Bekor qilish
            </button>
          </div>
        </form>
      </Modal>
      <Modal onClose={onChangeClose} dialog={dialog3}>
        <h3>Guruhni o'zgartirish</h3>
        <form
          onSubmit={onChangeGroupSubmit}
          className="group_add"
          method="dialog"
        >
          <h4>Guruhlar ro'yxati</h4>
          <div className="groups_list">
            {groupList?.length ? (
              <ul>
                {groupList.map((groupEl, index) => (
                  <li
                    onClick={() => setGroup(groupEl?._id)}
                    className="list_item"
                    key={index}
                  >
                    <span className="item_icon">
                      {group === groupEl?._id ? <BsCircle /> : null}
                    </span>
                    <div className="item_content">
                      <h5>{groupEl?.name}</h5>
                      <div className="content_body">
                        <p>
                          Dars kunlari: <span>{groupEl?.days?.join(", ")}</span>
                        </p>
                        <p>
                          Dars vaqti: <span>{groupEl?.time?.join("-")}</span>
                        </p>
                        <p>
                          O'quvchilar soni:{" "}
                          <span>{groupEl?.studentsCount} ta</span>
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
                <li
                  onClick={() => setGroup("delete")}
                  className="list_item leave_item"
                >
                  <span className="item_icon">
                    {group === "delete" ? <BsCircle /> : null}
                  </span>
                  <div className="item_content">
                    <h5>Guruhdan chiqarish</h5>
                  </div>
                </li>
              </ul>
            ) : (
              <p>Boshqa guruhlar mavjud emas</p>
            )}
          </div>
          {group === "delete" ? (
            <div className="warning">
              <div className="warning_icon">
                <IoWarningOutline />
              </div>
              <div className="warning_content">O'quvchi guruhni tark etadi</div>
            </div>
          ) : null}
          <div className="submit_form">
            <button type="submit">Davom etish</button>
            <button onClick={onChangeClose} type="button">
              Bekor qilish
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default StudentInfo;
