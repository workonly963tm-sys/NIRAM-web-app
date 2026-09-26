import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useNiramStore } from "./store";

// Screens
import { SplashScreen } from "./components/screens/SplashScreen";
import { StatsIntroScreen } from "./components/screens/StatsIntroScreen";
import { LocationLanguageScreen } from "./components/screens/LocationLanguageScreen";
import { DoshaQuizScreen } from "./components/screens/DoshaQuizScreen";
import { DoshaResultScreen } from "./components/screens/DoshaResultScreen";
import { HomeScreen } from "./components/screens/HomeScreen";
import { AnalyticsScreen } from "./components/screens/AnalyticsScreen";
import { DietScreen } from "./components/screens/DietScreen";
import { IndiaMapScreen } from "./components/screens/IndiaMapScreen";
import { CommunityScreen } from "./components/screens/CommunityScreen";
import { ProfileScreen } from "./components/screens/ProfileScreen";
import { ThemeSwitcherScreen } from "./components/screens/ThemeSwitcherScreen";
import { AboutScreen } from "./components/screens/AboutScreen";
import { NetraFoodScanScreen } from "./components/screens/NetraFoodScanScreen";
import { NetraFaceScanScreen } from "./components/screens/NetraFaceScanScreen";
import { NetraExerciseScreen } from "./components/screens/NetraExerciseScreen";

// Navigation
import { BottomNav } from "./components/BottomNav";

export default function App() {
  const { user, theme, resetQuiz } = useNiramStore();
  const [onboardingStep, setOnboardingStep] = useState<
    "splash" | "stats" | "location" | "quiz" | "dosha-result"
  >("splash");
  const [currentScreen, setCurrentScreen] = useState<string>("home");

  useEffect(() => {
    document.body.className = `theme-${theme}`;
    if (theme === "gaming") {
      document.body.style.backgroundColor = "#0F0E17";
    } else if (theme === "fitness") {
      document.body.style.backgroundColor = "#F0F4F1";
    } else if (theme === "royal") {
      document.body.style.backgroundColor = "#0B111E";
    } else if (theme === "lunar") {
      document.body.style.backgroundColor = "#0E121E";
    } else if (theme === "terracotta") {
      document.body.style.backgroundColor = "#FFF6ED";
    } else {
      document.body.style.backgroundColor = "#F8F5EE";
    }
  }, [theme]);

  // Onboarding Flow
  if (!user.onboardingComplete) {
    let screenComponent: React.ReactNode = null;

    switch (onboardingStep) {
      case "splash":
        screenComponent = (
          <SplashScreen onStart={() => setOnboardingStep("stats")} />
        );
        break;
      case "stats":
        screenComponent = (
          <StatsIntroScreen onNext={() => setOnboardingStep("location")} />
        );
        break;
      case "location":
        screenComponent = (
          <LocationLanguageScreen
            onNext={() => {
              resetQuiz();
              setOnboardingStep("quiz");
            }}
          />
        );
        break;
      case "quiz":
        screenComponent = (
          <DoshaQuizScreen
            onComplete={() => setOnboardingStep("dosha-result")}
          />
        );
        break;
      case "dosha-result":
        screenComponent = (
          <DoshaResultScreen onContinue={() => setCurrentScreen("home")} />
        );
        break;
    }

    return (
      <div
        className={`h-screen h-[100dvh] w-screen overflow-hidden flex flex-col items-center justify-center ${
          theme === "gaming"
            ? "theme-gaming"
            : theme === "fitness"
            ? "theme-fitness"
            : ""
        }`}
      >
        <div className="w-full max-w-md h-full max-h-screen flex flex-col relative shadow-2xl overflow-hidden bg-cream-300">
          <main className="flex-1 w-full overflow-y-auto overscroll-contain relative scrollbar-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={onboardingStep}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
                className="w-full min-h-full"
              >
                {screenComponent}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    );
  }

  // Main App Flow - Navigation bar stays permanently accessible
  const showBottomNav = true;

  const renderMainScreen = () => {
    switch (currentScreen) {
      case "home":
        return <HomeScreen onNavigate={setCurrentScreen} />;
      case "stats":
      case "analytics":
        return <AnalyticsScreen onNavigate={setCurrentScreen} />;
      case "diet":
        return <DietScreen onNavigate={setCurrentScreen} />;
      case "india-map":
        return <IndiaMapScreen onNavigate={setCurrentScreen} />;
      case "community":
        return <CommunityScreen onNavigate={setCurrentScreen} />;
      case "profile":
        return <ProfileScreen onNavigate={setCurrentScreen} />;
      case "theme-switcher":
        return <ThemeSwitcherScreen onNavigate={setCurrentScreen} />;
      case "about":
        return <AboutScreen onNavigate={setCurrentScreen} />;
      case "netra-food":
        return <NetraFoodScanScreen onNavigate={setCurrentScreen} />;
      case "netra-face":
        return <NetraFaceScanScreen onNavigate={setCurrentScreen} />;
      case "netra-exercise":
        return <NetraExerciseScreen onNavigate={setCurrentScreen} />;
      default:
        return <HomeScreen onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className={`h-screen h-[100dvh] w-screen overflow-hidden flex flex-col items-center justify-center theme-${theme}`}>
      <div className="w-full max-w-md h-full max-h-screen flex flex-col relative shadow-2xl overflow-hidden bg-cream-50 dark:bg-charcoal-900">
        {/* Scrollable Main Area (Middle Container) */}
        <main className="flex-1 w-full overflow-y-auto overscroll-contain relative scrollbar-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full min-h-full"
            >
              {renderMainScreen()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Fixed Bottom Navigation Bar - Pinned at bottom, stays sticky and does not scroll with page */}
        {showBottomNav && (
          <BottomNav
            current={currentScreen}
            onNavigate={(screen) => setCurrentScreen(screen)}
          />
        )}
      </div>
    </div>
  );
}
