import React from "react";

const ButtonClick = ({ onClick, title }) => (
  <div>
    <button onClick={onClick}>{title}</button>
  </div>
)

export default ButtonClick;