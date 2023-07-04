import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const ClientsList = ({ clients, removeLid }) => {
  const navigate = useNavigate();

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
        {clients.length ? (
          clients.map((client, index) => (
            <tr key={index + "-client"}>
              <td>{client?.name}</td>
              <td>{client?.info}</td>
              <td>{client?.phone}</td>
              <td className="button_item">
                <button className="settings_btn">
                  <BsThreeDotsVertical />
                  <div className="dropdown">
                    <ul>
                      <li onClick={() => navigate(`/lids/${client._id}/edit`)}>
                        O'zgartitrish
                      </li>
                      <li onClick={() => removeLid(client._id)}>O'chirish</li>
                      <li>Qo'shish</li>
                    </ul>
                  </div>
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td>Loading...</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ClientsList;
