import { useState, useEffect } from "react";
import { User, DoshaType, DoshaScores, ThemeType, WaterTrackerState } from "./types";

const DEFAULT_USER: User = {
  name: "Friend",
  dosha: null,
  doshaScores: { vata: 0, pitta: 0, kapha: 0 },
  city: "Delhi",
  language: "English",
  age: null,
  height: null,
  weight: null,
  onboardingComplete: false,
};

const DEFAULT_WATER: WaterTrackerState = {
  glasses: 6,
  goal: 8,
  mlPerGlass: 250,
  consecutiveDays: 2,
  unlockedBadges: ["first-splash", "rhythm-flow"],
  ushapanLogged: false,
  history: [
    { time: "08:00 AM", amount: 1 },
    { time: "10:30 AM", amount: 1 },
    { time: "01:00 PM", amount: 2 },
    { time: "03:45 PM", amount: 1 },
    { time: "05:30 PM", amount: 1 },
  ],
};

interface StoreState {
  theme: ThemeType;
  netraMenuOpen: boolean;
  user: User;
  quizAnswers: Record<string, DoshaType>;
  quizIndex: number;
  waterTracker: WaterTrackerState;
}

const STORAGE_KEY = "niram_app_state";

const loadState = (): StoreState => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        theme: parsed.theme || "classic",
        netraMenuOpen: false,
        user: { ...DEFAULT_USER, ...parsed.user },
        quizAnswers: parsed.quizAnswers || {},
        quizIndex: parsed.quizIndex || 0,
        waterTracker: parsed.waterTracker
          ? { ...DEFAULT_WATER, ...parsed.waterTracker }
          : DEFAULT_WATER,
      };
    }
  } catch (e) {
    console.error("Failed to load stored state", e);
  }
  return {
    theme: "classic",
    netraMenuOpen: false,
    user: DEFAULT_USER,
    quizAnswers: {},
    quizIndex: 0,
    waterTracker: DEFAULT_WATER,
  };
};

let globalState: StoreState = loadState();
const listeners = new Set<() => void>();

const saveState = () => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        theme: globalState.theme,
        user: globalState.user,
        quizAnswers: globalState.quizAnswers,
        quizIndex: globalState.quizIndex,
        waterTracker: globalState.waterTracker,
      })
    );
  } catch (e) {
    console.error("Failed to persist state", e);
  }
};

const notify = () => {
  saveState();
  listeners.forEach((listener) => listener());
};

