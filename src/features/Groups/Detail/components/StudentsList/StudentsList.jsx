import React, { startTransition, useEffect, useRef, useState } from "react";
import "./StudentsList.scss";
import { Link, useParams } from "react-router-dom";
import { Modal } from "../../../../../components";
import { getSpecStudentsApi } from "../../../../Students/api";
import { BsCheck2 } from "react-icons/bs";
import { addStudents } from "../../../api";

const StudentsList = ({ group }) => {
  const dialog1 = useRef(null);
  const [allStudents, setAllStudents] = useState([]);
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const { groupId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSpecStudentsApi(groupId);
        setAllStudents([...data]);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  const onStudentHandler = async (id) => {
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

  const onStudentsSubmit = () => {
    try {
      startTransition(async () => {
        const studentsArr = students.map((s) => s._id);
        await addStudents(studentsArr, groupId);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const onClose = () => {
    dialog1?.current?.close();
    setStudents([]);
  };

  return (
    <div className="students_detail_list">
      <div className="list_heaad">
        <h2>Studentlar ro'yhati</h2>
        <button onClick={() => dialog1?.current?.showModal()}>
          O'quvchilar qo'shish
        </button>
      </div>
      {group?.students?.length ? (
        <table className="student_table">
          <thead>
            <tr>
              <th>Ism</th>
              <th>Tel. raqam</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {group?.students?.map((student, index) => (
              <tr key={index}>
                <td>
                  <Link to={`/students/detail/${student?._id}`}>
                    {student?.name}
                  </Link>
                </td>
                <td>{student?.phone}</td>
                <td>{student?.status}</td>
                <td>
                  <button>remove</button>
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
    </div>
  );
};

export default StudentsList;
