import { motion } from "motion/react";
import { Lightbulb, Flame, Car, Recycle, Wind, TreePine, ChevronLeft, ChevronRight, Droplets, Thermometer, Shield } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { useState, useEffect } from "react";

interface Action {
  title: string;
  why: string;
  impact: string;
  difficulty: "Easy" | "Medium";
  color: string;
}

export function MicroActions({ lat = 51.5074, lon = -0.1278 }: { lat?: number, lon?: number }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [actions, setActions] = useState<Action[]>([]);
  const [loading, setLoading] = useState(true);

  const iconMap: { [key: string]: React.ElementType } = {
    "Wear N95 masks outdoors": Wind,
    "Use HEPA air purifiers": Shield,
    "Avoid heavy traffic areas": Car,
    "Use water filtration": Droplets,
    "Stay hydrated and seek shade": Thermometer,
    "Join local cleanup drives": Recycle,
    "Install LED Lighting": Lightbulb,
    "Separate Recyclables": Recycle,
    "Support Green Spaces": TreePine,
  };

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8000/api/insights?lat=${lat}&lon=${lon}`)
      .then((res) => res.json())
      .then((data) => {
        setActions(data.action_plan);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching actions:", err);
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

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, actions.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, actions.length - 2)) % Math.max(1, actions.length - 2));
  };

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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#131A22] border border-[#00E676]/20 rounded-full mb-6">
            <Lightbulb className="w-4 h-4 text-[#00E676]" />
            <span className="text-sm text-[#00E676] tracking-wide">Actionable Intelligence</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Recommended Actions</h2>
          <p className="text-gray-400 text-lg">Small actions, collective impact</p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 bg-[#131A22] border border-[#00E676]/20 rounded-full hover:bg-[#00E676]/10 hover:border-[#00E676] transition-all"
            aria-label="Previous actions"
          >
            <ChevronLeft className="w-6 h-6 text-[#00E676]" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 bg-[#131A22] border border-[#00E676]/20 rounded-full hover:bg-[#00E676]/10 hover:border-[#00E676] transition-all"
            aria-label="Next actions"
          >
            <ChevronRight className="w-6 h-6 text-[#00E676]" />
          </button>

          {/* Cards Container */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{ x: `-${currentIndex * (100 / 3)}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {actions.map((action, index) => (
                <div
                  key={index}
                  className="min-w-[calc(33.333%-16px)] flex-shrink-0"
                >
                  <Card className="h-full p-6 bg-[#131A22] border-[#00E676]/20 hover:border-[#00E676]/40 transition-all duration-300">
                    {/* Icon & Difficulty Badge */}
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="p-3 rounded-xl"
                        style={{
                          backgroundColor: `${action.color}20`,
                          border: `1px solid ${action.color}40`,
                        }}
                      >
                        {(() => {
                          const Icon = iconMap[action.title] || Lightbulb;
                          return <Icon className="w-6 h-6" style={{ color: action.color }} />;
                        })()}
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          action.difficulty === "Easy"
                            ? "bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/20"
                            : "bg-[#FFC107]/10 text-[#FFC107] border border-[#FFC107]/20"
                        }`}
                      >
                        {action.difficulty}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-white mb-3 leading-tight">
                      {action.title}
                    </h3>

                    {/* Why it matters */}
                    <div className="mb-4">
                      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                        Why it matters
                      </p>
                      <p className="text-sm text-gray-300 leading-relaxed">{action.why}</p>
                    </div>

                    {/* Impact */}
                    <div
                      className="p-3 rounded-lg"
                      style={{
                        backgroundColor: `${action.color}10`,
                        border: `1px solid ${action.color}20`,
                      }}
                    >
                      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                        Estimated Impact
                      </p>
                      <p className="text-sm font-semibold" style={{ color: action.color }}>
                        {action.impact}
                      </p>
                    </div>
                  </Card>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {[...Array(Math.max(1, actions.length - 2))].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-[#00E676] w-8"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
