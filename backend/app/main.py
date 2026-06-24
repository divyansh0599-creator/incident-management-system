from fastapi import FastAPI
from app.database.database import engine
from app.database.base import Base
from app.database.database import engine
from app.auth.routes import router as auth_router
from fastapi.middleware.cors import CORSMiddleware
from app.incidents.routes import (
    router as incident_router,
)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://incident-management-system-eight.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"] ,
)

Base.metadata.create_all(bind=engine)
app.include_router(auth_router)
app.include_router(incident_router)

@app.get("/")
def health_check():
    return {
        "message": "Incident Management API is running"
    }

@app.get("/db-test")
def db_test():
    try:
        connection = engine.connect()
        connection.close()

        return {
            "status": "success",
            "message": "Database connected successfully"
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }