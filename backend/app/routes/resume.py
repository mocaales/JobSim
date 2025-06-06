from fastapi import APIRouter, UploadFile, File, Query
from app.database import db
from tempfile import NamedTemporaryFile
from datetime import datetime
from uuid import uuid4
import pdfplumber
from bson import ObjectId
from bson.json_util import dumps
from fastapi.responses import Response

router = APIRouter()

def evaluate_resume(text: str) -> dict:
    sections = {
        "contact": 75 if "@" in text or "phone" in text.lower() else 30,
        "experience": 70 if "experience" in text.lower() else 40,
        "education": 20 if "university" not in text.lower() and "education" not in text.lower() else 70,
        "skills": 70 if "skills" in text.lower() or "technologies" in text.lower() else 40,
    }

    avg_score = sum(sections.values()) // len(sections)

    tips = []
    if sections["education"] < 50:
        tips.append("Add an education section with school and years.")
    if sections["skills"] < 50:
        tips.append("Include a list of relevant skills or technologies.")
    if len(text) < 400:
        tips.append("Your resume may be too short. Consider adding more detail.")

    good = []
    improvements = []
    if sections["experience"] >= 70:
        good.append("Clearly lists work experience and technologies used.")
    else:
        improvements.append("Add more detail to your experience section.")
    if sections["contact"] < 50:
        improvements.append("Include your email or phone number.")

    return {
        "overall_score": avg_score,
        "sections": sections,
        "tips": tips,
        "good": good,
        "improvements": improvements
    }

@router.post("/resume/analyze")
async def analyze_resume(file: UploadFile = File(...), user_id: str = Query(...)):
    try:
        temp_file = NamedTemporaryFile(delete=False)
        temp_file.write(await file.read())
        temp_file.close()

        text = ""
        with pdfplumber.open(temp_file.name) as pdf:
            for page in pdf.pages:
                extracted = page.extract_text()
                if extracted:
                    text += extracted + "\n"

        evaluation = evaluate_resume(text)

        resume_id = str(uuid4())

        entry = {
            "resume_id": resume_id,
            "user_id": user_id,
            "filename": file.filename,
            "text": text[:3000],
            "timestamp": datetime.utcnow(),
            **evaluation
        }

        await db.resume_results.insert_one(entry)

        return Response(content=dumps(entry), media_type="application/json")

    except Exception as e:
        return { "error": str(e) }

@router.get("/resume/history")
async def get_resume_history(user_id: str = Query(...)):
    results = await db.resume_results.find({ "user_id": user_id }).sort("timestamp", -1).to_list(length=50)
    return Response(content=dumps(results), media_type="application/json")

@router.delete("/resume/result/{resume_id}")
async def delete_resume_result(resume_id: str):
    res = await db.resume_results.delete_one({ "resume_id": resume_id })
    return { "deleted": res.deleted_count == 1 }

@router.get("/resume/result/{resume_id}")
async def get_resume_result(resume_id: str):
    result = await db.resume_results.find_one({ "resume_id": resume_id })
    if not result:
        return { "error": "Resume not found" }
    return Response(content=dumps(result), media_type="application/json")