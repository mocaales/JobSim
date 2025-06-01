from fastapi import APIRouter
from pydantic import BaseModel
from app.database import db

router = APIRouter()

class GameResult(BaseModel):
    email: str
    time: float
    game: str
    difficulty: str = None  # samo za igre z "difficulty"
    recipe: str = None      # samo za chef igro

@router.post("/game/submit")
async def submit_game_result(result: GameResult):
    query = {"email": result.email, "game": result.game}

    if result.game == "chef":
        query["recipe"] = result.recipe
    else:
        query["difficulty"] = result.difficulty

    existing = await db.games_results.find_one(query)

    if existing:
        if result.time < existing["time"]:
            await db.games_results.update_one(
                {"_id": existing["_id"]},
                {"$set": {"time": result.time}}
            )
            return {"message": "Result updated with new faster time 🏆"}
        else:
            return {"message": "Existing result is faster, no update made 😔"}

    insert_data = {
        "email": result.email,
        "time": result.time,
        "game": result.game
    }

    if result.game == "chef":
        insert_data["recipe"] = result.recipe
    else:
        insert_data["difficulty"] = result.difficulty

    await db.games_results.insert_one(insert_data)
    return {"message": "New result saved 🔥"}

@router.get("/game/leaderboard")
async def get_game_leaderboard(game: str, difficulty: str = None, recipe: str = None):
    query = {"game": game}

    if game == "chef" and recipe:
        query["recipe"] = recipe
    elif difficulty:
        query["difficulty"] = difficulty

    results = await db.games_results.find(query).sort("time", 1).limit(100).to_list(100)
    return [{"email": r["email"], "time": r["time"], "difficulty": r.get("difficulty"), "recipe": r.get("recipe")} for r in results]