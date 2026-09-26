import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, MapPin, Globe, User, Search } from "lucide-react";
import { languageOptions, popularCities } from "../../data";
import { useNiramStore } from "../../store";

interface LocationLanguageScreenProps {
  onNext: () => void;
}

export function LocationLanguageScreen({ onNext }: LocationLanguageScreenProps) {
  const { user, setUser } = useNiramStore();
  const [step, setStep] = useState<"language" | "location" | "details">("language");
  const [selectedLanguage, setSelectedLanguage] = useState(user.language || "English");
  const [selectedCity, setSelectedCity] = useState(user.city || "Delhi");
  const [searchCity, setSearchCity] = useState("");
  const [name, setName] = useState(user.name === "Friend" ? "" : user.name);
  const [age, setAge] = useState(user.age ? String(user.age) : "");
  const [weight, setWeight] = useState(user.weight ? String(user.weight) : "");
  const [height, setHeight] = useState(user.height ? String(user.height) : "");

  const handleLanguageNext = () => {
    setUser({ language: selectedLanguage });
    setStep("location");
  };

  const handleLocationNext = () => {
    setUser({ city: selectedCity });
    setStep("details");
  };

  const handleFinalSubmit = () => {
    setUser({
      name: name.trim() || "Sadhak",
      age: age ? parseInt(age, 10) : null,
      height: height ? parseInt(height, 10) : null,
      weight: weight ? parseInt(weight, 10) : null,
    });
    onNext();
  };

  return (
    <div className="min-h-screen bg-cream-300 flex flex-col justify-between px-6 pt-12 pb-10">
      <AnimatePresence mode="wait">
        {step === "language" && (
          <motion.div
            key="lang-step"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-2">
              <Globe size={20} className="text-saffron-600" />
              <span className="text-xs font-bold text-saffron-600 uppercase tracking-wider">
                Step 1 of 3
              </span>
            </div>
            <h2 className="font-display font-extrabold text-2xl text-charcoal-900 mb-1">
              Select Your Preferred Language
            </h2>
            <p className="text-xs text-charcoal-500 mb-6">
              Niram provides Vedic guidance in your native tongue
            </p>

            <div className="grid grid-cols-2 gap-3 flex-1 overflow-y-auto pr-1">
              {languageOptions.map((lang) => (
                <button
                  key={lang.value}
                  onClick={() => setSelectedLanguage(lang.value)}
                  className={`card p-4 text-center cursor-pointer transition-all duration-200 border-2 ${
                    selectedLanguage === lang.value
                      ? "border-saffron-600 bg-saffron-50 text-saffron-700 shadow-soft"
                      : "border-transparent text-charcoal-700 hover:border-cream-400"
                  }`}
                >
                  <p className="font-display font-bold text-lg">{lang.label}</p>
                  <p className="text-xs text-charcoal-400 mt-0.5">{lang.value}</p>
                </button>
              ))}
            </div>

            <div className="pt-6">
              <button
                onClick={handleLanguageNext}
                className="btn-primary w-full flex items-center justify-center gap-2 text-base font-semibold shadow-saffron cursor-pointer"
              >
                <span>Continue</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        )}

        {step === "location" && (
          <motion.div
            key="loc-step"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={20} className="text-saffron-600" />
              <span className="text-xs font-bold text-saffron-600 uppercase tracking-wider">
                Step 2 of 3
              </span>
            </div>
            <h2 className="font-display font-extrabold text-2xl text-charcoal-900 mb-1">
              Where do you live?
            </h2>
            <p className="text-xs text-charcoal-500 mb-6">
              Ayurvedic recommendations adapt to your regional climate (Ritu)
            </p>

            <div className="card p-3 mb-4 flex items-center gap-3">
              <Search size={18} className="text-charcoal-400" />
              <input
                type="text"
                value={searchCity}
                onChange={(e) => {
                  setSearchCity(e.target.value);
                  setSelectedCity(e.target.value);
                }}
                placeholder="Search or enter your city..."
                className="bg-transparent border-0 outline-none w-full text-sm text-charcoal-900 font-medium placeholder:text-charcoal-400"
              />
            </div>

            <p className="text-xs font-semibold text-charcoal-500 mb-2">
              Popular Cities
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {popularCities.map((city) => (
                <button
                  key={city}
                  onClick={() => {
                    setSelectedCity(city);
                    setSearchCity(city);
                  }}
                  className={`pill text-xs font-semibold cursor-pointer transition-colors ${
                    selectedCity === city
                      ? "bg-saffron-600 text-white"
                      : "bg-cream-100 text-charcoal-700 hover:bg-cream-200"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>

            <div className="mt-auto pt-6">
              <button
                onClick={handleLocationNext}
                className="btn-primary w-full flex items-center justify-center gap-2 text-base font-semibold shadow-saffron cursor-pointer"
              >
                <span>Continue</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        )}

        {step === "details" && (
          <motion.div
            key="details-step"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-2">
              <User size={20} className="text-saffron-600" />
              <span className="text-xs font-bold text-saffron-600 uppercase tracking-wider">
                Step 3 of 3
              </span>
            </div>
            <h2 className="font-display font-extrabold text-2xl text-charcoal-900 mb-1">
              Personalize Your Profile
            </h2>
            <p className="text-xs text-charcoal-500 mb-6">
              Tell us a little about yourself
            </p>

            <div className="space-y-4 flex-1">
              <div>
                <label className="text-xs font-semibold text-charcoal-600 mb-1.5 block">
                  Your Name
                </label>
                <div className="card p-3.5">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="bg-transparent border-0 outline-none w-full text-sm font-semibold text-charcoal-900 placeholder:text-charcoal-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-charcoal-600 mb-1.5 block">
                    Age
                  </label>
                  <div className="card p-3.5">
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="28"
                      className="bg-transparent border-0 outline-none w-full text-sm font-semibold text-charcoal-900 placeholder:text-charcoal-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-charcoal-600 mb-1.5 block">
                    Height (cm)
                  </label>
                  <div className="card p-3.5">
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="170"
                      className="bg-transparent border-0 outline-none w-full text-sm font-semibold text-charcoal-900 placeholder:text-charcoal-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-charcoal-600 mb-1.5 block">
                    Weight (kg)
                  </label>
                  <div className="card p-3.5">
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="65"
                      className="bg-transparent border-0 outline-none w-full text-sm font-semibold text-charcoal-900 placeholder:text-charcoal-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={handleFinalSubmit}
                className="btn-primary w-full flex items-center justify-center gap-2 text-base font-semibold shadow-saffron cursor-pointer"
              >
                <span>Take Dosha Quiz</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
