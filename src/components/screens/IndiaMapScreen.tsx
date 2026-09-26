import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  MapPin,
  Sun,
  Droplets,
  Cloud,
  CloudRain,
  Smile,
  Salad,
  Sparkles,
  Compass,
  Thermometer,
  ShieldCheck,
  ArrowRight,
  Maximize2,
  Layers,
  Globe2,
} from "lucide-react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useMap,
  Pin,
} from "@vis.gl/react-google-maps";
import { regionalClimateData } from "../../data";
import { CardGroup, CardItem } from "../Card";

interface IndiaMapScreenProps {
  onNavigate: (screen: string) => void;
}

// Google Maps API Key from environment or provisioned demo key
const GOOGLE_MAPS_API_KEY =
  import.meta.env.VITE_GOOGLE_MAPS_API_KEY ||
  "AIzaSyClx3gF7e8pqqe91wwnpz1pSaR-OIKDiPc";

// Real geographic Lat/Lng coordinates for each Indian state
const stateGeoLocations: Record<
  string,
  {
    lat: number;
    lng: number;
    label: string;
    doshaImpact: string;
    mapPercent: { x: number; y: number };
  }
> = {
  Delhi: {
    lat: 28.6139,
    lng: 77.209,
    label: "Delhi NCR",
    doshaImpact: "Vata-Pitta balance required due to dry autumn climate",
    mapPercent: { x: 40, y: 33 },
  },
  Rajasthan: {
    lat: 26.9124,
    lng: 75.7873,
    label: "Rajasthan",
    doshaImpact: "Pitta pacification with cooling bajra and cow ghee",
    mapPercent: { x: 29, y: 40 },
  },
  Gujarat: {
    lat: 23.0225,
    lng: 72.5714,
    label: "Gujarat",
    doshaImpact: "Digestive Agni boost with mild khichdi & spiced kadhi",
    mapPercent: { x: 23, y: 52 },
  },
  Maharashtra: {
    lat: 19.076,
    lng: 72.8777,
    label: "Maharashtra",
    doshaImpact: "Tridoshic sattvic diet with seasonal fruits and poha",
    mapPercent: { x: 35, y: 61 },
  },
  "West Bengal": {
    lat: 22.5726,
    lng: 88.3639,
    label: "West Bengal",
    doshaImpact: "Kapha balancing with warm moong khichdi & ginger tea",
    mapPercent: { x: 69, y: 48 },
  },
  Karnataka: {
    lat: 12.9716,
    lng: 77.5946,
    label: "Karnataka",
    doshaImpact: "Vata grounding with calcium-rich ragi mudde & spiced rasam",
    mapPercent: { x: 38, y: 74 },
  },
  "Tamil Nadu": {
    lat: 13.0827,
    lng: 80.2707,
    label: "Tamil Nadu",
    doshaImpact: "Pitta cooling with coconut water, herbal rasam & curd rice",
    mapPercent: { x: 45, y: 84 },
  },
  Kerala: {
    lat: 9.9312,
    lng: 76.2673,
    label: "Kerala",
    doshaImpact: "Sattvic recovery with authentic rice kanji & herbal decoctions",
    mapPercent: { x: 36, y: 88 },
  },
};

const weatherIcons: Record<string, React.ComponentType<any>> = {
  Sunny: Sun,
  Humid: Droplets,
  Cloudy: Cloud,
  Rainy: CloudRain,
  Pleasant: Smile,
};

const INDIA_CENTER = { lat: 21.7679, lng: 78.8718 };

/**
 * Controller component inside Map context to pan and zoom on state selection
 */
function MapCameraHandler({
  selectedCoords,
}: {
  selectedCoords: { lat: number; lng: number } | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    if (selectedCoords) {
      map.panTo(selectedCoords);
      map.setZoom(6);
    }
  }, [map, selectedCoords]);

  return null;
}

