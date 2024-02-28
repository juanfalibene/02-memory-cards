import React from "react";

const Msg = ({ message, onClose }) => {
  return (
    <div className='modal'>
      <div className='modal-content'>
        <p>{message}</p>
        <button onClick={onClose}>👍</button>
      </div>
    </div>
  );
};

export default Msg;
