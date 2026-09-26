import React from "react";
import { motion } from "motion/react";
import { ChevronLeft, Check, Palette } from "lucide-react";
import { useNiramStore } from "../../store";
import { themeOptions } from "../../data";

interface ThemeSwitcherScreenProps {
  onNavigate: (screen: string) => void;
}

export function ThemeSwitcherScreen({ onNavigate }: ThemeSwitcherScreenProps) {
  const { theme, setTheme } = useNiramStore();

  return (
    <div className="min-h-screen bg-cream-300 pb-28">
      {/* Top Header */}
      <div className="px-6 pt-12 pb-4 flex items-center gap-3">
        <button
          onClick={() => onNavigate("profile")}
          className="w-10 h-10 rounded-xl bg-cream-100 flex items-center justify-center shadow-soft cursor-pointer hover:bg-cream-200 transition-colors"
        >
          <ChevronLeft size={20} className="text-saffron-600" />
        </button>
        <div>
          <h1 className="font-display font-extrabold text-2xl text-charcoal-900">
            Theme Switcher
          </h1>
          <p className="text-xs text-charcoal-500">
            Choose how Niram connects with you
          </p>
        </div>
      </div>

      {/* Theme Cards List */}
      <div className="px-6 space-y-4">
        {themeOptions.map((opt, idx) => {
          const isSelected = theme === opt.id;
          return (
            <motion.button
              key={opt.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setTheme(opt.id as any)}
              className={`w-full rounded-3xl overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                isSelected
                  ? "border-saffron-600 shadow-lifted"
                  : "border-transparent"
              }`}
            >
              {/* Preview Canvas */}
              <div className={`${opt.bgClass} p-5 relative`}>
                <div
                  className={`${opt.cardClass} rounded-2xl p-4 flex items-center gap-3`}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: opt.accent }}
                  >
                    <Palette size={22} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div
                      className="h-2 w-20 rounded-full mb-2"
                      style={{ backgroundColor: opt.accent, opacity: 0.3 }}
                    />
                    <div
                      className="h-2 w-32 rounded-full"
                      style={{
                        backgroundColor:
                          opt.id === "gaming" || opt.id === "royal" || opt.id === "lunar"
                            ? "rgba(255,255,255,0.2)"
                            : "rgba(0,0,0,0.12)",
                      }}
                    />
                  </div>
                </div>

                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="absolute top-3 right-3 w-7 h-7 rounded-full bg-saffron-600 flex items-center justify-center shadow-soft"
                  >
                    <Check size={16} className="text-white" strokeWidth={3} />
                  </motion.div>
                )}
              </div>

              {/* Title & Description */}
              <div className="bg-cream-100 p-4 flex items-center justify-between">
                <div className="text-left">
                  <p className="font-display font-bold text-lg text-charcoal-900">
                    {opt.label}
                  </p>
                  <p className="text-xs text-charcoal-500">{opt.desc}</p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <p className="text-center text-xs text-charcoal-400 mt-6 px-6">
        Your theme preference is saved and applied across the app
      </p>
    </div>
  );
}
