import React from "react";
import { Eye } from "lucide-react";

interface NiramLogoProps {
  size?: "sm" | "md" | "lg";
}

export function NiramLogo({ size = "md" }: NiramLogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-20 h-20",
  };
  const iconSizes = {
    sm: 16,
    md: 24,
    lg: 40,
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-2xl bg-gradient-to-br from-saffron-500 to-saffron-700 flex items-center justify-center shadow-saffron`}
    >
      <Eye size={iconSizes[size]} className="text-white" strokeWidth={2.5} />
    </div>
  );
}

export function NiramBrandHeader({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <NiramLogo size="sm" />
      <div className="leading-none">
        <span className="font-display font-extrabold text-lg text-charcoal-900 tracking-tight">
          NIRAM
        </span>
        <p className="text-[10px] text-saffron-600 font-semibold tracking-wide mt-0.5">
          VEDIC INTELLIGENCE
        </p>
      </div>
    </div>
  );
}
