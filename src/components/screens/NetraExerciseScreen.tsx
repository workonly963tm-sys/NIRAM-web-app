import React from "react";
import { NetraVisionDashboard } from "../NetraVisionDashboard";

interface NetraExerciseScreenProps {
  onNavigate: (screen: string) => void;
}

export function NetraExerciseScreen({ onNavigate }: NetraExerciseScreenProps) {
  return <NetraVisionDashboard initialMode="exercise" onNavigate={onNavigate} />;
}
