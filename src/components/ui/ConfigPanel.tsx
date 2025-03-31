import React, { useState } from "react";
import ModelSelector from "./ModelSelector";
import TemperatureSlider from "./TemperatureSlider";
import { Settings, ChevronRight, FileText, RefreshCw } from "lucide-react";

interface ConfigPanelProps {
  selectedModel: string;
  temperature: number;
  onModelChange: (model: string) => void;
  onTemperatureChange: (temperature: number) => void;
  systemConfigurations: string;
  onSystemConfigurationsChange: (config: string) => void;
}

export default function ConfigPanel({
  selectedModel,
  temperature,
  onModelChange,
  onTemperatureChange,
  systemConfigurations,
  onSystemConfigurationsChange,
}: ConfigPanelProps) {
  const [showSystemConfig, setShowSystemConfig] = useState(false);

  return (
    <div className="w-full md:w-80 p-4 border-l border-gray-200 bg-gray-50 dark:bg-gray-900 dark:border-gray-700 overflow-y-auto h-full">
      <div className="flex items-center mb-5">
        <Settings size={16} className="text-gray-500 dark:text-gray-400 mr-2" />
        <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">Configuration</h2>
      </div>
      
      {/* Model & Temperature Panel */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 mb-4">
        <ModelSelector 
          selectedModel={selectedModel} 
          onChange={onModelChange} 
        />
        
        <div className="h-px bg-gray-100 dark:bg-gray-700 my-4"></div>
        
        <TemperatureSlider
          temperature={temperature}
          onChange={onTemperatureChange}
        />
      </div>
      
      {/* System Configuration Panel */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mb-4">
        <button 
          onClick={() => setShowSystemConfig(!showSystemConfig)}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150 text-left"
        >
          <div className="flex items-center">
            <FileText size={16} className="text-purple-500 mr-2" />
            <span className="text-sm text-gray-800 dark:text-gray-200">System Configuration</span>
          </div>
          <ChevronRight 
            size={16} 
            className={`text-gray-400 transform transition-transform duration-200 ${showSystemConfig ? 'rotate-90' : ''}`} 
          />
        </button>
        
        {showSystemConfig && (
          <div className="p-4 border-t border-gray-100 dark:border-gray-700">
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2">
              System instructions help guide the AI's responses
            </label>
            <textarea
              value={systemConfigurations}
              onChange={(e) => onSystemConfigurationsChange(e.target.value)}
              placeholder="Add system instructions to guide the AI..."
              className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 
                        text-gray-800 dark:text-gray-200 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
              rows={5}
            ></textarea>
            
            <div className="flex justify-between mt-2 text-xs">
              <span className="text-gray-500 dark:text-gray-400">
                {systemConfigurations.length} characters
              </span>
              <button 
                onClick={() => onSystemConfigurationsChange("")}
                className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Advanced Settings Link */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <a href="#" className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150">
          <span className="text-sm text-gray-800 dark:text-gray-200">Advanced Settings</span>
          <ChevronRight size={16} className="text-gray-400" />
        </a>
      </div>
      
      {/* Reset Button */}
      <div className="mt-4 text-center">
        <button className="inline-flex items-center text-xs text-purple-500 hover:text-purple-600 transition duration-150">
          <RefreshCw size={12} className="mr-1" />
          Reset to Defaults
        </button>
      </div>
    </div>
  );
}