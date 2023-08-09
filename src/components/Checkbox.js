import { useState } from "react";

const Checkbox = ({ label }) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="checkbox-wrapper">
      <label>
        <input className="checkbox" type="checkbox" checked={isChecked} onChange={() => setIsChecked((prev) => !prev)}/>
        <span className="font-filter">{label}</span>
      </label>
    </div>
  );
};
export default Checkbox;