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

    # Special: For developer and emergency-medicine-specialist, sum scores
    if result.game in ["developer", "emergency-medicine-specialist"]:
        # Always insert a new result (for history), but also update a summary doc
        await db.games_results.insert_one({
            "email": result.email,
            "time": result.time,
            "game": result.game,
            "score": result.score,
            "difficulty": result.difficulty,
            "recipe": result.recipe
        })
        # Upsert a summary doc for fast leaderboard
        await db.games_results_summary.update_one(
            {"email": result.email, "game": result.game},
            {"$inc": {"score": result.score if result.score else 0}},
            upsert=True
        )
        await db.users.update_one(
            {"email": result.email},
            {"$inc": {"games_played": 1}}
        )
        return {"message": "Score added and summed for user."}

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

        # ── bump games_played on the user document ───────────────────────────
    await db.users.update_one(
      {"email": result.email},
      {"$inc": {"games_played": 1}}
    )

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

    # SPECIAL: For developer and emergency-medicine-specialist, sum all scores per user from summary
    if game in ["developer", "emergency-medicine-specialist"]:
        agg_results = await db.games_results_summary.find({"game": game}).sort("score", -1).limit(100).to_list(100)
        emails = [r["email"] for r in agg_results]
        users = await db.users.find({"email": {"$in": emails}}, {"email": 1, "nickname": 1}).to_list(None)
        email_to_nickname = {u["email"]: u.get("nickname") for u in users}
        enriched_results = []
        for r in agg_results:
            enriched_results.append({
                "email": r["email"],
                "nickname": email_to_nickname.get(r["email"]),
                "score": r["score"]
            })
        return enriched_results

    if game in ["emergency-medicine-specialist", "dispatcher"]:
        results = await db.games_results.find(query).sort("score", -1).limit(100).to_list(100)
    else:
        results = await db.games_results.find(query).sort("time", 1).limit(100).to_list(100)

    emails = list({r["email"] for r in results})
    users = await db.users.find({"email": {"$in": emails}}, {"email": 1, "nickname": 1}).to_list(None)
    email_to_nickname = {u["email"]: u["nickname"] for u in users}
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