import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  House,
  Salad,
  Users,
  User as UserIcon,
  Eye,
  X,
  Camera,
  ScanFace,
  Activity,
} from "lucide-react";
import { useNiramStore } from "../store";
import { ThemeType } from "../types";

interface BottomNavProps {
  current: string;
  onNavigate: (screen: string) => void;
}

const navItems = [
  { id: "home", label: "Home", icon: House },
  { id: "diet", label: "Bhojan", icon: Salad },
  { id: "community", label: "Vedic Hub", icon: Users },
  { id: "profile", label: "Profile", icon: UserIcon },
];

const netraOptions = [
  {
    id: "netra-food",
    label: "Food Scan",
    icon: Camera,
    desc: "Check any food item",
  },
  {
    id: "netra-face",
    label: "Face Analysis",
    icon: ScanFace,
    desc: "Skin health & age",
  },
  {
    id: "netra-exercise",
    label: "Exercise Tracker",
    icon: Activity,
    desc: "Track your movement",
  },
];

const navThemes: Record<
  ThemeType,
  {
    barBg: string;
    barBorder: string;
    notchBg: string;
    centerGrad: string;
    centerGlow: string;
    centerShadow: string;
    activeText: string;
    inactiveText: string;
    activeIndicator: string;
    menuCardBg: string;
    menuCardBorder: string;
    menuIconText: string;
    menuTagBg: string;
    menuTagText: string;
  }
> = {
  classic: {
    barBg: "bg-cream-100/95 backdrop-blur-md",
    barBorder: "border-cream-400/50",
    notchBg: "bg-cream-100",
    centerGrad: "from-saffron-500 to-saffron-700",
    centerGlow: "bg-saffron-400",
    centerShadow: "shadow-saffron",
    activeText: "text-saffron-600",
    inactiveText: "text-charcoal-400",
    activeIndicator: "bg-saffron-600",
    menuCardBg: "bg-cream-100",
    menuCardBorder: "border-saffron-200 hover:border-saffron-400",
    menuIconText: "text-saffron-600",
    menuTagBg: "bg-cream-100",
    menuTagText: "text-charcoal-800",
  },
  gaming: {
    barBg: "bg-[#181726]/95 backdrop-blur-md",
    barBorder: "border-emerald-500/30",
    notchBg: "bg-[#181726]",
    centerGrad: "from-emerald-500 to-cyan-500",
    centerGlow: "bg-emerald-400",
    centerShadow: "shadow-[0_0_24px_rgba(16,185,129,0.5)]",
    activeText: "text-emerald-400",
    inactiveText: "text-slate-400",
    activeIndicator: "bg-emerald-400 shadow-[0_0_8px_#34d399]",
    menuCardBg: "bg-[#201F35]",
    menuCardBorder: "border-emerald-500/40 hover:border-emerald-400",
    menuIconText: "text-emerald-400",
    menuTagBg: "bg-[#201F35]",
    menuTagText: "text-emerald-200",
  },
  fitness: {
    barBg: "bg-white/95 backdrop-blur-md",
    barBorder: "border-lime-200",
    notchBg: "bg-white",
    centerGrad: "from-lime-500 to-emerald-600",
    centerGlow: "bg-lime-400",
    centerShadow: "shadow-[0_4px_18px_rgba(101,163,13,0.35)]",
    activeText: "text-lime-600",
    inactiveText: "text-slate-400",
    activeIndicator: "bg-lime-600",
    menuCardBg: "bg-white",
    menuCardBorder: "border-lime-200 hover:border-lime-400",
    menuIconText: "text-lime-600",
    menuTagBg: "bg-white",
    menuTagText: "text-charcoal-800",
  },
  royal: {
    barBg: "bg-[#131E31]/95 backdrop-blur-md",
    barBorder: "border-amber-500/30",
    notchBg: "bg-[#131E31]",
    centerGrad: "from-amber-400 to-yellow-600",
    centerGlow: "bg-amber-400",
    centerShadow: "shadow-[0_0_24px_rgba(245,158,11,0.45)]",
    activeText: "text-amber-400",
    inactiveText: "text-slate-400",
    activeIndicator: "bg-amber-400 shadow-[0_0_8px_#fbbf24]",
    menuCardBg: "bg-[#1C2B44]",
    menuCardBorder: "border-amber-500/40 hover:border-amber-400",
    menuIconText: "text-amber-400",
    menuTagBg: "bg-[#1C2B44]",
    menuTagText: "text-amber-200",
  },
  lunar: {
    barBg: "bg-[#181F33]/95 backdrop-blur-md",
    barBorder: "border-purple-400/30",
    notchBg: "bg-[#181F33]",
    centerGrad: "from-purple-500 to-indigo-600",
    centerGlow: "bg-purple-400",
    centerShadow: "shadow-[0_0_24px_rgba(139,92,246,0.45)]",
    activeText: "text-purple-400",
    inactiveText: "text-slate-400",
    activeIndicator: "bg-purple-400 shadow-[0_0_8px_#c084fc]",
    menuCardBg: "bg-[#232C47]",
    menuCardBorder: "border-purple-400/40 hover:border-purple-400",
    menuIconText: "text-purple-400",
    menuTagBg: "bg-[#232C47]",
    menuTagText: "text-purple-200",
  },
  terracotta: {
    barBg: "bg-[#FFEDE1]/95 backdrop-blur-md",
    barBorder: "border-orange-200",
    notchBg: "bg-[#FFEDE1]",
    centerGrad: "from-orange-600 to-amber-700",
    centerGlow: "bg-orange-400",
    centerShadow: "shadow-[0_4px_18px_rgba(194,65,12,0.35)]",
    activeText: "text-orange-700",
    inactiveText: "text-stone-400",
    activeIndicator: "bg-orange-600",
    menuCardBg: "bg-[#FFEDE1]",
    menuCardBorder: "border-orange-200 hover:border-orange-400",
    menuIconText: "text-orange-700",
    menuTagBg: "bg-[#FFEDE1]",
    menuTagText: "text-stone-800",
  },
};

