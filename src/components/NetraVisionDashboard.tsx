import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  X,
  Activity,
  ScanFace,
  Camera,
  Flame,
  CheckCircle2,
  Sparkles,
  Zap,
  Target,
  AlertTriangle,
  Heart,
  Droplets,
  Eye,
  Info,
  ShieldAlert,
} from "lucide-react";
import { exerciseList, faceAnalysisResult, foodScanCatalogue } from "../data";

interface NetraVisionDashboardProps {
  initialMode?: "exercise" | "face" | "food";
  onNavigate: (screen: string) => void;
}

// 14-point Pose Landmark Skeleton for Surya Namaskar (Hastauttanasana)
// Aligned to the athletic person standing in living room
const livingRoomSkeletonNodes = [
  { id: "nose", x: 48.0, y: 20.0, name: "Crown" },
  { id: "left_shoulder", x: 44.5, y: 30.5, name: "L Shoulder" },
  { id: "right_shoulder", x: 51.5, y: 30.0, name: "R Shoulder" },
  { id: "left_elbow", x: 41.0, y: 21.0, name: "L Elbow" },
  { id: "right_elbow", x: 55.5, y: 19.5, name: "R Elbow" },
  { id: "left_wrist", x: 38.0, y: 11.5, name: "L Wrist" },
  { id: "right_wrist", x: 58.0, y: 10.5, name: "R Wrist" },
  { id: "spine_mid", x: 48.0, y: 41.5, name: "Spine T8" },
  { id: "left_hip", x: 46.0, y: 53.0, name: "L Hip" },
  { id: "right_hip", x: 50.5, y: 52.5, name: "R Hip" },
  { id: "left_knee", x: 45.0, y: 70.0, name: "L Knee" },
  { id: "right_knee", x: 51.0, y: 69.5, name: "R Knee" },
  { id: "left_ankle", x: 44.0, y: 88.0, name: "L Ankle" },
  { id: "right_ankle", x: 50.5, y: 88.0, name: "R Ankle" },
];

const livingRoomSkeletonBones = [
  ["left_shoulder", "right_shoulder"],
  ["left_shoulder", "left_elbow"],
  ["left_elbow", "left_wrist"],
  ["right_shoulder", "right_elbow"],
  ["right_elbow", "right_wrist"],
  ["left_shoulder", "spine_mid"],
  ["right_shoulder", "spine_mid"],
  ["spine_mid", "left_hip"],
  ["spine_mid", "right_hip"],
  ["left_hip", "right_hip"],
  ["left_hip", "left_knee"],
  ["left_knee", "left_ankle"],
  ["right_hip", "right_knee"],
  ["right_knee", "right_ankle"],
  ["nose", "spine_mid"],
];

