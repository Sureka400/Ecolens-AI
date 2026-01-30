import { motion } from "motion/react";
import { School, Building2, Landmark, Heart } from "lucide-react";
import { Card } from "@/app/components/ui/card";

export function ScalabilitySection() {
  const sectors = [
    {
      icon: School,
      title: "Schools",
      description: "Environmental education and student engagement programs",
      color: "#00E676",
    },
    {
      icon: Building2,
      title: "Cities",
      description: "Urban planning and smart city sustainability initiatives",
      color: "#00B0FF",
    },
    {
      icon: Landmark,
      title: "Governments",
      description: "Policy-making and regulatory compliance monitoring",
      color: "#FFC107",
    },
    {
      icon: Heart,
      title: "NGOs",
      description: "Community outreach and environmental advocacy campaigns",
      color: "#FF5252",
    },
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
          <h2 className="text-4xl font-bold text-white mb-4">Built to Scale</h2>
          <p className="text-gray-400 text-lg">
            Designed to scale from individuals to cities
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sectors.map((sector, index) => (
            <motion.div
              key={sector.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 bg-[#131A22] border-[#00E676]/20 hover:border-[#00E676]/40 transition-all duration-300 h-full">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div
                    className="p-4 rounded-xl"
                    style={{
                      backgroundColor: `${sector.color}20`,
                      border: `1px solid ${sector.color}40`,
                    }}
                  >
                    <sector.icon className="w-8 h-8" style={{ color: sector.color }} />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{sector.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{sector.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Card className="inline-block p-6 bg-gradient-to-r from-[#00E676]/10 to-[#00B0FF]/10 border-[#00E676]/30">
            <p className="text-lg text-gray-300">
              <span className="text-[#00E676] font-semibold">1,000+</span> potential users per deployment •{" "}
              <span className="text-[#00B0FF] font-semibold">Infinite</span> scalability through cloud infrastructure
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
