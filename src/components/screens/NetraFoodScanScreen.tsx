import React from "react";
import { NetraVisionDashboard } from "../NetraVisionDashboard";

interface NetraFoodScanScreenProps {
  onNavigate: (screen: string) => void;
}

export function NetraFoodScanScreen({ onNavigate }: NetraFoodScanScreenProps) {
  return <NetraVisionDashboard initialMode="food" onNavigate={onNavigate} />;
}
