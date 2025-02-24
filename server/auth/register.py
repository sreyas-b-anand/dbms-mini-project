import jwt
import datetime
from config.db import get_db_connection
import bcrypt

SECRET_KEY = "your_secret_key"

def register_user(username, email, password, role="user"):  # Default role = "user"
    """Registers a new user and returns a JWT token"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Check if email already exists
        cursor.execute("SELECT id FROM users WHERE email = %s", (email,)) 
        existing_user = cursor.fetchone()

        if existing_user:
            return {"success": False, "message": "Email already in use"}

        # Hash the password
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        # Insert user into database with role
        cursor.execute("""
            INSERT INTO users (username, email, password_hash, role)    
            VALUES (%s, %s, %s, %s)
        """, (username, email, hashed_password, role))
        
        conn.commit()
        user_id = cursor.lastrowid

        # Generate JWT token
        token_payload = {
            "user_id": user_id,
            "email": email,
            "role": role,  # Include role in JWT token
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }
        token = jwt.encode(token_payload, SECRET_KEY, algorithm="HS256")

        return {
            "success": True,
            "message": "User registered successfully",
            "token": token,
            "email": email,
            "username": username,
            "role": role
        }

    except Exception as e:
        return {"success": False, "message": f"An error occurred: {str(e)}"}

    finally:
        cursor.close()
        conn.close()
