import React , {useContext}from "react";
import { postcodeContext } from "../context/postcodeContext.js";
import { useState } from "react";

const Postcode = () => {
  const { setPostcode } = useContext(postcodeContext)
  const [currCode, setCurrCode] = useState('')
  return (
    <textarea
      className="textbox"
      name="postcode"
      value={currCode}
      onChange={e => setCurrCode(e.target.value)}
      onBlur={(e) => setPostcode(e.target.value)}
      placeholder="Type postcode here"
    />
  );
};

export default Postcode;
