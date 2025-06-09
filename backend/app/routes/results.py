from fastapi import APIRouter
from pydantic import BaseModel
from app.database import db
from app.utils.email_utils import send_email
from typing import Optional

router = APIRouter()

class GameResult(BaseModel):
    email: str
    time: float
    game: str
    difficulty: str = None
    recipe: str = None
    score: Optional[float] = None

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
                {"$set": {"time": result.time,
                          "score": result.score}}
            )
            subject = f"🎉 Novi osebni rekord za {result.game}!"
            body = f"""
            <html>
              <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
                <h2 style="color: #2980b9;">🎉 Novi osebni rekord!</h2>
                <p>Bravo <strong>{result.email}</strong>!</p>
                <p>Premagali ste prejšnji rekord (<strong>{existing['time']} sekund</strong>) in dosegli <strong>{result.time} sekund</strong> v igri <strong>{result.game}</strong>!</p>
                <p style="color: #e67e22; font-weight: bold;">Fantastično delo – nadaljujte tako!</p>
                <hr>
                <p style="font-size: 12px; color: #7f8c8d;">JobSim ekipa</p>
              </body>
            </html>
            """
            send_email(result.email, subject, body)
            return {"message": "Result updated with new faster time 🏆"}
        else:
            return {"message": "Existing result is faster, no update made 😔"}

    insert_data = {
        "email": result.email,
        "time": result.time,
        "game": result.game,
        "score": result.score,

        # take nickname from users collection, fallback to email
        #"nickname": (await db.users.find_one(
        #    {"email": result.email},
        #    {"nickname": 1}
        #)).get("nickname", result.email)
    }
    if result.game == "chef":
        insert_data["recipe"] = result.recipe
    else:
        insert_data["difficulty"] = result.difficulty

    if result.game == "dispatcher" and result.score is not None:
        insert_data["score"] = result.score

    await db.games_results.insert_one(insert_data)

    subject = f"🔥 Prvi rezultat za {result.game}!"
    body = f"""
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
        <h2 style="color: #2c3e50;">🔥 Čestitke za prvi rezultat!</h2>
        <p>Bravo <strong>{result.email}</strong>!</p>
        <p>Pravkar ste dosegli <strong>{result.time} sekund</strong> v igri <strong>{result.game}</strong>.</p>
        <p style="color: #27ae60; font-weight: bold;">Veselimo se vašega napredka!</p>
        <hr>
        <p style="font-size: 12px; color: #7f8c8d;">JobSim ekipa</p>
      </body>
    </html>
    """
    send_email(result.email, subject, body)

    return {"message": "New result saved 🔥"}


@router.get("/game/leaderboard")
async def get_game_leaderboard(game: str, difficulty: str = None, recipe: str = None):
    query = {"game": game}
    if game == "chef" and recipe:
        query["recipe"] = recipe
    elif difficulty:
        query["difficulty"] = difficulty

    results = await db.games_results.find(query).sort("time", 1).limit(100).to_list(100)

    # Zberi unikatne email naslove
    emails = list({r["email"] for r in results})

    # Pridobi vse uporabnike z navedenimi emaili
    users = await db.users.find({"email": {"$in": emails}}, {"email": 1, "nickname": 1}).to_list(None)
    email_to_nickname = {u["email"]: u["nickname"] for u in users}

    # Dodaj nickname (če obstaja) vsakemu rezultatu
    enriched_results = []
    for r in results:
        enriched_results.append({
            "email": r["email"],
            "nickname": email_to_nickname.get(r["email"]),
            "time": r["time"],
            "score": r.get("score"),
            "difficulty": r.get("difficulty"),
            "recipe": r.get("recipe")
        })

    return enriched_results

@router.delete("/game/clear-all/{email}")
async def clear_all_my_scores(email: str):
    """
    Delete every game result for the given email.
    """
    result = await db.games_results.delete_many({"email": email})
    return {"deleted_count": result.deleted_count}