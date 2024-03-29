import React, { memo } from "react";

function Input({ id, label, value, onChange, type = "text" }) {
  const handleChange = e => onChange(e.target.value);

  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <div className="input-group mb-3">
        <input type={type} className="form-control" id={id} value={value} onChange={handleChange} />
      </div>
    </>
  );
}

export default memo(Input);
