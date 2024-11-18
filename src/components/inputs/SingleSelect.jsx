import React from "react";
import Select from "react-select";

const SingleSelect = ({
  options,
  selectedOption,
  onChange,
  label,
  className,
  required,
}) => {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <label className="text-off-white">
        {label} {required && <span className="text-red">*</span>}
      </label>
      <Select
        className="text-sm w-full"
        value={selectedOption}
        onChange={onChange}
        options={options}
        placeholder={"- Select -"}
        required={required || false}
        isSearchable
      />
    </div>
  );
};

export default SingleSelect;
