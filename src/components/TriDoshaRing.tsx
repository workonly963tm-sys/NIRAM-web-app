import React from "react";
import { motion } from "motion/react";
import { DoshaScores } from "../types";

interface TriDoshaRingProps {
  scores: DoshaScores;
  size?: number;
  strokeWidth?: number;
  animate?: boolean;
}

export function TriDoshaRing({
  scores,
  size = 200,
  strokeWidth = 16,
  animate = true,
}: TriDoshaRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = scores.vata + scores.pitta + scores.kapha || 1;

  const vataPct = (scores.vata / total) * 100;
  const pittaPct = (scores.pitta / total) * 100;
  const kaphaPct = (scores.kapha / total) * 100;

  const segments = [
    { pct: vataPct, color: "#8FB3C9", label: "Vata" },
    { pct: pittaPct, color: "#EA580C", label: "Pitta" },
    { pct: kaphaPct, color: "#65A30D", label: "Kapha" },
  ];

  let cumulativeOffset = 0;

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
        {segments.map((seg, idx) => {
          const dash = (seg.pct / 100) * circumference;
          const currentOffset = cumulativeOffset;
          cumulativeOffset += dash;

          return (
            <motion.circle
              key={idx}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-currentOffset}
              strokeLinecap="round"
              initial={animate ? { strokeDasharray: `0 ${circumference}` } : undefined}
              animate={animate ? { strokeDasharray: `${dash} ${circumference - dash}` } : undefined}
              transition={{
                duration: 0.9,
                delay: idx * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
        <span className="text-3xl font-display font-extrabold text-charcoal-900 leading-none">
          {Math.round(vataPct + pittaPct + kaphaPct)}%
        </span>
        <span className="text-xs text-charcoal-500 font-semibold mt-1">
          Prakriti
        </span>
      </div>
    </div>
  );
}
