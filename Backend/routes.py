from pathlib import Path

from fastapi import APIRouter
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles


router = APIRouter()
FRONTEND_DIR = Path(__file__).resolve().parent.parent / "Front"


@router.get("/")
def index() -> FileResponse:
    return FileResponse(FRONTEND_DIR / "index.html")


@router.get("/login")
def login() -> dict[str, str]:
    return {"message": "Rota de login"}


@router.get("/agendar")
def agendamento() -> dict[str, str]:
    return {"message": "Rota de agendamento"}


router.mount("/", StaticFiles(directory=FRONTEND_DIR), name="frontend")