import React from "react";
import { motion } from "motion/react";
import {
  ChevronLeft,
  Heart,
  Users,
  Shield,
  Sun,
  Sparkles,
  Eye,
  Stethoscope,
  Sprout,
  Wallet,
  Flag,
  Globe,
  Pill,
  TreePine,
  Landmark,
  Leaf,
} from "lucide-react";
import { impactPoints } from "../../data";
import { NiramBrandHeader } from "../NiramLogo";
import { CardGroup, CardItem } from "../Card";

interface AboutScreenProps {
  onNavigate: (screen: string) => void;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  heart: Heart,
  users: Users,
  shield: Shield,
  sun: Sun,
  sparkles: Sparkles,
  eye: Eye,
  stethoscope: Stethoscope,
  sprout: Sprout,
  wallet: Wallet,
  flag: Flag,
  globe: Globe,
  pill: Pill,
  "tree-pine": TreePine,
  landmark: Landmark,
  leaf: Leaf,
};

const categoryNames: Record<string, string> = {
  personal: "Personal Wellness",
  economic: "Economic Impact",
  social: "Social Impact",
  environmental: "Environmental Impact",
};

const categoryBadgeStyles: Record<string, string> = {
  personal: "bg-saffron-100 text-saffron-700",
  economic: "bg-sage-100 text-sage-700",
  social: "bg-sky-100 text-sky-700",
  environmental: "bg-emerald-100 text-emerald-700",
};

export function AboutScreen({ onNavigate }: AboutScreenProps) {
  const groupedPoints = impactPoints.reduce<Record<string, typeof impactPoints>>(
    (acc, point) => {
      if (!acc[point.category]) acc[point.category] = [];
      acc[point.category].push(point);
      return acc;
    },
    {}
  );

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
        <h1 className="font-display font-extrabold text-2xl text-charcoal-900">
          Our Impact
        </h1>
      </div>

      {/* Mission Hero Card */}
      <div className="px-6 mb-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6 text-center shadow-card"
        >
          <div className="flex justify-center mb-4">
            <NiramBrandHeader />
          </div>
          <p className="font-display font-bold text-lg text-charcoal-900 leading-relaxed italic">
            "Ancient Wisdom. Smart Fitness. Better Wellness."
          </p>
          <p className="text-sm text-charcoal-600 mt-4 leading-relaxed">
            Niram was built by someone who was themselves an unhealthy person
            suffering from obesity due to unhealthy food and a poor lifestyle.
            This app exists to help everyone deal simply with unhealthy
            lifestyles — using ancient Ayurvedic methods as the actual
            solution, not a marketing label.
          </p>
        </motion.div>
      </div>

      {/* Grouped Categories */}
      {Object.entries(groupedPoints).map(([catKey, points]) => (
        <div key={catKey} className="px-6 mb-5">
          <div className="flex items-center gap-2 mb-3">
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full ${categoryBadgeStyles[catKey]}`}
            >
              {categoryNames[catKey]}
            </span>
          </div>

          <CardGroup className="space-y-2">
            {points.map((pt) => {
              const Icon = iconMap[pt.icon] ?? Heart;
              return (
                <CardItem key={pt.text}>
                  <div className="card p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cream-200 flex items-center justify-center flex-shrink-0">
                      <Icon
                        size={18}
                        className="text-saffron-600"
                        strokeWidth={1.8}
                      />
                    </div>
                    <p className="text-sm text-charcoal-700 font-medium">
                      {pt.text}
                    </p>
                  </div>
                </CardItem>
              );
            })}
          </CardGroup>
        </div>
      ))}

      {/* Disclaimer */}
      <div className="px-6 mt-4">
        <div className="rounded-2xl bg-cream-200 p-4 border border-cream-400/40">
          <p className="text-xs text-charcoal-500 leading-relaxed text-center">
            All Ayurvedic guidance in Niram is traditional wellness support,
            not a replacement for professional medical care. Always consult a
            qualified healthcare provider for medical concerns.
          </p>
        </div>
      </div>
    </div>
  );
}
