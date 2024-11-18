import React, { useState } from "react";
import SingleSelect from "./inputs/SingleSelect";
import MultiSelect from "./inputs/MultiSelect";
import SingleSlider from "./inputs/SingleSlider";

const AdvanceFilters = () => {
  const [fields, setFields] = useState({
    driveDistance: null,
    drivingStyle: null,
    cityToHighwayRatio: 50,
    brand: [],
    model: [],
  });

  const options = {
    driveDistanceOptions: [{ value: "3-5", label: "3 Km - 5 Km" }],

    drivingStyleOptions: [
      { value: "average", label: "Average" },
      { value: "aggressive", label: "Aggressive" },
      { value: "defensive", label: "Defensive" },
    ],

    brandOptions: [
      { value: "mahindra", label: "Mahindra" },
      { value: "maruti", label: "Maruti Suzuki" },
      { value: "tata", label: "Tata" },
    ],

    modelOptions: [
      { value: "celerio", label: "Celerio (Maruti Suzuki)" },
      { value: "curve", label: "Curve (Tata)" },
      { value: "nano", label: "Nano" },
    ],
  };

  const handleChange = (e, field) => {
    setFields((prev) => ({ ...prev, [field]: e }));
  };

  return (
    <div className="flex flex-col w-full p-6">
      <h2 className="text-2xl mb-4 text-off-white">Advance Filters</h2>
      <div className="grid grid-cols-3 gap-12 w-full">
        <SingleSelect
          options={options.driveDistanceOptions}
          selectedOption={fields.driveDistance}
          onChange={(e) => handleChange(e, "driveDistance")}
          label="Average drive a day"
        />

        <SingleSelect
          options={options.drivingStyleOptions}
          selectedOption={fields.drivingStyle}
          onChange={(e) => handleChange(e, "drivingStyle")}
          label="Driving Style"
        />

        <SingleSlider
          label="City to Highway ratio"
          value={fields.cityToHighwayRatio}
          onChange={(e) => handleChange(e, "cityToHighwayRatio")}
        />

        <MultiSelect
          options={options.brandOptions}
          selectedOptions={fields.brand}
          onChange={(e) => handleChange(e, "brand")}
          label="Brand"
        />

        <MultiSelect
          options={options.modelOptions}
          selectedOptions={fields.model}
          onChange={(e) => handleChange(e, "model")}
          label="Model"
        />
      </div>
    </div>
  );
};

export default AdvanceFilters;
