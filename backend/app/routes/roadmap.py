from fastapi import APIRouter, Query
from app.database import db
from datetime import datetime
from uuid import uuid4
from bson import ObjectId
import httpx
import os
import json
from fastapi.responses import Response
from bson.json_util import dumps

router = APIRouter()

@router.post("/roadmap/generate")
async def generate_roadmap(role: str = Query(...), user_id: str = Query(...)):
    prompt = f"""
Create a professional learning roadmap for becoming a {role}.
Respond only with valid JSON in this format:

{{
  "title": "string",
  "description": "string",
  "duration": "string",
  "steps": [
    {{ "title": "string", "description": "string" }},
    {{ "title": "string", "description": "string" }}
  ]
}}
Do not include markdown, explanation or code blocks — return raw JSON only.
"""

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.together.xyz/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {os.getenv('TOGETHER_API_KEY')}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": "mistralai/Mixtral-8x7B-Instruct-v0.1",
                    "messages": [{"role": "user", "content": prompt}],
                    "temperature": 0.7,
                },
                timeout=60
            )

        data = response.json()
        choices = data.get("choices", [])
        if not choices:
            raise ValueError("No response choices returned from Together API.")

        content = choices[0]["message"]["content"].strip()
        if content.startswith("```"):
            content = content.split("```")[1].strip()

        json_data = json.loads(content)

        roadmap_id = str(uuid4())
        json_data.update({
            "roadmap_id": roadmap_id,
            "user_id": user_id,
            "role": role,
            "timestamp": datetime.utcnow()
        })

        await db.roadmaps.insert_one(json_data)
        return Response(content=dumps(json_data), media_type="application/json")

    except Exception as e:
        return {"error": str(e)}

@router.get("/roadmap/history")
async def get_roadmaps(user_id: str = Query(...)):
    results = await db.roadmaps.find({"user_id": user_id}).sort("timestamp", -1).to_list(50)
    return Response(content=dumps(results), media_type="application/json")

@router.get("/roadmap/{roadmap_id}")
async def get_one_roadmap(roadmap_id: str):
    result = await db.roadmaps.find_one({"roadmap_id": roadmap_id})
    if not result:
        return {"error": "Roadmap not found"}
    return Response(content=dumps(result), media_type="application/json")

@router.delete("/roadmap/{roadmap_id}")
async def delete_roadmap(roadmap_id: str):
    res = await db.roadmaps.delete_one({"roadmap_id": roadmap_id})
    return {"deleted": res.deleted_count == 1}