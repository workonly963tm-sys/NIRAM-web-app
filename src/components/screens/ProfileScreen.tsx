import React from "react";
import { motion } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Palette,
  Bell,
  Languages,
  Sliders,
  Info,
  Eye,
  Feather,
  Sun,
  Flower2,
  Clock,
} from "lucide-react";
import { useNiramStore } from "../../store";
import { doshaProfiles } from "../../data";
import { TriDoshaRing } from "../TriDoshaRing";
import { CardGroup, CardItem } from "../Card";

interface ProfileScreenProps {
  onNavigate: (screen: string) => void;
}

const motifIcons = {
  feather: Feather,
  sun: Sun,
  lotus: Flower2,
};

export function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  const { user } = useNiramStore();
  const dominantDosha = user.dosha ?? "vata";
  const profile = doshaProfiles[dominantDosha];
  const MotifIcon = motifIcons[profile.motif] || Feather;

  const menuItems = [
    {
      icon: Palette,
      label: "Theme Switcher",
      desc: "Classic / Gaming / Fitness",
      action: () => onNavigate("theme-switcher"),
    },
    {
      icon: Bell,
      label: "Biological Clock Reminders",
      desc: "Meal times, sleep, abhyanga",
      action: () => {},
    },
    {
      icon: Languages,
      label: "Language & Location",
      desc: `${user.language || "English"} • ${user.city || "India"}`,
      action: () => {},
    },
    {
      icon: Sliders,
      label: "Advanced Settings",
      desc: "Units, privacy, data",
      action: () => {},
    },
    {
      icon: Info,
      label: "Our Impact & About",
      desc: "The mission behind Niram",
      action: () => onNavigate("about"),
    },
  ];

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
        <h1 className="font-display font-extrabold text-2xl text-charcoal-900">
          Profile
        </h1>
      </div>

      {/* Prakriti Card */}
      <div className="px-6 mb-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-3xl p-6 bg-gradient-to-br ${profile.bgGradient} shadow-card`}
        >
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-card"
              style={{ backgroundColor: profile.color }}
            >
              <MotifIcon size={32} className="text-white" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-2xl text-charcoal-900">
                {user.name}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                  style={{ backgroundColor: profile.color }}
                >
                  {profile.name} • {profile.subtitle}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between bg-cream-100/80 rounded-2xl p-4">
            <TriDoshaRing
              scores={user.doshaScores}
              size={80}
              strokeWidth={8}
              animate={false}
            />
            <div className="flex-1 ml-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-charcoal-600 font-semibold">Vata</span>
                <span className="text-charcoal-900 font-bold">
                  {user.doshaScores.vata}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-charcoal-600 font-semibold">Pitta</span>
                <span className="text-charcoal-900 font-bold">
                  {user.doshaScores.pitta}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-charcoal-600 font-semibold">Kapha</span>
                <span className="text-charcoal-900 font-bold">
                  {user.doshaScores.kapha}
                </span>
              </div>
            </div>
          </div>

          <p className="text-xs text-charcoal-500 mt-3 font-medium">
            {user.city || "India"} • {user.language || "English"}
          </p>
        </motion.div>
      </div>

      {/* Lifestyle Sync */}
      <div className="px-6 mb-5">
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-3">
            <Clock size={18} className="text-saffron-600" />
            <h3 className="font-display font-bold text-lg text-charcoal-900">
              Lifestyle Sync
            </h3>
          </div>
          <p className="text-xs text-charcoal-500 mb-4">
            Your biological clock reminders based on {profile.name} dosha
          </p>
          <div className="space-y-3">
            {profile.routine.slice(0, 3).map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-saffron-50 flex items-center justify-center flex-shrink-0">
                  <Feather size={18} className="text-saffron-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-charcoal-700 font-medium">{item}</p>
                </div>
                <Bell size={16} className="text-charcoal-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Options List */}
      <div className="px-6">
        <CardGroup className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <CardItem key={item.label}>
                <button
                  onClick={item.action}
                  className="w-full card p-4 flex items-center gap-3 cursor-pointer hover:bg-cream-200 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-cream-200 flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-saffron-600" strokeWidth={1.8} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-charcoal-900 text-sm">
                      {item.label}
                    </p>
                    <p className="text-xs text-charcoal-500">{item.desc}</p>
                  </div>
                  <ChevronRight size={18} className="text-charcoal-300" />
                </button>
              </CardItem>
            );
          })}
        </CardGroup>
      </div>

      {/* Branding Footer */}
      <div className="px-6 mt-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Eye size={16} className="text-saffron-600" />
          <span className="font-display font-bold text-charcoal-900 tracking-tight">
            NIRAM
          </span>
        </div>
        <p className="text-xs text-charcoal-400">
          Ancient Wisdom. Smart Fitness. Better Wellness.
        </p>
        <p className="text-xs text-charcoal-400 mt-1">
          Wellness support, not medical advice
        </p>
      </div>
    </div>
  );
}
