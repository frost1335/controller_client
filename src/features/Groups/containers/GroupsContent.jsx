import React, { useEffect, useState } from "react";
import { MAX_WIDTH_TABLET } from "../../../constants";
import GroupsCards from "../components/GroupsCards/GroupsCards";
import GroupsList from "../components/GroupsList/GroupsList";
import './GroupsContent.scss'

const GroupsContent = () => {
  const [groups, setGroups] = useState([
    {
      name: "Alfreds Futterkiste",
      course: "Web dasturlash",
      teacher: "Javlonbek Mirzaabdullayev",
      day: "Sha-Yak",
      time: "18:00-20:00",
    },
    {
      name: "Guruh-6",
      course: "SMM",
      teacher: "Raximov Dilrozbek",
      day: "Du-Pay",
      time: "14:00-16:00",
    },
  ]);
  const [listEnable, setListEnable] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    if (windowWidth > MAX_WIDTH_TABLET) {
      setListEnable(true);
    } else {
      setListEnable(false);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  return (
    <div className="groups_list">
      <div className="list_head">
        <h1 className="list_title">Guruhlar</h1>
      </div>
      <div className="list_body">
        {listEnable ? (
          <GroupsList groups={groups} />
        ) : (
          <GroupsCards groups={groups} />
        )}
      </div>
    </div>
  );
};

export default GroupsContent;
