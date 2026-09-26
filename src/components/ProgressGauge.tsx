import React from "react";
import { motion } from "motion/react";

interface ProgressGaugeProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  sublabel?: string;
}

export function ProgressGauge({
  value,
  size = 120,
  strokeWidth = 10,
  color = "#EA580C",
  label,
  sublabel,
}: ProgressGaugeProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressDash = (Math.min(100, Math.max(0, value)) / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#EDE8D3"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${progressDash} ${circumference - progressDash}`}
          strokeLinecap="round"
          initial={{ strokeDasharray: `0 ${circumference}` }}
          animate={{ strokeDasharray: `${progressDash} ${circumference - progressDash}` }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
        <span className="text-xl font-display font-extrabold text-charcoal-900 leading-none">
          {label ?? `${value}%`}
        </span>
        {sublabel && (
          <span className="text-[10px] text-charcoal-500 font-semibold mt-0.5">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
}
