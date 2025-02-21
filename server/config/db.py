import os
import mysql.connector
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Fetch credentials securely (without hardcoded defaults)
DB_HOST = os.getenv("DB_HOST")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_DATABASE = os.getenv("DB_DATABASE")

# Ensure all required env variables are set
if not all([DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE]):
    raise ValueError("Error: One or more database environment variables are missing!")

# Function to connect to MySQL database securely
def get_db_connection():
    try:
        connection = mysql.connector.connect(
            host=DB_HOST,
            user=DB_USER,
            password=DB_PASSWORD,
            database=DB_DATABASE
        )
        return connection
    except mysql.connector.Error as e:
        print(f"Error: Could not connect to database. {e}")
        return None
