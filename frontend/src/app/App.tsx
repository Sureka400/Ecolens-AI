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
  Sparkles,
  Download,
  Loader2
} from "lucide-react";
import { Button } from "@/app/components/ui/button";

export default function App() {
  const [location, setLocation] = useState({ lat: 51.5074, lon: -0.1278, name: "London, UK" });
  const [analyzing, setAnalyzing] = useState(false);
  const [reportId, setReportId] = useState<number | null>(null);

  const handleLocationChange = (newLocation: { lat: number, lon: number, name: string }) => {
    setLocation(newLocation);
    setReportId(null); // Reset report when location changes
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      const response = await fetch("/api/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lat: location.lat,
          lon: location.lon,
          name: location.name,
        }),
      });
      const data = await response.json();
      setReportId(data.id);
      // Automatically switch to AI Insights tab to show the results
      const tabsTrigger = document.querySelector('[value="ai-insights"]') as HTMLButtonElement;
      if (tabsTrigger) tabsTrigger.click();
    } catch (error) {
      console.error("Error analyzing environment:", error);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleDownload = () => {
    if (reportId) {
      window.open(`/api/reports/${reportId}/download`, "_blank");
    }
  };

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
            <div className="flex items-center gap-6">
              {reportId && (
                <Button 
                  onClick={handleDownload}
                  variant="outline"
                  size="sm"
                  className="border-[#00E676]/30 text-[#00E676] hover:bg-[#00E676]/10 gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Report
                </Button>
              )}
              <div className="flex flex-col items-end">
                <div className="text-sm text-gray-400">
                  Predict · Explain · Act
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with Tabs */}
      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="map" className="w-full">
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
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-0">
            <HeroSection onAnalyze={handleAnalyze} />
            <div className="flex justify-center -mt-10 mb-20">
              {analyzing && (
                <div className="flex items-center gap-2 text-[#00E676] animate-pulse">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>AI is analyzing your environment...</span>
                </div>
              )}
            </div>
            <LocationInput 
              onLocationChange={handleLocationChange} 
              onAnalyze={handleAnalyze} 
            />
          </TabsContent>

          {/* Map Tab */}
          <TabsContent value="map" className="mt-0">
            <MapIntelligence lat={location.lat} lon={location.lon} name={location.name} />
          </TabsContent>

          {/* Snapshot Tab */}
          <TabsContent value="snapshot" className="mt-0">
            <EnvironmentalSnapshot lat={location.lat} lon={location.lon} />
          </TabsContent>

          {/* AI Insights Tab */}
          <TabsContent value="ai-insights" className="mt-0">
            <AIImpactTranslation lat={location.lat} lon={location.lon} />
          </TabsContent>

          {/* Predictions Tab */}
          <TabsContent value="predictions" className="mt-0">
            <FuturePrediction lat={location.lat} lon={location.lon} />
          </TabsContent>

          {/* Actions Tab */}
          <TabsContent value="actions" className="mt-0">
            <MicroActions lat={location.lat} lon={location.lon} />
            <div className="mt-12">
              <ImpactSimulation lat={location.lat} lon={location.lon} />
            </div>
          </TabsContent>

          {/* Impact Tab */}
          <TabsContent value="impact" className="mt-0">
            <ImpactScore lat={location.lat} lon={location.lon} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer CTA */}
      <FinalCTA locationName={location.name} />
    </div>
  );
}
