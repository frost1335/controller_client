import React, { startTransition, useEffect, useState } from "react";
import { MAX_WIDTH_TABLET } from "../../../../constants";
import GroupsCards from "../components/GroupsCards/GroupsCards";
import GroupsList from "../components/GroupsList/GroupsList";
import "./GroupsContent.scss";
import { useNavigate } from "react-router-dom";
import { deleteGroupApi, getAllGroupsApi } from "../../api";
import { Loader } from "../../../../components";

const GroupsContent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState([]);
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getAllGroupsApi();
        console.log(data);
        setGroups(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const removeGroup = (id) => {
    try {
      startTransition(async () => {
        await deleteGroupApi(id);
      });
      const filteredGroups = groups.filter((g) => g._id !== id);
      setGroups([...filteredGroups]);
      document.activeElement.blur();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="groups_list">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="list_head">
            <h1 className="list_title">Guruhlar</h1>
            <button
              className="list_button"
              onClick={() => navigate("/groups/new")}
            >
              <span>+</span> Guruh qo'shish
            </button>
          </div>
          <div className="list_body">
            {listEnable ? (
              <GroupsList groups={groups} removeGroup={removeGroup} />
            ) : (
              <GroupsCards groups={groups} removeGroup={removeGroup} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default GroupsContent;
