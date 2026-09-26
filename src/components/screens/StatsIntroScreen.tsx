import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronRight,
  Heart,
  Activity,
  Zap,
  Utensils,
  Armchair,
  Moon,
} from "lucide-react";
import { lifestyleStats, rootCauses } from "../../data";

interface StatsIntroScreenProps {
  onNext: () => void;
}

const statIcons = [Heart, Activity, Zap];
const rootCauseIcons = [Utensils, Armchair, Moon];

export function StatsIntroScreen({ onNext }: StatsIntroScreenProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [showRootCauses, setShowRootCauses] = useState(false);

  if (!showRootCauses && stepIndex < lifestyleStats.length) {
    const stat = lifestyleStats[stepIndex];
    const Icon = statIcons[stepIndex];

    return (
      <div className="min-h-screen bg-cream-300 flex flex-col justify-between">
        <div className="flex items-center justify-between px-6 pt-12 pb-4">
          <div className="flex gap-1.5">
            {lifestyleStats.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === stepIndex ? "w-8 bg-saffron-600" : "w-1.5 bg-cream-500"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => setShowRootCauses(true)}
            className="text-sm text-charcoal-400 font-semibold cursor-pointer hover:text-charcoal-600 transition-colors"
          >
            Skip
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={stepIndex}
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-28 h-28 rounded-3xl bg-saffron-100 flex items-center justify-center mb-8 shadow-card"
            >
              <Icon size={56} className="text-saffron-600" strokeWidth={1.5} />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${stepIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.15 }}
            >
              <p className="font-display font-extrabold text-6xl text-saffron-600 tracking-tight">
                {stat.value}
              </p>
              <p className="text-charcoal-600 text-lg mt-4 leading-relaxed max-w-sm">
                {stat.label}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="px-6 pb-12">
          <button
            onClick={() => {
              if (stepIndex < lifestyleStats.length - 1) {
                setStepIndex(stepIndex + 1);
              } else {
                setShowRootCauses(true);
              }
            }}
            className="btn-primary w-full flex items-center justify-center gap-2 text-base font-semibold shadow-saffron cursor-pointer"
          >
            <span>
              {stepIndex < lifestyleStats.length - 1 ? "Next" : "See Root Causes"}
            </span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-300 flex flex-col justify-between">
      <div className="px-6 pt-12 pb-4">
        <p className="text-sm text-saffron-600 font-semibold tracking-wide">
          The Root Causes
        </p>
        <h2 className="font-display font-extrabold text-2xl text-charcoal-900 mt-1">
          Why is this happening?
        </h2>
      </div>

      <div className="flex-1 px-6 space-y-4">
        {rootCauses.map((cause, idx) => {
          const Icon = rootCauseIcons[idx];
          return (
            <motion.div
              key={cause.title}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="card p-5 flex items-start gap-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-saffron-50 flex items-center justify-center flex-shrink-0 shadow-soft">
                <Icon size={28} className="text-saffron-600" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-charcoal-900">
                  {cause.title}
                </h3>
                <p className="text-sm text-charcoal-600 mt-1 leading-relaxed">
                  {cause.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="px-6 pb-12 pt-4">
        <p className="text-center text-charcoal-500 text-sm mb-4">
          Niram addresses all three — with ancient Ayurvedic wisdom
        </p>
        <button
          onClick={onNext}
          className="btn-primary w-full flex items-center justify-center gap-2 text-base font-semibold shadow-saffron cursor-pointer"
        >
          <span>I'm Ready to Learn</span>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
