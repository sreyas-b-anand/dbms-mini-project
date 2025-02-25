import jwt
import datetime
import bcrypt
from config.db import db
from models.user import User  # Import User model

SECRET_KEY = "your_secret_key"

def login_user(email, password):
    """Authenticates a user and returns a JWT token with role"""
    try:
        # Query user by email
        user = User.query.filter_by(email=email).first()

        if user:
            # Using password_hash instead of password to match your User model
            stored_hashed_password = user.password_hash.encode()
            if bcrypt.checkpw(password.encode('utf-8'), stored_hashed_password):
                # Generate JWT Token
                token_payload = {
                    "user_id": user.id,
                    "email": user.email,
                    "role": user.role, 
                    "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
                }
                token = jwt.encode(token_payload, SECRET_KEY, algorithm="HS256")
                
                return {
                    "success": True,
                    "message": "Login successful",
                    "token": token,
                    "email": user.email,
                    "username": user.username,
                    "role": user.role
                }
            else:
                return {"success": False, "message": "Invalid email or password"}
        else:
            return {"success": False, "message": "User not found"}

    except Exception as e:
        return {"success": False, "message": f"An error occurred: {str(e)}"}