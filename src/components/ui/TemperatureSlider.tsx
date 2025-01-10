// src/components/ui/TemperatureSlider.tsx
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
        Temperature: {temperature}
      </label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={temperature}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full"
      />
    </div>
  );
}
