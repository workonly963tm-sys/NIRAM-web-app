import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import {
  ChevronRight,
  Feather,
  Sun,
  Flower2,
  Check,
  Clock,
  X,
  Salad,
} from "lucide-react";
import { doshaProfiles } from "../../data";
import { useNiramStore } from "../../store";
import { TriDoshaRing } from "../TriDoshaRing";
import { DoshaType, DoshaScores } from "../../types";

interface DoshaResultScreenProps {
  onContinue: () => void;
}

const motifIcons = {
  feather: Feather,
  sun: Sun,
  lotus: Flower2,
};

export function DoshaResultScreen({ onContinue }: DoshaResultScreenProps) {
  const { quizAnswers, completeOnboarding } = useNiramStore();
  const [showPlan, setShowPlan] = useState(false);

  const { scores, dominant } = useMemo(() => {
    const s: DoshaScores = { vata: 0, pitta: 0, kapha: 0 };
    Object.values(quizAnswers).forEach((d) => {
      if (d in s) s[d]++;
    });
    // Ensure non-zero fallback
    if (s.vata === 0 && s.pitta === 0 && s.kapha === 0) {
      s.vata = 3;
      s.pitta = 2;
      s.kapha = 1;
    }
    const maxScore = Math.max(s.vata, s.pitta, s.kapha);
    let dom: DoshaType = "vata";
    if (s.pitta === maxScore) dom = "pitta";
    else if (s.kapha === maxScore) dom = "kapha";

    return { scores: s, dominant: dom };
  }, [quizAnswers]);

  const profile = doshaProfiles[dominant];
  const MotifIcon = motifIcons[profile.motif] || Feather;

  const handleProceed = () => {
    if (showPlan) {
      completeOnboarding(dominant, scores);
      onContinue();
    } else {
      setShowPlan(true);
    }
  };

  if (!showPlan) {
    return (
      <div
        className={`min-h-screen bg-gradient-to-b ${profile.bgGradient} flex flex-col items-center justify-between px-6 pt-16 pb-12`}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-charcoal-500 font-semibold text-sm tracking-wide">
            Your Prakriti is
          </p>
        </motion.div>

        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.2 }}
            className="w-32 h-32 rounded-full flex items-center justify-center mb-6 shadow-lifted"
            style={{ backgroundColor: profile.color }}
          >
            <MotifIcon size={64} className="text-white" strokeWidth={1.5} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-display font-extrabold text-5xl text-charcoal-900 tracking-tight"
          >
            {profile.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-charcoal-600 font-display text-lg mt-2 font-medium"
          >
            {profile.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, type: "spring" }}
            className="my-8"
          >
            <TriDoshaRing scores={scores} size={180} strokeWidth={14} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex gap-6 mb-4"
          >
            {(["vata", "pitta", "kapha"] as DoshaType[]).map((d) => (
              <div key={d} className="text-center">
                <div
                  className="w-4 h-4 rounded-full mb-1 mx-auto"
                  style={{ backgroundColor: doshaProfiles[d].color }}
                />
                <p className="text-xs font-semibold text-charcoal-600">
                  {doshaProfiles[d].name}
                </p>
                <p className="text-lg font-display font-bold text-charcoal-900">
                  {scores[d]}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="w-full"
        >
          <button
            onClick={handleProceed}
            className="btn-primary w-full flex items-center justify-center gap-2 text-base font-semibold shadow-saffron cursor-pointer"
          >
            <span>See My Wellness Plan</span>
            <ChevronRight size={18} />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-300 flex flex-col justify-between">
      <div className={`bg-gradient-to-b ${profile.bgGradient} px-6 pt-12 pb-8`}>
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-card"
            style={{ backgroundColor: profile.color }}
          >
            <MotifIcon size={32} className="text-white" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="font-display font-extrabold text-2xl text-charcoal-900">
              {profile.name}
            </h2>
            <p className="text-charcoal-600 text-sm">
              {profile.subtitle} Constitution
            </p>
          </div>
        </div>
        <p className="text-charcoal-700 text-sm mt-4 leading-relaxed">
          {profile.description}
        </p>
      </div>

      <div className="flex-1 px-6 py-6 space-y-4 overflow-y-auto">
        {/* What to Eat */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-sage-100 flex items-center justify-center">
              <Salad size={18} className="text-sage-600" />
            </div>
            <h3 className="font-display font-bold text-lg text-charcoal-900">
              What to Eat
            </h3>
          </div>
          <div className="space-y-2">
            {profile.eatMore.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5">
                <Check size={16} className="text-sage-600 flex-shrink-0" strokeWidth={2.5} />
                <span className="text-sm text-charcoal-700 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* When to Eat / Routine */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-saffron-100 flex items-center justify-center">
              <Clock size={18} className="text-saffron-600" />
            </div>
            <h3 className="font-display font-bold text-lg text-charcoal-900">
              When to Eat & Routine
            </h3>
          </div>
          <div className="space-y-2">
            {profile.routine.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-saffron-500 flex-shrink-0" />
                <span className="text-sm text-charcoal-700 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* What to Avoid */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
              <X size={18} className="text-red-500" />
            </div>
            <h3 className="font-display font-bold text-lg text-charcoal-900">
              What to Avoid
            </h3>
          </div>
          <div className="space-y-2">
            {profile.eatLess.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5">
                <X size={16} className="text-red-400 flex-shrink-0" strokeWidth={2.5} />
                <span className="text-sm text-charcoal-700 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="px-6 pb-12 pt-4">
        <button
          onClick={handleProceed}
          className="btn-primary w-full flex items-center justify-center gap-2 text-base font-semibold shadow-saffron cursor-pointer"
        >
          <span>Enter Niram</span>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
