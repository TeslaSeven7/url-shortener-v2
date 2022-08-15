import React from "react";

const inputChange = ({ onChange }) => (
  <div>
     <input
    type="text"
    id="message"
    name="message"
    onChange={onChange}
    />
  </div>
)

export default inputChange;