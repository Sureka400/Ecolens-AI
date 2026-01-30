import { motion } from "motion/react";
import { useState } from "react";
import { Layers, Droplets, Wind, Trash2 } from "lucide-react";
import { Card } from "@/app/components/ui/card";

export function MapIntelligence() {
  const [activeLayer, setActiveLayer] = useState("air");

  const layers = [
    { id: "air", name: "Air Quality", icon: Wind, color: "#FF5252" },
    { id: "water", name: "Water Safety", icon: Droplets, color: "#00B0FF" },
    { id: "waste", name: "Waste Density", icon: Trash2, color: "#FFC107" },
  ];

  const pollutionZones = [
    { x: 20, y: 30, severity: "high", tooltip: "High PM2.5 detected — prolonged exposure increases respiratory risk" },
    { x: 60, y: 45, severity: "moderate", tooltip: "Moderate pollution levels — safe for most individuals" },
    { x: 35, y: 70, severity: "high", tooltip: "Industrial emissions detected — avoid outdoor activities" },
    { x: 75, y: 25, severity: "low", tooltip: "Good air quality — safe for all outdoor activities" },
  ];

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Map Intelligence Module</h2>
          <p className="text-gray-400 text-lg">Real-time environmental risk visualization</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-8 bg-[#131A22] border-[#00E676]/20">
            {/* Layer Controls */}
            <div className="flex items-center gap-4 mb-6 flex-wrap">
              <div className="flex items-center gap-2 text-gray-400">
                <Layers className="w-5 h-5" />
                <span className="text-sm font-medium">Map Layers:</span>
              </div>
              {layers.map((layer) => (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                    activeLayer === layer.id
                      ? "bg-[#0B0F14] border-current shadow-lg"
                      : "bg-[#0B0F14]/50 border-gray-600/30 hover:border-gray-500"
                  }`}
                  style={{
                    color: activeLayer === layer.id ? layer.color : "#9CA3AF",
                  }}
                >
                  <layer.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{layer.name}</span>
                </button>
              ))}
            </div>

            {/* Map Visualization */}
            <div className="relative w-full aspect-video bg-[#0B0F14] rounded-xl overflow-hidden border border-gray-700/30">
              {/* Gradient background representing map */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
              
              {/* Grid overlay */}
              <svg className="absolute inset-0 w-full h-full opacity-10">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>

              {/* Heatmap gradient overlay */}
              <motion.div
                key={activeLayer}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at 35% 45%, ${
                    layers.find((l) => l.id === activeLayer)?.color
                  }40 0%, transparent 50%)`,
                }}
              />

              {/* Pollution zones */}
              {pollutionZones.map((zone, i) => {
                const severityColors = {
                  high: "#FF5252",
                  moderate: "#FFC107",
                  low: "#00E676",
                };

                return (
                  <motion.div
                    key={i}
                    className="absolute group cursor-pointer"
                    style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {/* Pulsing zone */}
                    <motion.div
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    >
                      <div
                        className="w-16 h-16 rounded-full"
                        style={{
                          backgroundColor: severityColors[zone.severity],
                          filter: `blur(8px)`,
                        }}
                      />
                    </motion.div>

                    {/* Center dot */}
                    <div
                      className="w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2"
                      style={{
                        backgroundColor: severityColors[zone.severity],
                        boxShadow: `0 0 10px ${severityColors[zone.severity]}`,
                      }}
                    />

                    {/* Tooltip */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      <div className="bg-[#131A22] border border-gray-600/30 rounded-lg px-4 py-3 shadow-xl min-w-[250px]">
                        <p className="text-sm text-gray-300">{zone.tooltip}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: severityColors[zone.severity] }}
                          />
                          <span className="text-xs text-gray-400 capitalize">{zone.severity} Risk</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Animated flow lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <motion.path
                    key={i}
                    d={`M ${20 + i * 15} 0 Q ${30 + i * 20} 50 ${25 + i * 15} 100`}
                    stroke={layers.find((l) => l.id === activeLayer)?.color}
                    strokeWidth="1"
                    fill="none"
                    opacity="0.2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </svg>
            </div>

            <p className="text-center text-sm text-gray-500 mt-4">
              Hover over zones for detailed insights • Data updates in real-time
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
