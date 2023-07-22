import React, { useEffect, useRef, useState } from "react";
import "./GroupDetailContent.scss";
import GroupInfo from "../components/GroupInfo/GroupInfo";
import StudentsList from "../components/StudentsList/StudentsList";
// import GroupAttendance from "../components/GroupAttendance/GroupAttendance";

import { deleteGroupApi, getGroupApi } from "../../api";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Loader, Modal } from "../../../../components";
import { BsDot } from "react-icons/bs";
import { errorAtom, warningAtom } from "../../../../app/atoms";
import { useAtom } from "jotai";

const GroupDetailContent = () => {
  // component helpers
  const dialog = useRef(null);
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [loading, setLoading] = useState(true);

  // data variables
  const [group, setGroup] = useState({});

  // atoms
  const [warning, setWarning] = useAtom(warningAtom);
  const [error, setError] = useAtom(errorAtom);

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

  const removeGroup = () => {
    document.activeElement.blur();
    dialog?.current?.showModal();
  };

  const onRemoveSubmit = async () => {
    const controller = new AbortController();

    try {
      const message = await deleteGroupApi(group?._id, controller);

      if (message) {
        setTimeout(() => {
          setWarning("");
        }, 5000);
        setWarning(message);
      }

      setError("");
    } catch (e) {
      if (e.response) {
        setTimeout(() => {
          setError("");
        }, 5000);
        setError(e?.response?.data?.error || errorMessage);
      }
    }

    controller.abort();
    navigate("/group/list");
  };

  const onRemoveClose = () => {
    dialog?.current?.close();
  };

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
          <GroupInfo
            removeGroup={removeGroup}
            group={group}
            setGroup={setGroup}
          />
        </div>
        <div className="content_item">
          <StudentsList group={group} setGroup={setGroup} />
        </div>
      </div>
      <Modal
        dialog={dialog}
        onClose={onRemoveClose}
        style={{ width: 450, height: 300 }}
      >
        <h3>O'chirish</h3>
        <form className="delete_form" onSubmit={onRemoveSubmit} method="dialog">
          <p>
            Guruh <span>"{group?.name}"</span>
            ni o'chirishni xohlaysizmi?
          </p>
          <div className="submit_form">
            <button type="submit">O'chirish</button>
            <button onClick={onRemoveClose} type="button">
              Bekor qilish
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default GroupDetailContent;
