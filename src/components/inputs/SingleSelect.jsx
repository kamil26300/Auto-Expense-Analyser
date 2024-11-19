import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";
import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import Select from "react-select";

const SingleSelect = ({
  options,
  selectedOption,
  onChange,
  label,
  className,
  required,
  defaultValue
}) => {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <label className="text-off-white gap-2 flex items-center">
        {label} {required && <span className="text-red">*</span>}
        {defaultValue && (
          <Tooltip
            placement="top"
            trigger={["hover"]}
            overlay={<span>Default Value: {defaultValue}</span>}
          >
            <FaInfoCircle />
          </Tooltip>
        )}
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
