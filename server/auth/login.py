import jwt
import datetime
from config.db import get_db_connection
import bcrypt

SECRET_KEY = "your_secret_key"

def login_user(email, password):
    """Authenticates a user and returns a JWT token with role"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()

        if user:
            stored_hashed_password = user["password_hash"].encode()
            if bcrypt.checkpw(password.encode('utf-8'), stored_hashed_password):
                # Generate JWT Token
                token_payload = {
                    "user_id": user["id"],
                    "email": user["email"],
                    "role": user["role"],  # Include role in token
                    "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
                }
                token = jwt.encode(token_payload, SECRET_KEY, algorithm="HS256")
                
                return {"message": "Login successful", "token": token, "email": email, "username": user["username"], "role": user["role"]}
            else:
                return {"error": "Invalid email or password"}
        else:
            return {"error": "User not found"}

    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}

    finally:
        cursor.close()
        conn.close()
