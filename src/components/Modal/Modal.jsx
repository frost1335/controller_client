import React from "react";
import "./Modal.scss";
import { GrClose } from "react-icons/gr";

const Modal = ({ children, dialog }) => {
  return (
    <dialog className="modal" ref={dialog}>
      <button onClick={() => dialog?.current?.close()} className="close_button">
        <GrClose />
      </button>
      <div className="modal_box">{children}</div>
    </dialog>
  );
};

export default Modal;
