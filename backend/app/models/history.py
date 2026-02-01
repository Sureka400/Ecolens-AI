from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from app.core.database import Base

class SearchHistory(Base):
    __tablename__ = "search_history"

    id = Column(Integer, primary_key=True, index=True)
    query = Column(String)
    name = Column(String)
    lat = Column(Float)
    lon = Column(Float)
    timestamp = Column(DateTime, default=datetime.utcnow)

class EnvironmentalReport(Base):
    __tablename__ = "environmental_reports"

    id = Column(Integer, primary_key=True, index=True)
    location_name = Column(String)
    lat = Column(Float)
    lon = Column(Float)
    aqi_value = Column(Integer)
    risk_level = Column(String)
    summary = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)

class ClimateAction(Base):
    __tablename__ = "climate_actions"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
