import React from "react";
import "./GroupDetailContent.scss";
import GroupInfo from "../components/GroupInfo/GroupInfo";
import StudentsList from "../components/StudentsList/StudentsList";

const GroupDetailContent = () => {
  return (
    <div className="group_detail_content">
      <div className="content_item">
        <GroupInfo />
      </div>
      <div className="content_item">
        <StudentsList />
      </div>
    </div>
  );
};

export default GroupDetailContent;
