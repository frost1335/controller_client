import React, { startTransition, useEffect, useRef, useState } from "react";
import "./StudentsList.scss";
import { Link, useParams } from "react-router-dom";
import { Modal } from "../../../../../components";
import { getSpecStudentsApi } from "../../../../Students/api";
import { BsCheck2, BsPlusLg } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { addStudents, removeStudent } from "../../../api";
import { formatter } from "../../../../../assets/scripts";
import {
  errorAtom,
  infoAtom,
  successAtom,
  warningAtom,
} from "../../../../../app/atoms";
import { useAtom } from "jotai";

const StudentsList = ({ group, setGroup }) => {
  // component helpers
  const dialog1 = useRef(null);
  const dialog2 = useRef(null);
  const { groupId } = useParams();

  // atoms
  const [infoMsg, setInfoMsg] = useAtom(infoAtom);
  const [warning, setWarning] = useAtom(warningAtom);
  const [error, setError] = useAtom(errorAtom);
  const [success, setSuccess] = useAtom(successAtom);

  // data variables
  const [allStudents, setAllStudents] = useState([]);
  const [students, setStudents] = useState([]);
  const [toDelete, setToDelete] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const data = await getSpecStudentsApi(controller);
        setAllStudents([...data]);

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

  const onStudentHandler = (id) => {
    const isStudent = students.find((s) => s._id === id);
    let newStudents = [...students];
    if (isStudent) {
      newStudents = newStudents?.filter((s) => s._id !== id);
    } else {
      const student = allStudents?.find((s) => s._id === id);
      newStudents.push(student);
    }
    setStudents([...newStudents]);
  };

  const onStudentsSubmit = async () => {
    const controller = new AbortController();

    try {
      const studentsArr = students.map((s) => s._id);

      const message = await addStudents(studentsArr, groupId, controller);

      if (message) {
        setTimeout(() => {
          setSuccess("");
        }, 5000);
        setSuccess(message);
      }

      let sortedStudents = structuredClone([...group.students, ...students]);

      sortedStudents.sort((a, b) => {
        const nameA = Object.values(a?.name || "")
          .join(" ")
          ?.toUpperCase();
        const nameB = Object.values(b?.name || "")
          .join(" ")
          ?.toUpperCase();
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
        return 0;
      });

      sortedStudents.sort(
        (a, b) =>
          Object.values(a?.name || "")
            .join(" ")
            .toLowerCase() -
          Object.values(b?.name || "")
            .join(" ")
            .toLowerCase()
      );

      setGroup({ ...group, students: [...sortedStudents] });

      const filterAllStudents = allStudents.filter(
        (s) => !sortedStudents.find((st) => st._id === s._id)
      );

      setAllStudents([...filterAllStudents]);
      setStudents([]);
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

  const onDeleteSubmit = async () => {
    const controller = new AbortController();

    try {
      const message = await removeStudent({ student: toDelete._id }, groupId);

      if (message) {
        setTimeout(() => {
          setWarning("");
        }, 5000);
        setWarning(message);
      }

      let filteredStudents = [...group?.students];
      filteredStudents = filteredStudents.filter((s) => s._id !== toDelete._id);
      setGroup({ ...group, students: [...filteredStudents] });

      const deletedStudent = group?.students.find(
        (s) => s._id === toDelete._id
      );
      setAllStudents([...allStudents, deletedStudent]);
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
    dialog1?.current?.close();
    setStudents([]);
  };

  const onDeleteClose = () => {
    dialog2?.current?.close();
    setToDelete("");
  };

  return (
    <div className="students_detail_list">
      <div className="list_heaad">
        <h2>O'quvchilar ro'yhati</h2>
        <button onClick={() => dialog1?.current?.showModal()}>
          <span>
            <BsPlusLg />
          </span>{" "}
          O'quvchi qo'shish
        </button>
      </div>
      {group?.students?.length ? (
        <table className="students_table">
          <thead>
            <tr>
              <th>Ism</th>
              <th>Tel. raqam</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {group?.students?.map((student, index) => (
              <tr key={index}>
                <td>
                  <Link to={`/student/detail/${student?._id}`}>
                    {Object.values(student?.name || "").join(" ")}
                  </Link>
                </td>
                <td>{student?.phone}</td>
                <td className="remove_column">
                  <button
                    onClick={() => {
                      setToDelete({
                        name: Object.values(student.name || "").join(" "),
                        _id: student._id,
                      });
                      dialog2?.current?.showModal();
                    }}
                  >
                    <RxCross1 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Guruhda o'quvchilar yo'q</p>
      )}

      <Modal dialog={dialog1} onClose={onClose}>
        <h3>O'quvchilar qo'shish</h3>
        <form
          onSubmit={onStudentsSubmit}
          className="students_form"
          method="dialog"
        >
          <div className="form_head">
            <h4>Mavjud o'quvchilar ro'yxati</h4>
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              type="text"
              placeholder="Qidirish"
            />
          </div>
          <div className="students_list">
            <li className="head_item">
              <p>Ism</p>
              <p>Guruh</p>
              <p>Tel. raqam</p>
            </li>
            {allStudents?.length ? (
              <ul>
                {allStudents?.map((student, index) => {
                  const match =
                    Object.values(student.name || "")
                      .join(" ")
                      .toLowerCase()
                      .indexOf(search.toLocaleLowerCase()) >= 0;

                  return match ? (
                    <li
                      key={index}
                      onClick={() => onStudentHandler(student?._id)}
                    >
                      <span>
                        {students.find((s) => s._id === student._id) ? (
                          <BsCheck2 />
                        ) : null}
                      </span>
                      <div className="item_content">
                        <p>{Object.values(student?.name).join(" ")}</p>
                        <p>{student?.group?.name}</p>
                        <h5>{student?.phone}</h5>
                      </div>
                    </li>
                  ) : null;
                })}
              </ul>
            ) : (
              <p>Boshqa o'quvchilar mavjud emas</p>
            )}
          </div>
          <div className="form_info">
            <p>
              Yangi o'quvchilar: &nbsp; <span>{students?.length} ta</span>
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
        dialog={dialog2}
        onClose={onDeleteClose}
        style={{ width: 450, height: 300 }}
      >
        <h3>O'chirish</h3>
        <form className="delete_form" onSubmit={onDeleteSubmit} method="dialog">
          <p>
            O'quvchi <span>"{toDelete.name}"</span> ni o'chirishni xohlaysizmi?
          </p>
          <div className="submit_form">
            <button type="submit">O'chirish</button>
            <button onClick={onDeleteClose} type="button">
              Bekor qilish
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default StudentsList;
