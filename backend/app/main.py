from fastapi import FastAPI
from app.routes import predict

app = FastAPI(title="JobSim API")

app.include_router(predict.router)

# osnovni endpoint
@app.get("/")
async def root():
    return {"message": "🚀 JobSim API is running!"}