import React, { useEffect, useState } from "react";
import "./GroupDetailContent.scss";
import GroupInfo from "../components/GroupInfo/GroupInfo";
import StudentsList from "../components/StudentsList/StudentsList";
import GroupAttendance from "../components/GroupAttendance/GroupAttendance";

import { getGroupApi } from "../../api";
import { useParams } from "react-router-dom";
import { Loader } from "../../../../components";

const GroupDetailContent = () => {
  const [group, setGroup] = useState({});
  const { groupId } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
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
  }, []);

  return (
    <div className="group_detail_content">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="content_item">
            <GroupInfo group={group} setGroup={setGroup} />
          </div>
          <div className="content_item">
            <StudentsList group={group} />
          </div>
          <div className="content_item">
            <GroupAttendance group={group} />
          </div>
        </>
      )}
    </div>
  );
};

export default GroupDetailContent;