export function NetraVisionDashboard({
  initialMode = "exercise",
  onNavigate,
}: NetraVisionDashboardProps) {
  const [activeTab, setActiveTab] = useState<"exercise" | "face" | "food">(initialMode);

  // Exercise Tracker State
  const [selectedExIndex, setSelectedExIndex] = useState(0); // 0 is Surya Namaskar
  const [reps, setReps] = useState(12); // "CURRENT COUNT: Reps 12/12"
  const [targetReps] = useState(12);
  const [formAccuracy, setFormAccuracy] = useState(92); // "Bio-Alignment: Form Accuracy 92%"
  const [isRecording, setIsRecording] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [exerciseTimer, setExerciseTimer] = useState(148);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [simulatedAngle, setSimulatedAngle] = useState(174);

  // Live timer & angle telemetry
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRecording && activeTab === "exercise") {
      interval = setInterval(() => {
        setExerciseTimer((prev) => prev + 1);
        setSimulatedAngle(172 + Math.floor(Math.sin(Date.now() / 900) * 4));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording, activeTab]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleIncrementRep = () => {
    const nextReps = reps + 1;
    setReps(nextReps);
    const newAcc = Math.min(98, Math.max(90, formAccuracy + (Math.random() > 0.5 ? 1 : 0)));
    setFormAccuracy(newAcc);
    triggerToast(`Rep ${nextReps} logged! Excellent Hastauttanasana form ✨`);
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="h-full max-h-screen bg-[#090D16] text-white flex flex-col relative select-none overflow-hidden font-sans">
      {/* Top HUD Navigation Bar - Permanently Pinned */}
      <header className="flex-shrink-0 px-4 pt-8 pb-3 flex items-center justify-between border-b border-white/10 bg-[#0B111E]/95 backdrop-blur-md z-30">
        <button
          onClick={() => onNavigate("home")}
          className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          title="Back to Home"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <h1 className="font-display font-black text-sm tracking-wider uppercase text-white">
              NETRA AI VISION
            </h1>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              LIVE
            </span>
          </div>
          <span className="text-[10px] text-white/50 font-mono tracking-tight">
            COMPUTER VISION HUD • 60 FPS
          </span>
        </div>

        <button
          onClick={() => onNavigate("home")}
          className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          title="Close Scanner"
        >
          <X size={18} />
        </button>
      </header>

      {/* Mode Switcher Tabs - With Active Green Highlight Tabs */}
      <nav className="flex-shrink-0 px-4 py-2.5 bg-[#0B111E] z-20 border-b border-white/5">
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-white/5 border border-white/10">
          {/* Tab 1: Exercise Tracker (Active Green Tab) */}
          <button
            onClick={() => setActiveTab("exercise")}
            className={`py-2 px-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === "exercise"
                ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-[0_0_18px_rgba(16,185,129,0.5)] border border-emerald-400/40"
                : "text-white/60 hover:text-white"
            }`}
          >
            <Activity size={14} />
            <span className="truncate">Exercise Tracker</span>
          </button>

          {/* Tab 2: Face Analysis */}
          <button
            onClick={() => setActiveTab("face")}
            className={`py-2 px-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === "face"
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_0_18px_rgba(16,185,129,0.5)] border border-emerald-400/40"
                : "text-white/60 hover:text-white"
            }`}
          >
            <ScanFace size={14} />
            <span className="truncate">Face Analysis</span>
          </button>

          {/* Tab 3: Food Scan */}
          <button
            onClick={() => setActiveTab("food")}
            className={`py-2 px-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === "food"
                ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-[0_0_18px_rgba(16,185,129,0.5)] border border-emerald-400/40"
                : "text-white/60 hover:text-white"
            }`}
          >
            <Camera size={14} />
            <span className="truncate">Food Scan</span>
          </button>
        </div>
      </nav>

      {/* Main Content Viewport - Independently Scrollable */}
      <main className="flex-1 px-4 py-2.5 overflow-y-auto overscroll-contain space-y-3 pb-28 scrollbar-none">
        {/* ========================================================================= */}
        {/* MODE 1: SURYA NAMASKAR EXERCISE TRACKER (Reference Living Room Video Feed)*/}
        {/* ========================================================================= */}
        {activeTab === "exercise" && (
          <div className="space-y-3">
            {/* Live Camera Viewport in Modern Living Room */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden bg-black border-2 border-white/15 shadow-2xl group">
              {/* Photorealistic High-Definition Live Camera View */}
              <img
                src="/src/assets/images/surya_namaskar_living_room_1790310156144.jpg"
                alt="Person doing Surya Namaskar on a yoga mat in modern living room"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover brightness-[0.95] contrast-[1.02]"
              />

              {/* Camera Grid Lines Overlay */}
              <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 opacity-20">
                <div className="border-r border-b border-white/60" />
                <div className="border-r border-b border-white/60" />
                <div className="border-b border-white/60" />
                <div className="border-r border-b border-white/60" />
                <div className="border-r border-b border-white/60" />
                <div className="border-b border-white/60" />
                <div className="border-r border-b border-white/60" />
                <div className="border-r border-b border-white/60" />
                <div />
              </div>

              {/* Viewport Ambient Vignette */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/60" />

              {/* Top Camera Status Strip */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-[11px] font-mono font-bold text-white">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span>REC ● 60 FPS</span>
                  </div>
                  <div className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-500/40 text-[11px] font-mono text-emerald-400 font-bold">
                    POSE DETECT: ACTIVE
                  </div>
                </div>

                <button
                  onClick={() => setShowSkeleton((prev) => !prev)}
                  className={`pointer-events-auto px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors cursor-pointer ${
                    showSkeleton
                      ? "bg-emerald-500/30 text-emerald-300 border-emerald-500/50"
                      : "bg-black/70 text-white/50 border-white/20"
                  }`}
                >
                  Mesh: {showSkeleton ? "ON" : "OFF"}
                </button>
              </div>

              {/* GLOWING GREEN AI KEYPOINT TRACKING DOTS & CONNECTING LINES (Pose Mesh) */}
              {showSkeleton && (
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none z-10"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <filter id="neon-green-glow" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="0.7" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Connecting Bones */}
                  {livingRoomSkeletonBones.map(([fromId, toId], i) => {
                    const fromNode = livingRoomSkeletonNodes.find((n) => n.id === fromId);
                    const toNode = livingRoomSkeletonNodes.find((n) => n.id === toId);
                    if (!fromNode || !toNode) return null;

                    return (
                      <line
                        key={`bone-${i}`}
                        x1={fromNode.x}
                        y1={fromNode.y}
                        x2={toNode.x}
                        y2={toNode.y}
                        stroke="#22C55E"
                        strokeWidth="0.85"
                        strokeLinecap="round"
                        filter="url(#neon-green-glow)"
                        className="opacity-95"
                      />
                    );
                  })}

                  {/* Keypoint Tracking Nodes */}
                  {livingRoomSkeletonNodes.map((node) => (
                    <g key={node.id}>
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="1.9"
                        fill="none"
                        stroke="#4ADE80"
                        strokeWidth="0.3"
                        className="animate-ping opacity-60"
                        style={{ transformOrigin: `${node.x}% ${node.y}%` }}
                      />
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="1.25"
                        fill="#15803D"
                        stroke="#86EFAC"
                        strokeWidth="0.45"
                        filter="url(#neon-green-glow)"
                      />
                      <circle cx={node.x} cy={node.y} r="0.6" fill="#FFFFFF" />
                    </g>
                  ))}

                  {/* Joint Angle Telemetry */}
                  <g transform="translate(58, 20)">
                    <rect
                      x="0"
                      y="-4.5"
                      width="18"
                      height="6"
                      rx="1.5"
                      fill="#000000"
                      fillOpacity="0.85"
                      stroke="#22C55E"
                      strokeWidth="0.4"
                    />
                    <text
                      x="9"
                      y="-0.5"
                      fill="#4ADE80"
                      fontSize="2.5"
                      fontWeight="bold"
                      textAnchor="middle"
                      fontFamily="monospace"
                    >
                      {simulatedAngle}° EXT
                    </text>
                  </g>
                </svg>
              )}

              {/* LIVE FLOATING HUD METRICS */}
              <div className="absolute top-12 left-3 z-30 flex flex-col gap-2 pointer-events-none">
                {/* Metric 1: CURRENT COUNT: Reps 12/12 */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-black/85 backdrop-blur-md border border-orange-500/70 rounded-2xl px-3.5 py-1.5 flex items-center gap-2.5 shadow-[0_4px_22px_rgba(249,115,22,0.4)]"
                >
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white shadow-xs">
                    <Flame size={16} className="fill-white" />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-orange-400 uppercase tracking-wider block">
                      CURRENT COUNT
                    </span>
                    <span className="font-display font-black text-sm text-white leading-none">
                      Reps {reps}/{targetReps}
                    </span>
                  </div>
                </motion.div>

                {/* Metric 2: Bio-Alignment: Form Accuracy 92% */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.08 }}
                  className="bg-black/85 backdrop-blur-md border border-emerald-500/70 rounded-2xl px-3.5 py-1.5 flex items-center gap-2.5 shadow-[0_4px_22px_rgba(34,197,94,0.4)]"
                >
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white shadow-xs">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider block">
                      Bio-Alignment
                    </span>
                    <span className="font-display font-black text-sm text-white leading-none">
                      Form Accuracy {formAccuracy}%
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Bottom HUD Strip: Current Pose: Hastauttanasana & Quick Rep Count */}
              <div className="absolute bottom-3 left-3 right-3 z-30 flex items-end justify-between">
                <div className="bg-black/80 backdrop-blur-md border border-white/20 rounded-2xl px-3.5 py-2 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <div>
                    <span className="text-[9px] text-white/50 block font-bold uppercase tracking-wider">
                      Current Pose
                    </span>
                    <span className="text-xs font-display font-black text-white">
                      Hastauttanasana (Raised Arms Pose)
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleIncrementRep}
                  className="bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold text-xs px-3.5 py-2 rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer pointer-events-auto border border-orange-400"
                >
                  <Zap size={14} className="fill-white" />
                  <span>Count Rep +1</span>
                </button>
              </div>
            </div>

            {/* Live Floating Telemetry Bar */}
            <div className="grid grid-cols-4 gap-2 bg-[#0E1526] p-3 rounded-2xl border border-white/10 text-center">
              <div>
                <span className="text-[10px] text-white/50 font-medium block">Duration</span>
                <span className="font-display font-black text-sm text-white">
                  {formatTimer(exerciseTimer)}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-white/50 font-medium block">Calories</span>
                <span className="font-display font-black text-sm text-orange-400">
                  {Math.round(reps * 12.5)} kcal
                </span>
              </div>
              <div>
                <span className="text-[10px] text-white/50 font-medium block">Spine Align</span>
                <span className="font-display font-black text-sm text-emerald-400">174° Optimal</span>
              </div>
              <div>
                <span className="text-[10px] text-white/50 font-medium block">Vedic Rhythm</span>
                <span className="font-display font-black text-sm text-amber-300">Surya Agni</span>
              </div>
            </div>

            {/* Exercise Selector Carousel - Highlight Selected Card with Orange Accent Border */}
            <div>
              <div className="flex items-center justify-between mb-2 px-1">
                <div className="flex items-center gap-1.5">
                  <Target size={14} className="text-orange-500" />
                  <h3 className="font-display font-bold text-xs uppercase tracking-wider text-white/80">
                    Select Exercise Routine
                  </h3>
                </div>
                <span className="text-[10px] text-emerald-400 font-semibold">
                  AI Skeleton Active
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {exerciseList.map((ex, idx) => {
                  const isSelected = selectedExIndex === idx;

                  return (
                    <motion.div
                      key={ex.name}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedExIndex(idx);
                        if (ex.name === "Surya Namaskar") {
                          setReps(12);
                          setFormAccuracy(92);
                        }
                      }}
                      className={`p-3.5 rounded-2xl transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                        isSelected
                          ? "bg-gradient-to-br from-[#1C140E] to-[#161B2B] border-2 border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.35)]"
                          : "bg-[#0E1526]/80 border border-white/10 hover:border-white/30"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{ex.icon}</span>
                        {isSelected ? (
                          <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-500 text-white shadow-xs">
                            Selected
                          </span>
                        ) : (
                          <span className="text-[9px] font-medium text-white/40">
                            {ex.reps * ex.perSet} reps
                          </span>
                        )}
                      </div>

                      <div>
                        <h4
                          className={`font-display font-bold text-sm leading-tight ${
                            isSelected ? "text-orange-400 font-extrabold" : "text-white"
                          }`}
                        >
                          {ex.name}
                        </h4>
                        <p className="text-[11px] text-white/60 line-clamp-1 mt-0.5">
                          {ex.desc}
                        </p>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px]">
                        <span className="text-white/50">
                          {ex.name === "Surya Namaskar" ? "Sun Salutation" : "Cardio Agni"}
                        </span>
                        {isSelected && (
                          <span className="font-bold text-emerald-400">92% Acc</span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODE 2: FACE & SKIN ANALYSIS (Real Selfie Scan with Biometric Mesh)       */}
        {/* ========================================================================= */}
        {activeTab === "face" && (
          <div className="space-y-3">
            {/* Primary Camera Viewfinder with Realistic Selfie-Angle Camera Feed */}
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-black border-2 border-emerald-500/40 shadow-2xl">
              <img
                src="/src/assets/images/selfie_face_scan_1790310171514.jpg"
                alt="Realistic selfie camera feed of person facing camera"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover brightness-[0.96]"
              />

              {/* Viewport Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/60 pointer-events-none" />

              {/* DELICATE CYAN & GREEN BIOMETRICS MESH GRID GENTLY OVERLAYING FACIAL FEATURES */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                viewBox="0 0 100 100"
              >
                <defs>
                  <filter id="cyan-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="0.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Facial Oval Scanner Mesh */}
                <ellipse
                  cx="50"
                  cy="45"
                  rx="23"
                  ry="31"
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="0.6"
                  strokeDasharray="2 1.5"
                  filter="url(#cyan-glow)"
                  className="animate-pulse opacity-85"
                />

                {/* Eyebrow & Forehead Scan Polyline */}
                <polyline
                  points="36,31 43,30 50,32 57,30 64,31"
                  fill="none"
                  stroke="#22C55E"
                  strokeWidth="0.5"
                  className="opacity-75"
                />

                {/* Left & Right Eye Landmark Nodes */}
                <circle cx="41.5" cy="37.5" r="1.6" fill="#38BDF8" className="animate-ping opacity-60" />
                <circle cx="41.5" cy="37.5" r="1.0" fill="#22C55E" />
                <circle cx="41.5" cy="37.5" r="0.4" fill="#FFFFFF" />

                <circle cx="58.5" cy="37.5" r="1.6" fill="#38BDF8" className="animate-ping opacity-60" />
                <circle cx="58.5" cy="37.5" r="1.0" fill="#22C55E" />
                <circle cx="58.5" cy="37.5" r="0.4" fill="#FFFFFF" />

                {/* Nose Bridge & Tip */}
                <line x1="50" y1="35" x2="50" y2="48" stroke="#38BDF8" strokeWidth="0.5" />
                <circle cx="50" cy="48" r="0.9" fill="#22C55E" />

                {/* Cheek Hydration Probes with Concentric Rings */}
                <g transform="translate(34, 49)">
                  <circle cx="0" cy="0" r="2.2" fill="none" stroke="#22C55E" strokeWidth="0.4" />
                  <circle cx="0" cy="0" r="1.0" fill="#38BDF8" />
                </g>
                <g transform="translate(66, 49)">
                  <circle cx="0" cy="0" r="2.2" fill="none" stroke="#22C55E" strokeWidth="0.4" />
                  <circle cx="0" cy="0" r="1.0" fill="#38BDF8" />
                </g>

                {/* Lip & Chin Contour */}
                <polyline
                  points="44,57 50,58 56,57 50,61 44,57"
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="0.45"
                />
                <circle cx="50" cy="67" r="0.8" fill="#22C55E" />
              </svg>

              {/* Top Viewfinder Status Banner */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20">
                <div className="flex items-center gap-1.5 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-500/40 text-[11px] font-bold text-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>BIOMETRIC PRAKRITI MESH</span>
                </div>
                <div className="bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-[10px] font-bold text-white">
                  Skin Age: 24 Yrs
                </div>
              </div>

              {/* REAL-TIME FLOATING HUD CARDS OVER CAMERA VIEW */}
              <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-col gap-1.5">
                <div className="grid grid-cols-2 gap-2">
                  {/* Metric 1: Skin Age: 24 Yrs */}
                  <div className="bg-black/85 backdrop-blur-md border border-white/20 rounded-2xl px-3 py-2">
                    <span className="text-[10px] text-white/50 block font-bold uppercase">
                      Skin Age
                    </span>
                    <span className="font-display font-black text-sm text-emerald-400">
                      24 Yrs
                    </span>
                  </div>

                  {/* Metric 2: Dominant Prakriti: Pitta-Vata (88% Balance) */}
                  <div className="bg-black/85 backdrop-blur-md border border-emerald-500/50 rounded-2xl px-3 py-2">
                    <span className="text-[10px] text-emerald-400/80 block font-bold uppercase">
                      Dominant Prakriti
                    </span>
                    <span className="font-display font-black text-xs text-white leading-tight block">
                      Pitta-Vata (88% Balance)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {/* Metric 3: Hydration Score: 72% Optimal */}
                  <div className="bg-black/85 backdrop-blur-md border border-cyan-500/50 rounded-2xl px-3 py-2">
                    <span className="text-[10px] text-cyan-300/80 block font-bold uppercase">
                      Hydration Score
                    </span>
                    <span className="font-display font-black text-sm text-cyan-400">
                      72% Optimal
                    </span>
                  </div>

                  {/* Metric 4: Dark Circles: 45% */}
                  <div className="bg-black/85 backdrop-blur-md border border-orange-500/50 rounded-2xl px-3 py-2">
                    <span className="text-[10px] text-orange-400/80 block font-bold uppercase">
                      Dark Circles
                    </span>
                    <span className="font-display font-black text-sm text-orange-400">
                      45%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ayurvedic Skin Attributes Grid */}
            <div className="grid grid-cols-2 gap-2">
              {faceAnalysisResult.attributes.slice(0, 4).map((attr) => (
                <div
                  key={attr.name}
                  className="bg-[#0E1526] p-3 rounded-2xl border border-white/10"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-display font-bold text-xs text-white">
                      {attr.name}
                    </span>
                    <span className="text-xs font-bold text-emerald-400">{attr.value}%</span>
                  </div>
                  <p className="text-[10px] text-white/50 line-clamp-1">{attr.tip}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODE 3: FOOD SCAN (Fresh Indian Meal with Samosa & Fruit Bowl AR Tags)     */}
        {/* ========================================================================= */}
        {activeTab === "food" && (
          <div className="space-y-3">
            {/* Live Camera View with Real-World Food Detection */}
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-black border-2 border-emerald-500/40 shadow-2xl">
              <img
                src="/src/assets/images/indian_food_table_1790310183742.jpg"
                alt="Freshly prepared Indian meal on a dining table with samosa and fruit bowl"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover brightness-[0.98]"
              />

              {/* Viewport Ambient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50 pointer-events-none" />

              {/* GLOWING GREEN SCANNING FRAME TARGETING THE FOOD ITEMS */}
              <div className="absolute inset-4 rounded-2xl border-2 border-emerald-500/40 pointer-events-none">
                {/* Corner reticles */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald-400" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald-400" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-emerald-400" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-emerald-400" />
              </div>

              {/* Animated Vertical Laser Scan Bar */}
              <motion.div
                animate={{ top: ["8%", "82%", "8%"] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#34d399] pointer-events-none"
              />

              {/* Top Scanner Banner */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20">
                <div className="flex items-center gap-1.5 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-500/50 text-[11px] font-bold text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>NEURAL BHOJAN SCANNER</span>
                </div>
                <div className="bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-[10px] font-bold text-white">
                  2 Items Detected
                </div>
              </div>

              {/* ===================================================================== */}
              {/* FLOATING AR TAG 1 (Over Samosa - Left): "Avoid - Deep Fried, Aggravates Dosha" */}
              {/* ===================================================================== */}
              <div className="absolute top-[28%] left-[6%] z-20 pointer-events-none">
                {/* Bounding Box Around Samosa */}
                <div className="w-36 h-28 border-2 border-amber-500/80 rounded-2xl shadow-[0_0_15px_rgba(245,158,11,0.4)] relative">
                  <div className="absolute -top-7 left-0 bg-black/90 backdrop-blur-md border border-amber-500/90 px-2 py-1 rounded-xl shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                    <AlertTriangle size={13} className="text-amber-400 fill-amber-400" />
                    <div>
                      <span className="text-[10px] font-display font-black text-amber-300">
                        Avoid - Deep Fried, Aggravates Dosha
                      </span>
                    </div>
                  </div>
                  {/* Mini Dosha Warning Pill */}
                  <div className="absolute -bottom-5 left-0 bg-black/80 px-2 py-0.5 rounded-lg border border-red-500/50 text-[9px] font-bold text-red-400">
                    High Pitta & Kapha
                  </div>
                </div>
              </div>

              {/* ===================================================================== */}
              {/* FLOATING AR TAG 2 (Over Fruit Bowl - Right): "Healthy - Rich in Antioxidants & Prana" */}
              {/* ===================================================================== */}
              <div className="absolute top-[28%] right-[6%] z-20 pointer-events-none">
                {/* Bounding Box Around Fruit Bowl */}
                <div className="w-36 h-28 border-2 border-emerald-500/90 rounded-2xl shadow-[0_0_18px_rgba(16,185,129,0.5)] relative">
                  <div className="absolute -top-7 right-0 bg-black/90 backdrop-blur-md border border-emerald-400 px-2 py-1 rounded-xl shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                    <CheckCircle2 size={13} className="text-emerald-400" />
                    <div>
                      <span className="text-[10px] font-display font-black text-emerald-300">
                        Healthy - Rich in Antioxidants & Prana
                      </span>
                    </div>
                  </div>
                  {/* Mini Prana Score Pill */}
                  <div className="absolute -bottom-5 right-0 bg-black/80 px-2 py-0.5 rounded-lg border border-emerald-500/50 text-[9px] font-bold text-emerald-400">
                    Tridoshic Sattva 98%
                  </div>
                </div>
              </div>

              {/* Bottom Camera Action Strip */}
              <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between">
                <div className="bg-black/80 backdrop-blur-md border border-white/20 rounded-2xl px-3 py-1.5">
                  <span className="text-[9px] text-white/50 block font-bold">Ayurvedic Verdict</span>
                  <span className="text-xs font-display font-bold text-emerald-400">
                    Substitute Fried Samosa with Roasted Makhana
                  </span>
                </div>

                <button
                  onClick={() => triggerToast("Nutritional analysis logged to Bhojan journal 🥗")}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-2xl shadow-lg active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer pointer-events-auto"
                >
                  <Sparkles size={14} />
                  <span>Log Meal</span>
                </button>
              </div>
            </div>

            {/* Quick Food Insights List */}
            <div className="space-y-2">
              {foodScanCatalogue.slice(0, 2).map((item) => (
                <div
                  key={item.foodName}
                  className="bg-[#0E1526] p-3 rounded-2xl border border-white/10 flex items-center justify-between"
                >
                  <div>
                    <h5 className="font-display font-bold text-xs text-white">{item.foodName}</h5>
                    <p className="text-[10px] text-white/50 line-clamp-1">{item.reason}</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {item.verdict}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Floating Action Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-[#161B2B]/95 text-white border border-emerald-500/50 px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 backdrop-blur-md whitespace-nowrap"
          >
            <Sparkles size={16} className="text-emerald-400" />
            <span className="text-xs font-bold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
