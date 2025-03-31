import React, { useState } from "react";
import { Thermometer, Snowflake, Flame } from "lucide-react";

interface TemperatureSliderProps {
  temperature: number;
  onChange: (temperature: number) => void;
}

export default function TemperatureSlider({
  temperature,
  onChange,
}: TemperatureSliderProps) {
  // Track if the user is currently dragging
  const [isDragging, setIsDragging] = useState(false);
  
  // Calculate color gradient based on temperature
  const getGradientColor = () => {
    // Blue (cold) to red (hot)
    return `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${temperature * 30}%, #8b5cf6 ${temperature * 50}%, #ef4444 ${temperature * 100}%)`;
  };

  // Get description text based on temperature
  const getTemperatureDescription = () => {
    if (temperature < 0.3) return "More precise, predictable responses";
    if (temperature < 0.7) return "Balanced creativity and coherence";
    return "More creative, diverse responses";
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center">
          <Thermometer size={14} className="text-gray-500 mr-1" />
          <label className="text-sm font-medium text-gray-700">Temperature</label>
        </div>
        <span className={`text-sm font-medium ${
          isDragging ? "text-blue-500" : "text-gray-500"
        }`}>
          {temperature.toFixed(2)}
        </span>
      </div>
      
      {/* iOS-style slider track with thumb */}
      <div className="relative mt-2 mb-1">
        <div 
          className="h-1.5 rounded-full w-full" 
          style={{ background: getGradientColor() }}
        />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={temperature}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className="absolute inset-0 w-full h-1.5 appearance-none bg-transparent cursor-pointer"
          style={{
            WebkitAppearance: "none",
            appearance: "none"
          }}
        />
        <style jsx>{`
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: white;
            border: 1px solid #e2e8f0;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            cursor: pointer;
            transition: transform 0.1s;
          }
          input[type="range"]::-webkit-slider-thumb:active {
            transform: scale(1.2);
            box-shadow: 0 1px 4px rgba(0,0,0,0.2);
          }
        `}</style>
      </div>

      {/* Temperature indicator icons */}
      <div className="flex justify-between items-center mt-1">
        <div className="flex items-center">
          <Snowflake size={14} className="text-blue-500 mr-1" />
          <span className="text-xs text-gray-500">Precise</span>
        </div>
        <span className="text-xs text-gray-500">{getTemperatureDescription()}</span>
        <div className="flex items-center">
          <span className="text-xs text-gray-500">Creative</span>
          <Flame size={14} className="text-red-500 ml-1" />
        </div>
      </div>
    </div>
  );
}