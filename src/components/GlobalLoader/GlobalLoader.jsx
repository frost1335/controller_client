import React from "react";
import "./GlobalLoader.scss";
import { TbHexagonLetterM } from "react-icons/tb";

const GlobalLoader = () => (
  <div className="wrapper_box">
    <div className="loader_wrapper">
      <span className="loader_icon">
        <TbHexagonLetterM />
      </span>
      <div className="global_loader">
        <div className="loader_content">
          <div />
          <div />
          <div>
            <div />
          </div>
          <div>
            <div />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default GlobalLoader;
