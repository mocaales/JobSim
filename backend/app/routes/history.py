from fastapi import APIRouter, Query
from app.database import db
from fastapi.responses import JSONResponse
from bson import ObjectId
from bson.json_util import dumps
from datetime import datetime

router = APIRouter()

def serialize(doc):
    """ Helper to convert ObjectId and datetime to string """
    doc["_id"] = str(doc.get("_id", ""))
    if isinstance(doc.get("timestamp"), datetime):
        doc["timestamp"] = doc["timestamp"].isoformat()
    return doc

@router.get("/history/all")
async def get_all_history(user_id: str = Query(...)):
    try:
        chats = await db.chats.aggregate([
            {"$match": {"user_id": user_id}},
            {"$sort": {"timestamp": -1}},
            {"$group": {"_id": "$conversation_id", "latest": {"$first": "$$ROOT"}}},
            {"$replaceRoot": {"newRoot": "$latest"}}
        ]).to_list(20)

        resumes = await db.resume_results.find({"user_id": user_id}).sort("timestamp", -1).to_list(10)

        roadmaps = await db.roadmaps.find({"user_id": user_id}).sort("timestamp", -1).to_list(10)

        all_items = chats + resumes + roadmaps
        serialized = [serialize(item) for item in all_items]

        combined = sorted(serialized, key=lambda x: x.get("timestamp", ""), reverse=True)

        return JSONResponse(content=combined)

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

@router.delete("/history/delete")
async def delete_history(type: str = Query(...), id: str = Query(...)):
    try:
        if type == "chat":
            res = await db.chats.delete_many({"conversation_id": id})
        elif type == "resume":
            res = await db.resume_results.delete_one({"resume_id": id})
        elif type == "roadmap":
            res = await db.roadmaps.delete_one({"roadmap_id": id})
        else:
            return JSONResponse(content={"error": "Invalid type"}, status_code=400)

        return {"deleted": res.deleted_count > 0}

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)