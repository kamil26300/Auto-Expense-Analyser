import React, { useState, useEffect, useMemo } from "react";
import AdvanceFilters from "../components/AdvanceFilters";
import MandatoryFilters from "../components/MandatoryFilters";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { useCarData } from "../services/inputOptions";

// Helper function to get unique options for a given field
const getUniqueOptions = (data, field) => {
  const uniqueValues = [...new Set(data.map((item) => item[field]))];
  return uniqueValues.map((value) => ({
    value,
    label: value,
  }));
};

const budgetRanges = {
  "1-5": [1, 5],
  "5-10": [5, 10],
  "10-12": [10, 12],
  "12-15": [12, 15],
  "15-20": [15, 20],
  "20-25": [20, 25],
  "25-30": [25, 30],
  "30-35": [30, 35],
  "35-40": [35, 40],
  "40-45": [40, 45],
  "45-50": [45, 50],
  greaterThan50: [50, Infinity],
};

function HomePage() {
  const [currentField, setCurrentField] = useState("");
  const [checkedAdvFilters, setCheckedAdvFilters] = useState(false);
  const [mandatoryFields, setMandatoryFields] = useState({
    budget: null,
    transmissionType: [],
    fuelType: [],
    driveDistance: 50,
  });

  const [advanceFields, setAdvanceFields] = useState({
    drivingStyle: null,
    cityToHighwayRatio: 50,
    brand: [],
    model: [],
  });

  const [options, setOptions] = useState({
    transmissionType: [],
    fuelType: [],
    brand: [],
    model: [],
  });

  const navigate = useNavigate();
  const { carData, loading } = useCarData(); // Get car data using the custom hook

  // Helper function to check if the budget is a match
  const isBudgetMatch = useMemo(
    () => (car) => {
      if (!mandatoryFields.budget) return true; // If no budget filter, return true

      const budgetRange = budgetRanges[mandatoryFields.budget.value];
      if (!budgetRange) return true;

      const carPrice = car["actual cost"] / 100000; // Convert price to 'Lakhs'
      return carPrice >= budgetRange[0] && carPrice <= budgetRange[1];
    },
    [mandatoryFields.budget]
  );

  const filteredCarData = useMemo(() => {
    if (!carData || carData.length === 0) return [];

    return carData.filter((car) => {
      let match = true;

      // Filter based on mandatory fields
      if (mandatoryFields.budget && !isBudgetMatch(car)) {
        match = false;
      }

      if (
        mandatoryFields.transmissionType.length > 0 &&
        !mandatoryFields.transmissionType.some(
          (option) => option.value === car.Transmission
        )
      ) {
        match = false;
      }

      if (
        mandatoryFields.fuelType.length > 0 &&
        !mandatoryFields.fuelType.some(
          (option) => option.value === car.Fuel_Type
        )
      ) {
        match = false;
      }

      // Filter based on advanced fields
      if (
        advanceFields.brand.length > 0 &&
        !advanceFields.brand.some((option) => option.value === car.Manufacturer)
      ) {
        match = false;
      }

      if (
        advanceFields.model.length > 0 &&
        !advanceFields.model.some((option) => option.value === car.Name)
      ) {
        match = false;
      }

      return match;
    });
  }, [
    carData,
    mandatoryFields.budget,
    mandatoryFields.transmissionType,
    mandatoryFields.fuelType,
    advanceFields.brand,
    advanceFields.model,
    isBudgetMatch,
  ]);

  // Update options when `filteredCarData` changes
  useEffect(() => {
    const currentOptions = options[currentField];
    const updatedOptions = {
      transmissionType: getUniqueOptions(filteredCarData, "Transmission"),
      fuelType: getUniqueOptions(filteredCarData, "Fuel_Type"),
      brand: getUniqueOptions(filteredCarData, "Manufacturer"),
      model: getUniqueOptions(filteredCarData, "Name"),
    };
    updatedOptions[currentField] = currentOptions;

    setOptions(updatedOptions);
  }, [filteredCarData]);

  // Render loading or filtered car data
  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  const handleSearch = () => {
    // Construct query parameters
    const queryParams = new URLSearchParams();

    // Add the parameters to the query string for mandatory fields
    Object.entries(mandatoryFields).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        // Convert array to a comma-separated string
        const arrayString = value.map((item) => item.value).join(",");
        queryParams.append(key, arrayString); // For arrays, append as a single comma-separated value
      } else if (value !== null) {
        queryParams.append(key, value.value || value); // For non-null values, add to query string
      }
    });

    // Add the parameters to the query string for advanced fields
    if (checkedAdvFilters)
      Object.entries(advanceFields).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          // Convert array to a comma-separated string
          const arrayString = value.map((item) => item.value).join(",");
          queryParams.append(key, arrayString); // For arrays, append as a single comma-separated value
        } else if (value !== null) {
          queryParams.append(key, value.value || value); // For non-null values, add to query string
        }
      });

    // Navigate to the cars-list page with query parameters
    navigate(`/cars-list?${queryParams.toString()}`);
  };

  return (
    <Layout>
      <MandatoryFilters
        checkedAdvFilters={checkedAdvFilters}
        setCheckedAdvFilters={setCheckedAdvFilters}
        fields={mandatoryFields}
        setFields={setMandatoryFields}
        handleSearch={handleSearch}
        setCurrentField={setCurrentField}
        options={options}
      />
      <div className="flex items-center justify-center bg-dark-blue m-container rounded-small">
        {checkedAdvFilters && (
          <AdvanceFilters
            fields={advanceFields}
            setFields={setAdvanceFields}
            setCurrentField={setCurrentField}
            options={options}
          />
        )}
      </div>
    </Layout>
  );
}

export default HomePage;
