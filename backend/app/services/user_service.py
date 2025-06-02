from app.db.mongo import users_collection
from app.db.auth_utils import hash_password, verify_password, create_token
from fastapi import HTTPException

def register_user(user):
    if users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already registered")
    user_data = {
        "name": user.name,
        "email": user.email,
        "password": hash_password(user.password)
    }
    users_collection.insert_one(user_data)
    return {"msg": "User registered successfully"}

def login_user(data: dict):
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        raise HTTPException(status_code=400, detail="Email and password are required")

    db_user = users_collection.find_one({"email": email})
    if not db_user or not verify_password(password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_token({"id": str(db_user["_id"]), "email": db_user["email"]})
    return {
        "token": token,
        "user": {
            "id": str(db_user["_id"]),
            "name": db_user["name"],
            "email": db_user["email"]
        }
    }
