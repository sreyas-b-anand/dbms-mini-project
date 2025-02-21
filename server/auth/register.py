import jwt
import datetime
from config.db import get_db_connection
import bcrypt

SECRET_KEY = "your_secret_key"

def register_user(username, email, password, role="user"):  # Default role = "user"
    """Registers a new user and returns a JWT token"""
    try:
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        conn = get_db_connection()
        cursor = conn.cursor()

        # Insert user into database with role
        cursor.execute("""
            INSERT INTO users (username, email, password_hash, role)    
            VALUES (%s, %s, %s, %s)
        """, (username, email, hashed_password, role))
        
        conn.commit()
        user_id = cursor.lastrowid

        token_payload = {
            "user_id": user_id,
            "email": email,
            "role": role,  # Include role in JWT token
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }
        token = jwt.encode(token_payload, SECRET_KEY, algorithm="HS256")

        return {"message": "User registered successfully", "token": token, "email": email, "username": username, "role": role}

    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}

    finally:
        cursor.close()
        conn.close()
