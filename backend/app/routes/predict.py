from fastapi import APIRouter
from pydantic import BaseModel
import joblib
import numpy as np
import pandas as pd
from app.database import db

router = APIRouter()

model = joblib.load("app/models/profession_model_xgb.pkl")
scaler = joblib.load("app/models/scaler.pkl")
label_encoder = joblib.load("app/models/label_encoder.pkl")

class PredictionRequest(BaseModel):
    answers: list
    email: str
    force: bool = False

@router.post("/predict")
async def predict(request: PredictionRequest):
    if len(request.answers) != 23:
        return {"error": "Invalid number of answers."}
    if not all(isinstance(x, (int, float)) for x in request.answers):
        return {"error": "All answers must be numbers."}

    existing = await db.responses.find_one({"email": request.email})

    if existing and not request.force:
        return {"message": "You have already submitted the questionnaire.", "result": existing["predicted_profession"]}

    columns = [f"Q{i}" for i in [5,6,7,11,12,17,1,2,3,4,8,9,10,13,14,15,16,18,19,20,21,22,23]]
    answers = np.array(request.answers).reshape(1, -1)
    input_df = pd.DataFrame(answers, columns=columns)
    scaled = scaler.transform(input_df)
    pred = model.predict(scaled)
    profession = label_encoder.inverse_transform(pred)[0]

    if existing:
        await db.responses.update_one({"email": request.email}, {"$set": {"answers": request.answers, "predicted_profession": profession}})
    else:
        await db.responses.insert_one({"email": request.email, "answers": request.answers, "predicted_profession": profession})

    return {"predicted_profession": profession}

@router.post("/check_existing")
async def check_existing(data: dict):
    email = data.get("email")
    if not email:
        return {"error": "Email required"}
    existing = await db.responses.find_one({"email": email})
    if existing:
        return {"exists": True, "result": existing["predicted_profession"]}
    return {"exists": False}