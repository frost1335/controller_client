import React from "react";
import "./TeacherGroups.scss";
import { Link } from "react-router-dom";

const TeacherGroups = () => {
  return (
    <div className="teacher_groups">
      <h2>O'qituvchi guruhlari</h2>
      <div className="groups_list">
        <div className="group_item">
          <h3>{"guruh-4 "} o'quvchilari</h3>
          <ul>
            <li>
              <span>№</span>
              <span>Ism</span>
              <span>Tel. raqam</span>
            </li>
            <li>
              <span>1.</span>
              <span>
                <Link to={"/students/detail/212412"}>Alfreds Futterkiste</Link>
              </span>
              <span>
                <a href="tel:+998931897318">+998-93-189-73-18</a>
              </span>
            </li>
          </ul>
        </div>
        <div className="group_item">
          <h3>{"guruh-4 "} o'quvchilari</h3>
          <ul>
            <li>
              <span>№</span>
              <span>Ism</span>
              <span>Tel. raqam</span>
            </li>
            <li>
              <span>1.</span>
              <span>
                <Link to={"/students/detail/212412"}>Alfreds Futterkiste</Link>
              </span>
              <span>
                <a href="tel:+998931897318">+998-93-189-73-18</a>
              </span>
            </li>
          </ul>
        </div>
        <div className="group_item">
          <h3>{"guruh-4 "} o'quvchilari</h3>
          <ul>
            <li>
              <span>№</span>
              <span>Ism</span>
              <span>Tel. raqam</span>
            </li>
            <li>
              <span>1.</span>
              <span>
                <Link to={"/students/detail/212412"}>Alfreds Futterkiste</Link>
              </span>
              <span>
                <a href="tel:+998931897318">+998-93-189-73-18</a>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeacherGroups;
