import React, { useEffect, useRef, useState } from "react";
import { MAX_WIDTH_TABLET } from "../../../../constants";

import "./UsersContent.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { Loader, Modal } from "../../../../components";
import { BsDot, BsPlusLg } from "react-icons/bs";
import { useAtom } from "jotai";
import { errorAtom, warningAtom } from "../../../../app/atoms";
import UsersList from "../components/UsersList/UsersList";
import UsersCards from "../components/UsersCards/UsersCards";
import { deleteUser, getUsers } from "../../api";

const UsersContent = () => {
  // component helpers
  const navigate = useNavigate();
  const dialog = useRef(null);
  const [loading, setLoading] = useState(true);

  // atoms
  const [warning, setWarning] = useAtom(warningAtom);
  const [error, setError] = useAtom(errorAtom);

  // data variables
  const [users, setUsers] = useState([]);
  const [toDelete, setToDelete] = useState({
    name: "",
    _id: "",
  });

  // ui settings
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [listEnable, setListEnable] = useState(true);

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
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getUsers(controller);
        setUsers(data);

        setLoading(false);
      } catch (e) {
        if (e.response) {
          setTimeout(() => {
            setError("");
          }, 5000);
          setError(e?.response?.data?.error || errorMessage);
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, []);

  const removeUser = (id, name) => {
    document.activeElement.blur();
    dialog?.current?.showModal();
    setToDelete({ name, _id: id });
  };

  const onRemoveSubmit = async () => {
    const controller = new AbortController();

    try {
      const message = await deleteUser(toDelete?._id, controller);

      if (message) {
        setTimeout(() => {
          setWarning("");
        }, 5000);
        setWarning(message);
      }

      const filteredUsers = users.filter((s) => s._id !== toDelete?._id);

      setError("");
      setUsers([...filteredUsers]);
    } catch (e) {
      if (e.response) {
        setTimeout(() => {
          setError("");
        }, 5000);
        setError(e?.response?.data?.error || errorMessage);
      }
    }

    controller.abort();
  };

  const onRemoveClose = () => {
    dialog?.current?.close();
    setToDelete({ name: "", _id: "" });
  };

  return (
    <div className="users_list">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="list_head">
            <div className="head_content">
              <h1 className="list_title">Adminstratorlar</h1>
              <ul className="head_links">
                <li>
                  <NavLink to={`/dashboard`}>Dashboard</NavLink>
                </li>
                <li className="link_spot">
                  <BsDot />
                </li>
                <li>
                  <NavLink to={`/user/list`}>Ro'yxat</NavLink>
                </li>
              </ul>
            </div>
            <button
              className="list_button"
              onClick={() => navigate("/user/new")}
            >
              <span>
                <BsPlusLg />
              </span>{" "}
              Adminstrator qo'shish
            </button>
          </div>
          <div className="list_body">
            {listEnable ? (
              <UsersList users={users} removeUser={removeUser} />
            ) : (
              <UsersCards users={users} removeUser={removeUser} />
            )}
          </div>
        </>
      )}
      <Modal
        dialog={dialog}
        onClose={onRemoveClose}
        style={{ width: 450, height: 300 }}
      >
        <h3>O'chirish</h3>
        <form className="delete_form" onSubmit={onRemoveSubmit} method="dialog">
          <p>
            Adminstrator <span>"{toDelete.name}"</span> ni o'chirishni
            xohlaysizmi?
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

export default UsersContent;
