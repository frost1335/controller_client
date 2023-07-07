import React from "react";
import "./Loader.scss";

const Loader = () => {
  return (
    <div className="loader_box">
      <div className="loader">
        <div className="loader_items">
          {new Array(8).fill(1).map((_, i) => (
            <div key={i}>
              <div />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loader;
