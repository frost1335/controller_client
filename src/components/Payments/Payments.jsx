import React, { useEffect, useState } from "react";
import "./Payments.scss";
import { BsChevronRight } from "react-icons/bs";
import Loader from "../Loader/Loader";
import { getPaymentHistory } from "../../api";
import { TbMoodEmpty } from "react-icons/tb";
import { monthList } from "../../constants";
import { Link } from "react-router-dom";
import { formatter } from "../../assets/scripts";
import { changePayment, errorAtom } from "../../app/atoms";
import { useAtom } from "jotai";
import { MdSchool } from "react-icons/md";

const getFullDate = (date) => {
  return `${new Date(date).getDate()}-${monthList[new Date(date).getMonth()]}`;
};

const Payments = ({ open, setOpen }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useAtom(changePayment);
  const [error, setError] = useAtom(errorAtom);

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const data = await getPaymentHistory(controller);

        setPayments(data);
        setLoading(false);
      } catch (e) {
        if (e.response) {
          setTimeout(() => {
            setError("");
          }, 5000);
          setError(e?.response?.data?.error || errorMessage);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, [payment]);

  return (
    <>
      <div
        className={`payments_bg ${open ? "open" : ""}`}
        onClick={() => setOpen(false)}
      />
      <div className={`payments ${open ? "open" : ""}`}>
        <div className="payments_head">
          <button className="toggle_icon" onClick={() => setOpen(false)}>
            <BsChevronRight />
          </button>
          <h2 className="head_title">To'lovlar ro'yxati</h2>
        </div>
        <div className="payments_body">
          {loading ? (
            <Loader />
          ) : payments?.length ? (
            payments?.map((payment, index) => (
              <div className="payment_item" key={index}>
                <div className="item_head">
                  <p>{getFullDate(payment?._id)}</p>
                </div>
                <ul className="item_list">
                  {payment?.payments?.map((pay, idx) => (
                    <li key={idx}>
                      <div className="item_title">
                        <span className="icon">
                          <MdSchool />
                        </span>
                        <span className="link">
                          <Link
                            to={`/student/detail/${pay._id}`}
                            onClick={() => setOpen(false)}
                          >
                            {Object.values(pay?.name || "").join(" ")}
                          </Link>
                        </span>
                      </div>
                      <div className="item_block">
                        <p className="quantity">
                          Miqdor:
                          <span>{formatter.format(pay?.quantity || 0)}</span>
                        </p>
                        <p>
                          Usul: <span>{pay?.method}</span>
                        </p>
                        <p>
                          Izoh: <span>{pay?.info}</span>
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <div className="payment_empty">
              <div className="empty_icon">
                <TbMoodEmpty />
              </div>
              <h3>To'lovlar topilmadi!</h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Payments;
