import React from "react";
import ModelSelector from "./ModelSelector";
import TemperatureSlider from "./TemperatureSlider";

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
    <div className="w-full md:w-1/4 p-4 border-l border-gray-300">
      <h2 className="text-lg font-semibold mb-4">Configuration</h2>
      <ModelSelector selectedModel={selectedModel} onChange={onModelChange} />
      <TemperatureSlider
        temperature={temperature}
        onChange={onTemperatureChange}
      />
    </div>
  );
}