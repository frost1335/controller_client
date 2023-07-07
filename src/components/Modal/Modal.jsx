import React from "react";
import "./Modal.scss";
import { GrClose } from "react-icons/gr";

const Modal = ({ children, dialog, onClose, style }) => {
  return (
    <dialog style={style} className="modal" ref={dialog}>
      <button
        onClick={() => {
          onClose?.();
          dialog?.current?.close();
        }}
        className="close_button"
      >
        <GrClose />
      </button>
      <div className="modal_box">{children}</div>
    </dialog>
  );
};

export default Modal;
