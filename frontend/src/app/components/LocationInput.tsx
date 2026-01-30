import { motion } from "motion/react";
import { MapPin, Calendar, Locate } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";

export function LocationInput() {
  return (
    <section className="py-12 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-8 bg-[#131A22] border-[#00E676]/20 backdrop-blur-sm">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-3">Analyze Your Location</h2>
              <p className="text-gray-400 text-lg">
                Environmental risk is local. Let's analyze yours.
              </p>
            </div>

            <div className="space-y-6">
              {/* Location Input */}
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00E676]" />
                <Input
                  type="text"
                  placeholder="Enter your location (city, region, or coordinates)"
                  className="pl-12 py-6 bg-[#0B0F14] border-[#00E676]/20 text-white placeholder:text-gray-500 focus:border-[#00E676] transition-colors"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Date Selector */}
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00B0FF]" />
                  <Input
                    type="date"
                    defaultValue={new Date().toISOString().split('T')[0]}
                    className="pl-12 py-6 bg-[#0B0F14] border-[#00B0FF]/20 text-white focus:border-[#00B0FF] transition-colors"
                  />
                </div>

                {/* Auto-detect button */}
                <Button
                  variant="outline"
                  className="py-6 border-[#00E676]/20 bg-[#0B0F14] hover:bg-[#00E676]/10 hover:border-[#00E676] text-white transition-all"
                >
                  <Locate className="w-5 h-5 mr-2 text-[#00E676]" />
                  Auto-detect Location
                </Button>
              </div>

              <Button
                size="lg"
                className="w-full py-6 bg-[#00E676] text-[#0B0F14] hover:bg-[#00E676]/90 font-semibold shadow-lg shadow-[#00E676]/20 hover:shadow-[#00E676]/40 transition-all duration-300"
              >
                Generate Environmental Report
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}