import React from 'react';
import Select from 'react-select';

const MultiSelect = ({ options, selectedOptions, onChange, placeholder }) => {
  return (
    <Select
      className="text-sm"
      value={selectedOptions}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      isMulti
      isSearchable
    />
  );
};

export default MultiSelect;
