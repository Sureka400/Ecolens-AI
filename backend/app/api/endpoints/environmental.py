from fastapi import APIRouter, HTTPException, Query, Depends, Response
from app.schemas.environmental import (
    Metric, MapData, GeocodeResult, Overview, SearchHistory, 
    ReportRequest, ReportResponse, InsightResponse, ForecastResponse,
    ImpactScoreResponse, ImpactSimulationResponse, JoinRequest, JoinResponse
)
from app.services.weather_service import WeatherService
from app.services.ai_service import AIService
from app.core.database import get_db
from app.models.history import SearchHistory as SearchHistoryModel, EnvironmentalReport as ReportModel, ClimateAction as ClimateActionModel
from sqlalchemy.orm import Session
from typing import List
import json

router = APIRouter()

@router.get("/snapshot", response_model=List[Metric])
async def get_snapshot(lat: float = 0, lon: float = 0):
    return await WeatherService.get_air_pollution(lat, lon)

@router.get("/map", response_model=MapData)
async def get_map_data(lat: float = 0, lon: float = 0, layer: str = "air"):
    # Get real AQI to influence map data
    metrics = await WeatherService.get_air_pollution(lat, lon)
    aqi_metric = next((m for m in metrics if m["title"] == "Air Quality"), None)
    base_severity = aqi_metric["risk"] if aqi_metric else "moderate"
    
    # Generate zones based on the selected layer
    zones = []
    if layer == "air":
        zones = [
            {"lat": lat + 0.005, "lon": lon + 0.005, "severity": base_severity, "tooltip": f"Air Station Alpha: {aqi_metric['value'] if aqi_metric else 50} AQI"},
            {"lat": lat - 0.008, "lon": lon + 0.012, "severity": "high", "tooltip": "Traffic Hotspot - High NO2"},
            {"lat": lat + 0.012, "lon": lon - 0.015, "severity": "low", "tooltip": "Urban Forest - Clean Air Zone"}
        ]
    elif layer == "water":
        zones = [
            {"lat": lat + 0.008, "lon": lon - 0.010, "severity": "moderate", "tooltip": "Reservoir B: Normal levels"},
            {"lat": lat - 0.005, "lon": lon + 0.008, "severity": "low", "tooltip": "Water Treatment Facility 1"},
            {"lat": lat + 0.015, "lon": lon + 0.015, "severity": "high", "tooltip": "Runoff Warning Area"}
        ]
    elif layer == "waste":
        zones = [
            {"lat": lat - 0.010, "lon": lon - 0.005, "severity": "high", "tooltip": "Overflowing Collection Point"},
            {"lat": lat + 0.006, "lon": lon + 0.006, "severity": "low", "tooltip": "Recycling Center"},
            {"lat": lat - 0.002, "lon": lon + 0.015, "severity": "moderate", "tooltip": "Landfill Proximity Zone"}
        ]
    elif layer == "noise":
        zones = [
            {"lat": lat + 0.003, "lon": lon - 0.008, "severity": "high", "tooltip": "Construction Site: >85dB"},
            {"lat": lat - 0.015, "lon": lon - 0.012, "severity": "moderate", "tooltip": "High Traffic Corridor"},
            {"lat": lat + 0.010, "lon": lon + 0.005, "severity": "low", "tooltip": "Quiet Residential Zone"}
        ]
    
    return {
        "center": {"lat": lat, "lon": lon},
        "pollutionZones": zones,
        "layers": [
            { "id": "air", "name": "Air Quality Density", "color": "#FF5252" },
            { "id": "water", "name": "Water Safety", "color": "#00B0FF" },
            { "id": "noise", "name": "Acoustic Pollution", "color": "#E040FB" },
            { "id": "waste", "name": "Waste Management", "color": "#FFC107" }
        ]
    }

@router.get("/geocode", response_model=GeocodeResult)
async def geocode(q: str, db: Session = Depends(get_db)):
    result = await WeatherService.geocode(q)
    
    # Save to history
    new_search = SearchHistoryModel(
        query=q,
        name=result["name"],
        lat=result["lat"],
        lon=result["lon"]
    )
    db.add(new_search)
    db.commit()
    db.refresh(new_search)
    
    return result

@router.get("/history", response_model=List[SearchHistory])
async def get_history(db: Session = Depends(get_db)):
    return db.query(SearchHistoryModel).order_by(SearchHistoryModel.timestamp.desc()).limit(10).all()

@router.get("/overview", response_model=Overview)
async def get_overview():
    return {
        "title": "EcoLens AI",
        "subtitle": "Making Invisible Pollution Visible",
        "tagline": "Predict · Explain · Act"
    }

