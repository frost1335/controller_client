import React from "react";
import "./PaymentHistory.scss";
import { formatter } from "../../../../assets/scripts";

const PaymentHistory = () => {
  return (
    <div className="payment_history">
      <h2>To'lov tarixi</h2>
      <ul>
        <li>
          <span>Sana</span>
          <span>Miqdor</span>
          <span>Izoh</span>
        </li>
        <li>
          <span>17.04.2023</span>
          <span>{formatter.format(800000)}</span>
          <span>Karta orqali</span>
        </li>
        <li>
          <span>23.07.2023</span>
          <span>{formatter.format(600000)}</span>
          <span>Naqd pul</span>
        </li>
        <li>
          <span>01.03.2023</span>
          <span>{formatter.format(-700000)}</span>
          <span>Bank orqali</span>
        </li>
      </ul>
    </div>
  );
};

export default PaymentHistory;
