import { motion } from "motion/react";
import { BookOpen, Brain, Users } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { Card } from "@/app/components/ui/card";

export function EducationPanel() {
  const topics = [
    {
      value: "causes",
      icon: BookOpen,
      title: "Why This Pollution Happens",
      content:
        "Environmental pollution stems from multiple sources: industrial emissions release particulate matter and chemicals, vehicle exhaust contributes nitrogen oxides and carbon monoxide, agricultural practices generate methane and ammonia, and improper waste disposal creates toxic runoff. Understanding these causes helps identify targeted solutions.",
      color: "#FF5252",
    },
    {
      value: "ai",
      icon: Brain,
      title: "How AI Predicts Environmental Impact",
      content:
        "Our AI system analyzes thousands of data points including historical pollution patterns, weather conditions, traffic data, industrial activity, and seasonal trends. Machine learning models trained on years of environmental data can predict pollution levels with 94% accuracy, enabling proactive rather than reactive environmental management.",
      color: "#00B0FF",
    },
    {
      value: "action",
      icon: Users,
      title: "What Communities Can Do",
      content:
        "Collective action drives real change: communities can organize carpool networks, establish waste segregation systems, advocate for green spaces, support local environmental policies, and participate in citizen science monitoring. When individuals coordinate their efforts, environmental impact multiplies exponentially.",
      color: "#00E676",
    },
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-[#0B0F14] to-[#000000]">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#131A22] border border-[#00E676]/20 rounded-full mb-6">
            <BookOpen className="w-4 h-4 text-[#00E676]" />
            <span className="text-sm text-[#00E676] tracking-wide">Learn More</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Education & Insights</h2>
          <p className="text-gray-400 text-lg">Understanding the science behind sustainability</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-8 bg-[#131A22] border-[#00E676]/20">
            <Accordion type="single" collapsible className="space-y-4">
              {topics.map((topic, index) => (
                <AccordionItem
                  key={topic.value}
                  value={topic.value}
                  className="border border-gray-700/30 rounded-lg overflow-hidden bg-[#0B0F14]/50 hover:border-gray-600/50 transition-all"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center gap-4 text-left">
                      <div
                        className="p-3 rounded-lg"
                        style={{
                          backgroundColor: `${topic.color}20`,
                          border: `1px solid ${topic.color}40`,
                        }}
                      >
                        <topic.icon className="w-5 h-5" style={{ color: topic.color }} />
                      </div>
                      <span className="text-lg font-semibold text-white">{topic.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <p className="text-gray-300 leading-relaxed">{topic.content}</p>
                    </motion.div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
