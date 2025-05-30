from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os
import certifi

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")

if not MONGO_URL:
    raise ValueError("⚠️ MONGO_URL ni nastavljen v .env datoteki.")

client = AsyncIOMotorClient(MONGO_URL, tlsCAFile=certifi.where())
db = client["job_sim_db"] 