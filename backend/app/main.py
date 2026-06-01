from fastapi import FastAPI
from app.database.database import engine

app = FastAPI()

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