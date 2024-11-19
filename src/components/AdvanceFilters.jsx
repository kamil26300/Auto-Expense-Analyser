import React, { useState } from "react";
import SingleSelect from "./inputs/SingleSelect";
import MultiSelect from "./inputs/MultiSelect";
import SingleSlider from "./inputs/SingleSlider";

const drivingStyleOptions = [
  { value: "average", label: "Average" },
  { value: "aggressive", label: "Aggressive" },
  { value: "defensive", label: "Defensive" },
];

const AdvanceFilters = ({ fields, setFields, options, setCurrentField }) => {
  const handleChange = (e, field) => {
    setCurrentField(field);
    setFields((prev) => ({ ...prev, [field]: e }));
  };

  return (
    <div className="flex flex-col w-full p-6">
      <h2 className="text-2xl mb-4 text-off-white">Advance Filters</h2>
      <div className="grid grid-cols-3 gap-8 w-full">
        <SingleSelect
          options={drivingStyleOptions}
          selectedOption={fields.drivingStyle}
          onChange={(e) => handleChange(e, "drivingStyle")}
          label="Driving Style"
          defaultValue="Average"
        />

        <SingleSlider
          label="City to Highway ratio (%)"
          value={fields.cityToHighwayRatio}
          onChange={(e) => handleChange(e, "cityToHighwayRatio")}
          start="City"
          end="Highway"
        />

        <MultiSelect
          options={options.brand}
          selectedOptions={fields.brand}
          onChange={(e) => handleChange(e, "brand")}
          label="Brand"
        />

        <MultiSelect
          options={options.model}
          selectedOptions={fields.model}
          onChange={(e) => handleChange(e, "model")}
          label="Model"
        />
      </div>
    </div>
  );
};

export default AdvanceFilters;
