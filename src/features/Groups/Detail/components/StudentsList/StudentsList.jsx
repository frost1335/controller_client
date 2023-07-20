import React, { startTransition, useEffect, useRef, useState } from "react";
import "./StudentsList.scss";
import { Link, useParams } from "react-router-dom";
import { Modal } from "../../../../../components";
import { getSpecStudentsApi } from "../../../../Students/api";
import { BsCheck2, BsPlusLg } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { addStudents, removeStudent } from "../../../api";
import { formatter } from "../../../../../assets/scripts";

const StudentsList = ({ group, setGroup }) => {
  const dialog1 = useRef(null);
  const dialog2 = useRef(null);
  const [allStudents, setAllStudents] = useState([]);
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [toDelete, setToDelete] = useState("");
  const { groupId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSpecStudentsApi();
        setAllStudents([...data]);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
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
    try {
      const studentsArr = students.map((s) => s._id);

      await addStudents(studentsArr, groupId);

      let sortedStudents = structuredClone([...group.students, ...students]);

      sortedStudents.sort((a, b) => {
        const nameA = a?.name?.first.toUpperCase();
        const nameB = b?.name?.first.toUpperCase();
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
        return 0;
      });

      sortedStudents.sort(
        (a, b) => a?.name.toLowerCase() - b?.name.toLowerCase()
      );
      setGroup({ ...group, students: [...sortedStudents] });
      const filterAllStudents = allStudents.filter(
        (s) => !students.find((st) => st._id === s._id)
      );
      setAllStudents([...filterAllStudents]);
      setStudents([]);
    } catch (e) {
      console.log(e);
    }
  };

  const onDeleteSubmit = async () => {
    try {
      await removeStudent({ student: toDelete._id }, groupId);

      let filteredStudents = [...group?.students];
      filteredStudents = filteredStudents.filter((s) => s._id !== toDelete._id);
      setGroup({ ...group, students: [...filteredStudents] });

      const deletedStudent = group?.students.find(
        (s) => s._id === toDelete._id
      );
      setAllStudents([...allStudents, deletedStudent]);
    } catch (e) {
      console.log(e);
    }
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
                    student.name
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
                        <p>{student?.name}</p>
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
