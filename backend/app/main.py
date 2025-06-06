from app.routes import results
from fastapi import FastAPI
from app.routes import predict
from app.routes import quizResults
from app.routes import user
from fastapi.middleware.cors import CORSMiddleware
from app.routes import chat
from app.routes import resume
from app.routes import roadmap
from app.routes import history

app = FastAPI(title="JobSim API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predict.router)
app.include_router(results.router)
app.include_router(quizResults.router)
app.include_router(user.router)
app.include_router(chat.router)
app.include_router(resume.router)
app.include_router(roadmap.router)
app.include_router(history.router)

# osnovni endpoint
@app.get("/")
async def root():
    return {"message": "🚀 JobSim API is running!"}