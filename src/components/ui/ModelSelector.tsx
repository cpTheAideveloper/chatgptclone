// src/components/ui/ModelSelector.tsx
import React from "react";

interface ModelSelectorProps {
  selectedModel: string;
  onChange: (model: string) => void;
}

const models = ["gpt-3.5-turbo", "gpt-4"];

export default function ModelSelector({
  selectedModel,
  onChange,
}: ModelSelectorProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Model</label>
      <select
        value={selectedModel}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
      >
        {models.map((model) => (
          <option key={model} value={model}>
            {model}
          </option>
        ))}
      </select>
    </div>
  );
}
