import React from "react";
import "./PaymentHistory.scss";
import { formatter } from "../../../../../assets/scripts";

const PaymentHistory = ({ history }) => {
  console.log(history);
  return (
    <div className="payment_history">
      <h2>To'lov tarixi</h2>
      <ul>
        <li>
          <span>Sana</span>
          <span>Miqdor</span>
          <span>Izoh</span>
        </li>
        {history?.length ? (
          history?.map((peyment, index) => (
            <li>
              <span>{peyment?.date}</span>
              <span>{formatter.format(peyment?.quantity)}</span>
              <span>{payment?.info}</span>
            </li>
          ))
        ) : (
          <p>To'lovlar yo'q</p>
        )}
      </ul>
    </div>
  );
};

export default PaymentHistory;
