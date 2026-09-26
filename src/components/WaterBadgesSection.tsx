import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Award,
  Crown,
  Droplets,
  Flame,
  ShieldCheck,
  Sparkles,
  Waves,
  Star,
  Check,
  Lock,
  ChevronRight,
  X,
  Share2,
  Calendar,
  Zap,
} from "lucide-react";
import { waterBadgesCatalogue } from "../data";
import { WaterBadge } from "../types";
import { useNiramStore } from "../store";

interface WaterBadgesSectionProps {
  className?: string;
  compact?: boolean;
}

export function WaterBadgesSection({
  className = "",
  compact = false,
}: WaterBadgesSectionProps) {
  const { waterTracker, clearLastUnlockedBadge } = useNiramStore();
  const {
    glasses,
    goal,
    consecutiveDays = 2,
    unlockedBadges = ["first-splash", "rhythm-flow"],
    lastUnlockedBadge,
  } = waterTracker;

  const [selectedBadge, setSelectedBadge] = useState<WaterBadge | null>(null);
  const [showCelebrationModal, setShowCelebrationModal] = useState<boolean>(
    Boolean(lastUnlockedBadge)
  );

  const unlockedSet = new Set(unlockedBadges);
  const newlyEarnedBadge = lastUnlockedBadge
    ? waterBadgesCatalogue.find((b) => b.id === lastUnlockedBadge)
    : null;

  // Render icon based on badge type
  const renderBadgeIcon = (icon: string, size = 20, isEarned = true) => {
    switch (icon) {
      case "shield-star":
        return <ShieldCheck size={size} className={isEarned ? "text-amber-500" : "text-charcoal-400"} />;
      case "crown":
        return <Crown size={size} className={isEarned ? "text-amber-500" : "text-charcoal-400"} />;
      case "award":
        return <Award size={size} className={isEarned ? "text-emerald-500" : "text-charcoal-400"} />;
      case "waves":
        return <Waves size={size} className={isEarned ? "text-cyan-500" : "text-charcoal-400"} />;
      case "flame":
        return <Flame size={size} className={isEarned ? "text-orange-500" : "text-charcoal-400"} />;
      case "sparkles":
        return <Sparkles size={size} className={isEarned ? "text-purple-500" : "text-charcoal-400"} />;
      case "droplet":
      default:
        return <Droplets size={size} className={isEarned ? "text-sky-500 fill-sky-500" : "text-charcoal-400"} />;
    }
  };

  const getRarityBadge = (rarity: WaterBadge["rarity"]) => {
    switch (rarity) {
      case "legendary":
        return "bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-950 border-amber-300";
      case "epic":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "rare":
        return "bg-sky-100 text-sky-800 border-sky-200";
      case "common":
      default:
        return "bg-cream-200 text-charcoal-600 border-cream-300";
    }
  };

  const closeCelebration = () => {
    setShowCelebrationModal(false);
    clearLastUnlockedBadge();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Streak Hero Banner */}
      <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-5 text-white shadow-saffron relative overflow-hidden">
        {/* Glow rings */}
        <div className="absolute top-0 right-0 w-36 h-36 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-yellow-400/20 blur-xl pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-xs px-2.5 py-1 rounded-full w-fit mb-2 text-xs font-semibold text-amber-100">
              <Zap size={13} className="text-yellow-300 fill-yellow-300 animate-pulse" />
              <span>Consecutive Streak</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-black text-4xl tracking-tight text-white">
                {consecutiveDays}
              </span>
              <span className="text-lg font-bold text-amber-100">
                Days in a Row!
              </span>
            </div>
            <p className="text-xs text-amber-100/90 mt-1 max-w-[240px]">
              {consecutiveDays >= 3
                ? "🏆 'Hydration Hero' unlocked! Your Ojas is radiant."
                : `${3 - consecutiveDays} more day of meeting your goal to unlock 'Hydration Hero'!`}
            </p>
          </div>

          {/* Golden Shield / Trophy Graphic */}
          <div className="relative">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center shadow-lg"
            >
              {consecutiveDays >= 3 ? (
                <ShieldCheck size={36} className="text-yellow-200 fill-yellow-400/30" />
              ) : (
                <Droplets size={32} className="text-white fill-white/40" />
              )}
            </motion.div>
            <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-amber-950 text-[10px] font-black px-1.5 py-0.5 rounded-full shadow-xs">
              {unlockedBadges.length}/{waterBadgesCatalogue.length}
            </div>
          </div>
        </div>

        {/* 3-Day Milestone Progress bar to Hydration Hero */}
        <div className="mt-4 pt-3 border-t border-white/20">
          <div className="flex items-center justify-between text-xs font-bold text-amber-100 mb-1.5">
            <span>Next Target: Hydration Hero (3 Days)</span>
            <span>{Math.min(3, consecutiveDays)}/3 Days</span>
          </div>
          <div className="w-full h-2 rounded-full bg-black/25 overflow-hidden p-0.5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, (consecutiveDays / 3) * 100)}%` }}
              className="h-full rounded-full bg-gradient-to-r from-yellow-300 to-white"
            />
          </div>
        </div>
      </div>

      {/* Badges Shelf */}
      <div className="bg-cream-100/90 rounded-3xl p-5 border border-cream-300/60 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-display font-bold text-base text-charcoal-900 flex items-center gap-1.5">
              <span>Hydration Milestones</span>
              <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                {unlockedBadges.length} Earned
              </span>
            </h4>
            <p className="text-xs text-charcoal-500 mt-0.5">
              Awarded for consistency and mindful Vedic hydration
            </p>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {waterBadgesCatalogue.map((badge) => {
            const isEarned = unlockedSet.has(badge.id);
            const isHeroBadge = badge.id === "hydration-hero";

            return (
              <motion.div
                key={badge.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedBadge(badge)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                  isEarned
                    ? isHeroBadge
                      ? "bg-gradient-to-br from-amber-50 to-orange-50/70 border-amber-300 shadow-soft"
                      : "bg-white border-cream-300 shadow-soft"
                    : "bg-cream-100/50 border-cream-300/40 opacity-75"
                }`}
              >
                {/* Rarity & Status Chip */}
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getRarityBadge(
                      badge.rarity
                    )}`}
                  >
                    {badge.rarity}
                  </span>

                  {isEarned ? (
                    <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Check size={10} strokeWidth={3} /> Earned
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-charcoal-400 flex items-center gap-1">
                      <Lock size={10} /> Locked
                    </span>
                  )}
                </div>

                {/* Badge Visual and Title */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center relative flex-shrink-0 ${
                      isEarned
                        ? `bg-gradient-to-br ${badge.color} text-white shadow-soft`
                        : "bg-cream-200 text-charcoal-400 border border-cream-300"
                    }`}
                  >
                    {renderBadgeIcon(badge.icon, 22, isEarned)}
                    {isEarned && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center">
                        <Star size={8} className="text-amber-950 fill-amber-950" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h5 className="font-display font-bold text-sm text-charcoal-900 truncate">
                        {badge.name}
                      </h5>
                    </div>
                    <p className="text-[11px] font-semibold text-saffron-600 truncate">
                      {badge.vedicTitle}
                    </p>
                    <p className="text-[11px] text-charcoal-500 line-clamp-1 mt-0.5">
                      {badge.consecutiveDays > 0
                        ? `${badge.consecutiveDays} Consecutive Days`
                        : badge.description}
                    </p>
                  </div>
                </div>

                {/* In-progress mini bar for locked consecutive badges */}
                {!isEarned && badge.consecutiveDays > 0 && (
                  <div className="mt-2.5 pt-2 border-t border-cream-200">
                    <div className="flex items-center justify-between text-[10px] text-charcoal-500 font-semibold mb-1">
                      <span>Progress</span>
                      <span>
                        {consecutiveDays} / {badge.consecutiveDays} days
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-cream-200 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-sky-500 transition-all"
                        style={{
                          width: `${Math.min(
                            100,
                            (consecutiveDays / badge.consecutiveDays) * 100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Selected Badge Inspector Modal */}
      <AnimatePresence>
        {selectedBadge && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-cream-100 rounded-3xl p-6 max-w-sm w-full border border-cream-300 shadow-2xl relative overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedBadge(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-cream-200 hover:bg-cream-300 text-charcoal-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>

              <div className="text-center pt-2 pb-4">
                {/* Badge Emblem Graphic */}
                <div className="relative mx-auto w-24 h-24 mb-4">
                  <div
                    className={`w-full h-full rounded-3xl flex items-center justify-center shadow-lifted ${
                      unlockedSet.has(selectedBadge.id)
                        ? `bg-gradient-to-br ${selectedBadge.color} text-white`
                        : "bg-cream-300 text-charcoal-400"
                    }`}
                  >
                    {renderBadgeIcon(
                      selectedBadge.icon,
                      44,
                      unlockedSet.has(selectedBadge.id)
                    )}
                  </div>
                  {unlockedSet.has(selectedBadge.id) && (
                    <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white rounded-full p-1.5 shadow-md">
                      <Check size={16} strokeWidth={3} />
                    </div>
                  )}
                </div>

                <span
                  className={`text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border inline-block mb-2 ${getRarityBadge(
                    selectedBadge.rarity
                  )}`}
                >
                  {selectedBadge.rarity} Milestone
                </span>

                <h3 className="font-display font-extrabold text-2xl text-charcoal-900">
                  {selectedBadge.name}
                </h3>
                <p className="text-xs font-bold text-saffron-600 mt-0.5">
                  {selectedBadge.vedicTitle}
                </p>

                <p className="text-xs text-charcoal-600 mt-3 leading-relaxed">
                  {selectedBadge.description}
                </p>

                {selectedBadge.quote && (
                  <div className="mt-4 p-3 rounded-2xl bg-cream-200/80 border border-cream-300/60 text-xs italic text-charcoal-700">
                    "{selectedBadge.quote}"
                  </div>
                )}

                {/* Status footer */}
                <div className="mt-5 pt-4 border-t border-cream-300/60">
                  {unlockedSet.has(selectedBadge.id) ? (
                    <div className="flex items-center justify-center gap-1.5 text-xs font-extrabold text-emerald-700 bg-emerald-100 py-2.5 rounded-xl">
                      <Sparkles size={14} />
                      <span>Unlocked & Active in Profile!</span>
                    </div>
                  ) : (
                    <div className="text-xs text-charcoal-500 font-semibold bg-cream-200 py-2.5 rounded-xl">
                      {selectedBadge.consecutiveDays > 0
                        ? `Complete ${selectedBadge.consecutiveDays} consecutive days (${consecutiveDays}/${selectedBadge.consecutiveDays}) to unlock`
                        : "Complete the specific Ayurvedic hydration practice to unlock"}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Celebration Modal when milestone just unlocked */}
      <AnimatePresence>
        {showCelebrationModal && newlyEarnedBadge && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: -3 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-cream-100 rounded-3xl p-6 max-w-sm w-full border-2 border-amber-400 shadow-2xl relative overflow-hidden text-center"
            >
              {/* Confetti particles */}
              <div className="absolute top-2 left-4 text-xl">🎉</div>
              <div className="absolute top-3 right-5 text-xl">✨</div>
              <div className="absolute bottom-4 left-6 text-xl">🌟</div>
              <div className="absolute bottom-5 right-6 text-xl">💧</div>

              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 text-white flex items-center justify-center shadow-lg mb-4 mt-2">
                {renderBadgeIcon(newlyEarnedBadge.icon, 40, true)}
              </div>

              <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 inline-block mb-2">
                New Milestone Unlocked!
              </span>

              <h3 className="font-display font-black text-2xl text-charcoal-900">
                {newlyEarnedBadge.name}
              </h3>
              <p className="text-sm font-bold text-saffron-600 mt-0.5">
                {newlyEarnedBadge.vedicTitle}
              </p>

              <p className="text-xs text-charcoal-600 mt-3 leading-relaxed">
                {newlyEarnedBadge.description}
              </p>

              <p className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 py-1.5 px-3 rounded-xl mt-3">
                {consecutiveDays}-Day Consecutive Streak Reached! 🌟
              </p>

              <button
                onClick={closeCelebration}
                className="w-full mt-5 py-3 rounded-2xl bg-gradient-to-r from-saffron-600 to-amber-600 text-white font-bold text-sm shadow-soft hover:brightness-105 transition-all cursor-pointer"
              >
                Claim Badge & Continue
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
