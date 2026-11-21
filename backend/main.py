from fastapi import FastAPI
from database import Base , engine
from fastapi.middleware.cors import CORSMiddleware
from router import auth_router, shop_router

Base.metadata.create_all(bind= engine)

app =FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_credentials= True,
    allow_methods= ['*'],
    allow_headers=['*'],
)

app.include_router(auth_router.router,prefix="/api")
app.include_router(shop_router.router,prefix="/api")

@app.get("/")
def root():
    return {"message": "API is running"}