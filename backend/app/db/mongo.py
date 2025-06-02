# app/config/database.py

from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

uri = os.getenv("MONGO_URI")
client = MongoClient(uri)
db = client["hotel_recommondation_system"]

# Define all collections you will use
users_collection = db["users"]
hotels_collection = db["hotels"]
locations_collection = db["locations"]
rooms_collection = db["rooms"]
mealplans_collection = db["meal_plans"]
packages_collection = db["packages"]
addons_collection = db["add_on_services"]
policies_collection = db["policies"]
loyalty_collection = db["loyalty_programs"]
seasonal_collection = db["seasonal_info"]
safety_collection = db["safety_measures"]
