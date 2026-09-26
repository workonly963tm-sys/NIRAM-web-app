import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Map,
  Bell,
  Sparkles,
  Footprints,
  Droplets,
  Flame,
  Plus,
  Camera,
  Check,
} from "lucide-react";
import { useNiramStore } from "../../store";
import { doshaProfiles, weeklyActivityHistory, initialMeals } from "../../data";
import { NiramBrandHeader } from "../NiramLogo";
import { ProgressGauge } from "../ProgressGauge";
import { CardGroup, CardItem } from "../Card";
import { WaterTracker } from "../WaterTracker";

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const { user, waterTracker } = useNiramStore();
  const [weeklyMetric, setWeeklyMetric] = useState<"steps" | "water">("steps");
  const dominantDosha = user.dosha ?? "vata";
  const profile = doshaProfiles[dominantDosha];

  const todayActivity = weeklyActivityHistory[weeklyActivityHistory.length - 1];
  const totalSteps = weeklyActivityHistory.reduce((sum, item) => sum + item.steps, 0);
  const avgSteps = Math.round(totalSteps / weeklyActivityHistory.length);
  const stepGoalProgress = Math.round((todayActivity.steps / 10000) * 100);

  const waterGoalProgress = Math.min(
    100,
    Math.round((waterTracker.glasses / waterTracker.goal) * 100)
  );

  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Good morning"
      : currentHour < 17
      ? "Good afternoon"
      : "Good evening";

  // Hydration data for the last 7 days (live sync for today)
  const weeklyWaterData = weeklyActivityHistory.map((item, idx) => {
    const isToday = idx === weeklyActivityHistory.length - 1;
    const glasses = isToday ? waterTracker.glasses : item.water;
    return {
      day: item.day,
      glasses,
      isToday,
      isGoalMet: glasses >= waterTracker.goal,
      pct: Math.min(100, Math.round((glasses / waterTracker.goal) * 100)),
    };
  });

  return (
    <div className="min-h-screen bg-cream-300 pb-28">
      {/* Top Header */}
      <div className="px-6 pt-12 pb-4">
        <div className="flex items-center justify-between mb-4">
          <NiramBrandHeader />
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate("india-map")}
              className="w-10 h-10 rounded-xl bg-cream-100 flex items-center justify-center shadow-soft cursor-pointer hover:bg-cream-200 transition-colors"
              title="India Map"
            >
              <Map size={18} className="text-saffron-600" />
            </button>
            <button
              onClick={() => onNavigate("profile")}
              className="w-10 h-10 rounded-xl bg-cream-100 flex items-center justify-center shadow-soft relative cursor-pointer hover:bg-cream-200 transition-colors"
              title="Profile & Reminders"
            >
              <Bell size={18} className="text-saffron-600" />
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-saffron-500" />
            </button>
          </div>
        </div>

        <h1 className="font-display font-extrabold text-2xl text-charcoal-900">
          {greeting}, {user.name}
        </h1>
        <p className="text-charcoal-500 text-sm mt-1">
          {profile.name} type • {user.city || "India"}
        </p>
      </div>

      {/* Weekly Progress Card */}
      <div className="px-6 mb-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: [0.22, 1, 0.36, 1] }}
          className="card p-5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-saffron-50/50 blur-2xl" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-saffron-600 font-semibold tracking-wide">
                  Your Weekly Progress
                </p>
                <h3 className="font-display font-bold text-xl text-charcoal-900">
                  {weeklyMetric === "steps" ? "Keep going strong" : "Hydration Consistency"}
                </h3>
              </div>

              {/* Metric Toggle: Steps vs Water */}
              <div className="flex rounded-xl bg-cream-200/90 p-0.5 border border-cream-300">
                <button
                  onClick={() => setWeeklyMetric("steps")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    weeklyMetric === "steps"
                      ? "bg-white text-saffron-700 shadow-xs"
                      : "text-charcoal-500 hover:text-charcoal-800"
                  }`}
                >
                  <Footprints size={12} />
                  <span>Steps</span>
                </button>
                <button
                  onClick={() => setWeeklyMetric("water")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    weeklyMetric === "water"
                      ? "bg-white text-sky-700 shadow-xs"
                      : "text-charcoal-500 hover:text-charcoal-800"
                  }`}
                >
                  <Droplets size={12} />
                  <span>Water</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <ProgressGauge
                value={weeklyMetric === "steps" ? stepGoalProgress : waterGoalProgress}
                size={110}
                color={weeklyMetric === "steps" ? "#EA580C" : "#0284C7"}
                label={`${weeklyMetric === "steps" ? stepGoalProgress : waterGoalProgress}%`}
                sublabel={weeklyMetric === "steps" ? "step goal" : "water goal"}
              />
              <div className="flex-1 space-y-3">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <Footprints size={18} className="text-saffron-600" />
                    <span className="font-display font-extrabold text-2xl text-charcoal-900">
                      {todayActivity.steps.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-charcoal-500">steps today</p>
                </div>

                <div>
                  <div className="flex items-baseline gap-1.5">
                    <Droplets size={18} className="text-sky-500" />
                    <span className="font-display font-bold text-lg text-charcoal-900">
                      {waterTracker.glasses}/{waterTracker.goal}
                    </span>
                    <span className="text-xs font-semibold text-sky-600">
                      ({waterTracker.glasses * waterTracker.mlPerGlass}ml)
                    </span>
                  </div>
                  <p className="text-xs text-charcoal-500">glasses of water</p>
                </div>
              </div>
            </div>

            {/* Weekly Bar Chart (Steps or Hydration) */}
            {weeklyMetric === "steps" ? (
              <div className="flex items-end justify-between gap-1.5 mt-5 h-16">
                {weeklyActivityHistory.map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(item.steps / 12000) * 100}%` }}
                      transition={{ delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                      className={`w-full rounded-t-md ${
                        idx === weeklyActivityHistory.length - 1
                          ? "bg-saffron-500"
                          : "bg-saffron-200"
                      }`}
                      style={{ minHeight: "8px" }}
                    />
                    <span className="text-[9px] text-charcoal-400 font-semibold">
                      {item.day}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              /* Weekly Hydration Bar Chart with Goal Met Checkmarks */
              <div className="mt-5">
                <div className="flex items-center justify-between text-[10px] text-charcoal-400 font-semibold mb-1">
                  <span>Daily Goal: {waterTracker.goal} glasses ({waterTracker.goal * 250}ml)</span>
                  <span className="text-sky-600 font-bold">
                    {weeklyWaterData.filter((d) => d.isGoalMet).length}/7 days met
                  </span>
                </div>
                <div className="flex items-end justify-between gap-1.5 h-16 relative">
                  {/* Goal threshold dashed line */}
                  <div
                    className="absolute left-0 right-0 border-b border-dashed border-sky-400/50 z-10 pointer-events-none"
                    style={{ bottom: "75%" }}
                  />

                  {weeklyWaterData.map((item, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                      <span className="text-[9px] font-bold text-charcoal-600 flex items-center gap-0.5">
                        {item.glasses}
                        {item.isGoalMet && <Check size={8} strokeWidth={3} className="text-emerald-600" />}
                      </span>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{
                          height: `${Math.min(100, Math.max(12, (item.glasses / (waterTracker.goal + 1)) * 100))}%`,
                        }}
                        transition={{ delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                        className={`w-full rounded-t-md transition-all ${
                          item.isGoalMet
                            ? "bg-gradient-to-t from-teal-400 to-emerald-400"
                            : item.pct >= 75
                            ? "bg-gradient-to-t from-sky-400 to-blue-400"
                            : "bg-sky-200"
                        } ${item.isToday ? "ring-1 ring-saffron-500" : ""}`}
                        style={{ minHeight: "8px" }}
                      />
                      <span
                        className={`text-[9px] font-semibold ${
                          item.isToday ? "text-saffron-700 font-extrabold" : "text-charcoal-400"
                        }`}
                      >
                        {item.day}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Calories and Avg Steps stats */}
      <div className="px-6 mb-5">
        <CardGroup className="grid grid-cols-2 gap-3">
          <CardItem>
            <div className="card p-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                <Flame size={22} className="text-saffron-600" />
              </div>
              <div>
                <p className="font-display font-bold text-xl text-charcoal-900">
                  {todayActivity.calories}
                </p>
                <p className="text-xs text-charcoal-500">kcal burned</p>
              </div>
            </div>
          </CardItem>

          <CardItem>
            <div className="card p-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-sage-100 flex items-center justify-center">
                <Footprints size={22} className="text-sage-600" />
              </div>
              <div>
                <p className="font-display font-bold text-xl text-charcoal-900">
                  {avgSteps.toLocaleString()}
                </p>
                <p className="text-xs text-charcoal-500">avg steps/wk</p>
              </div>
            </div>
          </CardItem>
        </CardGroup>
      </div>

      {/* Water Intake Tracker */}
      <div className="px-6 mb-5">
        <WaterTracker />
      </div>

      {/* Week day pills */}
      <div className="px-6 mb-4">
        <div className="flex justify-between gap-2">
          {weeklyActivityHistory.map((item, idx) => {
            const isToday = idx === weeklyActivityHistory.length - 1;
            return (
              <div
                key={idx}
                className={`flex-1 text-center py-2 rounded-xl ${
                  isToday
                    ? "bg-saffron-600 text-white shadow-soft"
                    : "bg-cream-100 text-charcoal-500"
                }`}
              >
                <p className="text-[10px] font-semibold uppercase">{item.day}</p>
                <p className="text-sm font-bold mt-0.5">{isToday ? "21" : 14 + idx}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Today's Meals */}
      <div className="px-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-bold text-lg text-charcoal-900">
            Today's Meals
          </h3>
          <button
            onClick={() => onNavigate("diet")}
            className="text-sm text-saffron-600 font-semibold cursor-pointer hover:underline"
          >
            See Diet
          </button>
        </div>

        <div className="space-y-3">
          {initialMeals.map((meal, idx) => (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="card p-3.5 flex items-center gap-3.5 hover:shadow-soft transition-shadow"
            >
              <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 relative border border-cream-200 shadow-xs bg-cream-100">
                <img
                  src={
                    meal.type === "breakfast"
                      ? "/src/assets/images/sprouted_moong_salad_1790354395979.jpg"
                      : "/src/assets/images/moong_dal_khichdi_1790354330219.jpg"
                  }
                  alt={meal.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-charcoal-900">{meal.name}</p>
                  {meal.doshaBalance === "favorable" && (
                    <span className="text-xs bg-sage-100 text-sage-700 px-2 py-0.5 rounded-full font-semibold">
                      Dosha-friendly
                    </span>
                  )}
                </div>
                <p className="text-xs text-charcoal-500 mt-0.5">
                  {meal.time} • {meal.calories} kcal
                </p>
              </div>
            </motion.div>
          ))}

          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: initialMeals.length * 0.1 }}
            onClick={() => onNavigate("diet")}
            className="w-full card p-4 flex items-center justify-center gap-2 border-2 border-dashed border-cream-500 cursor-pointer hover:border-saffron-400 transition-colors"
          >
            <Plus size={20} className="text-saffron-600" />
            <span className="font-semibold text-saffron-600">Log Dinner</span>
          </motion.button>
        </div>
      </div>

      {/* Netra AI CTA Banner */}
      <div className="px-6 mt-5">
        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => onNavigate("netra-food")}
          className="w-full rounded-3xl bg-gradient-to-r from-saffron-500 to-saffron-700 p-5 flex items-center gap-4 shadow-saffron cursor-pointer text-left"
        >
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
            <Camera size={24} className="text-white" />
          </div>
          <div className="text-left">
            <p className="font-display font-bold text-white text-base">
              Scan your food with Netra AI
            </p>
            <p className="text-white/80 text-sm">
              Check if it's right for your dosha
            </p>
          </div>
        </motion.button>
      </div>
    </div>
  );
}
