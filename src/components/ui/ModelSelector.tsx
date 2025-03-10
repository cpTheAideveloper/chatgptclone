import React from "react";

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
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Model</label>
      <select
        value={selectedModel}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
      >
        {models.map((model) => (
          <option key={model.name} value={model.name}>
            {model.label}
          </option>
        ))}
      </select>
    </div>
  );
}
