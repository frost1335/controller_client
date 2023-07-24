import React from "react";
import { MdSettings } from "react-icons/md";
import { Link } from "react-router-dom";
import "./NotFound.scss";
import { notFoundDraw } from "../../assets/images";
import { TbHexagonLetterM } from "react-icons/tb";

const NotFound = () => {
  return (
    <div className="not_found">
      <div className="notfound_navbar">
        <div className="nav_icon">
          <Link to={"/"}>
            <span>
              <TbHexagonLetterM />
            </span>
            aximal
          </Link>
        </div>
        <div className="nav_stng">
          <MdSettings />
        </div>
      </div>
      <div className="notfound_body">
        <h2>Uzur, sahifa toplimadi!</h2>
        <p>
          Kechirasiz, siz qidirayotgan sahifani topa olmadik. Ehtimol, siz URL
          manzilini noto'g'ri kiritgandirsiz? To'g'ri imloni tekshiring.
        </p>
        <div className="notfound_text">
          <img src={notFoundDraw} alt="not-found-draw" />
        </div>
        <Link to={"/"}>Bosh sahifa</Link>
      </div>
    </div>
  );
};

export default NotFound;
