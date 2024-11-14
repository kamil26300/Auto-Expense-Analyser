import React, { useState } from "react";
import carBG from "../assets/car-bg.svg";
import SingleSelect from "./SingleSelect";
import Switch from "react-switch";

const MandatoryFilters = () => {
  const [checked, setChecked] = useState(false);
  const [fields, setFields] = useState({
    budget: null,
    transmission: null,
    fuelType: null,
  });

  const options = {
    budget: [
      { value: "12-15", label: "₹ 12 Lakh - ₹ 15 Lakh" },
      { value: "15-18", label: "₹ 15 Lakh - ₹ 18 Lakh" },
      { value: "18-21", label: "₹ 18 Lakh - ₹ 21 Lakh" },
      // Add more budget options as needed
    ],

    transmission: [
      { value: "manual", label: "Manual" },
      { value: "automatic", label: "Automatic" },
    ],

    fuelType: [
      { value: "petrol", label: "Petrol" },
      { value: "diesel", label: "Diesel" },
      // Add more fuel type options as needed
    ],
  };

  const handleChange = (e, field) => {
    setFields((prev) => ({ ...prev, [field]: e }));
  };

  const handleSwitchChange = (nextChecked) => {
    setChecked(nextChecked);
  };

  return (
    <div>
      <div className="h-header"></div>
      <div className="relative flex items-center">
        <div className="absolute ml-28 gap-4 flex flex-col w-1/3">
          <div className="p-6 bg-white/10 grid grid-cols-4 gap-12 w-full rounded-small">
            <SingleSelect
              options={options.budget}
              selectedOption={fields.budget}
              onChange={(e) => handleChange(e, "budget")}
              label="Budget"
              className="col-span-3"
              required
            />
            <SingleSelect
              options={options.transmission}
              selectedOption={fields.transmission}
              onChange={(e) => handleChange(e, "transmission")}
              label="Transmission"
              className="col-span-2"
              required
            />
            <SingleSelect
              options={options.fuelType}
              selectedOption={fields.fuelType}
              onChange={(e) => handleChange(e, "fuelType")}
              label="Fuel Type"
              className="col-span-2"
              required
            />
          </div>
          <div className="flex gap-3 text-nowrap p-6">
            <label className="text-off-white">Advanced Filters</label>
            <Switch
              checked={checked}
              onChange={handleSwitchChange}
              onColor="#3498DB"
              offColor="#ccc"
              onHandleColor="#F8F9FA"
              handleDiameter={22}
              uncheckedIcon={false}
              checkedIcon={false}
              height={28}
              width={48}
            />
          </div>
        </div>
        <img className="w-full" src={carBG} alt="car-bg" />
      </div>
    </div>
  );
};

export default MandatoryFilters;
