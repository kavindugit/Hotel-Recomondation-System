from fastapi import APIRouter, Request
from app.models.user_model import UserRegister
from app.services.user_service import register_user, login_user

router = APIRouter()


@router.post("/register")
def register(user: UserRegister):
    return register_user(user)


@router.post("/login")
async def login(request: Request):
    data = await request.json()
    email = data.get("email")
    password = data.get("password")
    return login_user({"email": email, "password": password})
