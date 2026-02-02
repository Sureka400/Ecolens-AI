import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Globe2, Sparkles } from "lucide-react";
import { Button } from "@/app/components/ui/button";

interface Overview {
  title: string;
  subtitle: string;
  tagline: string;
}

export function HeroSection({ onAnalyze }: { onAnalyze?: () => void }) {
  const [overview, setOverview] = useState<Overview | null>(null);

  useEffect(() => {
    fetch("/api/overview")
      .then((res) => res.json())
      .then((data) => setOverview(data))
      .catch((err) => console.error("Error fetching overview:", err));
  }, []);

  return (
    <section className="relative py-20 flex items-center justify-center overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#00E676] rounded-full opacity-20"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            animate={{
              y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800)],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#131A22] border border-[#00E676]/20 rounded-full"
            >
              <Sparkles className="w-4 h-4 text-[#00E676]" />
              <span className="text-sm text-[#00E676] tracking-wide">AI-Powered Sustainability</span>
            </motion.div>
            
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="text-white">{overview?.title || "Environmental Intelligence"}</span>
            </h1>
          </div>

          <p className="text-xl lg:text-2xl text-gray-300 font-light tracking-wide">
            {overview?.subtitle || "Making Invisible Pollution Visible"}
          </p>

          <div className="flex items-center gap-4 pt-4">
            <div className="h-px flex-1 bg-gradient-to-r from-[#00E676] to-transparent" />
            <p className="text-gray-400 tracking-widest uppercase text-sm">
              {overview?.tagline || "Predict · Explain · Act"}
            </p>
            <div className="h-px flex-1 bg-gradient-to-l from-[#00E676] to-transparent" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="pt-6"
          >
            <Button
              size="lg"
              onClick={onAnalyze}
              className="bg-[#00E676] text-[#0B0F14] hover:bg-[#00E676]/90 px-8 py-6 text-lg font-semibold shadow-lg shadow-[#00E676]/20 hover:shadow-[#00E676]/40 transition-all duration-300"
            >
              Analyze My Environment
            </Button>
          </motion.div>
        </motion.div>

        {/* Right - Animated Globe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative"
        >
          <div className="relative w-full aspect-square max-w-lg mx-auto">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#00E676]/20 via-[#00B0FF]/20 to-transparent rounded-full blur-3xl" />
            
            {/* Main globe container */}
            <div className="relative w-full h-full flex items-center justify-center">
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 60,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="relative"
              >
                <Globe2 className="w-64 h-64 text-[#00E676]/30" strokeWidth={0.5} />
              </motion.div>

              {/* Pollution zones - pulsing dots */}
              {[
                { top: "20%", left: "30%", color: "#FF5252" },
                { top: "40%", left: "60%", color: "#FFC107" },
                { top: "60%", left: "25%", color: "#00B0FF" },
                { top: "70%", left: "70%", color: "#FF5252" },
                { top: "30%", left: "80%", color: "#FFC107" },
              ].map((zone, i) => (
                <motion.div
                  key={i}
                  className="absolute w-4 h-4 rounded-full"
                  style={{
                    top: zone.top,
                    left: zone.left,
                    backgroundColor: zone.color,
                    boxShadow: `0 0 20px ${zone.color}`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}