export function BottomNav({ current, onNavigate }: BottomNavProps) {
  const { netraMenuOpen, toggleNetraMenu, theme } = useNiramStore();
  const navTheme = navThemes[theme] || navThemes.classic;

  const handleNetraNavigate = (id: string) => {
    toggleNetraMenu(false);
    onNavigate(id);
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {netraMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => toggleNetraMenu(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm z-[60]"
          />
        )}
      </AnimatePresence>

      {/* Floating Netra Action Menu Sheet */}
      <AnimatePresence>
        {netraMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 450, damping: 26 }}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm z-[70] pointer-events-auto"
          >
            <div
              className={`${navTheme.menuCardBg} border-2 ${navTheme.barBorder} rounded-3xl p-4 shadow-2xl backdrop-blur-2xl relative overflow-hidden`}
            >
              {/* Header Title with full visibility, no clipping */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-saffron-500 animate-ping" />
                  <div>
                    <h4 className={`text-xs font-display font-extrabold uppercase tracking-wider ${navTheme.menuTagText}`}>
                      Netra Vision AI
                    </h4>
                    <p className="text-[11px] text-charcoal-500 font-medium">
                      Choose AI Scanner & Tracker
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => toggleNetraMenu(false)}
                  className="w-7 h-7 rounded-full bg-cream-200 hover:bg-cream-300 flex items-center justify-center text-charcoal-500 transition-colors cursor-pointer"
                  title="Close Menu"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Horizontal Actions Grid with ample spacing & non-clipping labels */}
              <div className="grid grid-cols-3 gap-2.5">
                {netraOptions.map((opt, idx) => {
                  const Icon = opt.icon;
                  return (
                    <motion.button
                      key={opt.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.94 }}
                      onClick={() => handleNetraNavigate(opt.id)}
                      className={`flex flex-col items-center text-center p-3 rounded-2xl border-2 transition-all cursor-pointer bg-white/70 hover:bg-white shadow-soft ${navTheme.menuCardBorder}`}
                    >
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2 shadow-xs ${
                          idx === 0
                            ? "bg-amber-100 text-amber-700"
                            : idx === 1
                            ? "bg-purple-100 text-purple-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        <Icon size={22} strokeWidth={2.2} />
                      </div>
                      <span className="font-display font-bold text-xs text-charcoal-900 leading-tight w-full break-words">
                        {opt.id === "netra-face" ? "Face Analysis" : opt.label}
                      </span>
                      <span className="text-[10px] text-charcoal-500 font-medium mt-0.5 line-clamp-1">
                        {opt.desc}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fixed Bottom Navigation Bar - Pinned at bottom, stays sticky */}
      <div className="absolute bottom-0 left-0 right-0 z-50 flex justify-center pb-3 pointer-events-none">
        <div className="relative w-full max-w-md px-4 pointer-events-auto">
          {/* Central Netra floating button */}
          <motion.button
            onClick={() => toggleNetraMenu()}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.92 }}
            className="absolute left-1/2 -translate-x-1/2 -top-7 z-50 cursor-pointer outline-none"
            aria-label="Open Netra Vision AI"
          >
            <motion.div
              animate={netraMenuOpen ? { rotate: 90 } : { rotate: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${navTheme.centerGrad} flex items-center justify-center ${navTheme.centerShadow}`}
            >
              {!netraMenuOpen && (
                <motion.div
                  animate={{ opacity: [0.35, 0.75, 0.35], scale: [1, 1.18, 1] }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className={`absolute inset-0 rounded-full ${navTheme.centerGlow} -z-10`}
                />
              )}
              <AnimatePresence mode="wait">
                {netraMenuOpen ? (
                  <motion.div
                    key="x"
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 45 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X
                      size={28}
                      className="text-white relative"
                      strokeWidth={2.5}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="eye"
                    initial={{ scale: 0, rotate: 45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: -45 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Eye
                      size={28}
                      className="text-white relative"
                      strokeWidth={2.5}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.button>

          {/* Bar pill container */}
          <div
            className={`${navTheme.barBg} rounded-full shadow-lifted flex items-center justify-between px-6 py-2.5 relative border ${navTheme.barBorder} transition-colors duration-300`}
          >
            {/* Cutout notch for center button */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 -top-3 w-20 h-6 ${navTheme.notchBg} rounded-b-full pointer-events-none transition-colors duration-300`}
            />

            <div className="flex flex-col items-center gap-0.5 w-16">
              <NavItem
                item={navItems[0]}
                active={current === navItems[0].id}
                activeText={navTheme.activeText}
                inactiveText={navTheme.inactiveText}
                indicatorClass={navTheme.activeIndicator}
                onClick={() => onNavigate(navItems[0].id)}
              />
            </div>
            <div className="flex flex-col items-center gap-0.5 w-16">
              <NavItem
                item={navItems[1]}
                active={current === navItems[1].id}
                activeText={navTheme.activeText}
                inactiveText={navTheme.inactiveText}
                indicatorClass={navTheme.activeIndicator}
                onClick={() => onNavigate(navItems[1].id)}
              />
            </div>

            <div className="w-16" />

            <div className="flex flex-col items-center gap-0.5 w-16">
              <NavItem
                item={navItems[2]}
                active={current === navItems[2].id}
                activeText={navTheme.activeText}
                inactiveText={navTheme.inactiveText}
                indicatorClass={navTheme.activeIndicator}
                onClick={() => onNavigate(navItems[2].id)}
              />
            </div>
            <div className="flex flex-col items-center gap-0.5 w-16">
              <NavItem
                item={navItems[3]}
                active={current === navItems[3].id}
                activeText={navTheme.activeText}
                inactiveText={navTheme.inactiveText}
                indicatorClass={navTheme.activeIndicator}
                onClick={() => onNavigate(navItems[3].id)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function NavItem({
  item,
  active,
  activeText,
  inactiveText,
  indicatorClass,
  onClick,
}: {
  item: { id: string; label: string; icon: React.ComponentType<any> };
  active: boolean;
  activeText: string;
  inactiveText: string;
  indicatorClass: string;
  onClick: () => void;
}) {
  const Icon = item.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-0.5 cursor-pointer outline-none relative py-1 hover:opacity-90 active:scale-95 transition-transform"
    >
      <div className={active ? "scale-110 transition-transform" : "transition-transform"}>
        <Icon
          size={21}
          className={active ? activeText : inactiveText}
          strokeWidth={active ? 2.5 : 2}
        />
      </div>
      <span
        className={`text-[10px] font-semibold tracking-tight transition-colors duration-200 ${
          active ? activeText : inactiveText
        }`}
      >
        {item.label}
      </span>
      {active && (
        <div
          className={`w-1.5 h-1.5 rounded-full ${indicatorClass} mt-0.5`}
        />
      )}
    </button>
  );
}
