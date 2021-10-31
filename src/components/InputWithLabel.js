import React from "react";

const InputWithLabel = ({ value, id, children, type, onInputChange }) => {
  return (
    <>
      <label htmlFor={id}> </label>
      <input style={{
      display:"block",
      padding:"0.5rem",
      border:"none",
      outline:"none",
      borderRadius:"3px",
      margin:"10px 0px"
    }}
      type={type} id={id} value={value} onChange={onInputChange}></input>
    </>
  );
};
export default InputWithLabel;
