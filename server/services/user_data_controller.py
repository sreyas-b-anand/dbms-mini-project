from models import User
from config.db import db

def add_info(user, address, phone):
    try:
        user_info = User.query.filter_by(id=user.id).first()
        
        if not user_info:
            return {"success": False, "message": "User not found"}
        
        user_info.address = address
        user_info.phone = phone

        db.session.commit()
        return {"success": True, "message": "Successfully added"}
    
    except Exception as e:
        db.session.rollback()  # Rollback in case of failure
        return {"success": False, "message": f"Server error"}
