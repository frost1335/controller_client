import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const ClientsList = ({ clients }) => {
  return (
    <table className="list_table">
      <thead>
        <tr>
          <th>Ism</th>
          <th>Ma'lumot</th>
          <th>Tel. raqam</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((client, index) => (
          <tr key={index + "-client"}>
            <td>{client.name}</td>
            <td>{client.info}</td>
            <td>{client.phone}</td>
            <td className="button_item">
              <button className="settings_btn">
                <BsThreeDotsVertical />
                <div className="dropdown">
                  <ul>
                    <li>O'zgartitrish</li>
                    <li>O'chirish</li>
                    <li>Qo'shish</li>
                  </ul>
                </div>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClientsList;
