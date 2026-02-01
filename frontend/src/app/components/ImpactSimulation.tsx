import { motion, AnimatePresence } from "motion/react";
import { ToggleLeft, ToggleRight, TrendingDown } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface SimulationData {
  currentData: { category: string, value: number }[];
  improvedData: { category: string, value: number }[];
  reductionPercentages: { [key: string]: number };
}

export function ImpactSimulation({ lat = 51.5074, lon = -0.1278 }: { lat?: number, lon?: number }) {
  const [actionsEnabled, setActionsEnabled] = useState(false);
  const [data, setData] = useState<SimulationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8000/api/impact-simulation?lat=${lat}&lon=${lon}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching simulation data:", err);
        setLoading(false);
      });
  }, [lat, lon]);

  if (loading || !data) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00E676]"></div>
      </div>
    );
  }

  const { currentData, improvedData, reductionPercentages } = data;
  const displayData = actionsEnabled ? improvedData : currentData;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#131A22] border border-[#00E676]/20 p-3 rounded-lg shadow-xl">
          <p className="text-white font-semibold text-sm">{payload[0].payload.category}</p>
          <p className="text-sm text-gray-400">
            Risk Index: <span className="font-semibold text-[#00E676]">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-[#000000] to-[#0B0F14]">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Impact Simulation</h2>
          <p className="text-gray-400 text-lg">See the power of collective action</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-8 bg-[#131A22] border-[#00E676]/20">
            {/* Toggle Control */}
            <div className="flex items-center justify-center mb-8">
              <div className="inline-flex items-center gap-6 p-2 bg-[#0B0F14] rounded-full border border-gray-700/30">
                <span
                  className={`px-6 py-2 rounded-full transition-all ${
                    !actionsEnabled
                      ? "bg-[#FF5252]/20 text-[#FF5252] font-semibold"
                      : "text-gray-500"
                  }`}
                >
                  Current Trajectory
                </span>

                <button
                  onClick={() => setActionsEnabled(!actionsEnabled)}
                  className="relative p-2 hover:bg-gray-700/30 rounded-full transition-all"
                  aria-label="Toggle simulation"
                >
                  <motion.div
                    animate={{ rotate: actionsEnabled ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {actionsEnabled ? (
                      <ToggleRight className="w-12 h-12 text-[#00E676]" />
                    ) : (
                      <ToggleLeft className="w-12 h-12 text-gray-500" />
                    )}
                  </motion.div>
                </button>

                <span
                  className={`px-6 py-2 rounded-full transition-all ${
                    actionsEnabled
                      ? "bg-[#00E676]/20 text-[#00E676] font-semibold"
                      : "text-gray-500"
                  }`}
                >
                  With Actions
                </span>
              </div>
            </div>

            {/* Chart */}
            <div className="mb-8">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={displayData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="category" stroke="#9CA3AF" style={{ fontSize: 14 }} />
                  <YAxis stroke="#9CA3AF" style={{ fontSize: 14 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="value"
                    fill={actionsEnabled ? "#00E676" : "#FF5252"}
                    radius={[8, 8, 0, 0]}
                  >
                    <motion.g
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Impact Metrics */}
            <AnimatePresence mode="wait">
              <motion.div
                key={actionsEnabled ? "enabled" : "disabled"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid md:grid-cols-3 gap-4"
              >
                {actionsEnabled ? (
                  <>
                    {Object.entries(reductionPercentages).map(([category, reduction]) => (
                      <div key={category} className="p-4 bg-[#00E676]/10 rounded-lg border border-[#00E676]/20">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingDown className="w-5 h-5 text-[#00E676]" />
                          <p className="text-sm font-medium text-[#00E676]">{category}</p>
                        </div>
                        <p className="text-2xl font-bold text-[#00E676]">-{reduction}%</p>
                        <p className="text-xs text-gray-400 mt-1">Risk reduction</p>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <div className="p-4 bg-[#FF5252]/10 rounded-lg border border-[#FF5252]/20">
                      <p className="text-sm font-medium text-[#FF5252] mb-2">Current Status</p>
                      <p className="text-2xl font-bold text-[#FF5252]">High Risk</p>
                      <p className="text-xs text-gray-400 mt-1">Without intervention</p>
                    </div>

                    <div className="p-4 bg-[#FFC107]/10 rounded-lg border border-[#FFC107]/20">
                      <p className="text-sm font-medium text-[#FFC107] mb-2">Health Impact</p>
                      <p className="text-2xl font-bold text-[#FFC107]">Moderate</p>
                      <p className="text-xs text-gray-400 mt-1">Vulnerable groups affected</p>
                    </div>

                    <div className="p-4 bg-[#FF5252]/10 rounded-lg border border-[#FF5252]/20">
                      <p className="text-sm font-medium text-[#FF5252] mb-2">Trend</p>
                      <p className="text-2xl font-bold text-[#FF5252]">Worsening</p>
                      <p className="text-xs text-gray-400 mt-1">Next 7 days</p>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Message */}
            <motion.div
              key={actionsEnabled ? "action-message" : "current-message"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-center"
            >
              <p className={`text-lg font-semibold ${actionsEnabled ? "text-[#00E676]" : "text-gray-400"}`}>
                {actionsEnabled
                  ? "Small actions, collective impact — together we can make a difference"
                  : "Toggle to see how recommended actions can transform environmental health"}
              </p>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
