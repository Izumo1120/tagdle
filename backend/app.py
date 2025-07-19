from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
import sys
sys.path.append('../')
# from routes.users_endpoint import users_endpoint
# from routes.auth_endpoint import auth_endpoint

app = FastAPI(
    title="tagdle Backend",
    description="Backend for tagdle",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# app.include_router(users_endpoint, tags=["users"])
# app.include_router(auth_endpoint, tags=["auth"])

@app.get("/")
def root():    
    return {"root":"tagdle Backend"}

# @app.post("/")
# def root():
#     return {"root":"Calendar App Backend"}

if __name__ == "__main__":
    uvicorn.run("app:app",host="0.0.0.0",port=8000,reload=True)