import React, { useState } from "react";
import { ChevronDown, Cpu, Check, X } from "lucide-react";

interface ModelSelectorProps {
  selectedModel: string;
  onChange: (model: string) => void;
}

const models = [
  { name: "gpt-4o-mini", label: "GPT-4o Mini" },
  { name: "gpt-4o", label: "GPT-4o" },
  { name: "gpt-4", label: "GPT-4" },
  { name: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
];

export default function ModelSelector({
  selectedModel,
  onChange,
}: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedModelObj = models.find(model => model.name === selectedModel) || models[0];

  return (
    <div className="relative mb-4">
      <div 
        onClick={() => isOpen && setIsOpen(false)}
        className="fixed inset-0 h-full w-full z-10"
        style={{ display: isOpen ? "block" : "none" }}
      />
      <div className="flex items-center mb-1">
        <Cpu size={14} className="text-gray-500 mr-1" />
        <label className="text-sm font-medium text-gray-700">Model</label>
      </div>
      
      {/* iOS-style selector button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-left text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <span className="font-medium text-gray-900">{selectedModelObj.label}</span>
        <ChevronDown size={16} className={`text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {/* Dropdown */}
      {isOpen && (
        <div 
          className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 z-20 overflow-hidden"
        >
            <div className="flex justify-between items-center p-3 border-b border-gray-100">
              <X size={18} className="text-gray-400 cursor-pointer" onClick={() => setIsOpen(false)} />
              <span className="text-sm font-medium text-gray-800">Select Model</span>
              <div className="w-5" />
            </div>
            
            <div className="max-h-60 overflow-auto py-1">
              {models.map((model) => (
                <div
                  key={model.name}
                  onClick={() => {
                    onChange(model.name);
                    setIsOpen(false);
                  }}
                  className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{model.label}</p>
                  </div>
                  {model.name === selectedModel && (
                    <Check size={16} className="text-blue-500" />
                  )}
                </div>
              ))}
            </div>
          </div>
      )}
    </div>
  );
}