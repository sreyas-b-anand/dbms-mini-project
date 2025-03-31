from flask import Blueprint, jsonify, request
from models import User
from config.db import db
from middlewares import token_required
import logging

profile = Blueprint("profile", __name__)

@profile.route("", methods=['GET' , 'POST'])
@token_required
def fetchUser(user):
    try:
        if not user:
            return jsonify({"success": False, "message": "User not authorized"}), 401

        user = User.query.filter_by(email = user.email).first()

        # Convert SQLAlchemy object to dictionary for JSON response
        user_data = {
            "id": user.id,
            "full_name":user.full_name if user.full_name else "",
            "username": user.username,
            "email": user.email,
            "address": user.address if user.address else "",
            "city":user.city if user.city else "",
            "state":user.state if user.state else "",
            "zip_code":user.zip_code if user.state else "",
            "country":user.country if user.country else "",
            "role": user.role if user.role else "",
            "wallet": user.wallet if user.wallet is not None else 0.0,
            "createdAt": user.created_at,
            "img": user.img,
            "phone": user.phone
        }

        return jsonify({"success": True, "message": "Data fetched successfully", "profile": user_data}), 200

    except Exception as e:
        logging.error(f"Error in fetchUser: {str(e)}")
        return jsonify({"success": False, "message": f"An error occurred: {str(e)}"}), 500


@profile.route("/update-profile", methods=['POST'])
@token_required
def updateProfile(user):
    try:
        print("Update request received:", request.get_json())
        
        # If token_required worked, we should have a current_user
        if not user:
            return jsonify({"success": False, "message": "Unauthorized access"}), 401
            
        data = request.get_json()
        
        # Extract fields that we want to update
        address = data.get('address')
        phone = data.get('phone')
        
        # Find the user in the database
        user_info = User.query.filter_by(id = user.id).first()
        
        if not user_info:
            return jsonify({"success": False, "message": "User not found"}), 404
        
        # Update fields if they are provided
        if address is not None:
            user_info.address = address
            
        if phone is not None:
            user_info.phone = phone
        
        # Commit changes to database
        db.session.commit()
        
        return jsonify({
            "success": True, 
            "message": "Profile updated successfully",
        }), 200

    except Exception as e:
        db.session.rollback()
        print(f"Error in updateProfile: {str(e)}")
        return jsonify({"success": False, "message": f"An error occurred: {str(e)}"}), 500
    
@profile.route("/update-at-checkout", methods=['POST'])
@token_required
def update_profile(user):
    try:
        data = request.get_json()
        
        # Extract fields from request
        full_name = data.get('full_name')
        address = data.get('address')
        phone = data.get('phone')
        city = data.get('city')
        state = data.get('state')
        zip_code = data.get('zip_code')
        country = data.get('country')
        
        # Fetch user from DB
        user_info = User.query.filter_by(id=user.id).first()
        if not user_info:
            return jsonify({"success": False, "message": "User not found"}), 404
        
        # Update user fields
        if full_name is not None:
            user_info.full_name = full_name
        if address is not None:
            user_info.address = address
        if phone is not None:
            user_info.phone = phone
        if city is not None:
            user_info.city = city
        if state is not None:
            user_info.state = state
        if zip_code is not None:
            user_info.zip_code = zip_code
        if country is not None:
            user_info.country = country
        
        # Commit changes
        db.session.commit()
        
        return jsonify({"success": True, "message": "Profile updated successfully"}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "message": f"An error occurred: {str(e)}"}), 500
