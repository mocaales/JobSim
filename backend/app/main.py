from fastapi import FastAPI
from app.routes import predict, cashier

app = FastAPI(title="JobSim API")

app.include_router(predict.router)
app.include_router(cashier.router)

# osnovni endpoint
@app.get("/")
async def root():
    return {"message": "🚀 JobSim API is running!"}