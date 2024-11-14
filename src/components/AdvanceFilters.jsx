import React, { useState } from 'react';
import SingleSelect from './SingleSelect';
import MultiSelect from './MultiSelect';

const AdvanceFilters = () => {
  const [driveDistance, setDriveDistance] = useState(null);
  const [drivingStyle, setDrivingStyle] = useState(null);
  const [brand, setBrand] = useState([]);
  const [model, setModel] = useState([]);

  const driveDistanceOptions = [
    { value: '3-5', label: '3 Km - 5 Km' },
    // Add more distance options as needed
  ];

  const drivingStyleOptions = [
    { value: 'average', label: 'Average' },
    { value: 'aggressive', label: 'Aggressive' },
    { value: 'defensive', label: 'Defensive' },
  ];

  const brandOptions = [
    { value: 'mahindra', label: 'Mahindra' },
    { value: 'maruti', label: 'Maruti Suzuki' },
    { value: 'tata', label: 'Tata' },
  ];

  const modelOptions = [
    { value: 'celerio', label: 'Celerio (Maruti Suzuki)' },
    { value: 'curve', label: 'Curve (Tata)' },
    { value: 'nano', label: 'Nano' },
  ];

  return (
    <div className="p-6 bg-gray-800 rounded-md text-white">
      <h2 className="text-xl mb-4">Car Filter</h2>

      <SingleSelect
        options={driveDistanceOptions}
        selectedOption={driveDistance}
        onChange={setDriveDistance}
        placeholder="Average drive a day"
      />

      <SingleSelect
        options={drivingStyleOptions}
        selectedOption={drivingStyle}
        onChange={setDrivingStyle}
        placeholder="Driving Style"
      />

      <MultiSelect
        options={brandOptions}
        selectedOptions={brand}
        onChange={setBrand}
        placeholder="Select Brand"
      />

      <MultiSelect
        options={modelOptions}
        selectedOptions={model}
        onChange={setModel}
        placeholder="Select Model"
      />

      <button className="bg-blue-500 mt-4 py-2 px-4 rounded">Submit</button>
    </div>
  );
};

export default AdvanceFilters;
