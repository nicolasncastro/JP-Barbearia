from fastapi import FastAPI
from starlette.middleware.sessions import SessionMiddleware

from Backend.auth import router as auth_router

app = FastAPI()

app.add_middleware(
    SessionMiddleware,
    secret_key="..."
)

app.include_router(auth_router)