export function IndiaMapScreen({ onNavigate }: IndiaMapScreenProps) {
  const [selectedState, setSelectedState] = useState<string>("Maharashtra");
  const [mapMode, setMapMode] = useState<"google" | "vedic">("google");
  const [showInfoWindow, setShowInfoWindow] = useState(true);

  const selectedInfo = regionalClimateData.find((d) => d.state === selectedState);
  const selectedGeo = stateGeoLocations[selectedState] ?? stateGeoLocations.Maharashtra;

  const handleSelectState = useCallback((stateName: string) => {
    setSelectedState(stateName);
    setShowInfoWindow(true);
  }, []);

  const handleResetView = () => {
    setSelectedState("Maharashtra");
  };

  return (
    <div className="min-h-screen bg-cream-300 pb-28">
      {/* Top Header */}
      <header className="px-6 pt-12 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate("home")}
            className="w-10 h-10 rounded-xl bg-cream-100 flex items-center justify-center shadow-soft cursor-pointer hover:bg-cream-200 transition-colors"
            title="Back to Home"
          >
            <ChevronLeft size={20} className="text-saffron-600" />
          </button>
          <div>
            <div className="flex items-center gap-1.5">
              <Compass size={16} className="text-saffron-600" />
              <h1 className="font-display font-extrabold text-2xl text-charcoal-900 leading-tight">
                India Vedic Map
              </h1>
            </div>
            <p className="text-xs text-charcoal-500">
              Desh & Ritu (Climate & Regional Food Wisdom)
            </p>
          </div>
        </div>

        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-saffron-100 text-saffron-800 border border-saffron-200">
          Sharad Ritu
        </span>
      </header>

      {/* Map Mode Selector Bar */}
      <div className="px-6 mb-3 flex items-center justify-between">
        <div className="flex rounded-xl bg-cream-200 p-0.5 border border-cream-400">
          <button
            onClick={() => setMapMode("google")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              mapMode === "google"
                ? "bg-saffron-600 text-white shadow-soft"
                : "text-charcoal-600 hover:text-charcoal-900"
            }`}
          >
            <Globe2 size={13} />
            <span>Google Maps</span>
          </button>
          <button
            onClick={() => setMapMode("vedic")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              mapMode === "vedic"
                ? "bg-saffron-600 text-white shadow-soft"
                : "text-charcoal-600 hover:text-charcoal-900"
            }`}
          >
            <Layers size={13} />
            <span>Vedic Relief</span>
          </button>
        </div>

        <button
          onClick={handleResetView}
          className="text-[11px] font-bold text-saffron-700 hover:text-saffron-800 flex items-center gap-1 cursor-pointer bg-cream-100 px-2.5 py-1 rounded-lg border border-cream-400"
        >
          <Maximize2 size={11} />
          <span>Center India</span>
        </button>
      </div>

      {/* Main Map Container */}
      <div className="px-6 mb-4">
        <div className="card p-2.5 relative overflow-hidden bg-cream-100 border border-cream-400 shadow-soft">
          {/* Status strip */}
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-[11px] font-bold text-charcoal-700 flex items-center gap-1">
              <MapPin size={13} className="text-saffron-600" />
              <span>Tap any state marker on the map</span>
            </span>
            <span className="text-[10px] font-semibold text-charcoal-500 font-mono">
              BHARAT • {regionalClimateData.length} REGIONS
            </span>
          </div>

          {/* Interactive Map Viewport with Explicit Height */}
          <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] rounded-2xl overflow-hidden border border-cream-300 bg-cream-200/50 shadow-inner">
            {mapMode === "google" ? (
              <APIProvider
                apiKey={GOOGLE_MAPS_API_KEY}
                solutionChannel="GMP_visgl_reactgooglemaps_v1"
              >
                <div className="w-full h-full relative">
                  <Map
                    defaultCenter={INDIA_CENTER}
                    defaultZoom={4.6}
                    mapId="DEMO_MAP_ID"
                    internalUsageAttributionIds={["gmp_mcp_codeassist_v1_aistudio"]}
                    gestureHandling="greedy"
                    fullscreenControl={false}
                    streetViewControl={false}
                    mapTypeControl={true}
                    style={{ width: "100%", height: "100%" }}
                  >
                    <MapCameraHandler
                      selectedCoords={
                        selectedGeo ? { lat: selectedGeo.lat, lng: selectedGeo.lng } : null
                      }
                    />

                    {/* Advanced Markers for Indian States */}
                    {Object.entries(stateGeoLocations).map(([stateName, geo]) => {
                      const isSelected = selectedState === stateName;

                      return (
                        <AdvancedMarker
                          key={stateName}
                          position={{ lat: geo.lat, lng: geo.lng }}
                          onClick={() => handleSelectState(stateName)}
                          title={geo.label}
                        >
                          <div className="relative cursor-pointer group -translate-y-1">
                            {isSelected && (
                              <span className="absolute -inset-2 rounded-full bg-saffron-500/40 animate-ping" />
                            )}
                            <Pin
                              background={isSelected ? "#EA580C" : "#D97706"}
                              borderColor={isSelected ? "#7C2D12" : "#92400E"}
                              glyphColor="#FFFFFF"
                              scale={isSelected ? 1.25 : 1.0}
                            />
                            <div
                              className={`absolute left-1/2 -translate-x-1/2 top-full mt-0.5 px-1.5 py-0.5 rounded text-[9px] font-bold whitespace-nowrap shadow-md pointer-events-none ${
                                isSelected
                                  ? "bg-charcoal-900 text-white z-20"
                                  : "bg-white/90 text-charcoal-700"
                              }`}
                            >
                              {stateName}
                            </div>
                          </div>
                        </AdvancedMarker>
                      );
                    })}

                    {/* InfoWindow for Selected State on Google Map */}
                    {showInfoWindow && selectedInfo && selectedGeo && (
                      <InfoWindow
                        position={{ lat: selectedGeo.lat, lng: selectedGeo.lng }}
                        onCloseClick={() => setShowInfoWindow(false)}
                        pixelOffset={[0, -32]}
                        maxWidth={220}
                      >
                        <div className="p-1 text-charcoal-900 font-sans">
                          <div className="flex items-center justify-between gap-2 border-b border-cream-300 pb-1 mb-1">
                            <span className="font-display font-extrabold text-xs text-charcoal-900">
                              {selectedGeo.label}
                            </span>
                            <span className="font-display font-bold text-xs text-saffron-700">
                              {selectedInfo.temp}°C
                            </span>
                          </div>
                          <p className="text-[10px] text-charcoal-600 mb-1 leading-tight">
                            {selectedInfo.condition} • {selectedInfo.ritu}
                          </p>
                          <div className="text-[10px] text-sage-800 font-semibold bg-sage-50 p-1 rounded">
                            {selectedInfo.recommendedFoods.slice(0, 2).join(" • ")}
                          </div>
                        </div>
                      </InfoWindow>
                    )}
                  </Map>
                </div>
              </APIProvider>
            ) : (
              /* Vedic Relief Cartographic View */
              <div className="relative w-full h-full">
                <img
                  src="/src/assets/images/india_geographical_map_1790358883639.jpg"
                  alt="Authentic geographical map of India"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover select-none"
                />

                {/* Interactive Pins on Vedic Map */}
                {Object.entries(stateGeoLocations).map(([stateName, geo]) => {
                  const isSelected = selectedState === stateName;
                  return (
                    <div
                      key={stateName}
                      onClick={() => handleSelectState(stateName)}
                      className="absolute cursor-pointer -translate-x-1/2 -translate-y-1/2 z-20"
                      style={{ left: `${geo.mapPercent.x}%`, top: `${geo.mapPercent.y}%` }}
                    >
                      {isSelected && (
                        <>
                          <span className="absolute -inset-2 rounded-full bg-saffron-500/40 animate-ping" />
                          <span className="absolute -inset-4 rounded-full border border-saffron-500/60 animate-pulse" />
                        </>
                      )}
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform shadow-md ${
                          isSelected
                            ? "bg-gradient-to-br from-saffron-500 to-amber-600 text-white scale-125 ring-2 ring-white"
                            : "bg-white/95 text-charcoal-700 hover:scale-110 ring-1 ring-charcoal-300"
                        }`}
                      >
                        <MapPin size={isSelected ? 13 : 11} className={isSelected ? "fill-white" : ""} />
                      </div>
                      <div
                        className={`absolute left-1/2 -translate-x-1/2 -bottom-5 px-1.5 py-0.5 rounded-md text-[9px] font-bold tracking-tight whitespace-nowrap shadow-xs pointer-events-none ${
                          isSelected
                            ? "bg-charcoal-900 text-white scale-105 z-30"
                            : "bg-white/90 text-charcoal-700"
                        }`}
                      >
                        {stateName}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Floating Glassmorphic HUD Badge for Selected State */}
            {selectedInfo && (
              <motion.div
                key={selectedState}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-2.5 left-2.5 right-2.5 bg-white/95 backdrop-blur-md rounded-xl p-2.5 border border-cream-300 shadow-md flex items-center justify-between z-30 pointer-events-none"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-saffron-100 flex items-center justify-center text-saffron-700 flex-shrink-0">
                    {(() => {
                      const Icon = weatherIcons[selectedInfo.condition] ?? Sun;
                      return <Icon size={18} />;
                    })()}
                  </div>
                  <div>
                    <span className="font-display font-bold text-xs text-charcoal-900 block leading-tight">
                      {selectedGeo.label}
                    </span>
                    <span className="text-[10px] text-charcoal-500">
                      {selectedInfo.condition} • {selectedInfo.ritu}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-display font-extrabold text-base text-charcoal-900 leading-none block">
                    {selectedInfo.temp}°C
                  </span>
                  <span className="text-[9px] text-sage-700 font-bold">Ayurvedic Match</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* State Filter Quick Selector Pills */}
      <div className="px-6 mb-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {regionalClimateData.map((d) => {
            const isSelected = selectedState === d.state;
            return (
              <button
                key={d.state}
                onClick={() => handleSelectState(d.state)}
                className={`pill flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors text-xs py-2 px-3 ${
                  isSelected
                    ? "bg-saffron-600 text-white shadow-soft font-bold"
                    : "bg-cream-100 text-charcoal-600 hover:bg-cream-200"
                }`}
              >
                <MapPin size={12} />
                <span>{d.state}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detailed Regional Wisdom & Recommended Bhojan */}
      <AnimatePresence mode="wait">
        {selectedInfo ? (
          <motion.div
            key={selectedInfo.state}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ ease: [0.22, 1, 0.36, 1] }}
            className="px-6 space-y-3"
          >
            {/* Climate & Dosha Card */}
            <div className="card p-4 bg-cream-100 border border-cream-300 shadow-soft">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-display font-extrabold text-lg text-charcoal-900 leading-tight">
                    {selectedInfo.state} Regional Ritu
                  </h3>
                  <p className="text-xs text-charcoal-500 font-medium">
                    Season: {selectedInfo.ritu}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 bg-cream-200/80 px-2.5 py-1 rounded-xl border border-cream-300">
                  <Thermometer size={14} className="text-saffron-600" />
                  <span className="font-display font-bold text-sm text-charcoal-900">
                    {selectedInfo.temp}°C
                  </span>
                </div>
              </div>

              {/* Ayurvedic Dosha Guidance Pill */}
              <div className="p-2.5 rounded-xl bg-saffron-50 border border-saffron-200/80 mb-3 flex items-start gap-2">
                <ShieldCheck size={16} className="text-saffron-700 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-bold text-saffron-800 uppercase tracking-wide block">
                    Ayurvedic Seasonal Guidance
                  </span>
                  <p className="text-xs text-charcoal-700 leading-relaxed mt-0.5">
                    {selectedGeo.doshaImpact}
                  </p>
                </div>
              </div>

              {/* Recommended Indigenous Foods */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Salad size={15} className="text-sage-700" />
                    <h4 className="text-xs font-display font-bold text-charcoal-800 uppercase tracking-wider">
                      Indigenous Foods for {selectedInfo.state}
                    </h4>
                  </div>
                  <span className="text-[10px] text-sage-700 font-semibold">Native Harvest</span>
                </div>

                <CardGroup className="grid grid-cols-2 gap-2">
                  {selectedInfo.recommendedFoods.map((food) => (
                    <CardItem key={food}>
                      <div className="bg-white/90 p-2.5 rounded-xl border border-cream-300 shadow-xs flex items-center gap-2 hover:border-sage-400 transition-colors">
                        <div className="w-7 h-7 rounded-lg bg-sage-100 flex items-center justify-center flex-shrink-0 text-sage-700">
                          <Sparkles size={14} />
                        </div>
                        <span className="font-semibold text-xs text-charcoal-800 leading-tight">
                          {food}
                        </span>
                      </div>
                    </CardItem>
                  ))}
                </CardGroup>
              </div>

              {/* CTA to Bhojan Diet Planner */}
              <button
                onClick={() => onNavigate("diet")}
                className="mt-4 w-full py-2.5 px-4 rounded-xl bg-saffron-600 hover:bg-saffron-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-soft"
              >
                <span>View Full Bhojan Meal Plan</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="px-6 text-center py-6">
            <p className="text-charcoal-400 text-sm">
              Tap a state pinpoint on the map to explore regional climate and native food wisdom.
            </p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
