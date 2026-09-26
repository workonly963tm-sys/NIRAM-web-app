import React, { useState } from "react";
import { motion } from "motion/react";
import {
  ChevronLeft,
  Flame,
  Activity,
  Heart,
  Scale,
  Droplets,
  BarChart2,
} from "lucide-react";
import { weeklyActivityHistory } from "../../data";
import { CardGroup, CardItem } from "../Card";
import { WeeklyWaterChart } from "../WeeklyWaterChart";
import { useNiramStore } from "../../store";

interface AnalyticsScreenProps {
  onNavigate: (screen: string) => void;
}

export function AnalyticsScreen({ onNavigate }: AnalyticsScreenProps) {
  const { waterTracker } = useNiramStore();
  const [activeChart, setActiveChart] = useState<"calories" | "water">("water");

  const maxCalories = Math.max(...weeklyActivityHistory.map((d) => d.calories));
  const totalCalories = weeklyActivityHistory.reduce((sum, d) => sum + d.calories, 0);
  const avgCalories = Math.round(totalCalories / weeklyActivityHistory.length);

  const metrics = [
    {
      label: "Exercise",
      value: "45 min",
      icon: Activity,
      color: "saffron",
      textColor: "text-saffron-600",
      bgColor: "bg-saffron-100",
    },
    {
      label: "BPM",
      value: "72 bpm",
      icon: Heart,
      color: "red",
      textColor: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      label: "Weight",
      value: "68 kg",
      icon: Scale,
      color: "sage",
      textColor: "text-sage-600",
      bgColor: "bg-sage-100",
    },
    {
      label: "Water",
      value: `${waterTracker.glasses}/${waterTracker.goal}`,
      icon: Droplets,
      color: "sky",
      textColor: "text-sky-600",
      bgColor: "bg-sky-100",
    },
  ];

  const totalWater = weeklyActivityHistory.reduce(
    (s, o, i) =>
      s + (i === weeklyActivityHistory.length - 1 ? waterTracker.glasses : o.water),
    0
  );

  const summary = [
    {
      label: "Total Steps",
      value: weeklyActivityHistory.reduce((s, o) => s + o.steps, 0).toLocaleString(),
      unit: "steps",
    },
    {
      label: "Total Calories",
      value: totalCalories.toLocaleString(),
      unit: "kcal",
    },
    {
      label: "Avg Water",
      value: (totalWater / 7).toFixed(1),
      unit: "glasses/day",
    },
    {
      label: "Active Days",
      value: "6/7",
      unit: "days",
    },
  ];

  return (
    <div className="min-h-screen bg-cream-300 pb-28">
      {/* Top Header */}
      <div className="px-6 pt-12 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate("home")}
            className="w-10 h-10 rounded-xl bg-cream-100 flex items-center justify-center shadow-soft cursor-pointer hover:bg-cream-200 transition-colors"
          >
            <ChevronLeft size={20} className="text-saffron-600" />
          </button>
          <h1 className="font-display font-extrabold text-2xl text-charcoal-900">
            Your Progress
          </h1>
        </div>

        {/* Chart View Switcher */}
        <div className="flex rounded-xl bg-cream-200 p-0.5 border border-cream-300">
          <button
            onClick={() => setActiveChart("water")}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
              activeChart === "water"
                ? "bg-white text-sky-700 shadow-xs"
                : "text-charcoal-500 hover:text-charcoal-800"
            }`}
          >
            <Droplets size={12} />
            <span>Water</span>
          </button>
          <button
            onClick={() => setActiveChart("calories")}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
              activeChart === "calories"
                ? "bg-white text-saffron-700 shadow-xs"
                : "text-charcoal-500 hover:text-charcoal-800"
            }`}
          >
            <Flame size={12} />
            <span>Calories</span>
          </button>
        </div>
      </div>

      {/* Chart Section */}
      <div className="px-6 mb-5">
        {activeChart === "water" ? (
          <WeeklyWaterChart />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-saffron-600 font-semibold tracking-wide">
                  Weekly Calories
                </p>
                <h3 className="font-display font-bold text-xl text-charcoal-900">
                  {avgCalories} kcal/day avg
                </h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-saffron-100 flex items-center justify-center">
                <Flame size={24} className="text-saffron-600" />
              </div>
            </div>

            <div className="flex items-end justify-between gap-2 h-40 mt-4">
              {weeklyActivityHistory.map((d, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-[10px] text-charcoal-400 font-semibold">
                    {d.calories}
                  </span>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.calories / maxCalories) * 100}%` }}
                    transition={{ delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className={`w-full rounded-t-lg ${
                      idx === weeklyActivityHistory.length - 1
                        ? "bg-gradient-to-t from-saffron-600 to-saffron-400"
                        : "bg-saffron-200"
                    }`}
                    style={{ minHeight: "12px" }}
                  />
                  <span className="text-[10px] text-charcoal-500 font-semibold">
                    {d.day}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Health Metrics Grid */}
      <div className="px-6">
        <h3 className="font-display font-bold text-lg text-charcoal-900 mb-3">
          Health Metrics
        </h3>
        <CardGroup className="grid grid-cols-2 gap-3">
          {metrics.map((m) => {
            const Icon = m.icon;
            return (
              <CardItem key={m.label}>
                <div className="card p-5">
                  <div
                    className={`w-12 h-12 rounded-2xl ${m.bgColor} flex items-center justify-center mb-3`}
                  >
                    <Icon size={22} className={m.textColor} strokeWidth={2} />
                  </div>
                  <p className="font-display font-extrabold text-2xl text-charcoal-900">
                    {m.value}
                  </p>
                  <p className="text-xs text-charcoal-500">{m.label}</p>
                </div>
              </CardItem>
            );
          })}
        </CardGroup>
      </div>

      {/* Weekly Summary */}
      <div className="px-6 mt-5">
        <div className="card p-5">
          <h3 className="font-display font-bold text-lg text-charcoal-900 mb-3">
            This Week's Summary
          </h3>
          <div className="space-y-3">
            {summary.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="flex items-center justify-between py-2 border-b border-cream-400 last:border-0"
              >
                <span className="text-sm text-charcoal-600">{item.label}</span>
                <span className="font-bold text-charcoal-900">
                  {item.value}{" "}
                  <span className="text-xs text-charcoal-400 font-normal">
                    {item.unit}
                  </span>
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