export const niramStore = {
  getState: () => globalState,
  setTheme: (theme: ThemeType) => {
    globalState = { ...globalState, theme };
    notify();
  },
  toggleNetraMenu: (open?: boolean) => {
    globalState = {
      ...globalState,
      netraMenuOpen: open !== undefined ? open : !globalState.netraMenuOpen,
    };
    notify();
  },
  setQuizAnswer: (questionId: string, dosha: DoshaType) => {
    globalState = {
      ...globalState,
      quizAnswers: { ...globalState.quizAnswers, [questionId]: dosha },
    };
    notify();
  },
  setQuizIndex: (index: number) => {
    globalState = { ...globalState, quizIndex: index };
    notify();
  },
  resetQuiz: () => {
    globalState = { ...globalState, quizAnswers: {}, quizIndex: 0 };
    notify();
  },
  completeOnboarding: (dominantDosha: DoshaType, scores: DoshaScores) => {
    globalState = {
      ...globalState,
      user: {
        ...globalState.user,
        dosha: dominantDosha,
        doshaScores: scores,
        onboardingComplete: true,
      },
    };
    notify();
  },
  setUser: (partial: Partial<User>) => {
    globalState = {
      ...globalState,
      user: { ...globalState.user, ...partial },
    };
    notify();
  },
  logWater: (amount: number = 1, isUshapan: boolean = false) => {
    const current = globalState.waterTracker.glasses;
    const goal = globalState.waterTracker.goal;
    const newGlasses = Math.max(0, current + amount);
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const currentHistory = globalState.waterTracker.history || [];
    const newHistory = amount > 0 
      ? [...currentHistory, { time: timeStr, amount }] 
      : currentHistory.slice(0, Math.max(0, currentHistory.length - 1));

    // Base streak from past days is 2. When today's glasses >= goal, today extends the streak to 3!
    const meetsGoal = newGlasses >= goal;
    const consecutiveDays = meetsGoal ? 3 : 2;

    const prevBadges = new Set(globalState.waterTracker.unlockedBadges || ["first-splash", "rhythm-flow"]);
    let newlyUnlocked: string | undefined = undefined;

    const checkBadge = (id: string) => {
      if (!prevBadges.has(id)) {
        prevBadges.add(id);
        newlyUnlocked = id;
      }
    };

    if (newGlasses >= 1) checkBadge("first-splash");
    if (consecutiveDays >= 2) checkBadge("rhythm-flow");
    if (consecutiveDays >= 3) checkBadge("hydration-hero");
    if (consecutiveDays >= 5) checkBadge("amrita-flow");
    if (consecutiveDays >= 7) checkBadge("vedic-water-master");
    if (isUshapan || globalState.waterTracker.ushapanLogged) checkBadge("ushapan-purist");
    if (newGlasses >= goal + 1) checkBadge("goal-crusher");

    globalState = {
      ...globalState,
      waterTracker: {
        ...globalState.waterTracker,
        glasses: newGlasses,
        consecutiveDays,
        unlockedBadges: Array.from(prevBadges),
        lastUnlockedBadge: newlyUnlocked || globalState.waterTracker.lastUnlockedBadge,
        ushapanLogged: isUshapan || globalState.waterTracker.ushapanLogged,
        lastLoggedAt: timeStr,
        history: newHistory,
      },
    };
    notify();
  },
  setWaterGlasses: (glasses: number) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const goal = globalState.waterTracker.goal;
    const meetsGoal = glasses >= goal;
    const consecutiveDays = meetsGoal ? 3 : 2;
    const prevBadges = new Set(globalState.waterTracker.unlockedBadges || ["first-splash", "rhythm-flow"]);
    let newlyUnlocked: string | undefined = undefined;

    if (glasses >= 1 && !prevBadges.has("first-splash")) {
      prevBadges.add("first-splash");
      newlyUnlocked = "first-splash";
    }
    if (consecutiveDays >= 3 && !prevBadges.has("hydration-hero")) {
      prevBadges.add("hydration-hero");
      newlyUnlocked = "hydration-hero";
    }
    if (glasses >= goal + 1 && !prevBadges.has("goal-crusher")) {
      prevBadges.add("goal-crusher");
      newlyUnlocked = "goal-crusher";
    }

    globalState = {
      ...globalState,
      waterTracker: {
        ...globalState.waterTracker,
        glasses: Math.max(0, glasses),
        consecutiveDays,
        unlockedBadges: Array.from(prevBadges),
        lastUnlockedBadge: newlyUnlocked || globalState.waterTracker.lastUnlockedBadge,
        lastLoggedAt: timeStr,
      },
    };
    notify();
  },
  setWaterGoal: (goal: number) => {
    const glasses = globalState.waterTracker.glasses;
    const meetsGoal = glasses >= goal;
    const consecutiveDays = meetsGoal ? 3 : 2;
    const prevBadges = new Set(globalState.waterTracker.unlockedBadges || ["first-splash", "rhythm-flow"]);
    let newlyUnlocked: string | undefined = undefined;
    if (consecutiveDays >= 3 && !prevBadges.has("hydration-hero")) {
      prevBadges.add("hydration-hero");
      newlyUnlocked = "hydration-hero";
    }

    globalState = {
      ...globalState,
      waterTracker: {
        ...globalState.waterTracker,
        goal: Math.max(1, goal),
        consecutiveDays,
        unlockedBadges: Array.from(prevBadges),
        lastUnlockedBadge: newlyUnlocked || globalState.waterTracker.lastUnlockedBadge,
      },
    };
    notify();
  },
  clearLastUnlockedBadge: () => {
    globalState = {
      ...globalState,
      waterTracker: {
        ...globalState.waterTracker,
        lastUnlockedBadge: undefined,
      },
    };
    notify();
  },
  resetWater: () => {
    globalState = {
      ...globalState,
      waterTracker: {
        ...globalState.waterTracker,
        glasses: 0,
        consecutiveDays: 2,
        history: [],
        lastLoggedAt: undefined,
        lastUnlockedBadge: undefined,
      },
    };
    notify();
  },
};

export function useNiramStore() {
  const [state, setState] = useState<StoreState>(globalState);

  useEffect(() => {
    const handleChange = () => setState(globalState);
    listeners.add(handleChange);
    return () => {
      listeners.delete(handleChange);
    };
  }, []);

  return {
    ...state,
    setTheme: niramStore.setTheme,
    toggleNetraMenu: niramStore.toggleNetraMenu,
    setQuizAnswer: niramStore.setQuizAnswer,
    setQuizIndex: niramStore.setQuizIndex,
    resetQuiz: niramStore.resetQuiz,
    completeOnboarding: niramStore.completeOnboarding,
    setUser: niramStore.setUser,
    logWater: niramStore.logWater,
    setWaterGlasses: niramStore.setWaterGlasses,
    setWaterGoal: niramStore.setWaterGoal,
    clearLastUnlockedBadge: niramStore.clearLastUnlockedBadge,
    resetWater: niramStore.resetWater,
  };
}

