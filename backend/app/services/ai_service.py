from typing import List, Dict

class AIService:
    @staticmethod
    async def generate_insights(metrics: List[Dict]) -> str:
        # Synthesis of an "AI" response based on the metrics.
        
        high_risks = [m["title"] for m in metrics if m["risk"] == "high"]
        moderate_risks = [m["title"] for m in metrics if m["risk"] == "moderate"]
        
        if not high_risks and not moderate_risks:
            return "EcoLens AI Analysis: Your current environment is remarkably pristine. Environmental indicators show optimal balance across air, water, and soil metrics. This area serves as a model for ecological stability."
            
        insight = "EcoLens AI Strategic Assessment: "
        if high_risks:
            insight += f"We have identified critical environmental stressors in {', '.join(high_risks)}. "
            insight += "The synergistic effect of these pollutants may pose significant health risks for vulnerable populations. AI-driven models recommend immediate protective measures and infrastructure review. "
            
        if moderate_risks:
            insight += f"Ongoing monitoring is prioritized for {', '.join(moderate_risks)}. "
            insight += "While not critical, current trends suggest potential for escalation if local mitigation strategies are not optimized. "
            
        insight += "Predictive modeling indicates that localized action could reverse these trends within a 24-month window."
        
        return insight

    @staticmethod
    async def get_action_plan(metrics: List[Dict]) -> List[Dict]:
        # Generate actionable steps based on specific risks
        actions = []
        
        for m in metrics:
            if m["title"] == "Air Quality":
                if m["risk"] == "high":
                    actions.append({
                        "title": "Wear N95 masks outdoors",
                        "why": "High PM2.5 levels detected during peak hours",
                        "impact": "Reduces exposure by ~90%",
                        "difficulty": "Easy",
                        "color": "#FF5252"
                    })
                    actions.append({
                        "title": "Use HEPA air purifiers",
                        "why": "Indoor air quality can be affected by outdoor pollution",
                        "impact": "Cleans 99.9% of indoor particles",
                        "difficulty": "Medium",
                        "color": "#FF5252"
                    })
                elif m["risk"] == "moderate":
                    actions.append({
                        "title": "Avoid heavy traffic areas",
                        "why": "Localized pollution peaks near busy intersections",
                        "impact": "Reduces particulate inhalation by 30%",
                        "difficulty": "Easy",
                        "color": "#FFC107"
                    })
            
            if m["title"] == "Water Safety" and m["risk"] != "low":
                actions.append({
                    "title": "Use water filtration",
                    "why": "Trace contaminants detected in regional supply",
                    "impact": "Removes 95% of common contaminants",
                    "difficulty": "Easy",
                    "color": "#00B0FF"
                })
                
            if m["title"] == "Climate Stress" and m["risk"] == "high":
                actions.append({
                    "title": "Stay hydrated and seek shade",
                    "why": "Heat stress index is at critical levels",
                    "impact": "Prevents heat-related illness",
                    "difficulty": "Easy",
                    "color": "#FF5252"
                })
                
            if m["title"] == "Waste Pressure" and m["risk"] == "high":
                actions.append({
                    "title": "Join local cleanup drives",
                    "why": "Community waste levels are exceeding local capacity",
                    "impact": "Reduces local landfill pressure by 15%",
                    "difficulty": "Medium",
                    "color": "#00E676"
                })

        # Default actions if list is short
        if len(actions) < 3:
            actions.extend([
                {
                    "title": "Install LED Lighting",
                    "why": "Energy consumption directly impacts urban heat",
                    "impact": "Saves 80% energy consumption",
                    "difficulty": "Easy",
                    "color": "#00B0FF"
                },
                {
                    "title": "Separate Recyclables",
                    "why": "Reduces methane emissions from landfills",
                    "impact": "Prevents 2kg waste per week",
                    "difficulty": "Easy",
                    "color": "#00E676"
                },
                {
                    "title": "Support Green Spaces",
                    "why": "Urban trees act as natural air filters",
                    "impact": "Absorbs 22kg CO2 annually",
                    "difficulty": "Medium",
                    "color": "#00E676"
                }
            ])
            
        # Ensure unique titles
        seen = set()
        unique_actions = []
        for a in actions:
            if a["title"] not in seen:
                unique_actions.append(a)
                seen.add(a["title"])
                
        return unique_actions[:6]
