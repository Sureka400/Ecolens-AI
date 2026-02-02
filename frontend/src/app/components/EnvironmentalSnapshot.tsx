import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Wind, Droplets, Thermometer, Trash2 } from "lucide-react";
import { Card } from "@/app/components/ui/card";

interface Metric {
  title: string;
  risk: "low" | "moderate" | "high";
  description: string;
  value: number;
  color: string;
}

interface MetricCardProps extends Metric {
  icon: React.ElementType;
  delay: number;
}

function MetricCard({ icon: Icon, title, risk, description, value, color, delay }: MetricCardProps) {
  const riskColors = {
    low: "#00E676",
    moderate: "#FFC107",
    high: "#FF5252",
  };

  const riskLabels = {
    low: "Low Risk",
    moderate: "Moderate Risk",
    high: "High Risk",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="p-6 bg-[#131A22] border-[#00E676]/20 hover:border-[#00E676]/40 transition-all duration-300 group">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="p-3 rounded-xl"
              style={{
                backgroundColor: `${color}20`,
                border: `1px solid ${color}40`,
              }}
            >
              <Icon className="w-6 h-6" style={{ color }} />
            </div>
            <div>
              <h3 className="text-white font-semibold">{title}</h3>
              <p className="text-sm" style={{ color: riskColors[risk] }}>
                {riskLabels[risk]}
              </p>
            </div>
          </div>
        </div>

        {/* Ring Chart */}
        <div className="relative w-32 h-32 mx-auto my-6">
          <svg className="w-full h-full -rotate-90">
            {/* Background circle */}
            <circle
              cx="64"
              cy="64"
              r="56"
              fill="none"
              stroke="#0B0F14"
              strokeWidth="12"
            />
            {/* Progress circle */}
            <motion.circle
              cx="64"
              cy="64"
              r="56"
              fill="none"
              stroke={riskColors[risk]}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 56}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
              whileInView={{
                strokeDashoffset: 2 * Math.PI * 56 * (1 - value / 100),
              }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: delay + 0.3, ease: "easeOut" }}
              style={{
                filter: `drop-shadow(0 0 8px ${riskColors[risk]}40)`,
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <motion.p
                className="text-3xl font-bold"
                style={{ color: riskColors[risk] }}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: delay + 0.5 }}
              >
                {value}
              </motion.p>
              <p className="text-xs text-gray-500">Index</p>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-400 text-center leading-relaxed">
          {description}
        </p>
      </Card>
    </motion.div>
  );
}

export function EnvironmentalSnapshot({ lat = 51.5074, lon = -0.1278 }: { lat?: number, lon?: number }) {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);

  const iconMap: { [key: string]: React.ElementType } = {
    "Air Quality": Wind,
    "Water Safety": Droplets,
    "Climate Stress": Thermometer,
    "Waste Pressure": Trash2,
  };

  useEffect(() => {
    setLoading(true);
    fetch(`/api/snapshot?lat=${lat}&lon=${lon}`)
      .then((res) => res.json())
      .then((data) => {
        setMetrics(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching snapshot:", err);
        setLoading(false);
      });
  }, [lat, lon]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00E676]"></div>
      </div>
    );
  }

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-[#0B0F14] to-[#0B0F14]">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Environmental Snapshot</h2>
          <p className="text-gray-400 text-lg">Real-time risk assessment for your area</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <MetricCard
              key={metric.title}
              {...metric}
              icon={iconMap[metric.title] || Wind}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
