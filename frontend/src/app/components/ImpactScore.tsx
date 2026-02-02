import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Award, Heart, Leaf, Users } from "lucide-react";
import { Card } from "@/app/components/ui/card";

interface ScoreComponent {
  label: string;
  value: number;
  color: string;
  description: string;
}

interface ImpactScoreData {
  score: number;
  maxScore: number;
  components: ScoreComponent[];
}

export function ImpactScore({ lat = 51.5074, lon = -0.1278 }: { lat?: number, lon?: number }) {
  const [data, setData] = useState<ImpactScoreData | null>(null);
  const [loading, setLoading] = useState(true);

  const iconMap: { [key: string]: React.ElementType } = {
    "Health Impact": Heart,
    "Environmental Recovery": Leaf,
    "Community Benefit": Users,
  };

  useEffect(() => {
    setLoading(true);
    fetch(`/api/impact-score?lat=${lat}&lon=${lon}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching impact score:", err);
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

  const { score, maxScore, components } = data;

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
            <Award className="w-4 h-4 text-[#00E676]" />
            <span className="text-sm text-[#00E676] tracking-wide">Impact Measurement</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Your Impact Score</h2>
          <p className="text-gray-400 text-lg">Measuring real environmental change potential</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-8 bg-gradient-to-br from-[#131A22] to-[#0B0F14] border-[#00E676]/30">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Score Circle */}
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-64 h-64">
                  {/* Outer glow */}
                  <div className="absolute inset-0 bg-[#00E676]/20 rounded-full blur-2xl" />
                  
                  {/* SVG Circle */}
                  <svg className="w-full h-full -rotate-90 relative z-10">
                    {/* Background circle */}
                    <circle
                      cx="128"
                      cy="128"
                      r="112"
                      fill="none"
                      stroke="#0B0F14"
                      strokeWidth="16"
                    />
                    {/* Progress circle */}
                    <motion.circle
                      cx="128"
                      cy="128"
                      r="112"
                      fill="none"
                      stroke="#00E676"
                      strokeWidth="16"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 112}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 112 }}
                      whileInView={{
                        strokeDashoffset: 2 * Math.PI * 112 * (1 - score / maxScore),
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      style={{
                        filter: "drop-shadow(0 0 12px #00E67680)",
                      }}
                    />
                  </svg>

                  {/* Score Display */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.p
                      className="text-7xl font-bold text-[#00E676]"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    >
                      {score}
                    </motion.p>
                    <p className="text-sm text-gray-400 uppercase tracking-wider mt-2">
                      Impact Score
                    </p>
                    <p className="text-xs text-gray-500 mt-1">out of {maxScore}</p>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="mt-8 text-center"
                >
                  <p className="text-lg font-semibold text-white mb-2">Strong Impact Potential</p>
                  <p className="text-sm text-gray-400">
                    Your actions could make a significant difference in local environmental health
                  </p>
                </motion.div>
              </div>

              {/* Score Components */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white mb-6">Score Breakdown</h3>
                
                {components.map((component, index) => (
                  <motion.div
                    key={component.label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="p-2 rounded-lg"
                          style={{
                            backgroundColor: `${component.color}20`,
                            border: `1px solid ${component.color}40`,
                          }}
                        >
                          {(() => {
                            const Icon = iconMap[component.label] || Award;
                            return <Icon className="w-5 h-5" style={{ color: component.color }} />;
                          })()}
                        </div>
                        <div>
                          <p className="font-semibold text-white text-sm">{component.label}</p>
                          <p className="text-xs text-gray-500">{component.description}</p>
                        </div>
                      </div>
                      <p className="text-2xl font-bold" style={{ color: component.color }}>
                        {component.value}
                      </p>
                    </div>

                    {/* Progress bar */}
                    <div className="relative h-2 bg-[#0B0F14] rounded-full overflow-hidden">
                      <motion.div
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{
                          backgroundColor: component.color,
                          boxShadow: `0 0 8px ${component.color}60`,
                        }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${component.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                      />
                    </div>
                  </motion.div>
                ))}

                {/* Explanation */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="mt-8 p-4 bg-[#0B0F14] rounded-lg border border-gray-700/30"
                >
                  <p className="text-sm text-gray-400 leading-relaxed">
                    <span className="font-semibold text-[#00E676]">How it's calculated:</span> Your Impact 
                    Score combines environmental data, action potential, and community engagement to measure 
                    the positive change you can create through sustainable choices.
                  </p>
                </motion.div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
