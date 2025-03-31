import React from "react";
import ModelSelector from "./ModelSelector";
import TemperatureSlider from "./TemperatureSlider";
import { Settings, ChevronRight } from "lucide-react";

interface ConfigPanelProps {
  selectedModel: string;
  temperature: number;
  onModelChange: (model: string) => void;
  onTemperatureChange: (temperature: number) => void;
}

export default function ConfigPanel({
  selectedModel,
  temperature,
  onModelChange,
  onTemperatureChange,
}: ConfigPanelProps) {
  return (
    <div className="w-full md:w-80 p-4 border-l border-gray-200 bg-gray-50">
      <div className="flex items-center mb-5">
        <Settings size={16} className="text-gray-500 mr-2" />
        <h2 className="text-base font-semibold text-gray-800">Configuration</h2>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
        <ModelSelector 
          selectedModel={selectedModel} 
          onChange={onModelChange} 
        />
        
        <div className="h-px bg-gray-100 my-4"></div>
        
        <TemperatureSlider
          temperature={temperature}
          onChange={onTemperatureChange}
        />
      </div>
      
      {/* Additional iOS-style Settings Links */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <a href="#" className="flex items-center justify-between p-4 hover:bg-gray-50 transition duration-150 border-b border-gray-100">
          <span className="text-sm text-gray-800">Advanced Settings</span>
          <ChevronRight size={16} className="text-gray-400" />
        </a>
        <a href="#" className="flex items-center justify-between p-4 hover:bg-gray-50 transition duration-150">
          <span className="text-sm text-gray-800">API Key Settings</span>
          <ChevronRight size={16} className="text-gray-400" />
        </a>
      </div>
      
      <div className="mt-4 text-center">
        <button className="text-xs text-blue-500 hover:text-blue-600 transition duration-150">
          Reset to Defaults
        </button>
      </div>
    </div>
  );
}