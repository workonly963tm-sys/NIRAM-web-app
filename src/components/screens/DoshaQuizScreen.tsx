import React, { useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { quizQuestions } from "../../data";
import { useNiramStore } from "../../store";
import { TriDoshaRing } from "../TriDoshaRing";
import { DoshaType } from "../../types";

interface DoshaQuizScreenProps {
  onComplete: () => void;
}

export function DoshaQuizScreen({ onComplete }: DoshaQuizScreenProps) {
  const { quizAnswers, quizIndex, setQuizAnswer, setQuizIndex } = useNiramStore();

  const currentQuestion = quizQuestions[quizIndex] || quizQuestions[0];
  const isLastQuestion = quizIndex === quizQuestions.length - 1;
  const currentAnswer = quizAnswers[currentQuestion.id];

  const scores = useMemo(() => {
    const s = { vata: 0, pitta: 0, kapha: 0 };
    Object.values(quizAnswers).forEach((d) => {
      if (d in s) s[d]++;
    });
    return s;
  }, [quizAnswers]);

  const handleSelectOption = (dosha: DoshaType) => {
    setQuizAnswer(currentQuestion.id, dosha);
    if (!isLastQuestion) {
      setTimeout(() => {
        setQuizIndex(quizIndex + 1);
      }, 250);
    }
  };

  const handlePrev = () => {
    if (quizIndex > 0) {
      setQuizIndex(quizIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-cream-300 flex flex-col justify-between">
      {/* Top Header */}
      <div className="flex items-center justify-between px-6 pt-12 pb-4">
        <div className="flex gap-1.5">
          {quizQuestions.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === quizIndex
                  ? "w-8 bg-saffron-600"
                  : idx < quizIndex
                  ? "w-1.5 bg-saffron-300"
                  : "w-1.5 bg-cream-500"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <TriDoshaRing scores={scores} size={44} strokeWidth={6} animate={false} />
        </div>
      </div>

      {/* Question Card */}
      <div className="flex-1 px-6 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 flex flex-col justify-center"
          >
            <p className="text-sm text-saffron-600 font-semibold tracking-wide">
              Question {quizIndex + 1} of {quizQuestions.length}
            </p>
            <h2 className="font-display font-extrabold text-2xl text-charcoal-900 mt-2 leading-tight">
              {currentQuestion.question}
            </h2>
            <p className="text-charcoal-500 text-sm mt-2">
              {currentQuestion.subtitle}
            </p>

            <div className="mt-8 space-y-3">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = currentAnswer === option.dosha;
                return (
                  <motion.button
                    key={idx}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    onClick={() => handleSelectOption(option.dosha)}
                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "border-saffron-600 bg-saffron-50 shadow-soft"
                        : "border-cream-400 bg-cream-100 hover:border-saffron-200"
                    }`}
                  >
                    <span
                      className={`font-medium text-sm sm:text-base ${
                        isSelected ? "text-saffron-700 font-semibold" : "text-charcoal-700"
                      }`}
                    >
                      {option.label}
                    </span>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        className="w-6 h-6 rounded-full bg-saffron-600 flex items-center justify-center flex-shrink-0"
                      >
                        <Check size={16} className="text-white" strokeWidth={3} />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Bar */}
      <div className="px-6 pb-12 pt-4 flex items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={quizIndex === 0}
          className="flex items-center gap-1 text-charcoal-500 font-semibold disabled:opacity-30 cursor-pointer"
        >
          <ChevronLeft size={18} />
          <span>Back</span>
        </button>

        <p className="text-xs text-charcoal-400">
          {currentAnswer ? "Tap option or next" : "Select what fits you best"}
        </p>

        {isLastQuestion && currentAnswer ? (
          <button
            onClick={onComplete}
            className="flex items-center gap-1 text-saffron-600 font-bold cursor-pointer"
          >
            <span>See Results</span>
            <ChevronRight size={18} />
          </button>
        ) : (
          <span className="text-charcoal-400 text-sm font-semibold">
            {quizIndex + 1}/{quizQuestions.length}
          </span>
        )}
      </div>
    </div>
  );
}
