from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def health_check():
    return {"message": "Incident Management API is running"}