from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from app.database import db

router = APIRouter(prefix="/user", tags=["user"])

class UserProfile(BaseModel):
    email: EmailStr
    nickname: str
    imageUrl: Optional[str] = None

@router.post("/upsert")
async def upsert_user(profile: UserProfile):
    print(f"[user/upsert] got payload: {profile.dict()}")
    data = {
        "email": profile.email,
        "nickname": profile.nickname,
        "imageUrl": profile.imageUrl,
    }
    # try updating existing document by email, else insert new
    await db.users.update_one(
        {"email": profile.email},
        {"$set": data},
        upsert=True
    )
    return {"message": "User profile saved"}

@router.get("/{email}", response_model=UserProfile)
async def get_user(email: EmailStr):
    #Fetch one user by email

    user_doc = await db.users.find_one({"email": email})
    if not user_doc:
        raise HTTPException(status_code=404, detail="User not found")
    return UserProfile(
        email=user_doc["email"],
        nickname=user_doc["nickname"],
        imageUrl=user_doc.get("imageUrl")
    )
