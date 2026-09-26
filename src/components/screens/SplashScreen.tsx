import React from "react";
import { motion } from "motion/react";
import { ChevronRight, Sparkles, Eye, Salad } from "lucide-react";
import { NiramLogo } from "../NiramLogo";

interface SplashScreenProps {
  onStart: () => void;
}

export function SplashScreen({ onStart }: SplashScreenProps) {
  const highlights = [
    {
      icon: Sparkles,
      title: "Discover Your Dosha",
      desc: "Ancient Ayurvedic prakriti analysis",
    },
    {
      icon: Eye,
      title: "Netra AI Vision",
      desc: "Food, face, and movement scanner",
    },
    {
      icon: Salad,
      title: "Bhartiya Nutrition",
      desc: "Seasonal, local, and personalized diet",
    },
  ];

  return (
    <div className="min-h-screen bg-cream-300 flex flex-col justify-between px-6 pt-16 pb-12">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="mb-6"
        >
          <NiramLogo size="lg" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="font-display font-extrabold text-4xl text-charcoal-900 tracking-tight">
            NIRAM
          </h1>
          <p className="text-saffron-600 font-semibold tracking-wider text-sm mt-1">
            VEDIC INTELLIGENCE & HEALTH
          </p>
          <p className="text-charcoal-600 text-sm mt-3 max-w-xs leading-relaxed">
            Ancient Wisdom. Smart Fitness. Better Wellness.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="w-full mt-10 space-y-3"
        >
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="card p-4 flex items-center gap-4 text-left"
              >
                <div className="w-12 h-12 rounded-2xl bg-saffron-100 flex items-center justify-center flex-shrink-0">
                  <Icon size={22} className="text-saffron-600" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-charcoal-900 text-sm">
                    {item.title}
                  </h3>
                  <p className="text-xs text-charcoal-500 mt-0.5">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="pt-6"
      >
        <button
          onClick={onStart}
          className="btn-primary w-full flex items-center justify-center gap-2 text-base font-semibold shadow-saffron cursor-pointer"
        >
          <span>Begin Your Journey</span>
          <ChevronRight size={20} />
        </button>
      </motion.div>
    </div>
  );
}
