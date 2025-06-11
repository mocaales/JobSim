from fastapi import APIRouter
from pydantic import BaseModel
import joblib
import numpy as np
import pandas as pd
from app.database import db
import os

router = APIRouter()

base_dir = os.path.dirname(os.path.abspath(__file__))
models_dir = os.path.abspath(os.path.join(base_dir, "..", "models"))

model = joblib.load(os.path.join(models_dir, "profession_model_catboost.pkl"))
scaler = joblib.load(os.path.join(models_dir, "scaler.pkl"))
label_encoder = joblib.load(os.path.join(models_dir, "label_encoder.pkl"))

class PredictionRequest(BaseModel):
    answers: list
    email: str
    force: bool = False

# shranjevanje podatkov iz vprašalnika v bazo
@router.post("/predict")
async def predict(request: PredictionRequest):
    if len(request.answers) != 25:
        return {"error": "Expected 25 answers."}
    if not all(isinstance(x, (int, float)) and 1 <= x <= 5 for x in request.answers):
        return {"error": "All answers must be numbers between 1 and 5."}

    existing = await db.responses.find_one({"email": request.email})

    if existing and not request.force:
        return {
            "message": "You have already submitted the questionnaire.",
            "result": existing["predicted_profession"]
        }

    columns = [f"Q{i}" for i in range(1, 26)]
    answers = np.array(request.answers).reshape(1, -1)
    input_df = pd.DataFrame(answers, columns=columns)
    scaled = scaler.transform(input_df)
    pred = model.predict(scaled)
    profession = label_encoder.inverse_transform(pred)[0]
    print("Known features:", scaler.feature_names_in_)

    if existing:
        await db.responses.update_one(
            {"email": request.email},
            {"$set": {"answers": request.answers, "predicted_profession": profession}}
        )
    else:
        await db.responses.insert_one(
            {"email": request.email, "answers": request.answers, "predicted_profession": profession}
        )

    return {"predicted_profession": profession}

# preverjanje obstoja odgovora v bazi
@router.post("/check_existing")
async def check_existing(data: dict):
    email = data.get("email")
    if not email:
        return {"error": "Email required"}
    existing = await db.responses.find_one({"email": email})
    if existing:
        return {"exists": True, "result": existing["predicted_profession"]}
    return {"exists": False}