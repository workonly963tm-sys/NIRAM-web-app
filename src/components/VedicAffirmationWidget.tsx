import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Feather,
  Sun,
  Flower2,
  Wind,
  Flame,
  Clock,
  Share2,
} from "lucide-react";
import { DoshaType } from "../types";
import { getDailyVedicAffirmation, doshaProfiles } from "../data";

interface VedicAffirmationWidgetProps {
  dosha: DoshaType;
}

const doshaThemeTokens = {
  vata: {
    icon: Feather,
    label: "Vāta Harmonizer",
    element: "Air & Ether • Grounding Stillness",
    accentBg: "bg-amber-500/10",
    accentText: "text-amber-700",
    badgeBorder: "border-amber-300/60",
    highlightGlow: "from-amber-500/15 via-orange-400/10 to-transparent",
    breathBg: "bg-amber-500",
  },
  pitta: {
    icon: Sun,
    label: "Pitta Soother",
    element: "Fire & Water • Cooling Compassion",
    accentBg: "bg-rose-500/10",
    accentText: "text-rose-700",
    badgeBorder: "border-rose-300/60",
    highlightGlow: "from-rose-500/15 via-amber-400/10 to-transparent",
    breathBg: "bg-sky-500",
  },
  kapha: {
    icon: Flower2,
    label: "Kapha Awakener",
    element: "Earth & Water • Radiant Vitality",
    accentBg: "bg-emerald-500/10",
    accentText: "text-emerald-700",
    badgeBorder: "border-emerald-300/60",
    highlightGlow: "from-emerald-500/15 via-teal-400/10 to-transparent",
    breathBg: "bg-emerald-500",
  },
};

