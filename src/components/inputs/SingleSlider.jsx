import React, { useState } from "react";
import "rc-slider/assets/index.css";
import Slider from "rc-slider";

const SingleSlider = ({ value, onChange, label, className, start, end }) => {
  return (
    <div className={`flex flex-col justify-center space-y-4 ${className}`}>
      <label className="text-off-white">{label}</label>
      <div className="relative flex items-center w-full">
        <Slider
          min={0}
          max={100}
          value={value}
          onChange={onChange}
          trackStyle={{ backgroundColor: "#3b82f6", height: 8 }}
          handleStyle={{
            borderColor: "#ffffff",
            zIndex: 0,
            height: 20,
            width: 20,
            marginTop: -6,
            backgroundColor: "#3b82f6",
            boxShadow: "0 0 5px rgba(59, 130, 246, 0.8)",
          }}
          railStyle={{ backgroundColor: "#6b7280", height: 8 }}
          step={5}
        />
        <div
          className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 text-sm text-white font-medium bg-gray-800 rounded-full px-3 py-1"
          style={{ left: `${value}%`, transform: "translateX(-50%)" }}
        >
          {value}
        </div>
      </div>
      <div className="flex justify-between w-full text-off-white text-sm">
        <span>{start}</span>
        <span>{end}</span>
      </div>
    </div>
  );
};

export default SingleSlider;
