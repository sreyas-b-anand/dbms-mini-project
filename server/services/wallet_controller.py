from models import User
from config.db import db

def add_wallet(user_id, amount):
    try:
        user = User.query.filter_by(id=user_id).first()

        if not user:
            return {"message": "User not found", "success": False}
        
        user.wallet += amount  
        db.session.commit()

        return {"success": True, "message": "Wallet updated successfully", "new_balance": user.wallet}

    except Exception as e:
        db.session.rollback()
        return {"message": f"An error occurred: {str(e)}", "success": False}

def get_wallet(user_id):
    try:
        user = User.query.filter_by(id=user_id).first()

        if not user:
            return {"message": "User not found", "success": False}
        
        wallet_amount = user.wallet

        return {"success": True, "message": "Wallet fetched successfully", "wallet": wallet_amount}
    except Exception as e:
        return {"message": f"An error occurred: {str(e)}", "success": False}


def deduct_wallet(user , deduct_amount):
    try:
        user_info = User.query.filter_by(id=user.id).first()

        if not user:
            return {"message": "User not found", "success": False}
        
        user_info.wallet = user_info.wallet - deduct_amount
        if(user_info.wallet < 0):
            return {"message": "Insufficient wallet amount", "success": False}
        else:
            db.session.commit()

        return {"success": True, "message": "Wallet updated successfully"}
    except Exception as e:
        return {"message": f"An error occurred: {str(e)}", "success": False}
