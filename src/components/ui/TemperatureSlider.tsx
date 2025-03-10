import React from "react";

interface TemperatureSliderProps {
  temperature: number;
  onChange: (temperature: number) => void;
}

export default function TemperatureSlider({
  temperature,
  onChange,
}: TemperatureSliderProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">
        Temperature
      </label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={temperature}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="mt-1 block w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-slider"
      />
      <span className="text-sm text-gray-500">{temperature}</span>
    </div>
  );
}
