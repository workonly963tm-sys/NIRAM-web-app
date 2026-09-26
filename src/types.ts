export type DoshaType = "vata" | "pitta" | "kapha";

export interface DoshaScores {
  vata: number;
  pitta: number;
  kapha: number;
}

export interface User {
  name: string;
  dosha: DoshaType | null;
  doshaScores: DoshaScores;
  city: string;
  language: string;
  age: number | null;
  height: number | null;
  weight: number | null;
  onboardingComplete: boolean;
}

export interface QuizOption {
  label: string;
  dosha: DoshaType;
}

export interface QuizQuestion {
  id: string;
  question: string;
  subtitle: string;
  options: QuizOption[];
}

export interface DoshaInfo {
  name: string;
  subtitle: string;
  description: string;
  color: string;
  bgGradient: string;
  motif: "feather" | "sun" | "lotus";
  eatMore: string[];
  eatLess: string[];
  routine: string[];
}

export interface FoodItem {
  id: string;
  name: string;
  category: string;
  properties: string[];
  favorable: DoshaType[];
  image: string;
  calories: number;
  protein: number;
  fiber: number;
}

export interface HerbItem {
  id: string;
  name: string;
  latinName: string;
  benefits: string[];
  dosha: DoshaType[];
  emoji: string;
}

export interface NutrientItem {
  name: string;
  protein?: number;
  fiber?: number;
  per: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  avatar: string;
  title: string;
  remedy: string;
  likes: number;
  comments: number;
  tags: string[];
  timeAgo: string;
}

export interface TrendingRemedy {
  title: string;
  condition: string;
  saves: number;
}

export interface StateClimateInfo {
  state: string;
  temp: number;
  condition: string;
  ritu: string;
  recommendedFoods: string[];
}

export interface LoggedMeal {
  id: string;
  type: "breakfast" | "lunch" | "dinner";
  name: string;
  calories: number;
  time: string;
  doshaBalance: string;
}

export interface DayStepData {
  day: string;
  steps: number;
  calories: number;
  water: number;
}

export interface FoodScanResult {
  foodName: string;
  verdict: "healthy" | "avoid";
  reason: string;
  alternatives: { name: string; benefit: string }[];
}

export interface FaceAttribute {
  name: string;
  severity: "good" | "minimal" | "low" | "mild" | "moderate";
  value: number;
  tip: string;
}

export interface ExerciseItem {
  name: string;
  reps: number;
  perSet: number;
  icon: string;
  desc: string;
}

export type ThemeType =
  | "classic"
  | "gaming"
  | "fitness"
  | "royal"
  | "lunar"
  | "terracotta";

export interface ThemeOption {
  id: ThemeType;
  label: string;
  desc: string;
  preview: string;
  bgClass: string;
  cardClass: string;
  accent: string;
}

export interface VedicAffirmation {
  id: string;
  dosha: DoshaType;
  sanskrit: string;
  transliteration: string;
  translation: string;
  source: string;
  theme: string;
  focus: string;
}

export interface WaterBadge {
  id: string;
  name: string;
  vedicTitle: string;
  description: string;
  consecutiveDays: number;
  icon: string;
  color: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  quote?: string;
}

export interface WaterTrackerState {
  glasses: number;
  goal: number;
  mlPerGlass: number;
  consecutiveDays?: number;
  unlockedBadges?: string[];
  lastUnlockedBadge?: string;
  ushapanLogged?: boolean;
  lastLoggedAt?: string;
  history?: { time: string; amount: number }[];
}


