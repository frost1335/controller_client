import React, { useEffect, useState } from "react";
import "./GroupDetailContent.scss";
import GroupInfo from "../components/GroupInfo/GroupInfo";
import StudentsList from "../components/StudentsList/StudentsList";
import GroupAttendance from "../components/GroupAttendance/GroupAttendance";

import { getGroupApi } from "../../api";
import { NavLink, useParams } from "react-router-dom";
import { Loader } from "../../../../components";
import { BsDot } from "react-icons/bs";

const GroupDetailContent = () => {
  const [group, setGroup] = useState({});
  const { groupId } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getGroupApi(groupId);
        setGroup({ ...data });
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };

    fetchData();
  }, [groupId]);

  return loading ? (
    <Loader />
  ) : (
    <div className="group_detail_content">
      <div className="content_head">
        <div className="head_content">
          <h1 className="list_title">Guruh haqida batafsil</h1>
          <ul className="head_links">
            <li>
              <NavLink to={`/dashboard`}>Dashboard</NavLink>
            </li>
            <li className="link_spot">
              <BsDot />
            </li>
            <li>
              <NavLink to={`/group/list`}>Guruhlar ro'yxati</NavLink>
            </li>
            <li className="link_spot">
              <BsDot />
            </li>
            <li>
              <NavLink to={`/group/detail/${groupId}`}>Guruh tafsiloti</NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="detail_body">
        <div className="content_item">
          <GroupInfo group={group} setGroup={setGroup} />
        </div>
        <div className="content_item">
          <StudentsList group={group} setGroup={setGroup} />
        </div>
        <div className="content_item">
          <GroupAttendance group={group} />
        </div>
      </div>
    </div>
  );
};

export default GroupDetailContent;
