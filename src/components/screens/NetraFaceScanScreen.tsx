import React from "react";
import { NetraVisionDashboard } from "../NetraVisionDashboard";

interface NetraFaceScanScreenProps {
  onNavigate: (screen: string) => void;
}

export function NetraFaceScanScreen({ onNavigate }: NetraFaceScanScreenProps) {
  return <NetraVisionDashboard initialMode="face" onNavigate={onNavigate} />;
}
