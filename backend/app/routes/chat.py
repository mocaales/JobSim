from fastapi import APIRouter, Request, Query
from app.database import db
from uuid import uuid4
from datetime import datetime
from dotenv import load_dotenv
import os
import requests
from bson import ObjectId
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from bson.json_util import dumps
from fastapi.responses import Response

router = APIRouter()

load_dotenv()

TOGETHER_API_KEY = os.getenv("TOGETHER_API_KEY")
TOGETHER_URL = os.getenv("TOGETHER_URL")
MODEL = os.getenv("MODEL")

router = APIRouter()

# shranjevanje chatov v db
@router.post("/chat")
async def chat_with_ai(request: Request):
    body = await request.json()
    user_input = body.get("message", "")
    user_id = body.get("user_id", "")
    conv_id = body.get("conversation_id") or str(uuid4()) 

    headers = {
        "Authorization": f"Bearer {TOGETHER_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": MODEL,
        "messages": [
            { "role": "system", "content": "You are a helpful AI career assistant." },
            { "role": "user", "content": user_input }
        ],
        "temperature": 0.7,
    }

    try:
        res = requests.post(TOGETHER_URL, headers=headers, json=payload)
        res.raise_for_status()
        data = res.json()
        answer = data["choices"][0]["message"]["content"]

        await db.chats.insert_one({
            "conversation_id": conv_id,
            "user_id": user_id,
            "question": user_input,
            "answer": answer,
            "timestamp": datetime.utcnow()
        })

        return { "answer": answer, "conversation_id": conv_id }

    except Exception as e:
        return { "answer": f"⚠️ Error: {str(e)}", "conversation_id": conv_id }
    

# prikazovanje shranjenih chatov iz db
@router.get("/chat/history")
async def get_chat_history(user_id: str = Query(...)):
    pipeline = [
        { "$match": { "user_id": user_id } },
        { "$sort": { "timestamp": -1 } },
        {
            "$group": {
                "_id": "$conversation_id",
                "latest": { "$first": "$$ROOT" }
            }
        },
        { "$sort": { "latest.timestamp": -1 } }
    ]
    chats = await db.chats.aggregate(pipeline).to_list(length=50)
    latest_chats = [chat["latest"] for chat in chats]

    json_data = dumps(latest_chats)

    return Response(content=json_data, media_type="application/json")


# loading starega conversationa iz db
@router.get("/chat/conversation")
async def get_conversation(conversation_id: str = Query(...)):
    chats = await db.chats.find({"conversation_id": conversation_id}).sort("timestamp", 1).to_list(100)
    json_data = dumps(chats)
    return Response(content=json_data, media_type="application/json")


# brisanje chat zgodovine iz db
@router.delete("/chat/conversation/{conversation_id}")
async def delete_conversation(conversation_id: str):
    result = await db.chats.delete_many({"conversation_id": conversation_id})
    return { "deleted_count": result.deleted_count }