@router.post("/report", response_model=ReportResponse)
async def generate_report(request: ReportRequest, db: Session = Depends(get_db)):
    metrics = await WeatherService.get_air_pollution(request.lat, request.lon)
    
    # Simple synthesis for report
    aqi_metric = next((m for m in metrics if m["title"] == "Air Quality"), None)
    aqi_value = aqi_metric["value"] if aqi_metric else 50
    risk_level = aqi_metric["risk"] if aqi_metric else "moderate"
    
    summary = f"ECOLENS AI ENVIRONMENTAL ANALYSIS REPORT\n"
    summary += f"======================================\n"
    summary += f"Location: {request.name}\n"
    summary += f"Coordinates: {request.lat}, {request.lon}\n"
    summary += f"Risk Level: {risk_level.upper()}\n"
    summary += f"Air Quality Index: {aqi_value}\n\n"
    summary += f"Detailed Assessment:\n"
    for m in metrics:
        summary += f"- {m['title']}: {m['value']} ({m['risk']} risk) - {m['description']}\n"
    
    new_report = ReportModel(
        location_name=request.name,
        lat=request.lat,
        lon=request.lon,
        aqi_value=aqi_value,
        risk_level=risk_level,
        summary=summary
    )
    db.add(new_report)
    db.commit()
    db.refresh(new_report)
    
    return new_report

@router.get("/reports", response_model=List[ReportResponse])
async def get_reports(db: Session = Depends(get_db)):
    return db.query(ReportModel).order_by(ReportModel.timestamp.desc()).all()

@router.get("/reports/{report_id}/download")
async def download_report(report_id: int, db: Session = Depends(get_db)):
    report = db.query(ReportModel).filter(ReportModel.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    
    filename = f"ecolens_report_{report.location_name.replace(' ', '_')}_{report.id}.txt"
    return Response(
        content=report.summary,
        media_type="text/plain",
        headers={"Content-Disposition": f"attachment; filename={filename}"}
    )

@router.get("/insights", response_model=InsightResponse)
async def get_ai_insights(lat: float, lon: float):
    metrics = await WeatherService.get_air_pollution(lat, lon)
    summary = await AIService.generate_insights(metrics)
    action_plan = await AIService.get_action_plan(metrics)
    
    return {
        "summary": summary,
        "action_plan": action_plan,
        "confidence_score": 0.92
    }

@router.get("/forecast", response_model=ForecastResponse)
async def get_forecast(lat: float, lon: float):
    # Dynamic forecast based on real-time snapshot
    metrics = await WeatherService.get_air_pollution(lat, lon)
    aqi_metric = next((m for m in metrics if m["title"] == "Air Quality"), None)
    base_aqi = aqi_metric["value"] if aqi_metric else 50
    
    forecast = []
    days = ["Today", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"]
    
    # Use coordinates to influence trend
    trend_factor = int((abs(lat) + abs(lon)) * 10) % 5
    
    for i, day in enumerate(days):
        # Slightly increasing trend for "without action"
        current = base_aqi + (i * (trend_factor + 2))
        # Decreasing trend for "with action"
        withAction = base_aqi - (i * (trend_factor + 1))
        forecast.append({
            "day": day,
            "current": max(0, int(current)),
            "withAction": max(0, int(withAction))
        })
        
    return {"forecast": forecast}

@router.get("/impact-score", response_model=ImpactScoreResponse)
async def get_impact_score(lat: float, lon: float):
    metrics = await WeatherService.get_air_pollution(lat, lon)
    aqi_metric = next((m for m in metrics if m["title"] == "Air Quality"), None)
    aqi_value = aqi_metric["value"] if aqi_metric else 50
    
    # Calculate scores based on AQI
    health_impact = max(0, 100 - aqi_value)
    env_recovery = min(100, 40 + (health_impact // 2))
    community_benefit = min(100, 50 + (health_impact // 3))
    
    avg_score = (health_impact + env_recovery + community_benefit) // 3
    
    return {
        "score": avg_score,
        "maxScore": 100,
        "components": [
            {
                "label": "Health Impact",
                "value": health_impact,
                "color": "#FF5252",
                "description": "Respiratory health improvement potential",
            },
            {
                "label": "Environmental Recovery",
                "value": env_recovery,
                "color": "#00E676",
                "description": "Ecosystem restoration progress",
            },
            {
                "label": "Community Benefit",
                "value": community_benefit,
                "color": "#00B0FF",
                "description": "Collective well-being improvement",
            }
        ]
    }

@router.get("/impact-simulation", response_model=ImpactSimulationResponse)
async def get_impact_simulation(lat: float, lon: float):
    metrics = await WeatherService.get_air_pollution(lat, lon)
    
    current_data = []
    improved_data = []
    reductions = {}
    
    for m in metrics:
        val = m["value"]
        improved_val = int(val * 0.6) # 40% reduction
        
        current_data.append({"category": m["title"], "value": val})
        improved_data.append({"category": m["title"], "value": improved_val})
        reductions[m["title"]] = 40
        
    return {
        "currentData": current_data,
        "improvedData": improved_data,
        "reductionPercentages": reductions
    }

@router.post("/join", response_model=JoinResponse)
async def join_climate_action(request: JoinRequest, db: Session = Depends(get_db)):
    new_action = ClimateActionModel(email=request.email)
    db.add(new_action)
    db.commit()
    db.refresh(new_action)
    return new_action
