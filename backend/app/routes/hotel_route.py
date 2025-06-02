from fastapi import APIRouter, HTTPException
from app.models.hotel_model import Hotel
from app.services.hotel_service import *

router = APIRouter()

@router.post("/", response_model=dict)
async def create_hotel_route(hotel: Hotel):
    hotel_dict = hotel.dict()
    inserted_id = await create_hotel(hotel_dict)
    return {"message": "Hotel added successfully", "hotelId": inserted_id}

@router.get("/", response_model=list)
async def fetch_all_hotels():
    return await get_all_hotels()

@router.get("/{hotel_id}", response_model=dict)
async def fetch_hotel(hotel_id: str):
    hotel = await get_hotel_by_id(hotel_id)
    if not hotel:
        raise HTTPException(status_code=404, detail="Hotel not found")
    return hotel

@router.put("/{hotel_id}", response_model=dict)
async def update_hotel_route(hotel_id: str, hotel: Hotel):
    updated = await update_hotel(hotel_id, hotel.dict())
    if not updated:
        raise HTTPException(status_code=404, detail="Update failed. Hotel not found.")
    return {"message": "Hotel updated successfully"}

@router.delete("/{hotel_id}", response_model=dict)
async def delete_hotel_route(hotel_id: str):
    deleted = await delete_hotel(hotel_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Delete failed. Hotel not found.")
    return {"message": "Hotel deleted successfully"}
