import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Droplets,
  Plus,
  Minus,
  Sparkles,
  RotateCcw,
  Flame,
  Check,
  ChevronDown,
  ChevronUp,
  Info,
  Clock,
  BarChart2,
  Calendar,
  ChevronRight,
  ShieldCheck,
  Zap,
  Award,
} from "lucide-react";
import { useNiramStore } from "../store";
import { weeklyActivityHistory } from "../data";
import { WeeklyWaterChart } from "./WeeklyWaterChart";
import { WaterBadgesSection } from "./WaterBadgesSection";

interface WaterTrackerProps {
  className?: string;
  compact?: boolean;
  defaultTab?: "today" | "weekly" | "badges";
}

export function WaterTracker({
  className = "",
  compact = false,
  defaultTab = "today",
}: WaterTrackerProps) {
  const { user, waterTracker, logWater, setWaterGlasses, setWaterGoal, resetWater } =
    useNiramStore();

  const [activeTab, setActiveTab] = useState<"today" | "weekly" | "badges">(defaultTab);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [justLoggedToast, setJustLoggedToast] = useState<string | null>(null);

  const dominantDosha = user.dosha ?? "vata";
  const {
    glasses,
    goal,
    mlPerGlass,
    consecutiveDays = 2,
    unlockedBadges = ["first-splash", "rhythm-flow"],
    history = [],
    lastLoggedAt,
  } = waterTracker;

  const currentMl = glasses * mlPerGlass;
  const goalMl = goal * mlPerGlass;
  const percentage = Math.min(100, Math.round((glasses / goal) * 100));
  const isGoalAchieved = glasses >= goal;

  const triggerToast = (msg: string) => {
    setJustLoggedToast(msg);
    setTimeout(() => {
      setJustLoggedToast(null);
    }, 2800);
  };

  const handleLog = (amount: number, typeName = "glass", isUshapan = false) => {
    const willAchieve = glasses < goal && glasses + amount >= goal;
    logWater(amount, isUshapan);

    if (willAchieve) {
      triggerToast(
        `🎉 Daily Goal Met! 3-Day Streak Reached • 'Hydration Hero' Unlocked! 🏆`
      );
    } else if (amount > 0) {
      triggerToast(
        `+${amount} ${typeName}${amount > 1 ? "es" : ""} logged (${amount * mlPerGlass}ml)`
      );
    } else {
      triggerToast(`Removed 1 glass`);
    }
  };

  const handleGlassClick = (index: number) => {
    // If clicking on the exact current count, decrement by 1
    if (index + 1 === glasses) {
      handleLog(-1);
    } else {
      const diff = index + 1 - glasses;
      handleLog(diff);
    }
  };

  // Ayurvedic Hydration Wisdom based on Dosha
  const doshaHydrationTips = {
    vata: {
      tag: "Vata Balancing",
      color: "text-amber-600 bg-amber-500/10 border-amber-500/20",
      tip: "Sip warm or lukewarm water regularly throughout the day. Avoid iced drinks to prevent drying your system.",
      idealTemp: "Warm / Lukewarm",
    },
    pitta: {
      tag: "Pitta Soothing",
      color: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20",
      tip: "Drink fresh room-temperature water or earthen-pot (Matka) cooled water with mint or vetiver roots.",
      idealTemp: "Cool Room Temp / Matka",
    },
    kapha: {
      tag: "Kapha Stimulating",
      color: "text-cyan-600 bg-cyan-500/10 border-cyan-500/20",
      tip: "Drink warm water infused with a pinch of dry ginger or tulsi. Sip 30 mins before meals to boost Agni.",
      idealTemp: "Hot / Warm",
    },
  };

  const currentTip = doshaHydrationTips[dominantDosha];

  // Visual array of glasses up to goal (or up to glasses if exceeded)
  const displayCount = Math.max(goal, glasses);
  const glassSlots = Array.from({ length: displayCount }, (_, i) => i);

  // Quick 7-day mini bars data for the snapshot
  const miniWeekData = weeklyActivityHistory.map((item, idx) => {
    const isToday = idx === weeklyActivityHistory.length - 1;
    const g = isToday ? glasses : item.water;
    return {
      day: item.day,
      glasses: g,
      isGoalMet: g >= goal,
      isToday,
      heightPct: Math.min(100, Math.max(15, (g / Math.max(goal + 1, 9)) * 100)),
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: [0.22, 1, 0.36, 1] }}
      className={`card p-5 relative overflow-hidden ${className}`}
    >
      {/* Decorative ambient water glow */}
      <div className="absolute top-0 right-0 w-36 h-36 rounded-full bg-sky-400/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-cyan-400/10 blur-2xl pointer-events-none" />

      {/* Floating toast notification */}
      <AnimatePresence>
        {justLoggedToast && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-3 left-1/2 -translate-x-1/2 z-20 px-3.5 py-1.5 rounded-full bg-sky-600 text-white text-xs font-semibold shadow-lg flex items-center gap-1.5"
          >
            <Droplets size={13} className="text-sky-200 animate-pulse" />
            {justLoggedToast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-600 shadow-soft">
            <Droplets size={20} className="fill-sky-500 text-sky-600" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-display font-bold text-lg text-charcoal-900">
                Water Intake
              </h3>
              {isGoalAchieved && (
                <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                  <Check size={10} strokeWidth={3} /> Goal Met
                </span>
              )}
            </div>
            <p className="text-xs text-charcoal-500">
              Jala Tattva • Daily Hydration
            </p>
          </div>
        </div>

        {/* Goal Selector & Reset Menu */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowGoalModal(!showGoalModal)}
            className="px-2.5 py-1 rounded-xl bg-cream-100 text-xs font-semibold text-charcoal-700 hover:bg-cream-200 transition-colors flex items-center gap-1 cursor-pointer"
            title="Adjust Daily Goal"
          >
            <span>Goal: {goal}</span>
            <ChevronDown size={12} />
          </button>

          <button
            onClick={() => resetWater()}
            className="w-8 h-8 rounded-xl bg-cream-100 flex items-center justify-center text-charcoal-400 hover:text-charcoal-700 hover:bg-cream-200 transition-colors cursor-pointer"
            title="Reset today's water count"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      {/* View Mode Toggle: Today vs 7-Day Trend vs Badges */}
      <div className="flex rounded-2xl bg-cream-200/90 p-1 mb-4 border border-cream-300/50">
        <button
          onClick={() => setActiveTab("today")}
          className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === "today"
              ? "bg-white text-charcoal-900 shadow-sm"
              : "text-charcoal-500 hover:text-charcoal-800"
          }`}
        >
          <Droplets size={13} className={activeTab === "today" ? "text-sky-600" : "text-charcoal-400"} />
          <span>Today</span>
        </button>

        <button
          onClick={() => setActiveTab("weekly")}
          className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === "weekly"
              ? "bg-white text-charcoal-900 shadow-sm"
              : "text-charcoal-500 hover:text-charcoal-800"
          }`}
        >
          <BarChart2 size={13} className={activeTab === "weekly" ? "text-sky-600" : "text-charcoal-400"} />
          <span>7-Day Chart</span>
        </button>

        <button
          onClick={() => setActiveTab("badges")}
          className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === "badges"
              ? "bg-white text-charcoal-900 shadow-sm"
              : "text-charcoal-500 hover:text-charcoal-800"
          }`}
        >
          <Award size={13} className={activeTab === "badges" ? "text-amber-500" : "text-charcoal-400"} />
          <span>Badges</span>
          <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full font-black">
            {unlockedBadges.length}
          </span>
        </button>
      </div>

      {/* Goal Selector Dropdown */}
      <AnimatePresence>
        {showGoalModal && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-4 p-3 rounded-2xl bg-cream-200/80 border border-cream-400/50"
          >
            <p className="text-xs font-bold text-charcoal-800 mb-2">
              Select Daily Target:
            </p>
            <div className="flex gap-2">
              {[6, 8, 10, 12].map((g) => (
                <button
                  key={g}
                  onClick={() => {
                    setWaterGoal(g);
                    setShowGoalModal(false);
                    triggerToast(`Goal updated to ${g} glasses (${g * 250}ml)`);
                  }}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    goal === g
                      ? "bg-sky-500 text-white shadow-soft"
                      : "bg-cream-100 text-charcoal-700 hover:bg-white"
                  }`}
                >
                  {g} ({g * 0.25}L)
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tab 1: Today's Intake Flow */}
      {activeTab === "today" ? (
        <>
          {/* Consecutive Streak & Hydration Hero Milestone Banner */}
          <div
            onClick={() => setActiveTab("badges")}
            className={`p-3.5 rounded-2xl mb-4 border transition-all cursor-pointer flex items-center justify-between group ${
              consecutiveDays >= 3
                ? "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-300 shadow-soft"
                : "bg-cream-100/90 border-cream-300/60 hover:bg-cream-200/70"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                  consecutiveDays >= 3
                    ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-soft"
                    : "bg-sky-100 text-sky-600"
                }`}
              >
                {consecutiveDays >= 3 ? (
                  <ShieldCheck size={20} className="text-white" />
                ) : (
                  <Zap size={20} className="text-amber-500 fill-amber-500" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-display font-black text-sm text-charcoal-900">
                    {consecutiveDays}-Day Streak
                  </span>
                  {consecutiveDays >= 3 ? (
                    <span className="text-[10px] font-black bg-amber-200/90 text-amber-900 px-2 py-0.5 rounded-full border border-amber-300 flex items-center gap-1">
                      <Award size={11} /> 'Hydration Hero' Unlocked
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-sky-800 bg-sky-100 px-2 py-0.5 rounded-full">
                      {Math.max(1, 3 - consecutiveDays)} day to 'Hydration Hero'
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-charcoal-500 mt-0.5">
                  {consecutiveDays >= 3
                    ? "Daily target met consecutively! Tap to view your digital badge collection"
                    : "Meet today's goal to extend your streak and unlock the Hydration Hero badge!"}
                </p>
              </div>
            </div>

            <ChevronRight
              size={16}
              className="text-charcoal-400 group-hover:translate-x-0.5 transition-transform flex-shrink-0 ml-2"
            />
          </div>

          {/* Progress Visualization Bar & Numerical Stats */}
          <div className="bg-cream-100/80 rounded-2xl p-4 mb-4 border border-cream-300/40">
            <div className="flex items-end justify-between mb-2">
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display font-extrabold text-3xl text-charcoal-900 tracking-tight">
                    {glasses}
                  </span>
                  <span className="text-sm font-bold text-charcoal-400">
                    / {goal} glasses
                  </span>
                </div>
                <p className="text-xs text-sky-600 font-medium">
                  {currentMl.toLocaleString()} ml of {goalMl.toLocaleString()} ml target
                </p>
              </div>

              <div className="text-right">
                <span className="inline-block px-2.5 py-1 rounded-full text-xs font-extrabold bg-sky-50 text-sky-600 border border-sky-100">
                  {percentage}%
                </span>
                <p className="text-[11px] text-charcoal-400 font-medium mt-0.5">
                  {isGoalAchieved ? "Pure Ojas ✨" : `${Math.max(0, goal - glasses)} left`}
                </p>
              </div>
            </div>

            {/* Animated Fluid Progress Track */}
            <div className="relative w-full h-3.5 bg-cream-300 rounded-full overflow-hidden p-0.5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (glasses / goal) * 100)}%` }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`h-full rounded-full transition-all relative overflow-hidden ${
                  isGoalAchieved
                    ? "bg-gradient-to-r from-teal-400 via-sky-500 to-emerald-400 shadow-sm"
                    : "bg-gradient-to-r from-sky-400 to-blue-500"
                }`}
              >
                {/* Shimmer wave effect */}
                <div className="absolute inset-0 bg-white/25 w-full animate-pulse" />
              </motion.div>
            </div>
          </div>

          {/* Interactive Glass Icons Grid */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2 text-xs font-medium text-charcoal-500">
              <span>Tap any glass to log</span>
              {lastLoggedAt && (
                <span className="flex items-center gap-1 text-[11px] text-charcoal-400">
                  <Clock size={11} /> Last: {lastLoggedAt}
                </span>
              )}
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {glassSlots.map((idx) => {
                const isFilled = idx < glasses;

                return (
                  <motion.button
                    key={idx}
                    whileTap={{ scale: 0.88 }}
                    onClick={() => handleGlassClick(idx)}
                    title={`Glass ${idx + 1} (${(idx + 1) * mlPerGlass}ml)`}
                    className={`relative flex flex-col items-center justify-center py-2.5 px-1 rounded-2xl transition-all cursor-pointer border ${
                      isFilled
                        ? "bg-gradient-to-b from-sky-100 to-sky-200/90 border-sky-300 text-sky-700 shadow-soft"
                        : "bg-cream-100/60 hover:bg-cream-200 border-dashed border-cream-400/60 text-charcoal-400"
                    }`}
                  >
                    {/* Glass Icon Graphic */}
                    <div className="relative">
                      <div
                        className={`w-6 h-8 rounded-b-lg rounded-t-sm border-2 transition-all flex flex-col justify-end overflow-hidden ${
                          isFilled
                            ? "border-sky-500 bg-sky-50"
                            : "border-charcoal-300/60 bg-transparent"
                        }`}
                      >
                        {isFilled && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "85%" }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="w-full bg-gradient-to-t from-sky-500 to-sky-400"
                          />
                        )}
                      </div>
                      {isFilled && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-sky-600 text-white flex items-center justify-center">
                          <Check size={8} strokeWidth={3} />
                        </div>
                      )}
                    </div>

                    <span
                      className={`text-[10px] font-bold mt-1.5 ${
                        isFilled ? "text-sky-700 font-extrabold" : "text-charcoal-400"
                      }`}
                    >
                      #{idx + 1}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Quick Log Action Buttons */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={() => handleLog(1, "glass")}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-soft transition-all cursor-pointer"
            >
              <Plus size={15} strokeWidth={2.5} />
              <span>+1 Glass</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={() => handleLog(2, "bottle")}
              className="flex items-center justify-center gap-1.5 py-2.5 px-2.5 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-800 font-bold text-xs transition-all cursor-pointer"
            >
              <Droplets size={14} className="text-sky-600 fill-sky-600" />
              <span>+500ml</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.94 }}
              disabled={glasses <= 0}
              onClick={() => handleLog(-1)}
              className={`flex items-center justify-center gap-1 py-2.5 px-2 rounded-xl text-xs font-semibold transition-all ${
                glasses <= 0
                  ? "opacity-40 cursor-not-allowed bg-cream-100 text-charcoal-400"
                  : "bg-cream-100 hover:bg-cream-200 text-charcoal-600 cursor-pointer"
              }`}
            >
              <Minus size={14} />
              <span>Undo</span>
            </motion.button>
          </div>

          {/* Ayurvedic Ushapan & Warm Water Quick Button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              handleLog(1, "Warm Ushapan", true);
              triggerToast("Logged 1 glass of Ayurvedic Ushapan (warm water) ☀️");
            }}
            className="w-full mb-3 py-2 px-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/60 flex items-center justify-between text-left cursor-pointer hover:border-amber-300 transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-700 flex items-center justify-center">
                <Flame size={13} />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-900 block leading-tight">
                  Log Morning Ushapan
                </span>
                <span className="text-[10px] text-amber-700/80">
                  Warm copper-vessel water (+250ml)
                </span>
              </div>
            </div>
            <span className="text-[11px] font-bold text-amber-700 bg-amber-200/60 px-2 py-0.5 rounded-md">
              +1 Glass
            </span>
          </motion.button>

          {/* 7-Day Hydration Trend Snapshot Banner */}
          <div
            onClick={() => setActiveTab("weekly")}
            className="w-full mb-3 p-3 rounded-2xl bg-cream-100/90 border border-cream-300/60 hover:bg-cream-200/70 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <BarChart2 size={13} className="text-sky-600" />
                <span className="text-xs font-bold text-charcoal-900">
                  7-Day Hydration Trend
                </span>
              </div>
              <span className="text-[11px] font-bold text-sky-600 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                Full Chart <ChevronRight size={13} />
              </span>
            </div>

            {/* Mini bar preview */}
            <div className="flex items-end justify-between gap-1.5 h-10 px-1">
              {miniWeekData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className={`w-full rounded-sm transition-all ${
                      d.isGoalMet
                        ? "bg-gradient-to-t from-teal-400 to-emerald-400"
                        : "bg-sky-300"
                    } ${d.isToday ? "ring-1 ring-saffron-500" : ""}`}
                    style={{ height: `${d.heightPct}%` }}
                  />
                  <span className="text-[8px] font-semibold text-charcoal-400">
                    {d.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Dosha Hydration Tip Footer */}
          <div className={`p-3 rounded-2xl border text-xs ${currentTip.color}`}>
            <div className="flex items-center gap-1.5 font-bold mb-1">
              <Sparkles size={13} />
              <span>{currentTip.tag} • Ideal: {currentTip.idealTemp}</span>
            </div>
            <p className="leading-relaxed text-[11px] opacity-90">
              {currentTip.tip}
            </p>
          </div>

          {/* Expandable History Drawer */}
          {history.length > 0 && (
            <div className="mt-3 pt-3 border-t border-cream-300/50">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="w-full flex items-center justify-between text-xs text-charcoal-500 hover:text-charcoal-800 font-semibold cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <Clock size={12} /> Today's Log History ({history.length})
                </span>
                {showHistory ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>

              <AnimatePresence>
                {showHistory && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden mt-2 space-y-1.5"
                  >
                    {history.slice(-5).reverse().map((entry, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-[11px] py-1 px-2.5 rounded-lg bg-cream-100 text-charcoal-600"
                      >
                        <span>{entry.time}</span>
                        <span className="font-bold text-sky-600">
                          +{entry.amount} glass{entry.amount > 1 ? "es" : ""} ({entry.amount * 250}ml)
                        </span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </>
      ) : activeTab === "weekly" ? (
        /* Tab 2: Dedicated Weekly 7-Day Bar Chart Visualization */
        <WeeklyWaterChart />
      ) : (
        /* Tab 3: Digital Badges & Milestones Shelf */
        <WaterBadgesSection />
      )}
    </motion.div>
  );
}

