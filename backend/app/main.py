from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # ✅ CORS import
from app.routes import user_route , hotel_route  # ✅ Import user and hotel routes

app = FastAPI()

# ✅ Register user routes
app.include_router(user_route.router, prefix="/api/user")
app.include_router(hotel_route.router, prefix="/api/hotel", tags=["Hotels"])

# ✅ Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
