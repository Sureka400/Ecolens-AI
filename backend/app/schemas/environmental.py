from pydantic import BaseModel
from typing import List, Dict, Optional
from datetime import datetime

class Metric(BaseModel):
    title: str
    risk: str
    description: str
    value: int
    color: str
    insight: Optional[str] = None

class PollutionZone(BaseModel):
    lat: float
    lon: float
    severity: str
    tooltip: str

class Layer(BaseModel):
    id: str
    name: str
    color: str

class MapData(BaseModel):
    center: Dict[str, float]
    pollutionZones: List[PollutionZone]
    layers: List[Layer]

class GeocodeResult(BaseModel):
    lat: float
    lon: float
    name: str

class Overview(BaseModel):
    title: str
    subtitle: str
    tagline: str

class SearchHistoryBase(BaseModel):
    query: str
    name: str
    lat: float
    lon: float

class SearchHistory(SearchHistoryBase):
    id: int
    timestamp: datetime

    class Config:
        from_attributes = True

class ReportRequest(BaseModel):
    lat: float
    lon: float
    name: str

class ReportResponse(BaseModel):
    id: int
    location_name: str
    lat: float
    lon: float
    aqi_value: int
    risk_level: str
    summary: str
    timestamp: datetime

    class Config:
        from_attributes = True

class InsightAction(BaseModel):
    title: str
    why: str
    impact: str
    difficulty: str
    color: str

class InsightResponse(BaseModel):
    summary: str
    action_plan: List[InsightAction]
    confidence_score: float

class ForecastItem(BaseModel):
    day: str
    current: int
    withAction: int

class ForecastResponse(BaseModel):
    forecast: List[ForecastItem]

class ImpactScoreComponent(BaseModel):
    label: str
    value: int
    color: str
    description: str

class ImpactScoreResponse(BaseModel):
    score: int
    maxScore: int
    components: List[ImpactScoreComponent]

class ImpactSimulationItem(BaseModel):
    category: str
    value: int

class ImpactSimulationResponse(BaseModel):
    currentData: List[ImpactSimulationItem]
    improvedData: List[ImpactSimulationItem]
    reductionPercentages: Dict[str, int]

class JoinRequest(BaseModel):
    email: str

class JoinResponse(BaseModel):
    id: int
    email: str
    timestamp: datetime

    class Config:
        from_attributes = True
