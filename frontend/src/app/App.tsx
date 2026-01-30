import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { HeroSection } from "@/app/components/HeroSection";
import { LocationInput } from "@/app/components/LocationInput";
import { MapIntelligence } from "@/app/components/MapIntelligence";
import { EnvironmentalSnapshot } from "@/app/components/EnvironmentalSnapshot";
import { AIImpactTranslation } from "@/app/components/AIImpactTranslation";
import { FuturePrediction } from "@/app/components/FuturePrediction";
import { MicroActions } from "@/app/components/MicroActions";
import { ImpactSimulation } from "@/app/components/ImpactSimulation";
import { ImpactScore } from "@/app/components/ImpactScore";
import { EducationPanel } from "@/app/components/EducationPanel";
import { FinalCTA } from "@/app/components/FinalCTA";
import { 
  LayoutDashboard, 
  Map, 
  Brain, 
  TrendingUp, 
  Lightbulb, 
  Target,
  BookOpen,
  Sparkles 
} from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-[#0B0F14] dark">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0B0F14]/95 backdrop-blur-lg border-b border-[#00E676]/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#00E676]/10 rounded-lg border border-[#00E676]/30">
                <Sparkles className="w-6 h-6 text-[#00E676]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  EcoLens <span className="text-[#00E676]">AI</span>
                </h1>
                <p className="text-xs text-gray-400">Making Invisible Pollution Visible</p>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              Predict · Explain · Act
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with Tabs */}
      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 gap-2 bg-[#131A22] p-2 mb-8 h-auto">
            <TabsTrigger 
              value="overview" 
              className="flex items-center gap-2 data-[state=active]:bg-[#00E676] data-[state=active]:text-[#0B0F14] text-gray-400 py-3"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger 
              value="map" 
              className="flex items-center gap-2 data-[state=active]:bg-[#00E676] data-[state=active]:text-[#0B0F14] text-gray-400 py-3"
            >
              <Map className="w-4 h-4" />
              <span className="hidden sm:inline">Map</span>
            </TabsTrigger>
            <TabsTrigger 
              value="snapshot" 
              className="flex items-center gap-2 data-[state=active]:bg-[#00E676] data-[state=active]:text-[#0B0F14] text-gray-400 py-3"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">Snapshot</span>
            </TabsTrigger>
            <TabsTrigger 
              value="ai-insights" 
              className="flex items-center gap-2 data-[state=active]:bg-[#00E676] data-[state=active]:text-[#0B0F14] text-gray-400 py-3"
            >
              <Brain className="w-4 h-4" />
              <span className="hidden sm:inline">AI Insights</span>
            </TabsTrigger>
            <TabsTrigger 
              value="predictions" 
              className="flex items-center gap-2 data-[state=active]:bg-[#00E676] data-[state=active]:text-[#0B0F14] text-gray-400 py-3"
            >
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Forecast</span>
            </TabsTrigger>
            <TabsTrigger 
              value="actions" 
              className="flex items-center gap-2 data-[state=active]:bg-[#00E676] data-[state=active]:text-[#0B0F14] text-gray-400 py-3"
            >
              <Lightbulb className="w-4 h-4" />
              <span className="hidden sm:inline">Actions</span>
            </TabsTrigger>
            <TabsTrigger 
              value="impact" 
              className="flex items-center gap-2 data-[state=active]:bg-[#00E676] data-[state=active]:text-[#0B0F14] text-gray-400 py-3"
            >
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Impact</span>
            </TabsTrigger>
            <TabsTrigger 
              value="learn" 
              className="flex items-center gap-2 data-[state=active]:bg-[#00E676] data-[state=active]:text-[#0B0F14] text-gray-400 py-3"
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Learn</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-0">
            <HeroSection />
            <LocationInput />
          </TabsContent>

          {/* Map Tab */}
          <TabsContent value="map" className="mt-0">
            <MapIntelligence />
          </TabsContent>

          {/* Snapshot Tab */}
          <TabsContent value="snapshot" className="mt-0">
            <EnvironmentalSnapshot />
          </TabsContent>

          {/* AI Insights Tab */}
          <TabsContent value="ai-insights" className="mt-0">
            <AIImpactTranslation />
          </TabsContent>

          {/* Predictions Tab */}
          <TabsContent value="predictions" className="mt-0">
            <FuturePrediction />
          </TabsContent>

          {/* Actions Tab */}
          <TabsContent value="actions" className="mt-0">
            <MicroActions />
            <div className="mt-12">
              <ImpactSimulation />
            </div>
          </TabsContent>

          {/* Impact Tab */}
          <TabsContent value="impact" className="mt-0">
            <ImpactScore />
          </TabsContent>

          {/* Learn Tab */}
          <TabsContent value="learn" className="mt-0">
            <EducationPanel />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer CTA */}
      <FinalCTA />
    </div>
  );
}
