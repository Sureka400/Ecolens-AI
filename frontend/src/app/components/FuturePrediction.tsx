import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { TrendingUp, AlertTriangle } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface ForecastItem {
  day: string;
  current: number;
  withAction: number;
}

export function FuturePrediction({ lat = 51.5074, lon = -0.1278 }: { lat?: number, lon?: number }) {
  const [predictionData, setPredictionData] = useState<ForecastItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/forecast?lat=${lat}&lon=${lon}`)
      .then((res) => res.json())
      .then((data) => {
        setPredictionData(data.forecast);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching forecast:", err);
        setLoading(false);
      });
  }, [lat, lon]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#131A22] border border-[#00E676]/20 p-4 rounded-lg shadow-xl">
          <p className="text-white font-semibold mb-2">{payload[0].payload.day}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: <span className="font-semibold">{entry.value}</span> AQI
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-[#0B0F14] to-[#000000]">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#131A22] border border-[#00B0FF]/20 rounded-full mb-6">
            <TrendingUp className="w-4 h-4 text-[#00B0FF]" />
            <span className="text-sm text-[#00B0FF] tracking-wide">Predictive AI</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">7-Day Pollution Forecast</h2>
          <p className="text-gray-400 text-lg">
            Prediction powered by historical + weather data
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Prediction Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-6 bg-[#131A22] border-[#00E676]/20 relative min-h-[400px]">
              {loading && (
                <div className="absolute inset-0 flex justify-center items-center bg-[#131A22]/50 z-10 rounded-lg">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00E676]"></div>
                </div>
              )}
              <h3 className="text-xl font-semibold text-white mb-6">Pollution Trajectory</h3>
              
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={predictionData}>
                  <defs>
                    <linearGradient id="currentGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF5252" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#FF5252" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="day" stroke="#9CA3AF" style={{ fontSize: 12 }} />
                  <YAxis stroke="#9CA3AF" style={{ fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="current"
                    stroke="#FF5252"
                    strokeWidth={2}
                    fill="url(#currentGradient)"
                    name="Without Action"
                  />
                  {/* Risk threshold line */}
                  <Line
                    type="monotone"
                    dataKey={() => 80}
                    stroke="#FFC107"
                    strokeWidth={1}
                    strokeDasharray="5 5"
                    dot={false}
                    name="Risk Threshold"
                  />
                </AreaChart>
              </ResponsiveContainer>

              <div className="mt-4 flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#FF5252] rounded-full" />
                  <span className="text-gray-400">Projected Trend</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-[#FFC107]" />
                  <span className="text-gray-400">Risk Threshold</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Impact Comparison */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-6 bg-[#131A22] border-[#00E676]/20 relative min-h-[400px]">
              {loading && (
                <div className="absolute inset-0 flex justify-center items-center bg-[#131A22]/50 z-10 rounded-lg">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00E676]"></div>
                </div>
              )}
              <h3 className="text-xl font-semibold text-white mb-6">Impact of Action</h3>
              
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={predictionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="day" stroke="#9CA3AF" style={{ fontSize: 12 }} />
                  <YAxis stroke="#9CA3AF" style={{ fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="current"
                    stroke="#FF5252"
                    strokeWidth={2}
                    dot={{ fill: "#FF5252", r: 4 }}
                    name="Without Action"
                  />
                  <Line
                    type="monotone"
                    dataKey="withAction"
                    stroke="#00E676"
                    strokeWidth={2}
                    dot={{ fill: "#00E676", r: 4 }}
                    name="With Action"
                  />
                </LineChart>
              </ResponsiveContainer>

              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3 p-3 bg-[#00E676]/10 rounded-lg border border-[#00E676]/20">
                  <div className="p-1 bg-[#00E676]/20 rounded">
                    <TrendingUp className="w-4 h-4 text-[#00E676]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#00E676]">Potential Improvement</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Following recommendations could reduce pollution by up to 47% in 7 days
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-[#FF5252]/10 rounded-lg border border-[#FF5252]/20">
                  <div className="p-1 bg-[#FF5252]/20 rounded">
                    <AlertTriangle className="w-4 h-4 text-[#FF5252]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#FF5252]">Without Action</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Pollution levels expected to exceed safe limits by Day 4
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Data source note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-xs text-gray-500 mt-8"
        >
          Predictions based on historical pollution data, weather forecasts, and traffic patterns
        </motion.p>
      </div>
    </section>
  );
}
