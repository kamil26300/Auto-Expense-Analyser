import React, { useState } from "react";
import carBG from "../assets/car-bg.svg";
import SingleSelect from "./inputs/SingleSelect";
import Switch from "react-switch";

const MandatoryFilters = ({ checkedAdvFilters, setCheckedAdvFilters }) => {
  const [fields, setFields] = useState({
    budget: null,
    transmissionType: null,
    fuelType: null,
  });

  const options = {
    budget: [
      { value: "12-15", label: "₹ 12 Lakh - ₹ 15 Lakh" },
      { value: "15-18", label: "₹ 15 Lakh - ₹ 18 Lakh" },
      { value: "18-21", label: "₹ 18 Lakh - ₹ 21 Lakh" },
    ],

    transmissionType: [
      { value: "manual", label: "Manual" },
      { value: "automatic", label: "Automatic" },
    ],

    fuelType: [
      { value: "petrol", label: "Petrol" },
      { value: "diesel", label: "Diesel" },
      { value: "hybrid", label: "Hybrid" },
      { value: "cng", label: "CNG" },
    ],
  };

  const handleChange = (e, field) => {
    setFields((prev) => ({ ...prev, [field]: e }));
  };

  const handleSwitchChange = (nextChecked) => {
    setCheckedAdvFilters(nextChecked);
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
              options={options.transmissionType}
              selectedOption={fields.transmissionType}
              onChange={(e) => handleChange(e, "transmissionType")}
              label="Transmission Type"
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
          <div className="flex justify-between text-off-white items-center">
            <div className="flex gap-3 text-nowrap px-6">
              <label>Advance Filters</label>
              <Switch
                checked={checkedAdvFilters}
                onChange={handleSwitchChange}
                onColor="#3498DB"
                offColor="#999"
                onHandleColor="#F8F9FA"
                handleDiameter={22}
                uncheckedIcon={false}
                checkedIcon={false}
                height={28}
                width={48}
              />
            </div>
            <button className="bg-light-blue py-2 px-4 rounded-small h-min">
              Search
            </button>
          </div>
        </div>
        <img className="w-full" src={carBG} alt="bg-img" />
      </div>
    </div>
  );
};

export default MandatoryFilters;
