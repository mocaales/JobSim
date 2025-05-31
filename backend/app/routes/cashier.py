from fastapi import APIRouter
from pydantic import BaseModel
from app.database import db

router = APIRouter()

class CashierResult(BaseModel):
    email: str
    time: float
    difficulty: str

@router.post("/cashier/submit")
async def submit_cashier_result(result: CashierResult):
    existing = await db.cashier_results.find_one({"email": result.email, "difficulty": result.difficulty})

    if existing:
        if result.time < existing["time"]:
            # Posodobi z boljšim časom
            await db.cashier_results.update_one(
                {"_id": existing["_id"]},
                {"$set": {"time": result.time}}
            )
            return {"message": "Result updated with new faster time 🏆"}
        else:

            return {"message": "Existing result is faster, no update made 😔"}


    await db.cashier_results.insert_one({
        "email": result.email,
        "time": result.time,
        "difficulty": result.difficulty
    })
    return {"message": "New result saved 🔥"}

@router.get("/cashier/leaderboard")
async def get_cashier_leaderboard(difficulty: str = None):
    query = {}
    if difficulty:
        query["difficulty"] = difficulty
    results = await db.cashier_results.find(query).sort("time", 1).limit(100).to_list(100)
    return [{"email": r["email"], "time": r["time"], "difficulty": r["difficulty"]} for r in results]