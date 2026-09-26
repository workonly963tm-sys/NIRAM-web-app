import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  Salad,
  Sparkles,
  Dumbbell,
  Wheat,
  Flower2,
  Check,
  Flame,
} from "lucide-react";
import { useNiramStore } from "../../store";
import {
  doshaProfiles,
  foodCatalogue,
  ayurvedicHerbs,
  proteinSources,
  fiberSources,
} from "../../data";
import { CardGroup, CardItem } from "../Card";

interface DietScreenProps {
  onNavigate: (screen: string) => void;
}

const dietTabs = [
  { id: "bhojan", label: "Bhartiya Bhojan", icon: Salad },
  { id: "superfoods", label: "Super Foods", icon: Sparkles },
  { id: "protein", label: "Protein Chart", icon: Dumbbell },
  { id: "fiber", label: "Fiber Chart", icon: Wheat },
  { id: "herbs", label: "Ayurvedic Herbs", icon: Flower2 },
];

export function DietScreen({ onNavigate }: DietScreenProps) {
  const [activeTab, setActiveTab] = useState("bhojan");
  const { user } = useNiramStore();
  const dominantDosha = user.dosha ?? "vata";
  const profile = doshaProfiles[dominantDosha];

  const maxProtein = Math.max(...proteinSources.map((p) => p.protein ?? 0));
  const maxFiber = Math.max(...fiberSources.map((f) => f.fiber ?? 0));

  return (
    <div className="min-h-screen bg-cream-300 pb-28">
      {/* Top Header */}
      <div className="px-6 pt-12 pb-4 flex items-center gap-3">
        <button
          onClick={() => onNavigate("home")}
          className="w-10 h-10 rounded-xl bg-cream-100 flex items-center justify-center shadow-soft cursor-pointer hover:bg-cream-200 transition-colors"
        >
          <ChevronLeft size={20} className="text-saffron-600" />
        </button>
        <div>
          <h1 className="font-display font-extrabold text-2xl text-charcoal-900">
            Diet & Nutrition
          </h1>
          <p className="text-xs text-charcoal-500">
            Eat right for your {profile.name} dosha
          </p>
        </div>
      </div>

      {/* Favorable Foods Banner */}
      <div className="px-6 mb-4">
        <div className="card p-4 flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${profile.color}25` }}
          >
            <Salad size={24} style={{ color: profile.color }} />
          </div>
          <div className="flex-1">
            <p className="text-xs text-charcoal-500">Favorable for you</p>
            <p className="font-semibold text-charcoal-900 text-sm">
              {profile.eatMore.slice(0, 3).join(" • ")}
            </p>
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="px-6 mb-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {dietTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pill flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors ${
                  isActive
                    ? "bg-saffron-600 text-white shadow-soft"
                    : "bg-cream-100 text-charcoal-600 hover:bg-cream-200"
                }`}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Bhartiya Bhojan & Super Foods */}
            {(activeTab === "bhojan" || activeTab === "superfoods") && (
              <div className="space-y-3">
                {activeTab === "bhojan" && (
                  <div className="card p-4 bg-gradient-to-br from-cream-100 to-amber-50/70 border border-saffron-200/70 overflow-hidden relative shadow-soft mb-3">
                    <div className="flex items-center gap-3.5 mb-3">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 shadow-md border border-saffron-300/50">
                        <img
                          src="/src/assets/images/sattvic_bhojan_thali_1790391670532.jpg"
                          alt="Sattvic Bhojan Thali"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-saffron-600 text-white">
                          Today's Bhojan Recommendation
                        </span>
                        <h4 className="font-display font-bold text-charcoal-900 text-base mt-1">
                          Tridoshic Sattvic Thali
                        </h4>
                        <p className="text-xs text-charcoal-600">
                          Freshly cooked, warm & grounding for {profile.name} dosha
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-cream-300 text-xs text-charcoal-600 font-medium">
                      <span>Prana: High • 100% Satva</span>
                      <span className="text-saffron-700 font-bold">Digestive Agni: Balanced</span>
                    </div>
                  </div>
                )}

                <CardGroup className="space-y-3">
                  {foodCatalogue
                    .filter((item) =>
                      activeTab === "bhojan"
                        ? item.category === "Bhartiya Bhojan"
                        : item.category === "Super Foods"
                    )
                    .map((item) => (
                      <CardItem key={item.id}>
                        <div className="card p-3.5 flex items-center gap-3.5 hover:shadow-md transition-shadow">
                          <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 relative shadow-sm border border-cream-200 bg-cream-100">
                            <img
                              src={item.image}
                              alt={item.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <p className="font-display font-bold text-charcoal-900 text-sm truncate">
                                {item.name}
                              </p>
                              {item.favorable.includes(dominantDosha) && (
                                <span className="text-[10px] bg-sage-100 text-sage-800 font-bold px-2 py-0.5 rounded-full flex-shrink-0 flex items-center gap-1">
                                  <Check size={11} className="text-sage-700 stroke-[3]" />
                                  <span>Favorable</span>
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {item.properties.map((prop) => (
                                <span
                                  key={prop}
                                  className="text-[10px] bg-cream-200 text-charcoal-600 px-2 py-0.5 rounded-full font-semibold"
                                >
                                  {prop}
                                </span>
                              ))}
                            </div>
                            <div className="flex gap-3.5 mt-2 text-xs">
                              <span className="text-charcoal-500 font-medium">
                                {item.calories} kcal
                              </span>
                              <span className="text-sage-700 font-bold">
                                {item.protein}g protein
                              </span>
                              <span className="text-saffron-700 font-bold">
                                {item.fiber}g fiber
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardItem>
                    ))}
                </CardGroup>
              </div>
            )}

            {/* Protein Chart */}
            {activeTab === "protein" && (
              <div className="card p-5">
                <h3 className="font-display font-bold text-lg text-charcoal-900 mb-1">
                  Bhartiya Protein Chart
                </h3>
                <p className="text-xs text-charcoal-500 mb-4">
                  Protein per 100g (cooked where applicable)
                </p>
                <div className="space-y-3">
                  {proteinSources.map((item, idx) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.06 }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-charcoal-700 font-medium">
                          {item.name}
                        </span>
                        <span className="text-sm font-bold text-saffron-600">
                          {item.protein}g
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-cream-400 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${((item.protein ?? 0) / maxProtein) * 100}%`,
                          }}
                          transition={{
                            delay: idx * 0.06 + 0.1,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="h-full rounded-full bg-gradient-to-r from-saffron-400 to-saffron-600"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Fiber Chart */}
            {activeTab === "fiber" && (
              <div className="card p-5">
                <h3 className="font-display font-bold text-lg text-charcoal-900 mb-1">
                  Fiber Chart
                </h3>
                <p className="text-xs text-charcoal-500 mb-4">Fiber per 100g</p>
                <div className="space-y-3">
                  {fiberSources.map((item, idx) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.06 }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-charcoal-700 font-medium">
                          {item.name}
                        </span>
                        <span className="text-sm font-bold text-sage-600">
                          {item.fiber}g
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-cream-400 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${((item.fiber ?? 0) / maxFiber) * 100}%`,
                          }}
                          transition={{
                            delay: idx * 0.06 + 0.1,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="h-full rounded-full bg-gradient-to-r from-sage-400 to-sage-600"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Ayurvedic Herbs */}
            {activeTab === "herbs" && (
              <CardGroup className="grid grid-cols-2 gap-3">
                {ayurvedicHerbs.map((herb) => (
                  <CardItem key={herb.id}>
                    <div className="card p-4">
                      <div className="text-3xl mb-2">{herb.emoji}</div>
                      <p className="font-display font-bold text-charcoal-900">
                        {herb.name}
                      </p>
                      <p className="text-[10px] text-charcoal-400 italic mb-2">
                        {herb.latinName}
                      </p>
                      <div className="space-y-1">
                        {herb.benefits.slice(0, 3).map((benefit) => (
                          <div key={benefit} className="flex items-start gap-1">
                            <Flame
                              size={12}
                              className="text-saffron-500 flex-shrink-0 mt-0.5"
                            />
                            <span className="text-[11px] text-charcoal-600 leading-tight">
                              {benefit}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-1 mt-2.5 flex-wrap">
                        {herb.dosha.map((d) => (
                          <span
                            key={d}
                            className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold"
                            style={{
                              backgroundColor: `${doshaProfiles[d].color}20`,
                              color: doshaProfiles[d].color,
                            }}
                          >
                            {doshaProfiles[d].name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardItem>
                ))}
              </CardGroup>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
