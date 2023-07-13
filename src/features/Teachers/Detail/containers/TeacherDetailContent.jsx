import React, { useEffect, useState } from "react";
import TeacherInfo from "../components/TeacherInfo/TeacherInfo";
import TeacherGroups from "../components/TeacherGroups/TeacherGroups";
import { Loader } from "../../../../components";
import { NavLink, useParams } from "react-router-dom";
import { deleteTeacherApi, getTeacherApi } from "../../api";
import { BsDot } from "react-icons/bs";

const TeacherDetailContent = () => {
  const [loading, setLoading] = useState(true);
  const [teacher, setTeacher] = useState("");
  const [groups, setGroups] = useState("");
  const { teacherId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getTeacherApi(teacherId);
        setTeacher({
          name: data?.name,
          phone: data?.phone,
          groupsCount: data?.groupsCount,
          studentsCount: data?.studentsCount,
        });
        setGroups([...data?.groups]);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  const removeTeacher = () => {
    startTransition(async () => {
      await deleteTeacherApi(teacher?._id);
    });
    navigate("/teachers");
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="student_detail_content">
      <div className="content_head">
        <div className="head_content">
          <h1 className="list_title">O'qituvchi haqida batafsil</h1>
          <ul className="head_links">
            <li>
              <NavLink to={`/dashboard`}>Dashboard</NavLink>
            </li>
            <li className="link_spot">
              <BsDot />
            </li>
            <li>
              <NavLink to={`/teacher/list`}>O'qituvchilar ro'yxat</NavLink>
            </li>
            <li className="link_spot">
              <BsDot />
            </li>
            <li>
              <NavLink to={`/teacher/detail/${teacherId}`}>
                O'qituvchi tafsiloti
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="detail_body">
        <div className="content_item">
          <TeacherInfo removeTeacher={removeTeacher} teacher={teacher} />
        </div>
        <div className="content_item">
          <TeacherGroups groups={groups} setGroups={setGroups} />
        </div>
      </div>
    </div>
  );
};

export default TeacherDetailContent;
