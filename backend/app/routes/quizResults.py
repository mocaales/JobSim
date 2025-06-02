from fastapi import APIRouter
from pydantic import BaseModel
from app.database import db

router = APIRouter()

class QuizResult(BaseModel):
    email: str
    job: str
    score: int
    total: int

@router.post("/quiz/submit")
async def submit_quiz_result(result: QuizResult):
    percentage = round((result.score / result.total) * 100)
    data = {
        "email": result.email,
        "job": result.job,
        "percentage": percentage
    }
    await db.quiz_results.insert_one(data)
    return {"message": "Quiz result saved", "percentage": percentage}

@router.get("/quiz/results")
async def get_user_quiz_results(email: str, job: str = None):
    query = {"email": email}
    if job and job != "all":
        query["job"] = job
    
    results = await db.quiz_results.find(query).to_list(100)
    if not results:
        return {"percentage": 0}

    total_percentage = sum(r.get("percentage", 0) for r in results)
    avg_percentage = total_percentage / len(results)

    return {"percentage": round(avg_percentage)}