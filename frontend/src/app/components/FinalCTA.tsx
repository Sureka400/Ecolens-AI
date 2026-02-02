import { motion } from "motion/react";
import { ArrowRight, Github, Globe, CheckCircle2 } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useState } from "react";

interface FinalCTAProps {
  locationName: string;
}

export function FinalCTA({ locationName }: FinalCTAProps) {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {
    if (!email) return;
    setLoading(true);
    try {
      const response = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setJoined(true);
      }
    } catch (error) {
      console.error("Error joining climate action:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGithubClick = () => {
    window.open("https://github.com/Sureka400/Ecolens-AI", "_blank");
  };

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F14] via-[#00E676]/5 to-[#0B0F14]" />
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#00E676] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          {/* Main message */}
          <div className="space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl lg:text-5xl font-bold text-white leading-tight"
            >
              Sustainability starts when <span className="text-[#00E676]">{locationName}</span>{" "}
              <span className="text-[#00E676]">understands impact</span>
              <br />
              — and knows{" "}
              <span className="text-[#00B0FF]">what to do next</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-400 max-w-2xl mx-auto"
            >
              Join thousands making informed environmental decisions every day
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            {!joined ? (
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-lg">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 w-full bg-[#131A22] border border-[#00E676]/30 rounded-lg px-6 py-4 text-white focus:outline-none focus:border-[#00E676] transition-colors"
                />
                <Button
                  size="lg"
                  onClick={handleJoin}
                  disabled={loading || !email}
                  className="bg-[#00E676] text-[#0B0F14] hover:bg-[#00E676]/90 px-8 py-6 text-lg font-semibold shadow-lg shadow-[#00E676]/30 hover:shadow-[#00E676]/50 transition-all duration-300 group whitespace-nowrap"
                >
                  {loading ? "Joining..." : "Join Climate Action"}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            ) : (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-3 px-8 py-6 bg-[#00E676]/10 border border-[#00E676] rounded-xl text-[#00E676] font-semibold"
              >
                <CheckCircle2 className="w-6 h-6" />
                You've joined the movement!
              </motion.div>
            )}

            <Button
              size="lg"
              variant="outline"
              onClick={handleGithubClick}
              className="border-[#00E676]/30 bg-transparent hover:bg-[#00E676]/10 hover:border-[#00E676] text-white px-8 py-6 text-lg transition-all duration-300"
            >
              <Github className="mr-2 w-5 h-5" />
              View on GitHub
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="pt-12 grid grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            <div className="space-y-2">
              <p className="text-3xl font-bold text-[#00E676]">94%</p>
              <p className="text-sm text-gray-400">AI Accuracy</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-[#00B0FF]">50K+</p>
              <p className="text-sm text-gray-400">Data Points</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-[#FFC107]">7-Day</p>
              <p className="text-sm text-gray-400">Predictions</p>
            </div>
          </motion.div>

          {/* Footer links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1 }}
            className="pt-12 border-t border-gray-700/30"
          >
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-[#00E676] transition-colors flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Documentation
              </a>
              <span>•</span>
              <a href="#" className="hover:text-[#00E676] transition-colors">
                API Access
              </a>
              <span>•</span>
              <a href="#" className="hover:text-[#00E676] transition-colors">
                Contact Us
              </a>
            </div>
            <p className="text-xs text-gray-600 mt-6">
              Built with ♥ for a sustainable future • EcoLens AI © 2026
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
