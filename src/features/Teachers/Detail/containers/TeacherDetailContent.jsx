import React, { useEffect, useState } from "react";
import TeacherInfo from "../components/TeacherInfo/TeacherInfo";
import TeacherGroups from "../components/TeacherGroups/TeacherGroups";
import { Loader } from "../../../../components";
import { useParams } from "react-router-dom";
import { deleteTeacherApi, getTeacherApi } from "../../api";

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
      <div className="left_content">
        <TeacherInfo removeTeacher={removeTeacher} teacher={teacher} />
      </div>
      <div className="right_content">
        <TeacherGroups groups={groups} setGroups={setGroups} />
      </div>
    </div>
  );
};

export default TeacherDetailContent;
