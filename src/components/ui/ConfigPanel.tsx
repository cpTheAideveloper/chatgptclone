// src/components/ui/ConfigPanel.tsx
import React from "react";
import ModelSelector from "./ModelSelector";
import TemperatureSlider from "./TemperatureSlider";

interface ConfigPanelProps {
  model: string;
  onModelChange: (model: string) => void;
  temperature: number;
  onTemperatureChange: (temp: number) => void;
}

export default function ConfigPanel({
  model,
  onModelChange,
  temperature,
  onTemperatureChange,
}: ConfigPanelProps) {
  return (
    <div className="p-4 bg-white shadow rounded mb-4">
      <ModelSelector selectedModel={model} onChange={onModelChange} />
      <TemperatureSlider
        temperature={temperature}
        onChange={onTemperatureChange}
      />
    </div>
  );
}
