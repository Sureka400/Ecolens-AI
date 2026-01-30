import { motion } from "motion/react";
import { Github, Linkedin, Mail } from "lucide-react";
import { Card } from "@/app/components/ui/card";

export function TeamSection() {
  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "AI/ML Engineer",
      contribution: "Predictive models & data pipeline",
      avatar: "SC",
      color: "#00E676",
    },
    {
      name: "Marcus Rodriguez",
      role: "Full-Stack Developer",
      contribution: "Dashboard architecture & API integration",
      avatar: "MR",
      color: "#00B0FF",
    },
    {
      name: "Amara Okafor",
      role: "Environmental Scientist",
      contribution: "Data validation & impact assessment",
      avatar: "AO",
      color: "#FFC107",
    },
    {
      name: "Liam O'Brien",
      role: "UX/UI Designer",
      contribution: "User experience & visual design",
      avatar: "LO",
      color: "#FF5252",
    },
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-[#000000] to-[#0B0F14]">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Meet the Team</h2>
          <p className="text-gray-400 text-lg">
            Passionate experts united by a mission to make environmental data accessible
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 bg-[#131A22] border-[#00E676]/20 hover:border-[#00E676]/40 transition-all duration-300">
                <div className="flex flex-col items-center text-center space-y-4">
                  {/* Avatar */}
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold"
                    style={{
                      backgroundColor: `${member.color}20`,
                      border: `2px solid ${member.color}`,
                      color: member.color,
                    }}
                  >
                    {member.avatar}
                  </div>

                  {/* Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
                    <p className="text-sm" style={{ color: member.color }}>
                      {member.role}
                    </p>
                  </div>

                  {/* Contribution */}
                  <p className="text-sm text-gray-400 leading-relaxed">{member.contribution}</p>

                  {/* Social Links */}
                  <div className="flex items-center gap-3 pt-2">
                    <button className="p-2 hover:bg-[#0B0F14] rounded-lg transition-colors">
                      <Github className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />
                    </button>
                    <button className="p-2 hover:bg-[#0B0F14] rounded-lg transition-colors">
                      <Linkedin className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />
                    </button>
                    <button className="p-2 hover:bg-[#0B0F14] rounded-lg transition-colors">
                      <Mail className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-500">
            Open-source contributors • Peer-reviewed research • Transparent methodology
          </p>
        </motion.div>
      </div>
    </section>
  );
}
