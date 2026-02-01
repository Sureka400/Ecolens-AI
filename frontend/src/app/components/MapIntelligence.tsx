import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Layers, Droplets, Wind, Trash2, Volume2, AlertTriangle } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import L from "leaflet";

// Fix Leaflet icon issue
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface PollutionZone {
  lat: number;
  lon: number;
  severity: "low" | "moderate" | "high";
  tooltip: string;
}

interface Layer {
  id: string;
  name: string;
  color: string;
  icon?: React.ElementType;
}

// Component to handle map view changes and resizing
function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    if (center && typeof center[0] === 'number' && typeof center[1] === 'number' && !isNaN(center[0]) && !isNaN(center[1])) {
      map.setView(center, 13);
      // Force map to recalculate its container size - critical for tabs
      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    }
  }, [center, map]);
  return null;
}

export function MapIntelligence({ lat = 51.5074, lon = -0.1278, name = "Selected Location" }: { lat?: number, lon?: number, name?: string }) {
  const [activeLayer, setActiveLayer] = useState("air");
  const [layers, setLayers] = useState<Layer[]>([]);
  const [pollutionZones, setPollutionZones] = useState<PollutionZone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const iconMap: { [key: string]: React.ElementType } = {
    "air": Wind,
    "water": Droplets,
    "waste": Trash2,
    "noise": Volume2,
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    const fetchUrl = `http://localhost:8000/api/map?lat=${lat}&lon=${lon}&layer=${activeLayer}`;
    
    fetch(fetchUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data && data.layers) {
          const layersWithIcons = data.layers.map((layer: Layer) => ({
            ...layer,
            icon: iconMap[layer.id] || Wind,
          }));
          setLayers(layersWithIcons);
        }
        
        if (data && data.pollutionZones) {
          setPollutionZones(data.pollutionZones);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching map data:", err);
        setError("Unable to connect to environmental data stream. Please ensure backend is running.");
        setLoading(false);
      });
  }, [lat, lon, activeLayer]);

  const severityColors = {
    high: "#FF5252",
    moderate: "#FFC107",
    low: "#00E676",
  };

  const mapCenter: [number, number] = [
    typeof lat === 'number' && !isNaN(lat) ? lat : 51.5074,
    typeof lon === 'number' && !isNaN(lon) ? lon : -0.1278
  ];

  return (
    <div className="py-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Map Intelligence Module</h2>
          <p className="text-gray-400 text-lg">Real-time environmental risk visualization</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-8 bg-[#131A22] border-[#00E676]/20">
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-3 text-red-400">
                <AlertTriangle className="w-5 h-5" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Layer Controls */}
            <div className="flex items-center gap-4 mb-6 flex-wrap">
              <div className="flex items-center gap-2 text-gray-400">
                <Layers className="w-5 h-5" />
                <span className="text-sm font-medium">Map Layers:</span>
              </div>
              {layers.length > 0 ? layers.map((layer) => {
                const Icon = layer.icon || Wind;
                return (
                  <button
                    key={layer.id}
                    onClick={() => setActiveLayer(layer.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                      activeLayer === layer.id
                        ? "bg-[#0B0F14] border-current shadow-lg"
                        : "bg-[#0B0F14]/50 border-gray-600/30 hover:border-gray-500"
                    }`}
                    style={{
                      color: activeLayer === layer.id ? layer.color : "#9CA3AF",
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{layer.name}</span>
                  </button>
                );
              }) : (
                <div className="text-xs text-gray-500 italic">No layers available</div>
              )}
            </div>

            {/* Map Visualization */}
            <div className="relative w-full h-[600px] bg-[#0B0F14] rounded-xl overflow-hidden border border-gray-700/30">
              {loading ? (
                <div className="absolute inset-0 flex justify-center items-center bg-[#0B0F14]/50 z-[1000]">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00E676]"></div>
                </div>
              ) : null}
              
              <MapContainer 
                center={mapCenter} 
                zoom={13} 
                scrollWheelZoom={true} 
                style={{ height: "100%", width: "100%" }}
              >
                <ChangeView center={mapCenter} />
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
                />

                <Marker position={mapCenter}>
                  <Popup>
                    <div className="text-[#0B0F14]">
                      <p className="font-bold">Current Analysis Point</p>
                      <p className="text-sm">Target Location</p>
                    </div>
                  </Popup>
                </Marker>
                
                {pollutionZones.map((zone, i) => (
                  <Circle
                    key={i}
                    center={[zone.lat, zone.lon]}
                    pathOptions={{ 
                      fillColor: severityColors[zone.severity] || severityColors.moderate,
                      color: severityColors[zone.severity] || severityColors.moderate,
                      weight: 1,
                      fillOpacity: 0.3
                    }}
                    radius={500}
                  >
                    <Popup>
                      <div className="text-[#0B0F14]">
                        <p className="font-semibold">{zone.tooltip}</p>
                        <p className="text-sm capitalize font-bold" style={{ color: severityColors[zone.severity] }}>
                          {zone.severity} Risk Level
                        </p>
                      </div>
                    </Popup>
                  </Circle>
                ))}
              </MapContainer>
            </div>

            <p className="text-center text-sm text-gray-500 mt-4">
              Click on zones for detailed insights • Live environmental layers integrated
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
