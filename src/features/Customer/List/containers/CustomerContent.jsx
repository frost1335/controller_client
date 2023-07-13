import React, { startTransition, useEffect, useState } from "react";
import "./CustomerContent.scss";
import ListCustomer from "../components/ListCustomer/ListCustomer";
import CustomerCards from "../components/CustomerCards/CustomerCards";
import { MAX_WIDTH_TABLET } from "../../../../constants";
import { NavLink, useNavigate } from "react-router-dom";
import { deleteCustomerApi, getAllCustomersApi } from "../../api";
import { Loader } from "../../../../components";
import { BsDot, BsPlusLg } from "react-icons/bs";

const ListCustomerContent = () => {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  const [listEnable, setListEnable] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getAllCustomersApi();
        setCustomers(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
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

  const removeCustomer = (id) => {
    try {
      startTransition(async () => {
        await deleteCustomerApi(id);
      });
      const filteredCustomers = customers.filter((c) => c._id !== id);
      setCustomers([...filteredCustomers]);
      document.activeElement.blur();
    } catch (e) {
      console.log(e);
    }
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
              />
            ) : (
              <CustomerCards
                customers={customers}
                removeCustomer={removeCustomer}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ListCustomerContent;
