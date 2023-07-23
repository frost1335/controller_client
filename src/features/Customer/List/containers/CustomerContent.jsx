import React, { startTransition, useEffect, useRef, useState } from "react";
import "./CustomerContent.scss";
import ListCustomer from "../components/ListCustomer/ListCustomer";
import CustomerCards from "../components/CustomerCards/CustomerCards";
import { MAX_WIDTH_TABLET } from "../../../../constants";
import { NavLink, useNavigate } from "react-router-dom";
import { deleteCustomerApi, getAllCustomersApi } from "../../api";
import { Loader, Modal } from "../../../../components";
import { BsDot, BsPlusLg } from "react-icons/bs";
import { errorAtom, warningAtom } from "../../../../app/atoms";
import { useAtom } from "jotai";

const ListCustomerContent = () => {
  // component helpers
  const dialog = useRef(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // atoms
  const [warning, setWarning] = useAtom(warningAtom);
  const [error, setError] = useAtom(errorAtom);

  // data variables
  const [customers, setCustomers] = useState([]);
  const [toDelete, setToDelete] = useState({ name: "", _id: "" });

  // ui settings
  const [listEnable, setListEnable] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getAllCustomersApi(controller);
        setCustomers(data);

        setError("");
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

  const removeCustomer = (id, name) => {
    document.activeElement.blur();
    dialog?.current?.showModal();
    setToDelete({ name, _id: id });
  };

  const onRemoveSubmit = async () => {
    const controller = new AbortController();

    try {
      const message = await deleteCustomerApi(toDelete?._id, controller);

      if (message) {
        setTimeout(() => {
          setWarning("");
        }, 5000);
        setWarning(message);
      }

      const filteredCustomers = customers.filter(
        (c) => c._id !== toDelete?._id
      );

      setError("");
      setCustomers([...filteredCustomers]);
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

  const toCreateStudent = (customer) => {
    navigate(
      `/student/new?firstName=${customer?.name?.first}&lastName=${customer?.name?.last}&phone=${customer?.phone}`
    );
  };

  return (
    <div className="customers_list">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="list_head">
            <div className="head_content">
              <h1 className="list_title">Mijozlar</h1>
              <ul className="head_links">
                <li>
                  <NavLink to={`/dashboard`}>Dashboard</NavLink>
                </li>
                <li className="link_spot">
                  <BsDot />
                </li>
                <li>
                  <NavLink to={`/customer/list`}>Ro'yxat</NavLink>
                </li>
              </ul>
            </div>
            <button
              className="list_button"
              onClick={() => navigate("/customer/new")}
            >
              <span>
                <BsPlusLg />
              </span>{" "}
              Mijoz qo'shish
            </button>
          </div>
          <div className="list_body">
            {listEnable ? (
              <ListCustomer
                customers={customers}
                removeCustomer={removeCustomer}
                toCreateStudent={toCreateStudent}
              />
            ) : (
              <CustomerCards
                customers={customers}
                removeCustomer={removeCustomer}
                toCreateStudent={toCreateStudent}
              />
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
            Mijoz <span>"{toDelete.name}"</span> ni o'chirishni xohlaysizmi?
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

export default ListCustomerContent;