export function VedicAffirmationWidget({ dosha }: VedicAffirmationWidgetProps) {
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<"Inhale" | "Hold" | "Exhale">(
    "Inhale"
  );

  const activeDosha: DoshaType = dosha || "vata";
  const dailyData = getDailyVedicAffirmation(activeDosha);
  const { affirmation, formattedDate, hoursUntilNext, dayIndex, totalDays } =
    dailyData;
  const profile = doshaProfiles[activeDosha];
  const token = doshaThemeTokens[activeDosha] || doshaThemeTokens.vata;
  const DoshaIcon = token.icon;

  // Guided breathing timer
  useEffect(() => {
    if (!breathingActive) return;

    let timer: NodeJS.Timeout;
    const runCycle = () => {
      setBreathPhase("Inhale");
      timer = setTimeout(() => {
        setBreathPhase("Hold");
        timer = setTimeout(() => {
          setBreathPhase("Exhale");
          timer = setTimeout(runCycle, 4000);
        }, 4000);
      }, 4000);
    };

    runCycle();
    return () => clearTimeout(timer);
  }, [breathingActive]);

  // Audio Chant synthesis
  const handleListen = () => {
    if (!("speechSynthesis" in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const textToRead = `${affirmation.transliteration}. ${affirmation.translation}. Source: ${affirmation.source}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.88;
    utterance.pitch = 1.0;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = () => {
    const text = `🕉️ Daily Vedic Affirmation (${profile.name} Prakriti)\n\n${affirmation.sanskrit}\n"${affirmation.transliteration}"\n\n${affirmation.translation}\n\n— Source: ${affirmation.source} (${affirmation.theme})\nShared from NIRAM Vedic Intelligence`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="card p-5 relative overflow-hidden border border-saffron-200/80 shadow-card"
    >
      {/* Background Vedic Glow */}
      <div
        className={`absolute -top-12 -right-12 w-48 h-48 rounded-full bg-gradient-to-br ${token.highlightGlow} blur-3xl pointer-events-none`}
      />

      {/* Header Bar */}
      <div className="flex items-center justify-between gap-2 mb-3 relative">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center shadow-soft"
            style={{ backgroundColor: `${profile.color}20` }}
          >
            <DoshaIcon size={16} style={{ color: profile.color }} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-charcoal-900 tracking-wide uppercase">
                Daily Vedic Affirmation
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-saffron-500 animate-pulse" />
            </div>
            <p className="text-[11px] text-charcoal-500 font-medium">
              {formattedDate} • 24h Cycle ({dayIndex}/{totalDays})
            </p>
          </div>
        </div>

        {/* Dosha Pill */}
        <div
          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${token.badgeBorder} ${token.accentBg} ${token.accentText} flex items-center gap-1`}
        >
          <Sparkles size={11} />
          <span>{token.label}</span>
        </div>
      </div>

      {/* Sanskrit Sloka Box */}
      <div className="bg-cream-200/80 rounded-2xl p-4 my-3 border border-cream-400/40 text-center relative">
        <div className="flex justify-center mb-1.5">
          <span className="text-xs text-saffron-600/80 tracking-widest font-semibold uppercase">
            ॥ मन्त्र सङ्कल्प ॥
          </span>
        </div>
        <p className="font-display font-extrabold text-lg sm:text-xl text-charcoal-900 leading-relaxed tracking-wide">
          {affirmation.sanskrit}
        </p>
        <p className="text-xs text-charcoal-600 font-medium italic mt-1.5">
          "{affirmation.transliteration}"
        </p>
      </div>

      {/* English Meaning & Personalized Reflection */}
      <div className="space-y-2 mb-3">
        <p className="text-sm text-charcoal-800 font-medium leading-relaxed">
          {affirmation.translation}
        </p>

        <div className="flex items-center justify-between text-xs pt-1 border-t border-cream-400/50">
          <span className="text-charcoal-500 font-medium flex items-center gap-1">
            <span className="text-saffron-600 font-bold">Source:</span>{" "}
            {affirmation.source}
          </span>
          <span className="text-[11px] text-charcoal-400 flex items-center gap-1">
            <Clock size={11} />
            Next in ~{hoursUntilNext}h
          </span>
        </div>
      </div>

      {/* Breathing Meditation Mode */}
      <AnimatePresence>
        {breathingActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-3"
          >
            <div className="bg-charcoal-900 rounded-2xl p-4 text-center text-white relative">
              <p className="text-xs text-white/70 font-medium mb-2">
                Breathe with this Mantra
              </p>
              <div className="relative w-20 h-20 mx-auto flex items-center justify-center my-2">
                <motion.div
                  animate={{
                    scale:
                      breathPhase === "Inhale"
                        ? [1, 1.45]
                        : breathPhase === "Hold"
                        ? 1.45
                        : [1.45, 1],
                  }}
                  transition={{
                    duration: 4,
                    ease: "easeInOut",
                  }}
                  className={`w-14 h-14 rounded-full ${token.breathBg} opacity-80 blur-xs`}
                />
                <span className="absolute font-display font-bold text-sm text-white">
                  {breathPhase}
                </span>
              </div>
              <p className="text-[11px] text-white/60">
                Inhale peace (4s) • Hold stillness (4s) • Exhale tension (4s)
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Controls Bar */}
      <div className="flex items-center justify-between pt-2 border-t border-cream-400/50">
        <button
          onClick={() => setBreathingActive(!breathingActive)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            breathingActive
              ? "bg-charcoal-900 text-white"
              : "bg-cream-100 text-charcoal-700 hover:bg-cream-200"
          }`}
        >
          <Wind size={13} className={breathingActive ? "text-saffron-400" : "text-saffron-600"} />
          <span>{breathingActive ? "Close Breath" : "Breathe Mantra"}</span>
        </button>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleListen}
            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
              isSpeaking
                ? "bg-saffron-600 text-white"
                : "bg-cream-100 text-charcoal-600 hover:bg-cream-200 hover:text-saffron-600"
            }`}
            title={isSpeaking ? "Pause Audio" : "Listen to Mantra"}
          >
            {isSpeaking ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>

          <button
            onClick={handleCopy}
            className="w-8 h-8 rounded-xl bg-cream-100 flex items-center justify-center text-charcoal-600 hover:bg-cream-200 hover:text-saffron-600 transition-colors cursor-pointer"
            title="Copy Affirmation"
          >
            {copied ? (
              <Check size={15} className="text-sage-600" />
            ) : (
              <Copy size={15} />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
