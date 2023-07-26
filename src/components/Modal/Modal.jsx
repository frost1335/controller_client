import React from "react";
import "./Modal.scss";
import { GrClose } from "react-icons/gr";

const Modal = ({ children, dialog, onClose, style }) => {
  const close = () => {
    onClose?.();
    dialog?.current?.close();
  };

  const stayOpen = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <dialog onClick={close} style={style} className="modal" ref={dialog}>
        <div className="my_dialog" onClick={stayOpen}>
          <div className="modal_box">{children}</div>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
