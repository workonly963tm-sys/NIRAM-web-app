import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Droplets,
  Check,
  Sparkles,
  TrendingUp,
  Award,
  ChevronRight,
  Info,
  Calendar,
  Flame,
  Plus,
} from "lucide-react";
import { useNiramStore } from "../store";
import { weeklyActivityHistory } from "../data";

interface WeeklyWaterChartProps {
  className?: string;
  compact?: boolean;
  showQuickLog?: boolean;
  onNavigateToTracker?: () => void;
}

const FULL_DAY_NAMES: Record<string, string> = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

export function WeeklyWaterChart({
  className = "",
  compact = false,
  showQuickLog = true,
  onNavigateToTracker,
}: WeeklyWaterChartProps) {
  const { user, waterTracker, logWater } = useNiramStore();
  const dominantDosha = user.dosha ?? "vata";
  const { goal, mlPerGlass, glasses: todayGlasses } = waterTracker;

  // The 7-day data with the 7th day (Sun/Today) synced to the live water tracker state
  const weeklyData = weeklyActivityHistory.map((item, idx) => {
    const isToday = idx === weeklyActivityHistory.length - 1;
    const glasses = isToday ? todayGlasses : item.water;
    const ml = glasses * mlPerGlass;
    const goalMl = goal * mlPerGlass;
    const percentage = Math.round((glasses / goal) * 100);
    const isGoalMet = glasses >= goal;

    return {
      day: item.day,
      fullDay: FULL_DAY_NAMES[item.day] || item.day,
      glasses,
      ml,
      goal,
      goalMl,
      percentage,
      isGoalMet,
      isToday,
      steps: item.steps,
      calories: item.calories,
    };
  });

  // Default to selecting today (index 6)
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(weeklyData.length - 1);
  const selectedDay = weeklyData[selectedDayIndex] || weeklyData[weeklyData.length - 1];

  // Max value calculation for bar chart scaling
  const maxGlassesInData = Math.max(...weeklyData.map((d) => d.glasses));
  const chartMaxGlasses = Math.max(goal + 2, maxGlassesInData + 1, 10);

  // Weekly Stats calculation
  const totalWeeklyGlasses = weeklyData.reduce((sum, d) => sum + d.glasses, 0);
  const totalWeeklyMl = totalWeeklyGlasses * mlPerGlass;
  const avgDailyGlasses = (totalWeeklyGlasses / weeklyData.length).toFixed(1);
  const avgDailyMl = Math.round(totalWeeklyMl / weeklyData.length);
  const daysGoalAchieved = weeklyData.filter((d) => d.isGoalMet).length;
  const weeklyGoalPercentage = Math.round(
    (totalWeeklyGlasses / (goal * weeklyData.length)) * 100
  );

  // Goal Line height percentage relative to chart max
  const goalLineBottomPct = (goal / chartMaxGlasses) * 100;

  // Ayurvedic Insight based on user dosha & hydration performance
  const getAyurvedicHydrationInsight = () => {
    if (daysGoalAchieved >= 5) {
      return {
        title: "Prakriti in Harmony • Ojas Elevated",
        desc: `Superb consistency! Meeting your hydration target ${daysGoalAchieved}/7 days nourishes all 7 Dhatus (bodily tissues) and balances ${
          dominantDosha === "pitta"
            ? "Pitta's digestive fire without extinguishing Agni"
            : dominantDosha === "vata"
            ? "Vata's natural dryness, providing deep cellular lubrication"
            : "Kapha's lymphatic circulation and metabolic tempo"
        }.`,
        badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      };
    } else if (daysGoalAchieved >= 3) {
      return {
        title: "Steady Progress • Jala Tattva Active",
        desc: `You've achieved your goal on ${daysGoalAchieved} days this week. Sip mindfully throughout your day, especially warm water during mid-afternoon slumps.`,
        badgeColor: "bg-sky-100 text-sky-800 border-sky-200",
      };
    } else {
      return {
        title: "Hydration Focus Needed • Agni Support",
        desc: `Hydration helps your ${dominantDosha.toUpperCase()} constitution maintain energy. Try starting your morning with warm Ushapan (copper-vessel water) to jumpstart your daily routine.`,
        badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
      };
    }
  };

  const insight = getAyurvedicHydrationInsight();

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Overview Metric Banner */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-cream-100/90 rounded-2xl p-3 border border-cream-300/50 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-charcoal-500 text-[11px] font-semibold">
            <TrendingUp size={13} className="text-sky-600" />
            <span>Daily Avg</span>
          </div>
          <div className="mt-1">
            <span className="font-display font-extrabold text-lg text-charcoal-900">
              {avgDailyGlasses}
            </span>
            <span className="text-[11px] font-bold text-charcoal-400 ml-1">
              gl/day
            </span>
            <p className="text-[10px] text-sky-600 font-medium">{avgDailyMl} ml</p>
          </div>
        </div>

        <div className="bg-cream-100/90 rounded-2xl p-3 border border-cream-300/50 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-charcoal-500 text-[11px] font-semibold">
            <Award size={13} className="text-emerald-600" />
            <span>Goals Met</span>
          </div>
          <div className="mt-1">
            <span className="font-display font-extrabold text-lg text-emerald-700">
              {daysGoalAchieved}
            </span>
            <span className="text-[11px] font-bold text-charcoal-400 ml-1">
              / {weeklyData.length} days
            </span>
            <p className="text-[10px] text-emerald-600 font-medium">
              {Math.round((daysGoalAchieved / 7) * 100)}% adherence
            </p>
          </div>
        </div>

        <div className="bg-cream-100/90 rounded-2xl p-3 border border-cream-300/50 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-charcoal-500 text-[11px] font-semibold">
            <Droplets size={13} className="text-blue-600 fill-blue-500/20" />
            <span>7-Day Total</span>
          </div>
          <div className="mt-1">
            <span className="font-display font-extrabold text-lg text-charcoal-900">
              {(totalWeeklyMl / 1000).toFixed(1)}
            </span>
            <span className="text-[11px] font-bold text-charcoal-400 ml-1">
              Liters
            </span>
            <p className="text-[10px] text-blue-600 font-medium">
              {totalWeeklyGlasses} glasses
            </p>
          </div>
        </div>
      </div>

      {/* Main Chart Container */}
      <div className="bg-cream-100/90 rounded-3xl p-5 border border-cream-300/60 shadow-soft relative overflow-hidden">
        {/* Subtle decorative background water wave / gradient */}
        <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-gradient-to-br from-sky-400/10 to-teal-400/10 blur-3xl pointer-events-none" />

        {/* Chart Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-display font-bold text-base text-charcoal-900">
                Last 7 Days Hydration
              </h4>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-700 border border-sky-200">
                Goal: {goal} glasses
              </span>
              {waterTracker.consecutiveDays && waterTracker.consecutiveDays >= 3 ? (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                  🏅 Hydration Hero
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                  🔥 {waterTracker.consecutiveDays || 2}-Day Streak
                </span>
              )}
            </div>
            <p className="text-xs text-charcoal-500 mt-0.5">
              Tap any day bar to inspect progress & milliliters
            </p>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-semibold text-charcoal-500">
            <span className="inline-block w-2.5 h-2.5 rounded-sm bg-gradient-to-t from-teal-500 to-emerald-400" />
            <span>Met</span>
            <span className="inline-block w-2.5 h-2.5 rounded-sm bg-gradient-to-t from-sky-500 to-sky-400 ml-1.5" />
            <span>Progress</span>
          </div>
        </div>

        {/* Bar Chart Canvas with Goal Benchmark Line */}
        <div className="relative pt-6 pb-2">
          {/* Target Goal Reference Line */}
          <div
            className="absolute left-0 right-0 z-10 pointer-events-none flex items-center"
            style={{ bottom: `calc(${goalLineBottomPct}% + 28px)` }}
          >
            <div className="w-full border-b-2 border-dashed border-sky-400/50" />
            <span className="absolute right-0 -top-2.5 px-1.5 py-0.5 rounded-md bg-sky-500/15 text-[9px] font-extrabold text-sky-700 tracking-wider backdrop-blur-xs whitespace-nowrap">
              TARGET ({goal} GL • {goal * 250}ml)
            </span>
          </div>

          {/* Vertical Bars Grid */}
          <div className="flex items-end justify-between gap-2 h-48 px-1">
            {weeklyData.map((d, idx) => {
              const isSelected = selectedDayIndex === idx;
              const barHeightPct = Math.min(100, Math.max(12, (d.glasses / chartMaxGlasses) * 100));

              return (
                <div
                  key={d.day}
                  onClick={() => setSelectedDayIndex(idx)}
                  className="flex-1 flex flex-col items-center h-full justify-end cursor-pointer group relative"
                  title={`${d.fullDay}: ${d.glasses}/${d.goal} glasses (${d.ml}ml)`}
                >
                  {/* Glass count label on top of bar */}
                  <div
                    className={`text-[11px] font-bold mb-1.5 transition-all flex items-center justify-center gap-0.5 ${
                      isSelected
                        ? "text-sky-700 scale-110 font-extrabold"
                        : d.isGoalMet
                        ? "text-emerald-700 font-extrabold"
                        : "text-charcoal-500"
                    }`}
                  >
                    <span>{d.glasses}</span>
                    {d.isGoalMet && (
                      <Check size={11} strokeWidth={3} className="text-emerald-600" />
                    )}
                  </div>

                  {/* The Bar Element */}
                  <div className="w-full relative flex items-end justify-center">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${barHeightPct}%` }}
                      transition={{
                        duration: 0.5,
                        delay: idx * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={`w-full max-w-[36px] rounded-t-xl transition-all relative overflow-hidden ${
                        d.isGoalMet
                          ? isSelected
                            ? "bg-gradient-to-t from-teal-500 via-sky-500 to-emerald-400 shadow-md ring-2 ring-emerald-400/70"
                            : "bg-gradient-to-t from-teal-400 via-sky-400 to-emerald-400 group-hover:brightness-105"
                          : d.percentage >= 75
                          ? isSelected
                            ? "bg-gradient-to-t from-sky-600 to-cyan-400 shadow-md ring-2 ring-sky-400/70"
                            : "bg-gradient-to-t from-sky-500 to-cyan-400 group-hover:brightness-105"
                          : isSelected
                          ? "bg-gradient-to-t from-sky-400 to-sky-300 shadow-sm ring-2 ring-sky-300"
                          : "bg-gradient-to-t from-sky-300/80 to-sky-200/90 group-hover:brightness-105"
                      }`}
                      style={{ minHeight: "14px" }}
                    >
                      {/* Subtle wave ripple effect on fill */}
                      <div className="absolute inset-0 bg-white/20 w-full opacity-60" />

                      {/* Percentage label inside bar if tall enough */}
                      {barHeightPct > 35 && (
                        <div className="absolute bottom-1.5 left-0 right-0 text-center">
                          <span className="text-[9px] font-extrabold text-white drop-shadow-sm">
                            {d.percentage}%
                          </span>
                        </div>
                      )}
                    </motion.div>

                    {/* Today indicator glowing ring */}
                    {d.isToday && (
                      <div className="absolute -top-1 w-2 h-2 rounded-full bg-saffron-500 ring-2 ring-white animate-pulse" />
                    )}
                  </div>

                  {/* Day Label Pill at bottom */}
                  <div
                    className={`mt-2.5 px-1.5 py-0.5 rounded-lg text-center transition-all ${
                      isSelected
                        ? "bg-sky-600 text-white font-bold shadow-xs scale-105"
                        : d.isToday
                        ? "bg-saffron-100 text-saffron-800 font-bold"
                        : "text-charcoal-500 font-semibold"
                    }`}
                  >
                    <span className="text-[10px] block leading-tight">{d.day}</span>
                    {d.isToday && (
                      <span className="text-[8px] font-extrabold uppercase tracking-tight block text-saffron-600 leading-tight">
                        Today
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Day Interactive Detail Card */}
        <AnimatePresence mode="wait">
          {selectedDay && (
            <motion.div
              key={selectedDay.day}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mt-4 p-3.5 rounded-2xl bg-cream-200/90 border border-cream-400/60"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-sky-600" />
                  <span className="font-display font-bold text-sm text-charcoal-900">
                    {selectedDay.fullDay}
                    {selectedDay.isToday ? " (Today)" : ""}
                  </span>
                </div>

                {selectedDay.isGoalMet ? (
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                    <Check size={12} strokeWidth={3} />
                    Goal Achieved ({selectedDay.percentage}%)
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-sky-100 text-sky-800 border border-sky-200">
                    {selectedDay.percentage}% of Goal ({Math.max(0, selectedDay.goal - selectedDay.glasses)} left)
                  </span>
                )}
              </div>

              {/* Progress detail row */}
              <div className="flex items-center justify-between text-xs text-charcoal-700 mb-2">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display font-extrabold text-xl text-sky-700">
                    {selectedDay.glasses}
                  </span>
                  <span className="font-semibold text-charcoal-500">
                    / {selectedDay.goal} glasses
                  </span>
                  <span className="text-charcoal-400 text-[11px]">
                    ({selectedDay.ml.toLocaleString()} ml of {selectedDay.goalMl.toLocaleString()} ml)
                  </span>
                </div>

                {selectedDay.isToday && showQuickLog && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      logWater(1);
                    }}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-soft transition-all cursor-pointer"
                  >
                    <Plus size={13} strokeWidth={3} />
                    <span>Log +1 Now</span>
                  </button>
                )}
              </div>

              {/* Mini horizontal progress bar for selected day */}
              <div className="w-full h-2 rounded-full bg-cream-300 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    selectedDay.isGoalMet
                      ? "bg-gradient-to-r from-teal-400 to-emerald-400"
                      : "bg-gradient-to-r from-sky-400 to-blue-500"
                  }`}
                  style={{ width: `${Math.min(100, selectedDay.percentage)}%` }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Ayurvedic Hydration Wisdom Banner */}
      <div className={`p-4 rounded-3xl border ${insight.badgeColor}`}>
        <div className="flex items-center gap-2 font-display font-bold text-xs mb-1">
          <Sparkles size={14} className="text-sky-600" />
          <span>{insight.title}</span>
        </div>
        <p className="text-xs leading-relaxed opacity-90">{insight.desc}</p>
      </div>
    </div>
  );
}
