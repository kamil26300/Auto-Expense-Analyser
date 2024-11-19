import React, { useEffect, useState } from "react";
import carBG from "../assets/car-bg.svg";
import SingleSelect from "./inputs/SingleSelect";
import Switch from "react-switch";
import MultiSelect from "./inputs/MultiSelect";
import { budgetOptions } from "../services/inputOptions";
import SingleSlider from "./inputs/SingleSlider";

const MandatoryFilters = ({
  checkedAdvFilters,
  setCheckedAdvFilters,
  fields,
  setFields,
  handleSearch,
  options,
  setCurrentField
}) => {
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [fields]);

  const validateForm = () => {
    // Check if all required fields have values
    const isValid = Object.values(fields).every((value) => {
      // If the value is an array, ensure its length > 0
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      // For other types, ensure the value is not null
      return value !== null;
    });
  
    setIsFormValid(isValid); // Update the form validity state
  };
  

  const handleChange = (e, field) => {
    setCurrentField(field)
    setFields((prev) => ({ ...prev, [field]: e }));
  };

  const handleSwitchChange = (nextChecked) => {
    setCheckedAdvFilters(nextChecked);
  };

  return (
    <div>
      <div className="relative flex items-center">
        <div className="absolute ml-28 gap-4 flex flex-col w-1/3">
          <div className="p-6 bg-white/10 grid grid-cols-4 gap-8 w-full rounded-small">
            <SingleSelect
              options={budgetOptions}
              selectedOption={fields.budget}
              onChange={(e) => handleChange(e, "budget")}
              label="Budget"
              className="col-span-3"
              required
            />
            <MultiSelect
              options={options.transmissionType}
              selectedOption={fields.transmissionType}
              onChange={(e) => handleChange(e, "transmissionType")}
              label="Transmission Type"
              className="col-span-2"
              required
            />
            <MultiSelect
              options={options.fuelType}
              selectedOption={fields.fuelType}
              onChange={(e) => handleChange(e, "fuelType")}
              label="Fuel Type"
              className="col-span-2"
              required
              />
            <SingleSlider
              label="Average drive a day (KM)"
              className="col-span-4"
              value={fields.driveDistance}
              onChange={(e) => handleChange(e, "driveDistance")}
              defaultValue="50"
              start="0"
              end="100"
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
            <button
              className={`py-2 px-4 rounded-small h-min ${
                isFormValid ? "bg-light-blue" : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!isFormValid}
              onClick={handleSearch}
            >
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
