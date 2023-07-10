import React, { useEffect, useRef } from "react";
import Modal from "../../../../../components/Modal/Modal";

import { BsCircle } from "react-icons/bs";

import "./GroupModal.scss";
import { getMinGroups } from "../../../../Groups/api";

const GroupModal = () => {
  const dialog = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMinGroups();

        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  return (
    <Modal dialog={dialog}>
      <h3>O'quvchini guruhga qo'shish</h3>
      <form method="dialog">
        <h4>Guruhlar ro'yhati</h4>
        <div className="form_list">
          <ul>
            <li>
              <span>
                <BsCircle />
              </span>
              <div className="item_content">
                <div>
                  <p>guruh-6</p>
                  <h5>Cho, Ju</h5>
                </div>
                <div>
                  <span>13 ta o'quvchi</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="submit_form">
          <button type="submit">Davom etish</button>
          <button type="button">Bekor qilish</button>
        </div>
      </form>
    </Modal>
  );
};

export default GroupModal;
