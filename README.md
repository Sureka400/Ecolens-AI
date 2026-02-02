# Ecolens AI
Turning Awareness into Action

EcoLens AI is a sustainability-focused web platform that makes invisible environmental pollution visible, understandable, and actionable.
It uses AI-powered predictions, real-time environmental data, interactive maps, and micro-action recommendations to help individuals and communities take meaningful climate action.

🚀 Features

🌍 Real-time environmental monitoring (Air, Water, Waste)

🧠 AI-based pollution prediction (next 7 days)

📊 Interactive charts & analytics dashboard

🗺️ Map-based pollution visualization

🌱 Micro-action recommendations with impact estimation

🏆 Environmental Impact Score (0–100)

🌙 Premium dark-theme dashboard

🔒 Secure backend APIs

🏗️ Project Structure
EcoLens-AI/
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── services/
│
├── frontend/
│   ├── package.json
│   ├── src/
│   └── public/
│
└── README.md

⚙️ Tech Stack
Backend

Python

FastAPI / Flask

AI/ML (scikit-learn)

REST APIs

Optional: SQLite

Frontend

Typescript+javascript

Dark-theme dashboard UI

Charts & Maps

Mapbox / Leaflet

▶️ How to Run the Project
🔹 1️⃣ Run Backend
cd backend
python main.py


Backend will start on:

http://localhost:8000

🔹 2️⃣ Run Frontend
cd frontend
npm install
npm run dev


Frontend will start on:

http://localhost:5173

📦 Backend Requirements

Install backend dependencies using:

pip install -r requirements.txt

Example requirements.txt
fastapi
uvicorn
requests
pandas
numpy
scikit-learn
python-dotenv

📦 Frontend Packages

Install frontend packages using:

npm install


Common dependencies:

react
next
axios
chart.js
leaflet
mapbox-gl

🔗 API Endpoints (Backend)
Endpoint	Description
/dashboard?location=	Full dashboard data
/predict?location=	AI pollution prediction
/actions?location=	Micro-action suggestions
/map_data?location=	Map visualization data
/impact_score?location=	Sustainability impact score
🎥 Demo

A short demo video showcases:

Location analysis

Pollution prediction

AI explanations

Action recommendations

Impact simulation

👥 Team

Sureka R – Backend / AI

Soniya V – Frontend / UI

Shalini S – Data / Research

Sharmili-Map integration,API connections

🌍 Sustainability Impact

EcoLens AI empowers users to:

Understand environmental risks

Predict future pollution

Take small local actions

Drive collective climate impact
