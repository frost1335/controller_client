import React, { startTransition, useRef, useState } from "react";
import "./TeacherGroups.scss";
import { Link } from "react-router-dom";
import { formatter } from "../../../../../assets/scripts";
import { RxCross1 } from "react-icons/rx";
import { Modal } from "../../../../../components";
import { getSpecStudentsApi } from "../../../../Students/api";
import { removeStudent } from "../../../../Groups/api";

const TeacherGroups = ({ groups, setGroups }) => {
  const dialog = useRef(null);

  const [toDelete, setToDelete] = useState("");

  const onDeleteSubmit = () => {
    try {
      startTransition(async () => {
        await removeStudent({ student: toDelete?._id }, toDelete?.groupId);
      });

      const currentGroup = groups.find((g) => g._id === toDelete?.groupId);

      let filteredStudents = [...currentGroup?.students];

      filteredStudents = filteredStudents.filter((s) => s._id !== toDelete._id);

      const filteredGroups = groups.map((group) =>
        group._id === toDelete?.groupId
          ? { ...group, students: [...filteredStudents] }
          : group
      );

      setGroups(filteredGroups);
    } catch (e) {
      console.log(e);
    }
  };

  const onDeleteClose = () => {
    dialog?.current?.close();
    setToDelete("");
  };

  return (
    <div className="teacher_groups">
      <h2>O'qituvchi guruhlari</h2>
      <div className="groups_list">
        {groups?.length ? (
          groups?.map((group, index) => (
            <div className="group_item" key={index}>
              <h3>
                Guruh nomi: &nbsp;
                <span>
                  <Link to={`/group/detail/${group?._id}`}>{group?.name}</Link>
                </span>
              </h3>
              <h3>
                Guruh kursi: &nbsp;
                <span>
                  {group?.course ? (
                    <Link to={`/course/detail/${group?.course?._id}`}>
                      {group?.course?.name}
                    </Link>
                  ) : (
                    "Guruhda hali kurs yo`q"
                  )}
                </span>
              </h3>
              <h3>
                Dars kunlari: &nbsp;<span>{group?.days?.join(", ")}</span>
              </h3>
              <h3>
                Dars vaqti: &nbsp;<span>{group?.time?.join("-")}</span>
              </h3>
              <ul>
                <li>
                  <span>Ism</span>
                  <span>Tel. raqam</span>
                  <span>Balans</span>
                  <span>&nbsp;</span>
                </li>
                {group?.students?.length ? (
                  group?.students?.map((student, index) => (
                    <li key={index}>
                      <span>
                        <Link to={`/student/detail/${student?._id}`}>
                          {student?.name}
                        </Link>
                      </span>
                      <span>{student?.phone}</span>
                      <span>{formatter.format(student?.balance || 0)}</span>
                      <span>
                        <button
                          onClick={() => {
                            setToDelete({
                              name: student?.name,
                              _id: student?._id,
                              groupId: group?._id,
                            });
                            dialog?.current?.showModal();
                          }}
                        >
                          <RxCross1 />
                        </button>
                      </span>
                    </li>
                  ))
                ) : (
                  <li className="empty_students">
                    <p>Bu guruhda hali o'quvchilar yo'q</p>
                  </li>
                )}
              </ul>
            </div>
          ))
        ) : (
          <div className="empty_groups">
            <p>Guruhlar mavjud emas</p>
          </div>
        )}
      </div>

      <Modal
        dialog={dialog}
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

export default TeacherGroups;
