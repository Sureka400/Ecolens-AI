import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Brain, AlertCircle, Users, Leaf } from "lucide-react";
import { Card } from "@/app/components/ui/card";

interface InsightAction {
  title: string;
  why: string;
  impact: string;
  difficulty: string;
  color: string;
}

interface InsightData {
  summary: string;
  action_plan: InsightAction[];
  confidence_score: number;
}

export function AIImpactTranslation({ lat = 51.5074, lon = -0.1278 }: { lat?: number, lon?: number }) {
  const [data, setData] = useState<InsightData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8000/api/insights?lat=${lat}&lon=${lon}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching AI insights:", err);
        setLoading(false);
      });
  }, [lat, lon]);

  const defaultInsights = [
    {
      icon: AlertCircle,
      category: "Action Step",
      color: "#FF5252",
    },
    {
      icon: Users,
      category: "Recommendation",
      color: "#FFC107",
    },
    {
      icon: Leaf,
      category: "Eco-Strategy",
      color: "#00E676",
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#131A22] border border-[#00E676]/20 rounded-full mb-6">
            <Brain className="w-4 h-4 text-[#00E676]" />
            <span className="text-sm text-[#00E676] tracking-wide">AI-Powered Insights</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">What This Means for Humans & Nature</h2>
          <p className="text-gray-400 text-lg">
            AI-translated environmental data into actionable understanding
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-8 bg-gradient-to-br from-[#131A22] to-[#0B0F14] border-[#00E676]/30 shadow-2xl relative min-h-[400px]">
            {loading && (
              <div className="absolute inset-0 flex justify-center items-center bg-[#131A22]/50 z-10 rounded-lg">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00E676]"></div>
              </div>
            )}
            
            {/* Main AI Insight */}
            <div className="mb-8 p-6 bg-[#0B0F14] rounded-xl border border-[#00E676]/20">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#00E676]/10 rounded-lg border border-[#00E676]/30">
                  <Brain className="w-6 h-6 text-[#00E676]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-2">Primary AI Assessment</h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {data?.summary || "Analyzing local environmental patterns to generate a personalized assessment..."}
                  </p>
                </div>
              </div>
            </div>

            {/* Detailed Insights */}
            <div className="space-y-4">
              {data?.action_plan && data.action_plan.length > 0 ? (
                data.action_plan.map((action, index) => {
                  const config = defaultInsights[index % defaultInsights.length];
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="flex items-start gap-4 p-5 bg-[#0B0F14]/50 rounded-lg border border-gray-700/30 hover:border-gray-600/50 transition-colors"
                    >
                      <div
                        className="p-2 rounded-lg"
                        style={{
                          backgroundColor: `${action.color}10`,
                          border: `1px solid ${action.color}30`,
                        }}
                      >
                        <config.icon className="w-5 h-5" style={{ color: action.color }} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium mb-1" style={{ color: action.color }}>
                          {action.title}
                        </p>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {action.why} • <span className="text-[#00E676]">{action.impact}</span>
                        </p>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="text-center py-10 text-gray-500 italic">
                  Waiting for environmental data to generate insights...
                </div>
              )}
            </div>

            {/* Trust indicators */}
            <div className="mt-8 pt-6 border-t border-gray-700/30">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#00E676] rounded-full animate-pulse" />
                  <span>Analysis updated just now</span>
                </div>
                <span>Powered by environmental AI • {(data?.confidence_score || 0.94) * 100}% accuracy</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Ethical note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-sm text-gray-500 mt-8"
        >
          AI predictions are based on historical data, weather patterns, and real-time sensors.
          <br />
          Always consult local authorities for emergency decisions.
        </motion.p>
      </div>
    </section>
  );
}
