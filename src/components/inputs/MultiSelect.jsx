import React from 'react';
import Select from 'react-select';

const MultiSelect = ({ options, selectedOptions, onChange, label, required, className }) => {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <label className="text-off-white">
        {label} {required && <span className="text-red">*</span>}
      </label>
      <Select
        className="text-sm w-full"
        value={selectedOptions}
        onChange={onChange}
        options={options}
        placeholder={"- Select -"}
        required={required || false}
        isMulti
        
        isSearchable
      />
    </div>
  );
};

export default MultiSelect;